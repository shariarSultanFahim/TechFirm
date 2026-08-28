"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useQuery } from "@tanstack/react-query";
import {
  ArrowUpRight,
  Briefcase,
  CreditCard,
  FileText,
  HelpCircle,
  LayoutDashboard,
  Mail,
  MessageSquareQuote,
  Settings,
  Shield,
  UserCheck,
  Users,
  Zap
} from "lucide-react";

import { ApiResponse } from "@repo/types";

import { get } from "@/lib/api";

interface AdminShellProps {
  children: React.ReactNode;
  userRole?: string;
  userName?: string;
  userEmail?: string;
}

export function AdminShell({
  children,
  userRole = "admin",
  userName = "TechFirm Admin",
  userEmail = "admin@techfirm.com"
}: AdminShellProps) {
  const pathname = usePathname();

  const { data: unreadCount = 0 } = useQuery({
    queryKey: ["unread-count"],
    queryFn: async () => {
      try {
        const res = await get<ApiResponse<{ count: number }>>("/contact-messages/unread-count");
        return res.data?.count ?? 0;
      } catch {
        return 0;
      }
    }
  });

  const navItems = [
    { label: "Overview", href: "/overview", icon: LayoutDashboard },
    { label: "Site Settings", href: "/site-config", icon: Settings },
    { label: "Testimonials", href: "/testimonials", icon: MessageSquareQuote },
    { label: "FAQs", href: "/faqs", icon: HelpCircle },
    { label: "Team Members", href: "/team", icon: UserCheck },
    { label: "Plans & Pricing", href: "/plans", icon: CreditCard },
    { label: "Blog Posts", href: "/posts", icon: FileText },
    { label: "Portfolio", href: "/portfolio", icon: Briefcase },
    { label: "Messages", href: "/messages", icon: Mail, badge: unreadCount },
    { label: "Users & RBAC", href: "/users", icon: Users }
  ];

  return (
    <div className="bg-background text-foreground flex min-h-screen font-sans antialiased">
      {/* 1. Sidebar Navigation */}
      <aside className="bg-sidebar text-sidebar-foreground border-sidebar-border flex w-64 shrink-0 flex-col justify-between border-r shadow-2xl">
        <div>
          {/* Brand Header */}
          <div className="border-sidebar-border flex h-20 items-center justify-between border-b px-6">
            <Link href="/overview" className="group flex items-center gap-3">
              <div className="bg-primary text-primary-foreground flex h-10 w-10 items-center justify-center rounded-xl shadow-md">
                <Zap className="h-5 w-5 fill-current" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white">
                  Tech<span className="text-primary">Firm</span>
                </span>
                <p className="-mt-0.5 text-[9px] font-bold tracking-widest text-gray-400 uppercase">
                  Admin Console
                </p>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 p-4">
            <div className="px-3 py-2 text-[10px] font-extrabold tracking-widest text-gray-400 uppercase">
              Core Management
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between rounded-xl px-3.5 py-3 text-sm font-bold transition-all duration-150 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-primary/20 shadow-md"
                      : "hover:bg-sidebar-accent text-gray-300 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`h-4 w-4 ${isActive ? "text-primary-foreground" : "text-gray-400"}`}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && item.badge > 0 && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-black ${
                        isActive ? "bg-sidebar text-primary" : "bg-primary text-primary-foreground"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer / User Context */}
        <div className="border-sidebar-border bg-sidebar-accent/50 border-t p-4">
          <div className="mb-4 flex items-center gap-3">
            <div className="bg-accent text-accent-foreground border-accent-foreground/30 flex h-10 w-10 items-center justify-center rounded-xl border text-sm font-bold">
              {userName.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-white">{userName}</p>
              <p className="truncate text-xs text-gray-400">{userEmail}</p>
            </div>
          </div>

          <div className="space-y-2">
            <a
              href="http://localhost:3000"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-dark-card hover:bg-dark-border flex w-full items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold text-gray-200 transition-colors"
            >
              <span>Public Website</span>
              <ArrowUpRight className="text-primary h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top Header Bar */}
        <header className="border-border bg-card flex h-20 items-center justify-between border-b px-8 shadow-2xs">
          <div className="flex items-center gap-4">
            <h2 className="text-foreground text-lg font-black">Management Dashboard</h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-accent border-accent-foreground/20 text-accent-foreground flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold">
              <Shield className="h-3.5 w-3.5" />
              <span>Role: {userRole.toUpperCase()}</span>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="w-full max-w-7xl flex-1 overflow-y-auto p-8 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
