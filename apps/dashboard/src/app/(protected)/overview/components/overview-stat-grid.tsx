"use client";

import Link from "next/link";

import { ArrowUpRight, LucideIcon } from "lucide-react";

export interface StatCardItem {
  title: string;
  count: number;
  badge: string;
  badgeColor: string;
  icon: LucideIcon;
  href: string;
}

interface OverviewStatGridProps {
  cards: StatCardItem[];
}

export function OverviewStatGrid({ cards }: OverviewStatGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
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
  );
}
