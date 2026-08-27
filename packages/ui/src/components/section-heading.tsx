import * as React from "react";

export interface SectionHeadingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  badge?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center" | "right";
}

export const SectionHeading = React.forwardRef<HTMLDivElement, SectionHeadingProps>(
  ({ className = "", badge, title, description, align = "left", ...props }, ref) => {
    const alignClasses = {
      left: "text-left items-start",
      center: "text-center items-center mx-auto",
      right: "text-right items-end ml-auto"
    }[align];

    return (
      <div
        ref={ref}
        data-align={align}
        className={`ui-section-heading flex flex-col gap-2 ${alignClasses} ${className}`}
        {...props}
      >
        {badge && <div className="ui-section-heading-badge mb-1">{badge}</div>}
        <h2 className="ui-section-heading-title text-2xl md:text-3xl font-bold tracking-tight">
          {title}
        </h2>
        {description && (
          <p className="ui-section-heading-desc text-muted-foreground text-sm md:text-base max-w-2xl">
            {description}
          </p>
        )}
      </div>
    );
  }
);

SectionHeading.displayName = "SectionHeading";
