"use client";

import { useState } from "react";
import { Plus, Trash2, Edit2, Sparkles, RefreshCw, X } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { get, post, patch, del } from "@/lib/api";
import { IPlan, ApiResponse } from "@repo/types";

export default function PlansManagementPage() {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState<IPlan | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [price, setPrice] = useState(49);
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");
  const [featuresText, setFeaturesText] = useState("Feature 1\nFeature 2\nFeature 3");
  const [isPopular, setIsPopular] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [order, setOrder] = useState(1);
  const [description, setDescription] = useState("");
  const [buttonText, setButtonText] = useState("Get Started");

  const { data: plans = [], isLoading, refetch } = useQuery({
    queryKey: ["dashboard-plans"],
    queryFn: async () => {
      try {
        const res = await get<ApiResponse<IPlan[]>>("/plans");
        return res.data || [];
      } catch {
        return [];
      }
    }
  });

  const saveMutation = useMutation({
    mutationFn: async (payload: Partial<IPlan>) => {
      if (editingPlan) {
        return await patch(`/plans/${editingPlan.id}`, payload);
      } else {
        return await post("/plans", payload);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard-plans"] });
      queryClient.invalidateQueries({ queryKey: ["admin-plans"] });
      setShowModal(false);
    },
    onError: () => {
      alert("Error saving plan.");
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await del(`/plans/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard-plans"] });
      queryClient.invalidateQueries({ queryKey: ["admin-plans"] });
    },
    onError: () => {
      alert("Failed to delete plan.");
    }
  });

  const openCreateModal = () => {
    setEditingPlan(null);
    setName("");
    setPrice(49);
    setBillingPeriod("monthly");
    setFeaturesText("4 High-Performance vCPUs\n24/7 Dedicated Support\nAutomated Backups");
    setIsPopular(false);
    setIsActive(true);
    setOrder(1);
    setDescription("");
    setButtonText("Get Started");
    setShowModal(true);
  };

  const openEditModal = (plan: IPlan) => {
    setEditingPlan(plan);
    setName(plan.name);
    setPrice(plan.price);
    setBillingPeriod(plan.billingPeriod || "monthly");
    setFeaturesText((plan.features || []).join("\n"));
    setIsPopular(plan.isPopular || false);
    setIsActive(plan.isActive !== false);
    setOrder(plan.order || 1);
    setDescription(plan.description || "");
    setButtonText(plan.buttonText || "Get Started");
    setShowModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const features = featuresText
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean);

    const payload = {
      name,
      price: Number(price),
      billingPeriod,
      features,
      isPopular,
      isActive,
      order: Number(order),
      description,
      buttonText
    };

    saveMutation.mutate(payload);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this plan?")) return;
    deleteMutation.mutate(id);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground">
            Plans Management
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Configure pricing tiers and features displayed on the public website.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => refetch()}
            className="p-2.5 rounded-xl border border-border bg-card hover:bg-muted text-foreground transition-colors shadow-2xs cursor-pointer"
            title="Refresh Plans"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          </button>

          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-dark-bg text-white font-bold text-sm hover:bg-primary hover:text-primary-foreground transition-colors shadow-md cursor-pointer"
          >
            <Plus className="w-4 h-4 text-primary" />
            <span>Create New Plan</span>
          </button>
        </div>
      </div>

      {/* Plans Table */}
      <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-foreground">
            <thead className="bg-muted/60 border-b border-border text-xs font-extrabold uppercase text-muted-foreground">
              <tr>
                <th className="px-6 py-4">Order</th>
                <th className="px-6 py-4">Plan Name</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Billing</th>
                <th className="px-6 py-4">Popular</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {plans.map((plan) => (
                <tr key={plan.id} className="hover:bg-muted/40 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-muted-foreground">
                    #{plan.order || 0}
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-extrabold text-foreground">{plan.name}</p>
                    {plan.description && (
                      <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{plan.description}</p>
                    )}
                  </td>
                  <td className="px-6 py-4 font-bold text-base text-foreground font-mono">
                    ${plan.price}
                  </td>
                  <td className="px-6 py-4 capitalize text-xs font-bold text-foreground">
                    <span className="px-2.5 py-1 rounded-md bg-muted border border-border">
                      {plan.billingPeriod || "monthly"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {plan.isPopular ? (
                      <span className="inline-flex items-center gap-1 text-xs font-black text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                        <Sparkles className="w-3 h-3 fill-current" />
                        Popular
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground font-semibold">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                        plan.isActive !== false
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-muted text-muted-foreground border border-border"
                      }`}
                    >
                      {plan.isActive !== false ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(plan)}
                      className="p-2 rounded-lg text-muted-foreground hover:text-primary-deep hover:bg-accent transition-colors cursor-pointer"
                      title="Edit Plan"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(plan.id)}
                      className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
                      title="Delete Plan"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}

              {plans.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-muted-foreground">
                    No pricing plans found. Click &ldquo;Create New Plan&rdquo; to add one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-card rounded-3xl p-8 max-w-lg w-full shadow-2xl border border-border animate-in fade-in-50 zoom-in-95">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-border">
              <h3 className="text-xl font-bold text-foreground">
                {editingPlan ? "Edit Pricing Plan" : "Create New Pricing Plan"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-foreground uppercase mb-1">
                  Plan Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="e.g. Business Pro"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-hidden focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-foreground uppercase mb-1">
                    Price ($) *
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    required
                    min={0}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-hidden focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-foreground uppercase mb-1">
                    Billing Period
                  </label>
                  <select
                    value={billingPeriod}
                    onChange={(e) => setBillingPeriod(e.target.value as "monthly" | "annual")}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-hidden focus:border-primary"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="annual">Annual</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground uppercase mb-1">
                  Features (One per line)
                </label>
                <textarea
                  rows={4}
                  value={featuresText}
                  onChange={(e) => setFeaturesText(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm font-mono text-xs focus:outline-hidden focus:border-primary resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-foreground uppercase mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={order}
                    onChange={(e) => setOrder(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-hidden focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-foreground uppercase mb-1">
                    Button Label
                  </label>
                  <input
                    type="text"
                    value={buttonText}
                    onChange={(e) => setButtonText(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-hidden focus:border-primary"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-bold text-foreground cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPopular}
                    onChange={(e) => setIsPopular(e.target.checked)}
                    className="rounded text-primary focus:ring-primary"
                  />
                  <span>Mark As Most Popular</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-bold text-foreground cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="rounded text-primary focus:ring-primary"
                  />
                  <span>Active (Live on Website)</span>
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-border text-sm font-semibold text-foreground hover:bg-muted cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saveMutation.isPending}
                  className="px-6 py-2.5 rounded-xl bg-dark-bg text-white text-sm font-bold hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                >
                  {saveMutation.isPending ? "Saving..." : "Save Plan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
