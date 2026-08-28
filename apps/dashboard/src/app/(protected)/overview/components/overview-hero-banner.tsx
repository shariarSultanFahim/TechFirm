"use client";

import Link from "next/link";

import { Mail, Settings, Sparkles } from "lucide-react";

interface OverviewHeroBannerProps {
  unreadCount: number;
}

export function OverviewHeroBanner({ unreadCount }: OverviewHeroBannerProps) {
  return (
    <div className="border-primary/20 from-primary/10 via-card to-card relative overflow-hidden rounded-2xl border bg-linear-to-br p-6 shadow-xs sm:p-8">
      <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl space-y-2">
          <div className="bg-primary/10 text-primary inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium">
            <Sparkles className="h-3.5 w-3.5" />
            <span>TechFirm Enterprise Control Center</span>
          </div>
          <h1 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
            Welcome back to Admin Console
          </h1>
          <p className="text-muted-foreground text-xs leading-relaxed font-normal sm:text-sm">
            All 9 backend collection vertical slices are live, seeded, and actively serving
            real-time data across the public marketing web portal and admin dashboard.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <Link
            href="/messages"
            className="bg-primary hover:bg-primary/90 text-primary-foreground inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-medium shadow-xs transition-colors"
          >
            <Mail className="mr-1.5 h-4 w-4" />
            <span>View Inquiries ({unreadCount})</span>
          </Link>
          <Link
            href="/site-config"
            className="border-border bg-card hover:bg-muted text-foreground inline-flex items-center gap-1.5 rounded-lg border px-3.5 py-2 text-xs font-medium transition-colors"
          >
            <Settings className="mr-1.5 h-4 w-4" />
            <span>Site Config</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
