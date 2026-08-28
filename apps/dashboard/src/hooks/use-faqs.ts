"use client";

import { useQuery } from "@tanstack/react-query";

import { ApiResponse, IFaq, PaginationMeta } from "@repo/types";

import { get } from "@/lib/api";

export interface UseFaqsParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  isActive?: boolean;
}

export function useFaqs(params?: UseFaqsParams) {
  const page = params?.page ?? 1;
  const limit = params?.limit ?? 10;
  const category = params?.category === "All" ? undefined : params?.category;
  const search = params?.search;
  const isActive = params?.isActive;

  return useQuery<{ items: IFaq[]; meta: PaginationMeta }>({
    queryKey: ["faqs", { page, limit, category, search, isActive }],
    queryFn: async () => {
      const qp = new URLSearchParams();
      if (page) qp.set("page", String(page));
      if (limit) qp.set("limit", String(limit));
      if (category) qp.set("category", category);
      if (search) qp.set("search", search);
      if (isActive !== undefined) qp.set("isActive", String(isActive));

      const res = await get<ApiResponse<IFaq[]> & { items?: IFaq[] }>(`/faqs?${qp.toString()}`);

      const items = Array.isArray(res.data) ? res.data : res.items || [];

      const meta: PaginationMeta = res.meta || {
        page,
        limit,
        total: items.length,
        totalPages: Math.ceil(items.length / limit) || 1
      };

      return { items, meta };
    }
  });
}

export function useFaqCategories() {
  const defaultCategories = ["General", "Services", "Support", "Pricing", "Security"];

  return useQuery<string[]>({
    queryKey: ["faq-categories"],
    queryFn: async () => {
      try {
        const res = await get<ApiResponse<string[]>>("/faqs/categories");
        return res.data && res.data.length > 0 ? res.data : defaultCategories;
      } catch {
        return defaultCategories;
      }
    }
  });
}
