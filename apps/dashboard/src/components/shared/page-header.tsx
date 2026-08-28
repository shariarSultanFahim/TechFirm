import * as React from "react";

import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
}

export function PageHeader({
  title,
  description,
  children,
  icon: Icon,
  className
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "border-border flex flex-col justify-between gap-4 border-b pb-6 sm:flex-row sm:items-center",
        className
      )}
    >
      <div className="space-y-1">
        <div className="flex items-center gap-2.5">
          {Icon && (
            <div className="bg-primary/10 text-primary flex h-9 w-9 items-center justify-center rounded-xl shadow-2xs">
              <Icon className="h-5 w-5" />
            </div>
          )}
          <h1 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
        </div>
        {description && (
          <p className="text-muted-foreground text-xs font-normal sm:text-sm">{description}</p>
        )}
      </div>

      {children && (
        <div className="flex flex-wrap items-center gap-2 sm:justify-end">{children}</div>
      )}
    </div>
  );
}
