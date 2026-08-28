"use client";

import * as React from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CheckCircle2,
  FolderTree,
  HelpCircle,
  Layers,
  Pencil,
  Plus,
  Search,
  Trash2
} from "lucide-react";
import { toast } from "sonner";

import { ApiResponse, IFaq } from "@repo/types";
import { CreateFaqInput } from "@repo/validators";

import { del, get, patch, post } from "@/lib/api";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

const CATEGORY_PRESETS = ["General", "Services", "Support", "Pricing", "Security"];

const DEFAULT_FORM: CreateFaqInput = {
  question: "",
  answer: "",
  category: "General",
  order: 0,
  isActive: true
};

export default function FaqsPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = React.useState<IFaq | null>(null);
  const [formData, setFormData] = React.useState<CreateFaqInput>(DEFAULT_FORM);

  // Fetch FAQs
  const {
    data: faqs = [],
    isLoading,
    isError
  } = useQuery<IFaq[]>({
    queryKey: ["faqs"],
    queryFn: async () => {
      const res = await get<ApiResponse<IFaq[]>>("/faqs");
      return res.data || [];
    }
  });

  // Fetch Categories
  const { data: categories = CATEGORY_PRESETS } = useQuery<string[]>({
    queryKey: ["faq-categories"],
    queryFn: async () => {
      try {
        const res = await get<ApiResponse<string[]>>("/faqs/categories");
        return res.data && res.data.length > 0 ? res.data : CATEGORY_PRESETS;
      } catch {
        return CATEGORY_PRESETS;
      }
    }
  });

  // Create Mutation
  const createMutation = useMutation({
    mutationFn: async (payload: CreateFaqInput) => {
      const res = await post<ApiResponse<IFaq>>("/faqs", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faqs"] });
      queryClient.invalidateQueries({ queryKey: ["faq-categories"] });
      toast.success("FAQ added successfully!");
      setSheetOpen(false);
      setFormData(DEFAULT_FORM);
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "Failed to create FAQ";
      toast.error(msg);
    }
  });

  // Update Mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<CreateFaqInput> }) => {
      const res = await patch<ApiResponse<IFaq>>(`/faqs/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faqs"] });
      queryClient.invalidateQueries({ queryKey: ["faq-categories"] });
      toast.success("FAQ updated successfully!");
      setSheetOpen(false);
      setEditingId(null);
      setFormData(DEFAULT_FORM);
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "Failed to update FAQ";
      toast.error(msg);
    }
  });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await del(`/faqs/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faqs"] });
      queryClient.invalidateQueries({ queryKey: ["faq-categories"] });
      toast.success("FAQ deleted permanently.");
      setDeleteTarget(null);
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "Failed to delete FAQ";
      toast.error(msg);
    }
  });

  const handleToggleActive = (f: IFaq) => {
    const id = f.id || f._id;
    if (!id) return;
    updateMutation.mutate({
      id,
      data: { isActive: !f.isActive }
    });
  };

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({
      ...DEFAULT_FORM,
      order: faqs.length + 1
    });
    setSheetOpen(true);
  };

  const handleOpenEdit = (f: IFaq) => {
    const id = f.id || f._id;
    if (!id) return;
    setEditingId(id);
    setFormData({
      question: f.question,
      answer: f.answer,
      category: f.category || "General",
      order: f.order ?? 0,
      isActive: f.isActive ?? true
    });
    setSheetOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.question.trim() || !formData.answer.trim()) {
      toast.error("Question and answer are required.");
      return;
    }

    if (editingId) {
      updateMutation.mutate({ id: editingId, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const filteredFaqs = faqs.filter((f) => {
    const matchCategory = selectedCategory === "All" || f.category === selectedCategory;
    const matchSearch =
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase()) ||
      f.category.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const totalFaqs = faqs.length;
  const activeFaqs = faqs.filter((f) => f.isActive).length;
  const totalCategories = new Set(faqs.map((f) => f.category)).size;

  return (
    <div className="space-y-8 pb-12">
      {/* Top Header Bar */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-foreground flex items-center gap-2.5 text-2xl font-black tracking-tight">
            <HelpCircle className="text-primary h-6 w-6" />
            <span>Frequently Asked Questions</span>
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Manage public accordion Q&amp;As, categorization, and search responses across web and
            landing pages.
          </p>
        </div>

        <Button onClick={handleOpenCreate} className="flex items-center gap-2 font-bold shadow-md">
          <Plus className="h-4 w-4" />
          <span>Add FAQ</span>
        </Button>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="bg-card border-border flex items-center gap-4 rounded-2xl border p-5 shadow-xs">
          <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-xl font-bold">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <p className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
              Total Questions
            </p>
            <p className="text-foreground text-xl font-black">{totalFaqs}</p>
          </div>
        </div>

        <div className="bg-card border-border flex items-center gap-4 rounded-2xl border p-5 shadow-xs">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 font-bold text-emerald-500">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <p className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
              Active & Published
            </p>
            <p className="text-foreground text-xl font-black">{activeFaqs}</p>
          </div>
        </div>

        <div className="bg-card border-border flex items-center gap-4 rounded-2xl border p-5 shadow-xs">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 font-bold text-purple-500">
            <FolderTree className="h-5 w-5" />
          </div>
          <div>
            <p className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
              Categories
            </p>
            <p className="text-foreground text-xl font-black">{totalCategories}</p>
          </div>
        </div>
      </div>

      {/* Category Pills & Search Filter */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        {/* Category Pills */}
        <div className="bg-muted/40 border-border/50 flex flex-wrap items-center gap-1.5 rounded-xl border p-1">
          <button
            type="button"
            onClick={() => setSelectedCategory("All")}
            className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
              selectedCategory === "All"
                ? "bg-background text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            All ({totalFaqs})
          </button>
          {Array.from(new Set([...categories, ...CATEGORY_PRESETS])).map((cat) => {
            const count = faqs.filter((f) => f.category === cat).length;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
                  selectedCategory === cat
                    ? "bg-background text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat} {count > 0 ? `(${count})` : ""}
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search FAQs..."
            className="pl-9 text-xs"
          />
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-card border-border overflow-hidden rounded-2xl border shadow-xs">
        {isLoading ? (
          <div className="space-y-4 p-8">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        ) : isError ? (
          <div className="text-destructive p-8 text-center">
            <p className="font-bold">Failed to load FAQs.</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => queryClient.invalidateQueries({ queryKey: ["faqs"] })}
              className="mt-3"
            >
              Retry
            </Button>
          </div>
        ) : filteredFaqs.length === 0 ? (
          <div className="text-muted-foreground p-12 text-center">
            <HelpCircle className="text-muted-foreground/40 mx-auto mb-3 h-10 w-10" />
            <p className="text-foreground font-bold">No questions found.</p>
            <p className="mt-1 text-xs">Add frequently asked questions to help your customers.</p>
            <Button onClick={handleOpenCreate} size="sm" className="mt-4 font-bold">
              <Plus className="mr-1.5 h-3.5 w-3.5" /> Add Question
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead className="w-16">Order</TableHead>
                <TableHead className="w-72">Question</TableHead>
                <TableHead>Answer</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFaqs.map((f) => (
                <TableRow key={f.id || f._id}>
                  <TableCell className="text-muted-foreground text-xs font-bold">
                    #{f.order}
                  </TableCell>

                  <TableCell className="text-foreground max-w-xs text-xs font-bold">
                    {f.question}
                  </TableCell>

                  <TableCell className="max-w-md">
                    <p className="text-muted-foreground line-clamp-2 text-xs">{f.answer}</p>
                  </TableCell>

                  <TableCell>
                    <Badge variant="outline" className="text-[11px] font-semibold">
                      {f.category}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <Switch checked={f.isActive} onCheckedChange={() => handleToggleActive(f)} />
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleOpenEdit(f)}
                        className="text-foreground hover:text-primary h-8 w-8"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setDeleteTarget(f)}
                        className="text-muted-foreground hover:text-destructive h-8 w-8"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Create / Edit Slide-Over Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right" className="w-full space-y-6 overflow-y-auto p-6 sm:max-w-lg">
          <SheetHeader>
            <SheetTitle className="text-foreground flex items-center gap-2 text-lg font-black">
              <HelpCircle className="text-primary h-5 w-5" />
              <span>{editingId ? "Edit FAQ Item" : "Create FAQ Item"}</span>
            </SheetTitle>
            <SheetDescription className="text-muted-foreground text-xs">
              Configure question headline, clear concise answer, and category sorting.
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="bg-muted/30 border-border/50 space-y-4 rounded-xl border p-4">
              <div className="space-y-1.5">
                <label className="text-foreground text-xs font-semibold">Question *</label>
                <Input
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  placeholder="e.g. How do I know if I need a consultant?"
                  className="text-xs"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-foreground text-xs font-semibold">Answer *</label>
                <textarea
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  placeholder="Write the comprehensive answer here..."
                  rows={5}
                  className="border-input text-foreground placeholder:text-muted-foreground focus:ring-ring w-full rounded-lg border bg-transparent px-3 py-2 text-xs focus:ring-2 focus:outline-hidden"
                  required
                />
              </div>

              {/* Category selector */}
              <div className="space-y-2">
                <label className="text-foreground text-xs font-semibold">Category</label>
                <div className="mb-2 flex flex-wrap gap-1.5">
                  {CATEGORY_PRESETS.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setFormData({ ...formData, category: cat })}
                      className={`rounded-md px-2.5 py-1 text-xs font-bold transition-all ${
                        formData.category === cat
                          ? "bg-primary text-primary-foreground shadow-xs"
                          : "bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <Input
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Or enter custom category..."
                  className="text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-foreground text-xs font-semibold">Display Order</label>
                <Input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                  className="text-xs"
                />
              </div>

              <div className="border-border/40 flex items-center justify-between border-t pt-2">
                <div>
                  <p className="text-foreground text-xs font-bold">Published & Active</p>
                  <p className="text-muted-foreground text-[11px]">
                    Visible on public FAQs accordion
                  </p>
                </div>
                <Switch
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="border-border flex items-center justify-end gap-3 border-t pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setSheetOpen(false)}
                className="text-xs font-bold"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
                className="text-xs font-bold shadow-sm"
              >
                {createMutation.isPending || updateMutation.isPending
                  ? "Saving..."
                  : editingId
                    ? "Update FAQ"
                    : "Create FAQ"}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation Alert Dialog */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-bold">Delete Question?</AlertDialogTitle>
            <AlertDialogDescription className="text-xs">
              Are you sure you want to delete <strong>&quot;{deleteTarget?.question}&quot;</strong>?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-xs font-bold">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                const id = deleteTarget?.id || deleteTarget?._id;
                if (id) deleteMutation.mutate(id);
              }}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground text-xs font-bold"
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete Permanently"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
