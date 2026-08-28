"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Briefcase,
  CreditCard,
  FileText,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Mail,
  MessageSquareQuote,
  Settings,
  UserCheck,
  Users
} from "lucide-react";

import logoImg from "@/assets/logo.png";

import { useCurrentUser, useLogout } from "@/hooks/use-auth";
import { useUnreadMessagesCount } from "@/hooks/use-contact-messages";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  const { data: unreadCount = 0 } = useUnreadMessagesCount();
  const { data: user } = useCurrentUser();
  const logout = useLogout();

  const handleLogout = () => {
    logout.mutate();
  };

  const displayName = user?.name || "TechFirm Admin";
  const displayEmail = user?.email || "admin@techfirm.com";
  const avatarUrl = user?.avatar;
  const initials =
    displayName
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "AD";

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
                  <div className="flex aspect-square size-8 shrink-0 items-center justify-center overflow-hidden">
                    <Image
                      src={logoImg}
                      alt="TechFirm Logo"
                      width={32}
                      height={32}
                      priority
                      className="size-8 object-contain"
                    />
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
            {avatarUrl && <AvatarImage src={avatarUrl} alt={displayName} />}
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-xs leading-tight group-data-[collapsible=icon]:hidden">
            <span className="text-sidebar-foreground truncate font-medium">{displayName}</span>
            <span className="text-muted-foreground truncate text-[11px] font-normal">
              {displayEmail}
            </span>
          </div>
        </div>

        <div className="space-y-1.5 pt-2">
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
