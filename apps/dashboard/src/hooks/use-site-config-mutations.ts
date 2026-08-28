"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { ApiResponse, ISiteConfig } from "@repo/types";

import { patch } from "@/lib/api";

export function useUpdateSiteConfig() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: Partial<ISiteConfig>) => {
      const res = await patch<ApiResponse<ISiteConfig>>("/site-config", payload);
      return res.data;
    },
    onSuccess: (updated) => {
      if (updated) {
        queryClient.setQueryData(["site-config"], updated);
      }
      queryClient.invalidateQueries({ queryKey: ["site-config"] });
      toast.success("Site configuration updated successfully");
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "Failed to update site configuration";
      toast.error(msg);
    }
  });
}
