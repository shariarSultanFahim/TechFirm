"use client";

import * as React from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CheckCircle2,
  Layers,
  MessageSquareQuote,
  Pencil,
  Plus,
  Search,
  Sparkles,
  Star,
  Trash2,
  Video
} from "lucide-react";
import { toast } from "sonner";

import { ApiResponse, ITestimonial } from "@repo/types";
import { CreateTestimonialInput } from "@repo/validators";

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

const GRADIENT_PRESETS = [
  { label: "Cyan to Blue", value: "bg-linear-to-br from-[#00C0FA] to-[#007BFE]" },
  { label: "Emerald Green", value: "bg-linear-to-br from-[#34D399] to-[#059669]" },
  { label: "Vibrant Purple", value: "bg-linear-to-br from-[#8B5CF6] to-[#6D28D9]" },
  { label: "Amber Orange", value: "bg-linear-to-br from-[#F59E0B] to-[#D97706]" },
  { label: "Rose Pink", value: "bg-linear-to-br from-[#F43F5E] to-[#BE123C]" }
];

const DEFAULT_FORM: CreateTestimonialInput = {
  authorName: "",
  authorRole: "",
  company: "",
  avatar:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  quote: "",
  rating: 5,
  tags: ["Techfirm Horizons", "Best Quality"],
  hasVideo: false,
  videoUrl: "",
  posterImage: "",
  iconBg: "bg-linear-to-br from-[#00C0FA] to-[#007BFE]",
  order: 0,
  isActive: true
};

