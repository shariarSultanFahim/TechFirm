"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { ApiResponse, IUser } from "@repo/types";
import { CreateUserInput, UpdateUserInput } from "@repo/validators";

import { del, patch, post } from "@/lib/api";

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateUserInput) => {
      const res = await post<ApiResponse<IUser>>("/users", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User account created successfully");
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "Failed to create user account";
      toast.error(msg);
    }
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateUserInput }) => {
      const res = await patch<ApiResponse<IUser>>(`/users/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User account updated successfully");
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "Failed to update user account";
      toast.error(msg);
    }
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await del(`/users/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User account deleted permanently");
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "Failed to delete user account";
      toast.error(msg);
    }
  });
}
