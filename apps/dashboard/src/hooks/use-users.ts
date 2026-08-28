"use client";

import { useQuery } from "@tanstack/react-query";

import { ApiResponse, IUser, PaginationMeta } from "@repo/types";

import { get } from "@/lib/api";

export interface UseUsersParams {
  page?: number;
  limit?: number;
  role?: string;
  search?: string;
  isActive?: boolean;
}

export function useUsers(params?: UseUsersParams) {
  const page = params?.page ?? 1;
  const limit = params?.limit ?? 10;
  const role = params?.role === "All" ? undefined : params?.role;
  const search = params?.search;
  const isActive = params?.isActive;

  return useQuery<{ items: IUser[]; meta: PaginationMeta }>({
    queryKey: ["users", { page, limit, role, search, isActive }],
    queryFn: async () => {
      const qp = new URLSearchParams();
      if (page) qp.set("page", String(page));
      if (limit) qp.set("limit", String(limit));
      if (role) qp.set("role", role);
      if (search) qp.set("search", search);
      if (isActive !== undefined) qp.set("isActive", String(isActive));

      const res = await get<ApiResponse<IUser[]> & { items?: IUser[] }>(`/users?${qp.toString()}`);

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

export function useUser(id?: string) {
  return useQuery<IUser | null>({
    queryKey: ["user", id],
    queryFn: async () => {
      if (!id) return null;
      const res = await get<ApiResponse<IUser>>(`/users/${id}`);
      return res.data || null;
    },
    enabled: !!id
  });
}
