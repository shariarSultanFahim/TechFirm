"use client";

import Link from "next/link";
import {
  CreditCard,
  FileText,
  Mail,
  Users,
  ArrowUpRight
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { get } from "@/lib/api";
import { ApiResponse, IPlan, IPost, IContactMessage, IUser } from "@repo/types";

export default function OverviewPage() {
  const { data: plansData } = useQuery({
    queryKey: ["admin-plans"],
    queryFn: async () => {
      try {
        const res = await get<ApiResponse<IPlan[]>>("/plans");
        return res.data || [];
      } catch {
        return [];
      }
    }
  });

  const { data: postsData } = useQuery({
    queryKey: ["admin-posts"],
    queryFn: async () => {
      try {
        const res = await get<ApiResponse<IPost[]>>("/posts");
        return res.data || [];
      } catch {
        return [];
      }
    }
  });

  const { data: messagesData } = useQuery({
    queryKey: ["admin-messages"],
    queryFn: async () => {
      try {
        const res = await get<ApiResponse<IContactMessage[]>>("/contact-messages");
        return res.data || [];
      } catch {
        return [];
      }
    }
  });

  const { data: unreadData } = useQuery({
    queryKey: ["admin-unread"],
    queryFn: async () => {
      try {
        const res = await get<ApiResponse<{ count: number }>>("/contact-messages/unread-count");
        return res.data?.count ?? 0;
      } catch {
        return 0;
      }
    }
  });

  const { data: usersData } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      try {
        const res = await get<ApiResponse<IUser[]>>("/users");
        return res.data || [];
      } catch {
        return [];
      }
    }
  });

  const plansCount = plansData?.length ?? 6;
  const postsCount = postsData?.length ?? 6;
  const totalMessages = messagesData?.length ?? 3;
  const unreadMessages = unreadData ?? 2;
  const usersCount = usersData?.length ?? 2;

  return (
    <div className="space-y-8">
      {/* 1. Header Intro */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
          System Overview
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Real-time metrics from your active database modules.
        </p>
      </div>

      {/* 2. Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-card border border-border shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase text-muted-foreground">Total Plans</p>
            <p className="text-3xl font-black text-foreground mt-1 font-mono">{plansCount}</p>
            <p className="text-xs text-primary-deep font-semibold mt-1">Active on public pricing</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-accent text-accent-foreground flex items-center justify-center">
            <CreditCard className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-card border border-border shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase text-muted-foreground">Published Posts</p>
            <p className="text-3xl font-black text-foreground mt-1 font-mono">{postsCount}</p>
            <p className="text-xs text-blue-600 font-semibold mt-1">Live on Techfirm blog</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-card border border-border shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase text-muted-foreground">Unread Messages</p>
            <p className="text-3xl font-black text-foreground mt-1 font-mono">{unreadMessages}</p>
            <p className="text-xs text-amber-600 font-semibold mt-1">Total: {totalMessages}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Mail className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-card border border-border shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase text-muted-foreground">Registered Users</p>
            <p className="text-3xl font-black text-foreground mt-1 font-mono">{usersCount}</p>
            <p className="text-xs text-purple-600 font-semibold mt-1">Admins &amp; Staff</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* 3. Quick Action Management Links */}
      <div className="p-8 rounded-3xl bg-dark-bg text-white shadow-xl border border-dark-border">
        <h2 className="text-xl font-bold mb-2 text-white">Management Shortcuts</h2>
        <p className="text-xs text-gray-400 mb-6">
          Directly manage customer-facing content without leaving this dashboard.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/plans"
            className="p-5 rounded-2xl bg-dark-card border border-dark-border hover:border-primary transition-colors flex items-center justify-between group"
          >
            <div>
              <p className="text-sm font-bold text-white group-hover:text-primary transition-colors">
                Configure Plans
              </p>
              <p className="text-xs text-gray-400 mt-0.5">Edit tiers &amp; feature sets</p>
            </div>
            <ArrowUpRight className="w-4 h-4 text-primary" />
          </Link>

          <Link
            href="/posts"
            className="p-5 rounded-2xl bg-dark-card border border-dark-border hover:border-primary transition-colors flex items-center justify-between group"
          >
            <div>
              <p className="text-sm font-bold text-white group-hover:text-primary transition-colors">
                Write Article
              </p>
              <p className="text-xs text-gray-400 mt-0.5">Draft &amp; publish blog posts</p>
            </div>
            <ArrowUpRight className="w-4 h-4 text-primary" />
          </Link>

          <Link
            href="/messages"
            className="p-5 rounded-2xl bg-dark-card border border-dark-border hover:border-primary transition-colors flex items-center justify-between group"
          >
            <div>
              <p className="text-sm font-bold text-white group-hover:text-primary transition-colors">
                Review Messages
              </p>
              <p className="text-xs text-gray-400 mt-0.5">Inbox &amp; customer inquiries</p>
            </div>
            <ArrowUpRight className="w-4 h-4 text-primary" />
          </Link>
        </div>
      </div>
    </div>
  );
}
