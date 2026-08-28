"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { ApiResponse, IPlan } from "@repo/types";
import { CreatePlanInput, UpdatePlanInput } from "@repo/validators";

import { del, patch, post } from "@/lib/api";

export function useCreatePlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreatePlanInput) => {
      const res = await post<ApiResponse<IPlan>>("/plans", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plans"] });
      toast.success("Plan created successfully");
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "Failed to create plan";
      toast.error(msg);
    }
  });
}

export function useUpdatePlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdatePlanInput }) => {
      const res = await patch<ApiResponse<IPlan>>(`/plans/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plans"] });
      toast.success("Plan updated successfully");
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "Failed to update plan";
      toast.error(msg);
    }
  });
}

export function useDeletePlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await del(`/plans/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plans"] });
      toast.success("Plan deleted permanently");
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "Failed to delete plan";
      toast.error(msg);
    }
  });
}
