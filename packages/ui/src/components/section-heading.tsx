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
    <div
      className={`flex flex-col ${alignmentClass} max-w-3xl ${align === "center" ? "mx-auto" : ""} mb-12 ${className}`}
    >
      {badge && (
        <span
          className={`mb-3 inline-block rounded-full px-3.5 py-1 text-xs font-semibold tracking-wider uppercase ${
            dark
              ? "bg-primary/20 text-primary border-primary/30 border"
              : "bg-accent text-accent-foreground border-accent-foreground/20 border"
          }`}
        >
          {badge}
        </span>
      )}
      <h2
        className={`mb-4 text-3xl leading-tight font-extrabold tracking-tight md:text-4xl ${
          dark ? "text-white" : "text-foreground"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`text-base leading-relaxed md:text-lg ${dark ? "text-gray-300" : "text-muted-foreground"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
