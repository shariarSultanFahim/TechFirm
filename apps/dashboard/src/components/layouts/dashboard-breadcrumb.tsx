"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

const ROUTE_LABELS: Record<string, string> = {
  overview: "Overview",
  "site-config": "Site Settings",
  testimonials: "Testimonials",
  faqs: "FAQs",
  team: "Team Members",
  plans: "Plans & Pricing",
  posts: "Blog Posts",
  portfolio: "Portfolio",
  messages: "Messages",
  users: "Users & RBAC"
};

export function DashboardBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          {segments.length === 0 || (segments.length === 1 && segments[0] === "overview") ? (
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          ) : (
            <BreadcrumbLink render={<Link href="/overview" />}>Dashboard</BreadcrumbLink>
          )}
        </BreadcrumbItem>

        {segments.map((segment, index) => {
          // If the only segment is "overview", we already showed Dashboard
          if (segment === "overview" && segments.length === 1) {
            return null;
          }

          const isLast = index === segments.length - 1;
          const href = `/${segments.slice(0, index + 1).join("/")}`;
          const formattedTitle =
            ROUTE_LABELS[segment] ||
            segment.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

          return (
            <React.Fragment key={href}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{formattedTitle}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink render={<Link href={href} />}>{formattedTitle}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
