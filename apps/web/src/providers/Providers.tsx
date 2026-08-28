"use client";

import type { ReactNode } from "react";
import { QueryProvider } from "./QueryProvider";
import { AuthProvider } from "./AuthProvider";
import { CartProvider, CartSheet } from "@/components/cart";

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
