"use client";

import { useQuery } from "@tanstack/react-query";

import { ApiResponse, IPortfolioItem } from "@repo/types";

import { defaultPortfolio } from "@/lib/portfolio-data";

export { defaultPortfolio };

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export function usePortfolio(params?: { category?: string; search?: string }) {
  const category = params?.category && params.category !== "All" ? params.category : undefined;
  const search = params?.search || undefined;

  return useQuery<IPortfolioItem[]>({
    queryKey: ["public-portfolio", { category, search }],
    queryFn: async () => {
      try {
        const queryParams = new URLSearchParams();
        queryParams.set("isActive", "true");
        if (category) queryParams.set("category", category);
        if (search) queryParams.set("search", search);

        const res = await fetch(`${API_BASE_URL}/portfolio?${queryParams.toString()}`);
        if (!res.ok) {
          return defaultPortfolio;
        }
        const json: ApiResponse<IPortfolioItem[]> = await res.json();
        return json.data && json.data.length > 0 ? json.data : defaultPortfolio;
      } catch {
        return defaultPortfolio;
      }
    },
    initialData: defaultPortfolio,
    staleTime: 60 * 1000
  });
}

export function usePortfolioItem(slug: string) {
  const defaultItem =
    defaultPortfolio.find((p) => p.slug === slug || p.id === slug) || defaultPortfolio[0]!;

  return useQuery<IPortfolioItem>({
    queryKey: ["public-portfolio-item", slug],
    queryFn: async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/portfolio/slug/${slug}`);
        if (!res.ok) {
          return defaultItem;
        }
        const json: ApiResponse<IPortfolioItem> = await res.json();
        return json.data || defaultItem;
      } catch {
        return defaultItem;
      }
    },
    initialData: defaultItem,
    staleTime: 60 * 1000
  });
}
