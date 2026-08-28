"use client";

import Link from "next/link";

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
  Sparkles,
  TrendingUp,
  UserCheck,
  Users
} from "lucide-react";

import {
  ApiResponse,
  IContactMessage,
  IPlan,
  IPortfolioItem,
  IPost,
  ITeamMember,
  ITestimonial,
  IUser
} from "@repo/types";

import { get } from "@/lib/api";

export default function OverviewPage() {
  // Query 1: Messages & Unread
  const { data: messages = [] } = useQuery<IContactMessage[]>({
    queryKey: ["overview-messages"],
    queryFn: async () => {
      try {
        const res = await get<ApiResponse<IContactMessage[]>>("/contact-messages");
        return res.data || [];
      } catch {
        return [];
      }
    }
  });

  const { data: unreadCount = 0 } = useQuery<number>({
    queryKey: ["overview-unread-count"],
    queryFn: async () => {
      try {
        const res = await get<ApiResponse<{ count: number }>>("/contact-messages/unread-count");
        return res.data?.count || 0;
      } catch {
        return 0;
      }
    }
  });

  // Query 2: Portfolio
  const { data: portfolioItems = [] } = useQuery<IPortfolioItem[]>({
    queryKey: ["overview-portfolio"],
    queryFn: async () => {
      try {
        const res = await get<ApiResponse<IPortfolioItem[]>>("/portfolio");
        return res.data || [];
      } catch {
        return [];
      }
    }
  });

  // Query 3: Blog Posts
  const { data: posts = [] } = useQuery<IPost[]>({
    queryKey: ["overview-posts"],
    queryFn: async () => {
      try {
        const res = await get<ApiResponse<IPost[]>>("/posts");
        return res.data || [];
      } catch {
        return [];
      }
    }
  });

  // Query 4: Plans
  const { data: plans = [] } = useQuery<IPlan[]>({
    queryKey: ["overview-plans"],
    queryFn: async () => {
      try {
        const res = await get<ApiResponse<IPlan[]>>("/plans");
        return res.data || [];
      } catch {
        return [];
      }
    }
  });

  // Query 5: Team Members
  const { data: teamMembers = [] } = useQuery<ITeamMember[]>({
    queryKey: ["overview-team"],
    queryFn: async () => {
      try {
        const res = await get<ApiResponse<ITeamMember[]>>("/team");
        return res.data || [];
      } catch {
        return [];
      }
    }
  });

  // Query 6: Testimonials
  const { data: testimonials = [] } = useQuery<ITestimonial[]>({
    queryKey: ["overview-testimonials"],
    queryFn: async () => {
      try {
        const res = await get<ApiResponse<ITestimonial[]>>("/testimonials");
        return res.data || [];
      } catch {
        return [];
      }
    }
  });

  // Query 7: Users
  const { data: users = [] } = useQuery<IUser[]>({
    queryKey: ["overview-users"],
    queryFn: async () => {
      try {
        const res = await get<ApiResponse<IUser[]>>("/users?limit=100");
        return res.data || [];
      } catch {
        return [];
      }
    }
  });

  const statCards = [
    {
      title: "Inbound Inquiries",
      count: messages.length,
      badge: unreadCount > 0 ? `${unreadCount} unread` : "0 unread",
      badgeColor:
        unreadCount > 0 ? "text-rose-600 bg-rose-500/10" : "text-muted-foreground bg-muted",
      icon: Mail,
      href: "/messages"
    },
    {
      title: "Case Studies",
      count: portfolioItems.length,
      badge: "6 published",
      badgeColor: "text-primary bg-primary/10",
      icon: Briefcase,
      href: "/portfolio"
    },
    {
      title: "Editorial Posts",
      count: posts.length,
      badge: "Tech insights",
      badgeColor: "text-emerald-600 bg-emerald-500/10",
      icon: FileText,
      href: "/posts"
    },
    {
      title: "Active Plans",
      count: plans.length,
      badge: "Monthly & Annual",
      badgeColor: "text-amber-600 bg-amber-500/10",
      icon: CreditCard,
      href: "/plans"
    },
    {
      title: "Team Members",
      count: teamMembers.length,
      badge: "Leadership & Eng",
      badgeColor: "text-indigo-600 bg-indigo-500/10",
      icon: UserCheck,
      href: "/team"
    },
    {
      title: "Client Testimonials",
      count: testimonials.length,
      badge: "Enterprise reviews",
      badgeColor: "text-primary bg-primary/10",
      icon: MessageSquareQuote,
      href: "/testimonials"
    },
    {
      title: "User Accounts",
      count: users.length,
      badge: "RBAC Managed",
      badgeColor: "text-muted-foreground bg-muted",
      icon: Users,
      href: "/users"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="border-primary/20 from-primary/10 via-card to-card relative overflow-hidden rounded-2xl border bg-linear-to-br p-6 shadow-xs sm:p-8">
        <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl space-y-2">
            <div className="bg-primary/10 text-primary inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-black">
              <Sparkles className="h-3.5 w-3.5" />
              <span>TechFirm Enterprise Control Center</span>
            </div>
            <h1 className="text-foreground text-2xl font-black tracking-tight sm:text-3xl">
              Welcome back to Admin Console
            </h1>
            <p className="text-muted-foreground text-xs leading-relaxed sm:text-sm">
              All 9 backend collection vertical slices are live, seeded, and actively serving
              real-time data across the public marketing web portal and admin dashboard.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <Link
              href="/messages"
              className="bg-primary hover:bg-primary/90 text-primary-foreground inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-bold shadow-sm transition-colors"
            >
              <Mail className="mr-1.5 h-4 w-4" />
              <span>View Inquiries ({unreadCount})</span>
            </Link>
            <Link
              href="/site-config"
              className="border-border bg-card hover:bg-muted text-foreground inline-flex items-center gap-1.5 rounded-lg border px-3.5 py-2 text-xs font-bold transition-colors"
            >
              <Settings className="mr-1.5 h-4 w-4" />
              <span>Site Config</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-foreground flex items-center gap-2 text-sm font-black tracking-wider uppercase">
            <TrendingUp className="text-primary h-4 w-4" />
            <span>Platform Overview & Content Metrics</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.title}
                href={card.href}
                className="group border-border bg-card hover:border-primary/50 flex flex-col justify-between rounded-xl border p-5 shadow-2xs transition-all hover:shadow-xs"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-xl transition-transform group-hover:scale-105">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-black ${card.badgeColor}`}
                  >
                    {card.badge}
                  </span>
                </div>

                <div>
                  <p className="text-muted-foreground text-xs font-bold">{card.title}</p>
                  <div className="mt-1 flex items-baseline justify-between">
                    <p className="text-foreground text-2xl font-black">{card.count}</p>
                    <ArrowUpRight className="text-muted-foreground group-hover:text-primary h-4 w-4 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Quick Access Matrix */}
      <div className="space-y-3">
        <h2 className="text-foreground flex items-center gap-2 text-sm font-black tracking-wider uppercase">
          <LayoutDashboard className="text-primary h-4 w-4" />
          <span>Management Modules</span>
        </h2>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {[
            { title: "Site Settings", href: "/site-config", icon: Settings },
            { title: "Testimonials", href: "/testimonials", icon: MessageSquareQuote },
            { title: "Help FAQs", href: "/faqs", icon: HelpCircle },
            { title: "Team Staff", href: "/team", icon: UserCheck },
            { title: "Pricing Plans", href: "/plans", icon: CreditCard },
            { title: "Case Studies", href: "/portfolio", icon: Briefcase }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                href={item.href}
                className="border-border bg-card hover:bg-muted/40 group flex flex-col items-center justify-center gap-2 rounded-xl border p-3.5 text-center shadow-2xs transition-colors"
              >
                <div className="bg-muted text-foreground group-hover:bg-primary group-hover:text-primary-foreground flex h-8 w-8 items-center justify-center rounded-lg transition-colors">
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-foreground text-xs font-bold">{item.title}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
