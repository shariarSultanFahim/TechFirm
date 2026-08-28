"use client";

import * as React from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CheckCircle2,
  CreditCard,
  DollarSign,
  Pencil,
  Plus,
  Search,
  Sparkles,
  Trash2,
  Zap
} from "lucide-react";
import { toast } from "sonner";

import { ApiResponse, BillingPeriod, IPlan } from "@repo/types";
import { CreatePlanInput } from "@repo/validators";

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

const DEFAULT_FORM: CreatePlanInput = {
  name: "",
  price: 29,
  billingPeriod: "monthly",
  features: ["24/7 Dedicated Support", "High Availability Cloud"],
  isPopular: false,
  isActive: true,
  order: 0,
  description: "",
  buttonText: "Get Started"
};

export default function PlansPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = React.useState("");
  const [selectedPeriod, setSelectedPeriod] = React.useState<"all" | BillingPeriod>("all");
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = React.useState<IPlan | null>(null);
  const [formData, setFormData] = React.useState<CreatePlanInput>(DEFAULT_FORM);
  const [featuresRaw, setFeaturesRaw] = React.useState("");

  // Fetch Plans
  const {
    data: plans = [],
    isLoading,
    isError
  } = useQuery<IPlan[]>({
    queryKey: ["pricing-plans"],
    queryFn: async () => {
      const res = await get<ApiResponse<IPlan[]>>("/plans");
      return res.data || [];
    }
  });

  // Create Mutation
  const createMutation = useMutation({
    mutationFn: async (payload: CreatePlanInput) => {
      const res = await post<ApiResponse<IPlan>>("/plans", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pricing-plans"] });
      toast.success("Pricing plan created successfully!");
      setSheetOpen(false);
      setFormData(DEFAULT_FORM);
      setFeaturesRaw("");
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "Failed to create plan";
      toast.error(msg);
    }
  });

  // Update Mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<CreatePlanInput> }) => {
      const res = await patch<ApiResponse<IPlan>>(`/plans/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pricing-plans"] });
      toast.success("Pricing plan updated successfully!");
      setSheetOpen(false);
      setEditingId(null);
      setFormData(DEFAULT_FORM);
      setFeaturesRaw("");
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "Failed to update plan";
      toast.error(msg);
    }
  });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await del(`/plans/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pricing-plans"] });
      toast.success("Plan deleted permanently.");
      setDeleteTarget(null);
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "Failed to delete plan";
      toast.error(msg);
    }
  });

  const handleToggleActive = (p: IPlan) => {
    const id = p.id || p._id;
    if (!id) return;
    updateMutation.mutate({
      id,
      data: { isActive: !p.isActive }
    });
  };

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({
      ...DEFAULT_FORM,
      order: plans.length + 1
    });
    setFeaturesRaw(DEFAULT_FORM.features.join("\n"));
    setSheetOpen(true);
  };

  const handleOpenEdit = (p: IPlan) => {
    const id = p.id || p._id;
    if (!id) return;
    setEditingId(id);
    setFormData({
      name: p.name,
      price: p.price,
      billingPeriod: p.billingPeriod,
      features: p.features || [],
      isPopular: p.isPopular ?? false,
      isActive: p.isActive ?? true,
      order: p.order ?? 0,
      description: p.description || "",
      buttonText: p.buttonText || "Get Started"
    });
    setFeaturesRaw((p.features || []).join("\n"));
    setSheetOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Plan name is required.");
      return;
    }

    const parsedFeatures = featuresRaw
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean);

    if (parsedFeatures.length === 0) {
      toast.error("At least one feature is required.");
      return;
    }

    const payload: CreatePlanInput = {
      ...formData,
      features: parsedFeatures
    };

    if (editingId) {
      updateMutation.mutate({ id: editingId, data: payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const filteredPlans = plans.filter((p) => {
    const matchPeriod = selectedPeriod === "all" || p.billingPeriod === selectedPeriod;
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(search.toLowerCase())) ||
      (p.features && p.features.some((f) => f.toLowerCase().includes(search.toLowerCase())));
    return matchPeriod && matchSearch;
  });

  const totalPlans = plans.length;
  const activePlans = plans.filter((p) => p.isActive).length;
  const monthlyPlansCount = plans.filter((p) => p.billingPeriod === "monthly").length;
  const annualPlansCount = plans.filter((p) => p.billingPeriod === "annual").length;

  return (
    <div className="space-y-8 pb-12">
      {/* Top Header Bar */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-foreground flex items-center gap-2.5 text-2xl font-black tracking-tight">
            <CreditCard className="text-primary h-6 w-6" />
            <span>Pricing &amp; Hosting Plans</span>
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Manage public pricing tiers, billing cycles, highlighted perks, and CTA buttons.
          </p>
        </div>

        <Button onClick={handleOpenCreate} className="flex items-center gap-2 font-bold shadow-md">
          <Plus className="h-4 w-4" />
          <span>Add Plan</span>
        </Button>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="bg-card border-border flex items-center gap-4 rounded-2xl border p-5 shadow-xs">
          <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-xl font-bold">
            <DollarSign className="h-5 w-5" />
          </div>
          <div>
            <p className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
              Total Plans
            </p>
            <p className="text-foreground text-xl font-black">{totalPlans}</p>
          </div>
        </div>

        <div className="bg-card border-border flex items-center gap-4 rounded-2xl border p-5 shadow-xs">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 font-bold text-emerald-500">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <p className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
              Active &amp; Live
            </p>
            <p className="text-foreground text-xl font-black">{activePlans}</p>
          </div>
        </div>

        <div className="bg-card border-border flex items-center gap-4 rounded-2xl border p-5 shadow-xs">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 font-bold text-blue-500">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <p className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
              Monthly Tiers
            </p>
            <p className="text-foreground text-xl font-black">{monthlyPlansCount}</p>
          </div>
        </div>

        <div className="bg-card border-border flex items-center gap-4 rounded-2xl border p-5 shadow-xs">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 font-bold text-amber-500">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <p className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
              Annual Tiers
            </p>
            <p className="text-foreground text-xl font-black">{annualPlansCount}</p>
          </div>
        </div>
      </div>

      {/* Period Filter & Search Bar */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        {/* Billing Period Tabs */}
        <div className="bg-muted/40 border-border/50 flex items-center gap-1.5 rounded-xl border p-1">
          {(["all", "monthly", "annual"] as const).map((period) => (
            <button
              key={period}
              type="button"
              onClick={() => setSelectedPeriod(period)}
              className={`rounded-lg px-4 py-1.5 text-xs font-bold capitalize transition-colors ${
                selectedPeriod === period
                  ? "bg-background text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {period}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search plans or features..."
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
            <p className="font-bold">Failed to load pricing plans.</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => queryClient.invalidateQueries({ queryKey: ["pricing-plans"] })}
              className="mt-3"
            >
              Retry
            </Button>
          </div>
        ) : filteredPlans.length === 0 ? (
          <div className="text-muted-foreground p-12 text-center">
            <CreditCard className="text-muted-foreground/40 mx-auto mb-3 h-10 w-10" />
            <p className="text-foreground font-bold">No plans found.</p>
            <p className="mt-1 text-xs">Create subscription and hosting tiers for your clients.</p>
            <Button onClick={handleOpenCreate} size="sm" className="mt-4 font-bold">
              <Plus className="mr-1.5 h-3.5 w-3.5" /> Add Pricing Plan
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead className="w-16">Order</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Pricing</TableHead>
                <TableHead>Features</TableHead>
                <TableHead>Popular</TableHead>
                <TableHead>Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPlans.map((p) => (
                <TableRow key={p.id || p._id}>
                  <TableCell className="text-muted-foreground text-xs font-bold">
                    #{p.order}
                  </TableCell>

                  <TableCell>
                    <div>
                      <p className="text-foreground flex items-center gap-1.5 text-xs font-bold">
                        {p.name}
                        {p.isPopular && (
                          <Badge className="bg-amber-500 px-1.5 py-0 text-[10px] font-bold text-white">
                            POPULAR
                          </Badge>
                        )}
                      </p>
                      {p.description && (
                        <p className="text-muted-foreground mt-0.5 line-clamp-1 text-[11px]">
                          {p.description}
                        </p>
                      )}
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-baseline gap-1">
                      <span className="text-foreground text-sm font-black">${p.price}</span>
                      <span className="text-muted-foreground text-[11px] font-semibold">
                        /{p.billingPeriod === "annual" ? "yr" : "mo"}
                      </span>
                    </div>
                    <Badge variant="outline" className="mt-0.5 text-[10px] capitalize">
                      {p.billingPeriod}
                    </Badge>
                  </TableCell>

                  <TableCell className="max-w-xs">
                    <div className="flex flex-wrap gap-1">
                      {(p.features || []).slice(0, 2).map((f) => (
                        <Badge key={f} variant="secondary" className="py-0 text-[10px]">
                          {f}
                        </Badge>
                      ))}
                      {(p.features || []).length > 2 && (
                        <span className="text-muted-foreground text-[10px]">
                          +{(p.features || []).length - 2} more
                        </span>
                      )}
                    </div>
                  </TableCell>

                  <TableCell>
                    {p.isPopular ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-amber-500">
                        <Sparkles className="h-3.5 w-3.5" /> Yes
                      </span>
                    ) : (
                      <span className="text-muted-foreground text-xs">No</span>
                    )}
                  </TableCell>

                  <TableCell>
                    <Switch checked={p.isActive} onCheckedChange={() => handleToggleActive(p)} />
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleOpenEdit(p)}
                        className="text-foreground hover:text-primary h-8 w-8"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setDeleteTarget(p)}
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
              <CreditCard className="text-primary h-5 w-5" />
              <span>{editingId ? "Edit Pricing Plan" : "Create Pricing Plan"}</span>
            </SheetTitle>
            <SheetDescription className="text-muted-foreground text-xs">
              Configure tier name, pricing amount, billing frequency, and feature checklist.
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="bg-muted/30 border-border/50 space-y-4 rounded-xl border p-4">
              <div className="space-y-1.5">
                <label className="text-foreground text-xs font-semibold">Plan Name *</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Business Pro"
                  className="text-xs"
                  required
                />
              </div>

              {/* Price & Billing Cycle */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-foreground text-xs font-semibold">Price ($ USD) *</label>
                  <Input
                    type="number"
                    min={0}
                    step="any"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="text-xs"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-foreground text-xs font-semibold">Billing Period *</label>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, billingPeriod: "monthly" })}
                      className={`rounded-lg py-2 text-xs font-bold transition-all ${
                        formData.billingPeriod === "monthly"
                          ? "bg-primary text-primary-foreground shadow-xs"
                          : "bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Monthly
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, billingPeriod: "annual" })}
                      className={`rounded-lg py-2 text-xs font-bold transition-all ${
                        formData.billingPeriod === "annual"
                          ? "bg-primary text-primary-foreground shadow-xs"
                          : "bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Annual
                    </button>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-foreground text-xs font-semibold">Short Description</label>
                <Input
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="e.g. For growing startups and fast-moving teams"
                  className="text-xs"
                />
              </div>

              {/* Button Text */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-foreground text-xs font-semibold">Button CTA Text</label>
                  <Input
                    value={formData.buttonText}
                    onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
                    placeholder="Get Started"
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

              {/* Features List (1 per line) */}
              <div className="space-y-1.5">
                <label className="text-foreground text-xs font-semibold">
                  Features (1 per line) *
                </label>
                <textarea
                  value={featuresRaw}
                  onChange={(e) => setFeaturesRaw(e.target.value)}
                  placeholder={
                    "1 Cloud Instance & 50GB SSD\nWeekly Automated Backups\n24/7 Support"
                  }
                  rows={5}
                  className="border-input text-foreground placeholder:text-muted-foreground focus:ring-ring w-full rounded-lg border bg-transparent px-3 py-2 text-xs focus:ring-2 focus:outline-hidden"
                  required
                />
              </div>

              {/* Switches */}
              <div className="border-border/40 space-y-3 border-t pt-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-foreground text-xs font-bold">Featured / Popular Badge</p>
                    <p className="text-muted-foreground text-[11px]">
                      Highlight this tier with primary branding
                    </p>
                  </div>
                  <Switch
                    checked={formData.isPopular}
                    onCheckedChange={(checked) => setFormData({ ...formData, isPopular: checked })}
                  />
                </div>

                <div className="border-border/40 flex items-center justify-between border-t pt-2">
                  <div>
                    <p className="text-foreground text-xs font-bold">Published &amp; Active</p>
                    <p className="text-muted-foreground text-[11px]">
                      Visible on public pricing section and page
                    </p>
                  </div>
                  <Switch
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                  />
                </div>
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
                    ? "Update Plan"
                    : "Create Plan"}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation Alert Dialog */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-bold">Delete Pricing Plan?</AlertDialogTitle>
            <AlertDialogDescription className="text-xs">
              Are you sure you want to delete <strong>&quot;{deleteTarget?.name}&quot;</strong>?
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
