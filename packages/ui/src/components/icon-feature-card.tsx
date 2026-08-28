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
      className={`group relative p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between ${
        dark
          ? "bg-dark-card border-dark-border hover:border-primary/50 text-white"
          : "bg-card border-border hover:border-primary hover:shadow-lg text-foreground"
      }`}
    >
      <div>
        <div className="w-14 h-14 rounded-xl bg-accent text-accent-foreground flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-3 tracking-tight group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className={`text-sm leading-relaxed mb-6 ${dark ? "text-gray-300" : "text-muted-foreground"}`}>
          {description}
        </p>
      </div>

      {href && (
        <a
          href={href}
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:translate-x-1 transition-transform"
        >
          {actionText} <ArrowRight className="w-4 h-4" />
        </a>
      )}
    </div>
  );
}
