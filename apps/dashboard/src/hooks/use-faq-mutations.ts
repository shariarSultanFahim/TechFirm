"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { ApiResponse, IFaq } from "@repo/types";
import { CreateFaqInput, UpdateFaqInput } from "@repo/validators";

import { del, patch, post } from "@/lib/api";

export function useCreateFaq() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateFaqInput) => {
      const res = await post<ApiResponse<IFaq>>("/faqs", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faqs"] });
      queryClient.invalidateQueries({ queryKey: ["faq-categories"] });
      toast.success("FAQ created successfully");
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "Failed to create FAQ";
      toast.error(msg);
    }
  });
}

export function useUpdateFaq() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateFaqInput }) => {
      const res = await patch<ApiResponse<IFaq>>(`/faqs/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faqs"] });
      queryClient.invalidateQueries({ queryKey: ["faq-categories"] });
      toast.success("FAQ updated successfully");
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "Failed to update FAQ";
      toast.error(msg);
    }
  });
}

export function useDeleteFaq() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await del(`/faqs/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faqs"] });
      queryClient.invalidateQueries({ queryKey: ["faq-categories"] });
      toast.success("FAQ deleted permanently");
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "Failed to delete FAQ";
      toast.error(msg);
    }
  });
}
