import * as React from "react";
import Link from "next/link";
import { Badge, Button } from "@repo/ui";

interface AdminShellProps {
  children: React.ReactNode;
  userRole?: string;
  userName?: string;
  userEmail?: string;
}

export function AdminShell({
  children,
  userRole = "admin",
  userName = "Admin User",
  userEmail = "admin@example.com"
}: AdminShellProps) {
  const navItems = [
    { label: "Overview", href: "/overview", icon: "📊" },
    { label: "Users", href: "/users", icon: "👥" }
  ];

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r bg-card flex flex-col justify-between shrink-0">
        <div>
          {/* Brand Header */}
          <div className="h-16 px-6 border-b flex items-center justify-between">
            <Link href="/overview" className="flex items-center gap-2 font-bold text-lg tracking-tight">
              <span className="h-7 w-7 rounded bg-primary text-primary-foreground flex items-center justify-center text-sm font-black">
                A
              </span>
              <span>Admin Panel</span>
            </Link>
            <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-wider">
              {userRole}
            </Badge>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Core Modules
            </div>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-muted transition-colors text-foreground"
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer / User Context */}
        <div className="p-4 border-t bg-muted/30">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-9 w-9 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">
              {userName.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium truncate">{userName}</p>
              <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
            </div>
          </div>
          <a href="http://localhost:3000" className="block">
            <Button variant="ghost" size="sm" className="w-full text-xs justify-start">
              ← Switch to Public Web
            </Button>
          </a>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 border-b bg-card px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded">
              Subdomain: admin.localhost:3001
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="default" className="capitalize text-xs">
              Role: {userRole}
            </Badge>
          </div>
        </header>

        {/* Dynamic Page Slot */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
