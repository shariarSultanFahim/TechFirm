import * as React from "react";

export interface SectionHeadingProps {
  badge?: string;
  title: string;
  description?: string;
  align?: "left" | "center" | "right";
  dark?: boolean;
  className?: string;
}

export function SectionHeading({
  badge,
  title,
  description,
  align = "center",
  dark = false,
  className = ""
}: SectionHeadingProps) {
  const alignmentClass =
    align === "left"
      ? "text-left items-start"
      : align === "right"
        ? "text-right items-end"
        : "text-center items-center";

  return (
    <div className={`flex flex-col ${alignmentClass} max-w-3xl ${align === "center" ? "mx-auto" : ""} mb-12 ${className}`}>
      {badge && (
        <span
          className={`inline-block px-3.5 py-1 text-xs font-semibold rounded-full uppercase tracking-wider mb-3 ${
            dark
              ? "bg-primary/20 text-primary border border-primary/30"
              : "bg-accent text-accent-foreground border border-accent-foreground/20"
          }`}
        >
          {badge}
        </span>
      )}
      <h2
        className={`text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-4 ${
          dark ? "text-white" : "text-foreground"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`text-base md:text-lg leading-relaxed ${dark ? "text-gray-300" : "text-muted-foreground"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
