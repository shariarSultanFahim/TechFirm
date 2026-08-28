import * as React from "react";

import { cn } from "@/lib/utils";

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  children?: React.ReactNode; // For action buttons like "Add New Plan"
}

export function PageHeader({
  title,
  description,
  icon: Icon,
  children,
  className,
  ...props
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
      {...props}
    >
      <div className="space-y-1">
        <h1 className="text-foreground flex items-center gap-2.5 text-2xl font-black tracking-tight sm:text-3xl">
          {Icon && <Icon className="text-primary h-6 w-6 shrink-0" />}
          <span>{title}</span>
        </h1>
        {description && (
          <p className="text-muted-foreground text-xs leading-relaxed sm:text-sm">{description}</p>
        )}
      </div>

      {children && <div className="flex shrink-0 flex-wrap items-center gap-2.5">{children}</div>}
    </div>
  );
}
