"use client";

import { useQuery } from "@tanstack/react-query";

import { ApiResponse, BillingPeriod, IPlan, PaginationMeta } from "@repo/types";

import { get } from "@/lib/api";

export interface UsePlansParams {
  page?: number;
  limit?: number;
  billingPeriod?: "all" | BillingPeriod;
  isActive?: boolean;
  search?: string;
}

export function usePlans(params?: UsePlansParams) {
  const page = params?.page ?? 1;
  const limit = params?.limit ?? 10;
  const billingPeriod = params?.billingPeriod === "all" ? undefined : params?.billingPeriod;
  const isActive = params?.isActive;
  const search = params?.search;

  return useQuery<{ items: IPlan[]; meta: PaginationMeta }>({
    queryKey: ["plans", { page, limit, billingPeriod, isActive, search }],
    queryFn: async () => {
      const qp = new URLSearchParams();
      if (page) qp.set("page", String(page));
      if (limit) qp.set("limit", String(limit));
      if (billingPeriod) qp.set("billingPeriod", billingPeriod);
      if (isActive !== undefined) qp.set("isActive", String(isActive));
      if (search) qp.set("search", search);

      const res = await get<ApiResponse<IPlan[]> & { items?: IPlan[] }>(`/plans?${qp.toString()}`);

      const items = Array.isArray(res.data) ? res.data : res.items || [];

      const meta: PaginationMeta = res.meta || {
        page,
        limit,
        total: items.length,
        totalPage: Math.ceil(items.length / limit) || 1
      };

      return { items, meta };
    }
  });
}

export function usePlan(id?: string) {
  return useQuery<IPlan | null>({
    queryKey: ["plan", id],
    queryFn: async () => {
      if (!id) return null;
      const res = await get<ApiResponse<IPlan>>(`/plans/${id}`);
      return res.data || null;
    },
    enabled: !!id
  });
}
