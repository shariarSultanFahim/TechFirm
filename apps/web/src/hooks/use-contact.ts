"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { ApiResponse, IContactMessage } from "@repo/types";

import { apiClient } from "@/lib/api-client";

export interface SubmitContactMessagePayload {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  service?: string;
  message: string;
}

export function useSubmitContactMessage() {
  return useMutation({
    mutationFn: async (payload: SubmitContactMessagePayload) => {
      const res = await apiClient<IContactMessage>("/contact-messages", {
        method: "POST",
        body: JSON.stringify(payload)
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Message sent successfully! Our team will get back to you shortly.");
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "Failed to send inquiry. Please try again.";
      toast.error(msg);
    }
  });
}
