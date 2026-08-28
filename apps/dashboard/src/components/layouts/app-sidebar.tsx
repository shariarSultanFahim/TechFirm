"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useQuery } from "@tanstack/react-query";
import {
  Briefcase,
  CreditCard,
  ExternalLink,
  FileText,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Mail,
  MessageSquareQuote,
  Settings,
  UserCheck,
  Users,
  Zap
} from "lucide-react";

import { ApiResponse } from "@repo/types";

import { get, post } from "@/lib/api";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Overview", url: "/overview", icon: LayoutDashboard },
  { title: "Site Settings", url: "/site-config", icon: Settings },
  { title: "Testimonials", url: "/testimonials", icon: MessageSquareQuote },
  { title: "FAQs", url: "/faqs", icon: HelpCircle },
  { title: "Team Members", url: "/team", icon: UserCheck },
  { title: "Plans & Pricing", url: "/plans", icon: CreditCard },
  { title: "Blog Posts", url: "/posts", icon: FileText },
  { title: "Portfolio", url: "/portfolio", icon: Briefcase },
  { title: "Messages", url: "/messages", icon: Mail, isMessage: true },
  { title: "Users & RBAC", url: "/users", icon: Users }
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
    },
    refetchInterval: 30000
  });

  const handleLogout = async () => {
    try {
      await post("/auth/logout");
      window.location.href = "/login";
    } catch {
      window.location.href = "/login";
    }
  };

  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      {/* Brand Header */}
      <SidebarHeader className="border-sidebar-border border-b p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="hover:bg-sidebar-accent"
              render={
                <Link href="/overview" className="flex items-center gap-3">
                  <div className="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg shadow-xs">
                    <Zap className="size-4 fill-current" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="text-sidebar-foreground truncate font-bold">
                      Tech<span className="text-primary">Firm</span>
                    </span>
                    <span className="text-sidebar-foreground/70 truncate text-[10px] font-medium tracking-wider uppercase">
                      Admin Console
                    </span>
                  </div>
                </Link>
              }
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Main Nav Links */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground px-3 py-2 text-[10px] font-medium tracking-wider uppercase">
            Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.url || pathname.startsWith(`${item.url}/`);
                const showBadge = item.isMessage && unreadCount > 0;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={isActive}
                      className="gap-3 rounded-xl px-3 py-2 text-xs font-normal transition-colors"
                      render={
                        <Link href={item.url} className="flex w-full items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Icon className="size-4" />
                            <span className={isActive ? "font-medium" : "font-normal"}>
                              {item.title}
                            </span>
                          </div>
                          {showBadge && (
                            <Badge
                              variant="default"
                              className="h-5 px-1.5 py-0 text-[10px] font-medium"
                            >
                              {unreadCount}
                            </Badge>
                          )}
                        </Link>
                      }
                    />
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer / User Profile & Logout */}
      <SidebarFooter className="border-sidebar-border space-y-3 border-t p-4">
        <div className="flex items-center gap-3">
          <Avatar className="bg-primary/10 text-primary border-primary/20 flex h-8 w-8 items-center justify-center rounded-lg border text-xs font-medium">
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-xs leading-tight group-data-[collapsible=icon]:hidden">
            <span className="text-sidebar-foreground truncate font-medium">TechFirm Admin</span>
            <span className="text-muted-foreground truncate text-[11px] font-normal">
              admin@techfirm.com
            </span>
          </div>
        </div>

        <div className="space-y-1.5 pt-2">
          <a
            href="http://localhost:3000"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-sidebar-accent hover:bg-sidebar-border text-sidebar-foreground flex w-full items-center justify-center gap-1.5 rounded-lg px-2 py-1.5 text-[11px] font-medium transition-colors group-data-[collapsible=icon]:p-2"
          >
            <span className="group-data-[collapsible=icon]:hidden">Public Website</span>
            <ExternalLink className="text-primary size-3.5" />
          </a>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-8 w-full justify-start gap-2 text-xs font-medium group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0"
          >
            <LogOut className="size-3.5" />
            <span className="group-data-[collapsible=icon]:hidden">Sign Out</span>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
