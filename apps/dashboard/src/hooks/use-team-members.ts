"use client";

import { useQuery } from "@tanstack/react-query";

import { ApiResponse, ITeamMember, PaginationMeta } from "@repo/types";

import { get } from "@/lib/api";

export interface UseTeamMembersParams {
  page?: number;
  limit?: number;
  search?: string;
  isActive?: boolean;
}

export function useTeamMembers(params?: UseTeamMembersParams) {
  const page = params?.page ?? 1;
  const limit = params?.limit ?? 10;
  const search = params?.search;
  const isActive = params?.isActive;

  return useQuery<{ items: ITeamMember[]; meta: PaginationMeta }>({
    queryKey: ["team-members", { page, limit, search, isActive }],
    queryFn: async () => {
      const qp = new URLSearchParams();
      if (page) qp.set("page", String(page));
      if (limit) qp.set("limit", String(limit));
      if (search) qp.set("search", search);
      if (isActive !== undefined) qp.set("isActive", String(isActive));

      const res = await get<ApiResponse<ITeamMember[]> & { items?: ITeamMember[] }>(
        `/team?${qp.toString()}`
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

export function useTeamMember(id?: string) {
  return useQuery<ITeamMember | null>({
    queryKey: ["team-member", id],
    queryFn: async () => {
      if (!id) return null;
      const res = await get<ApiResponse<ITeamMember>>(`/team/${id}`);
      return res.data || null;
    },
    enabled: !!id
  });
}