export default function TestimonialsPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = React.useState("");
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = React.useState<ITestimonial | null>(null);
  const [formData, setFormData] = React.useState<CreateTestimonialInput>(DEFAULT_FORM);
  const [newTagInput, setNewTagInput] = React.useState("");

  // Fetch Testimonials
  const {
    data: testimonials = [],
    isLoading,
    isError
  } = useQuery<ITestimonial[]>({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const res = await get<ApiResponse<ITestimonial[]>>("/testimonials");
      return res.data || [];
    }
  });

  // Create Mutation
  const createMutation = useMutation({
    mutationFn: async (payload: CreateTestimonialInput) => {
      const res = await post<ApiResponse<ITestimonial>>("/testimonials", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      toast.success("Testimonial added successfully!");
      setSheetOpen(false);
      setFormData(DEFAULT_FORM);
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "Failed to create testimonial";
      toast.error(msg);
    }
  });

  // Update Mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<CreateTestimonialInput> }) => {
      const res = await patch<ApiResponse<ITestimonial>>(`/testimonials/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      toast.success("Testimonial updated successfully!");
      setSheetOpen(false);
      setEditingId(null);
      setFormData(DEFAULT_FORM);
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "Failed to update testimonial";
      toast.error(msg);
    }
  });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await del(`/testimonials/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      toast.success("Testimonial removed permanently.");
      setDeleteTarget(null);
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "Failed to delete testimonial";
      toast.error(msg);
    }
  });

  // Toggle Active Status
  const handleToggleActive = (t: ITestimonial) => {
    const id = t.id || t._id;
    if (!id) return;
    updateMutation.mutate({
      id,
      data: { isActive: !t.isActive }
    });
  };

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({
      ...DEFAULT_FORM,
      order: testimonials.length + 1
    });
    setSheetOpen(true);
  };

  const handleOpenEdit = (t: ITestimonial) => {
    const id = t.id || t._id;
    if (!id) return;
    setEditingId(id);
    setFormData({
      authorName: t.authorName,
      authorRole: t.authorRole,
      company: t.company || "",
      avatar: t.avatar,
      quote: t.quote,
      rating: t.rating ?? 5,
      tags: t.tags || [],
      hasVideo: t.hasVideo ?? false,
      videoUrl: t.videoUrl || "",
      posterImage: t.posterImage || "",
      iconBg: t.iconBg || "bg-linear-to-br from-[#00C0FA] to-[#007BFE]",
      order: t.order ?? 0,
      isActive: t.isActive ?? true
    });
    setSheetOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.authorName.trim() || !formData.quote.trim()) {
      toast.error("Author name and quote are required.");
      return;
    }

    if (editingId) {
      updateMutation.mutate({ id: editingId, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleAddTag = () => {
    if (!newTagInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      tags: [...prev.tags, newTagInput.trim()]
    }));
    setNewTagInput("");
  };

  const handleRemoveTag = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  const filteredTestimonials = testimonials.filter((t) => {
    const matchSearch =
      t.authorName.toLowerCase().includes(search.toLowerCase()) ||
      (t.company && t.company.toLowerCase().includes(search.toLowerCase())) ||
      t.quote.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

  const totalReviews = testimonials.length;
  const activeReviews = testimonials.filter((t) => t.isActive).length;
  const videoReviews = testimonials.filter((t) => t.hasVideo).length;

  return (
    <div className="space-y-8 pb-12">
      {/* Top Header Bar */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-foreground flex items-center gap-2.5 text-2xl font-black tracking-tight">
            <MessageSquareQuote className="text-primary h-6 w-6" />
            <span>Client Testimonials</span>
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Manage customer feedback, star ratings, video reviews, and home page review carousels.
          </p>
        </div>

        <Button onClick={handleOpenCreate} className="flex items-center gap-2 font-bold shadow-md">
          <Plus className="h-4 w-4" />
          <span>Add Testimonial</span>
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
              Total Reviews
            </p>
            <p className="text-foreground text-xl font-black">{totalReviews}</p>
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
            <p className="text-foreground text-xl font-black">{activeReviews}</p>
          </div>
        </div>

        <div className="bg-card border-border flex items-center gap-4 rounded-2xl border p-5 shadow-xs">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 font-bold text-purple-500">
            <Video className="h-5 w-5" />
          </div>
          <div>
            <p className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
              Video Testimonials
            </p>
            <p className="text-foreground text-xl font-black">{videoReviews}</p>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="relative w-full sm:w-80">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by author, company or text..."
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
            <p className="font-bold">Failed to load testimonials.</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => queryClient.invalidateQueries({ queryKey: ["testimonials"] })}
              className="mt-3"
            >
              Retry
            </Button>
          </div>
        ) : filteredTestimonials.length === 0 ? (
          <div className="text-muted-foreground p-12 text-center">
            <MessageSquareQuote className="text-muted-foreground/40 mx-auto mb-3 h-10 w-10" />
            <p className="text-foreground font-bold">No testimonials found.</p>
            <p className="mt-1 text-xs">Get started by creating your first client review.</p>
            <Button onClick={handleOpenCreate} size="sm" className="mt-4 font-bold">
              <Plus className="mr-1.5 h-3.5 w-3.5" /> Add Review
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead className="w-16">Order</TableHead>
                <TableHead>Reviewer</TableHead>
                <TableHead className="max-w-md">Quote</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Features</TableHead>
                <TableHead>Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTestimonials.map((t) => (
                <TableRow key={t.id || t._id}>
                  <TableCell className="text-muted-foreground text-xs font-bold">
                    #{t.order}
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="border-border h-9 w-9 rounded-full border">
                        <AvatarImage src={t.avatar} alt={t.authorName} />
                        <AvatarFallback className="text-xs font-bold">
                          {t.authorName.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-foreground text-xs font-bold">{t.authorName}</p>
                        <p className="text-muted-foreground text-[11px]">
                          {t.authorRole} {t.company ? `• ${t.company}` : ""}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="max-w-md">
                    <p className="text-foreground/80 line-clamp-2 text-xs italic">
                      &quot;{t.quote}&quot;
                    </p>
                    {t.tags && t.tags.length > 0 && (
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        {t.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="bg-muted text-muted-foreground rounded-sm px-1.5 py-0.5 text-[10px] font-semibold"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-1 text-amber-500">
                      {Array.from({ length: t.rating ?? 5 }).map((_, idx) => (
                        <Star key={idx} className="h-3 w-3 fill-current" />
                      ))}
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      {t.hasVideo ? (
                        <Badge
                          variant="secondary"
                          className="gap-1 border-purple-500/20 bg-purple-500/10 text-[10px] font-bold text-purple-600"
                        >
                          <Video className="h-3 w-3" /> Video Review
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground text-[11px] font-medium">
                          Standard
                        </span>
                      )}
                    </div>
                  </TableCell>

                  <TableCell>
                    <Switch checked={t.isActive} onCheckedChange={() => handleToggleActive(t)} />
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleOpenEdit(t)}
                        className="text-foreground hover:text-primary h-8 w-8"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setDeleteTarget(t)}
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
              <MessageSquareQuote className="text-primary h-5 w-5" />
              <span>{editingId ? "Edit Testimonial" : "Create Testimonial"}</span>
            </SheetTitle>
            <SheetDescription className="text-muted-foreground text-xs">
              Configure author metadata, review quote, star rating, and optional video testimonial
              embeds.
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Reviewer Details */}
            <div className="bg-muted/30 border-border/50 space-y-4 rounded-xl border p-4">
              <h4 className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
                Author & Company
              </h4>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-foreground text-xs font-semibold">Author Name *</label>
                  <Input
                    value={formData.authorName}
                    onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                    placeholder="e.g. John Samuel"
                    className="text-xs"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-foreground text-xs font-semibold">
                    Job Title / Role *
                  </label>
                  <Input
                    value={formData.authorRole}
                    onChange={(e) => setFormData({ ...formData, authorRole: e.target.value })}
                    placeholder="e.g. Assistant Manager"
                    className="text-xs"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-foreground text-xs font-semibold">Company Name</label>
                <Input
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g. Acme Horizons Ltd"
                  className="text-xs"
                />
              </div>

              {/* Avatar URL + Live Preview */}
              <div className="space-y-1.5">
                <label className="text-foreground text-xs font-semibold">Avatar Image URL *</label>
                <div className="flex items-center gap-3">
                  <Avatar className="border-border h-10 w-10 shrink-0 border">
                    <AvatarImage src={formData.avatar} alt={formData.authorName} />
                    <AvatarFallback className="text-xs font-bold">PRE</AvatarFallback>
                  </Avatar>
                  <Input
                    value={formData.avatar}
                    onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 text-xs"
                    required
                  />
                </div>
                <p className="text-muted-foreground text-[11px]">
                  Plain image URL (Unsplash or CDN link).
                </p>
              </div>
            </div>

            {/* Testimonial Quote & Rating */}
            <div className="bg-muted/30 border-border/50 space-y-4 rounded-xl border p-4">
              <h4 className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
                Review Content
              </h4>

              <div className="space-y-1.5">
                <label className="text-foreground text-xs font-semibold">Quote *</label>
                <textarea
                  value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  placeholder="Write the customer's quote here..."
                  rows={4}
                  className="border-input text-foreground placeholder:text-muted-foreground focus:ring-ring w-full rounded-lg border bg-transparent px-3 py-2 text-xs focus:ring-2 focus:outline-hidden"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-foreground text-xs font-semibold">Star Rating (1-5)</label>
                  <Input
                    type="number"
                    min={1}
                    max={5}
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
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
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <label className="text-foreground text-xs font-semibold">Badges / Tags</label>
                <div className="mb-2 flex flex-wrap gap-1.5">
                  {formData.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-primary/10 text-primary inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-bold"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(idx)}
                        className="hover:text-destructive ml-1"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <Input
                    value={newTagInput}
                    onChange={(e) => setNewTagInput(e.target.value)}
                    placeholder="e.g. Best Quality"
                    className="text-xs"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                  />
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={handleAddTag}
                    className="shrink-0 text-xs font-bold"
                  >
                    Add Tag
                  </Button>
                </div>
              </div>
            </div>

            {/* Video Testimonial Embed Options */}
            <div className="bg-muted/30 border-border/50 space-y-4 rounded-xl border p-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase">
                  <Video className="text-primary h-3.5 w-3.5" />
                  Video Review
                </span>
                <Switch
                  checked={formData.hasVideo}
                  onCheckedChange={(checked) => setFormData({ ...formData, hasVideo: checked })}
                />
              </div>

              {formData.hasVideo && (
                <div className="space-y-3 pt-2">
                  <div className="space-y-1.5">
                    <label className="text-foreground text-xs font-semibold">
                      Video URL (YouTube/MP4)
                    </label>
                    <Input
                      value={formData.videoUrl || ""}
                      onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                      placeholder="https://youtube.com/watch?v=..."
                      className="text-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-foreground text-xs font-semibold">
                      Poster Thumbnail Image URL
                    </label>
                    <Input
                      value={formData.posterImage || ""}
                      onChange={(e) => setFormData({ ...formData, posterImage: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                      className="text-xs"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Style Preset & Active Toggle */}
            <div className="bg-muted/30 border-border/50 space-y-4 rounded-xl border p-4">
              <div className="space-y-2">
                <label className="text-foreground flex items-center gap-1.5 text-xs font-semibold">
                  <Sparkles className="text-primary h-3.5 w-3.5" />
                  Card Gradient Accent
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {GRADIENT_PRESETS.map((g) => (
                    <button
                      key={g.label}
                      type="button"
                      onClick={() => setFormData({ ...formData, iconBg: g.value })}
                      className={`flex items-center gap-2 rounded-lg border p-2 text-left text-xs font-medium transition-all ${
                        formData.iconBg === g.value
                          ? "border-primary bg-primary/10 text-primary font-bold shadow-xs"
                          : "border-border hover:bg-muted"
                      }`}
                    >
                      <div className={`h-4 w-4 shrink-0 rounded-full ${g.value}`} />
                      <span className="truncate text-[11px]">{g.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-border/40 flex items-center justify-between border-t pt-2">
                <div>
                  <p className="text-foreground text-xs font-bold">Published & Active</p>
                  <p className="text-muted-foreground text-[11px]">Visible to website visitors</p>
                </div>
                <Switch
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                />
              </div>
            </div>

            {/* Form Actions */}
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
                    ? "Update Testimonial"
                    : "Create Testimonial"}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation Alert Dialog */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-bold">Delete Testimonial?</AlertDialogTitle>
            <AlertDialogDescription className="text-xs">
              Are you sure you want to delete the review from{" "}
              <strong>{deleteTarget?.authorName}</strong>? This action cannot be undone.
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
