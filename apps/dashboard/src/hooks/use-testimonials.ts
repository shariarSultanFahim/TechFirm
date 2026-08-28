"use client";

import { useQuery } from "@tanstack/react-query";

import { ApiResponse, ITestimonial, PaginationMeta } from "@repo/types";

import { get } from "@/lib/api";

export interface UseTestimonialsParams {
  page?: number;
  limit?: number;
  isActive?: boolean;
}

export function useTestimonials(params?: UseTestimonialsParams) {
  const page = params?.page ?? 1;
  const limit = params?.limit ?? 10;
  const isActive = params?.isActive;

  return useQuery<{ items: ITestimonial[]; meta: PaginationMeta }>({
    queryKey: ["testimonials", { page, limit, isActive }],
    queryFn: async () => {
      const qp = new URLSearchParams();
      if (page) qp.set("page", String(page));
      if (limit) qp.set("limit", String(limit));
      if (isActive !== undefined) qp.set("isActive", String(isActive));

      const res = await get<ApiResponse<ITestimonial[]> & { items?: ITestimonial[] }>(
        `/testimonials?${qp.toString()}`
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

export function useTestimonial(id?: string) {
  return useQuery<ITestimonial | null>({
    queryKey: ["testimonial", id],
    queryFn: async () => {
      if (!id) return null;
      const res = await get<ApiResponse<ITestimonial>>(`/testimonials/${id}`);
      return res.data || null;
    },
    enabled: !!id
  });
}
