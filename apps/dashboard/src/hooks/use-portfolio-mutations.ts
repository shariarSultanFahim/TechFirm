"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { ApiResponse, IPortfolioItem } from "@repo/types";
import { CreatePortfolioItemInput, UpdatePortfolioItemInput } from "@repo/validators";

import { del, patch, post } from "@/lib/api";

export function useCreatePortfolioItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreatePortfolioItemInput) => {
      const res = await post<ApiResponse<IPortfolioItem>>("/portfolio", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
      queryClient.invalidateQueries({ queryKey: ["portfolio-categories"] });
      toast.success("Portfolio case study created successfully");
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "Failed to create portfolio item";
      toast.error(msg);
    }
  });
}

export function useUpdatePortfolioItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdatePortfolioItemInput }) => {
      const res = await patch<ApiResponse<IPortfolioItem>>(`/portfolio/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
      queryClient.invalidateQueries({ queryKey: ["portfolio-categories"] });
      toast.success("Portfolio case study updated successfully");
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "Failed to update portfolio item";
      toast.error(msg);
    }
  });
}

export function useDeletePortfolioItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await del(`/portfolio/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
      queryClient.invalidateQueries({ queryKey: ["portfolio-categories"] });
      toast.success("Portfolio case study deleted permanently");
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "Failed to delete portfolio item";
      toast.error(msg);
    }
  });
}
