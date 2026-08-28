"use client";

import type { ReactNode } from "react";

import { TooltipProvider } from "@/components/ui/tooltip";

import { QueryProvider } from "./QueryProvider";
import { ThemeProvider } from "./ThemeProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <TooltipProvider>
      <ThemeProvider>
        <QueryProvider>{children}</QueryProvider>
      </ThemeProvider>
    </TooltipProvider>
  );
}
