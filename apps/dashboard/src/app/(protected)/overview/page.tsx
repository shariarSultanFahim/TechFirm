"use client";

import {
  Briefcase,
  CreditCard,
  FileText,
  Mail,
  MessageSquareQuote,
  TrendingUp,
  UserCheck,
  Users
} from "lucide-react";

import { useContactMessages, useUnreadMessagesCount } from "@/hooks/use-contact-messages";
import { usePlans } from "@/hooks/use-plans";
import { usePortfolio } from "@/hooks/use-portfolio";
import { usePosts } from "@/hooks/use-posts";
import { useTeamMembers } from "@/hooks/use-team-members";
import { useTestimonials } from "@/hooks/use-testimonials";
import { useUsers } from "@/hooks/use-users";

import { OverviewHeroBanner } from "./components/overview-hero-banner";
import { OverviewQuickLinks } from "./components/overview-quick-links";
import { OverviewStatGrid, StatCardItem } from "./components/overview-stat-grid";

export default function OverviewPage() {
  const { data: messagesData } = useContactMessages({ limit: 1 });
  const { data: unreadCount = 0 } = useUnreadMessagesCount();
  const { data: portfolioData } = usePortfolio({ limit: 1 });
  const { data: postsData } = usePosts({ limit: 1 });
  const { data: plansData } = usePlans();
  const { data: teamData } = useTeamMembers({ limit: 1 });
  const { data: testimonialsData } = useTestimonials({ limit: 1 });
  const { data: usersData } = useUsers({ limit: 1 });

  const totalMessages = messagesData?.meta?.total ?? 0;
  const totalPortfolio = portfolioData?.meta?.total ?? 0;
  const totalPosts = postsData?.meta?.total ?? 0;
  const totalPlans = plansData?.meta?.total ?? 0;
  const totalTeam = teamData?.meta?.total ?? 0;
  const totalTestimonials = testimonialsData?.meta?.total ?? 0;
  const totalUsers = usersData?.meta?.total ?? 0;

  const statCards: StatCardItem[] = [
    {
      title: "Inbound Inquiries",
      count: totalMessages,
      badge: unreadCount > 0 ? `${unreadCount} unread` : "0 unread",
      badgeColor:
        unreadCount > 0 ? "text-rose-600 bg-rose-500/10" : "text-muted-foreground bg-muted",
      icon: Mail,
      href: "/messages"
    },
    {
      title: "Case Studies",
      count: totalPortfolio,
      badge: `${totalPortfolio} published`,
      badgeColor: "text-primary bg-primary/10",
      icon: Briefcase,
      href: "/portfolio"
    },
    {
      title: "Editorial Posts",
      count: totalPosts,
      badge: "Tech insights",
      badgeColor: "text-emerald-600 bg-emerald-500/10",
      icon: FileText,
      href: "/posts"
    },
    {
      title: "Active Plans",
      count: totalPlans,
      badge: "Monthly & Annual",
      badgeColor: "text-amber-600 bg-amber-500/10",
      icon: CreditCard,
      href: "/plans"
    },
    {
      title: "Team Members",
      count: totalTeam,
      badge: "Leadership & Eng",
      badgeColor: "text-indigo-600 bg-indigo-500/10",
      icon: UserCheck,
      href: "/team"
    },
    {
      title: "Client Testimonials",
      count: totalTestimonials,
      badge: "Enterprise reviews",
      badgeColor: "text-primary bg-primary/10",
      icon: MessageSquareQuote,
      href: "/testimonials"
    },
    {
      title: "User Accounts",
      count: totalUsers,
      badge: "RBAC Managed",
      badgeColor: "text-muted-foreground bg-muted",
      icon: Users,
      href: "/users"
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      <OverviewHeroBanner unreadCount={unreadCount} />

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-foreground flex items-center gap-2 text-sm font-black tracking-wider uppercase">
            <TrendingUp className="text-primary h-4 w-4" />
            <span>Platform Overview &amp; Content Metrics</span>
          </h2>
        </div>

        <OverviewStatGrid cards={statCards} />
      </div>

      <OverviewQuickLinks />
    </div>
  );
}
