"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CreditCard,
  FileText,
  Mail,
  Users,
  Zap,
  ArrowUpRight,
  Shield
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { get } from "@/lib/api";
import { ApiResponse } from "@repo/types";

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
    { label: "Plans", href: "/plans", icon: CreditCard },
    { label: "Blog Posts", href: "/posts", icon: FileText },
    { label: "Messages", href: "/messages", icon: Mail, badge: unreadCount },
    { label: "Users & RBAC", href: "/users", icon: Users }
  ];

  return (
    <div className="min-h-screen flex bg-background text-foreground font-sans antialiased">
      {/* 1. Sidebar Navigation */}
      <aside className="w-64 bg-sidebar text-sidebar-foreground flex flex-col justify-between shrink-0 border-r border-sidebar-border shadow-2xl">
        <div>
          {/* Brand Header */}
          <div className="h-20 px-6 border-b border-sidebar-border flex items-center justify-between">
            <Link href="/overview" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-md">
                <Zap className="w-5 h-5 fill-current" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white">
                  Tech<span className="text-primary">Firm</span>
                </span>
                <p className="text-[9px] font-bold tracking-widest text-gray-400 uppercase -mt-0.5">
                  Admin Console
                </p>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            <div className="px-3 py-2 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
              Core Management
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-bold transition-all duration-150 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                      : "text-gray-300 hover:text-white hover:bg-sidebar-accent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? "text-primary-foreground" : "text-gray-400"}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && item.badge > 0 && (
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                        isActive
                          ? "bg-sidebar text-primary"
                          : "bg-primary text-primary-foreground"
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
        <div className="p-4 border-t border-sidebar-border bg-sidebar-accent/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-xl bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm border border-accent-foreground/30">
              {userName.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-white truncate">{userName}</p>
              <p className="text-xs text-gray-400 truncate">{userEmail}</p>
            </div>
          </div>

          <div className="space-y-2">
            <a
              href="http://localhost:3000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-lg bg-dark-card hover:bg-dark-border text-xs font-bold text-gray-200 transition-colors"
            >
              <span>Public Website</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-primary" />
            </a>
          </div>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="h-20 border-b border-border bg-card px-8 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-black text-foreground">
              Management Dashboard
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent border border-accent-foreground/20 text-accent-foreground text-xs font-bold">
              <Shield className="w-3.5 h-3.5" />
              <span>Role: {userRole.toUpperCase()}</span>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-8 lg:p-10 overflow-y-auto max-w-7xl w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
