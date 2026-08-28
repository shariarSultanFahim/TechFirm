"use client";

import { useQuery } from "@tanstack/react-query";

import { ApiResponse, IContactMessage, PaginationMeta } from "@repo/types";

import { get } from "@/lib/api";

export interface UseContactMessagesParams {
  page?: number;
  limit?: number;
  status?: string;
  isRead?: string;
  search?: string;
}

export function useContactMessages(params?: UseContactMessagesParams) {
  const page = params?.page ?? 1;
  const limit = params?.limit ?? 10;
  const status = params?.status === "All" ? undefined : params?.status;
  const isRead = params?.isRead === "All" ? undefined : params?.isRead;
  const search = params?.search;

  return useQuery<{ items: IContactMessage[]; meta: PaginationMeta }>({
    queryKey: ["contact-messages", { page, limit, status, isRead, search }],
    queryFn: async () => {
      const qp = new URLSearchParams();
      if (page) qp.set("page", String(page));
      if (limit) qp.set("limit", String(limit));
      if (status) qp.set("status", status);
      if (isRead) qp.set("isRead", isRead);
      if (search) qp.set("search", search);

      const res = await get<ApiResponse<IContactMessage[]> & { items?: IContactMessage[] }>(
        `/contact-messages?${qp.toString()}`
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

export function useUnreadMessagesCount() {
  return useQuery<number>({
    queryKey: ["contact-messages-unread-count"],
    queryFn: async () => {
      try {
        const res = await get<ApiResponse<{ count: number }>>("/contact-messages/unread-count");
        return res.data?.count || 0;
      } catch {
        return 0;
      }
    },
    refetchInterval: 30000
  });
}
