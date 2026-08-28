"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { ApiResponse, ContactMessageStatus, IContactMessage } from "@repo/types";

import { del, patch } from "@/lib/api";

export function useUpdateContactMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data
    }: {
      id: string;
      data: { isRead?: boolean; status?: ContactMessageStatus; replyNotes?: string };
    }) => {
      const res = await patch<ApiResponse<IContactMessage>>(`/contact-messages/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact-messages"] });
      queryClient.invalidateQueries({ queryKey: ["contact-messages-unread-count"] });
      toast.success("Message updated successfully");
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "Failed to update message";
      toast.error(msg);
    }
  });
}

export function useDeleteContactMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await del(`/contact-messages/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact-messages"] });
      queryClient.invalidateQueries({ queryKey: ["contact-messages-unread-count"] });
      toast.success("Message deleted permanently");
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "Failed to delete message";
      toast.error(msg);
    }
  });
}
