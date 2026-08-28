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
      try {
        await post("/auth/logout");
      } catch {
        // Continue logout cleanup even if network or server errors occur
      }
    },
    onSettled: () => {
      if (typeof document !== "undefined") {
        document.cookie =
          "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
        document.cookie =
          "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
      }
      toast.success("Signed out successfully");
      window.location.href = "/login";
    }
  });
}
