"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { ApiResponse, IUser } from "@repo/types";

import { get, post } from "@/lib/api";

export function useCurrentUser() {
  return useQuery<IUser | null>({
    queryKey: ["current-user"],
    queryFn: async () => {
      try {
        const res = await get<ApiResponse<{ user: IUser }>>("/auth/me");
        return res.data?.user || null;
      } catch {
        return null;
      }
    },
    staleTime: 5 * 60 * 1000,
    retry: false
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: async () => {
      return await post("/auth/logout");
    },
    onSuccess: () => {
      toast.success("Signed out successfully");
      window.location.href = "/login";
    },
    onError: () => {
      window.location.href = "/login";
    }
  });
}
