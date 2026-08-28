"use client";

import { useQuery } from "@tanstack/react-query";

import { ApiResponse, IPortfolioItem, PaginationMeta } from "@repo/types";

import { get } from "@/lib/api";

export interface UsePortfolioParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  isActive?: boolean;
}

export function usePortfolio(params?: UsePortfolioParams) {
  const page = params?.page ?? 1;
  const limit = params?.limit ?? 10;
  const category = params?.category === "All" ? undefined : params?.category;
  const search = params?.search;
  const isActive = params?.isActive;

  return useQuery<{ items: IPortfolioItem[]; meta: PaginationMeta }>({
    queryKey: ["portfolio", { page, limit, category, search, isActive }],
    queryFn: async () => {
      const qp = new URLSearchParams();
      if (page) qp.set("page", String(page));
      if (limit) qp.set("limit", String(limit));
      if (category) qp.set("category", category);
      if (search) qp.set("search", search);
      if (isActive !== undefined) qp.set("isActive", String(isActive));

      const res = await get<ApiResponse<IPortfolioItem[]> & { items?: IPortfolioItem[] }>(
        `/portfolio?${qp.toString()}`
      );

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

export function usePortfolioCategories() {
  const defaultCategories = [
    "Technology",
    "Cloud Solutions",
    "Cyber Security",
    "DevOps & CI/CD",
    "AI & Machine Learning",
    "Enterprise Software"
  ];

  return useQuery<string[]>({
    queryKey: ["portfolio-categories"],
    queryFn: async () => {
      try {
        const res = await get<ApiResponse<string[]>>("/portfolio/categories");
        return res.data && res.data.length > 0 ? res.data : defaultCategories;
      } catch {
        return defaultCategories;
      }
    }
  });
}
