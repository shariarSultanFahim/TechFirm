"use client";

import Link from "next/link";

import {
  Briefcase,
  CreditCard,
  HelpCircle,
  LayoutDashboard,
  MessageSquareQuote,
  Settings,
  UserCheck
} from "lucide-react";

const MODULES = [
  { title: "Site Settings", href: "/site-config", icon: Settings },
  { title: "Testimonials", href: "/testimonials", icon: MessageSquareQuote },
  { title: "Help FAQs", href: "/faqs", icon: HelpCircle },
  { title: "Team Staff", href: "/team", icon: UserCheck },
  { title: "Pricing Plans", href: "/plans", icon: CreditCard },
  { title: "Case Studies", href: "/portfolio", icon: Briefcase }
];

export function OverviewQuickLinks() {
  return (
    <div className="space-y-3">
      <h2 className="text-muted-foreground flex items-center gap-2 text-xs font-semibold tracking-wider uppercase">
        <LayoutDashboard className="text-primary h-4 w-4" />
        <span>Management Modules</span>
      </h2>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {MODULES.map((item) => {
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
              <span className="text-foreground text-xs font-medium">{item.title}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
