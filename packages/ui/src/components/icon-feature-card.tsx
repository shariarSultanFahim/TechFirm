import * as React from "react";

import { ArrowRight } from "lucide-react";

export interface IconFeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href?: string;
  actionText?: string;
  dark?: boolean;
}

export function IconFeatureCard({
  icon,
  title,
  description,
  href,
  actionText = "Read More",
  dark = false
}: IconFeatureCardProps) {
  return (
    <div
      className={`group relative flex flex-col justify-between rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1.5 ${
        dark
          ? "bg-dark-card border-dark-border hover:border-primary/50 text-white"
          : "bg-card border-border hover:border-primary text-foreground hover:shadow-lg"
      }`}
    >
      <div>
        <div className="bg-accent text-accent-foreground group-hover:bg-primary group-hover:text-primary-foreground mb-6 flex h-14 w-14 items-center justify-center rounded-xl transition-colors duration-300">
          {icon}
        </div>
        <h3 className="group-hover:text-primary mb-3 text-xl font-bold tracking-tight transition-colors">
          {title}
        </h3>
        <p
          className={`mb-6 text-sm leading-relaxed ${dark ? "text-gray-300" : "text-muted-foreground"}`}
        >
          {description}
        </p>
      </div>

      {href && (
        <a
          href={href}
          className="text-primary inline-flex items-center gap-2 text-sm font-semibold transition-transform group-hover:translate-x-1"
        >
          {actionText} <ArrowRight className="h-4 w-4" />
        </a>
      )}
    </div>
  );
}
