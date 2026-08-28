"use client";

import type { ReactNode } from "react";

import { CartProvider, CartSheet } from "@/components/cart";

import { AuthProvider } from "./AuthProvider";
import { QueryProvider } from "./QueryProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <AuthProvider>
        <CartProvider>
          {children}
          <CartSheet />
        </CartProvider>
      </AuthProvider>
    </QueryProvider>
  );
}
