import { ReactNode } from "react";

import { Zap } from "lucide-react";

export interface SectionHeaderProps {
  badge?: ReactNode;
  badgeIcon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left" | "right";
  className?: string;
  badgeClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export function SectionHeader({
  badge,
  badgeIcon,
  title,
  description,
  align = "center",
  className = "",
  badgeClassName = "",
  titleClassName = "",
  descriptionClassName = ""
}: SectionHeaderProps) {
  const alignmentClasses = {
    center: "items-center text-center mx-auto max-w-3xl",
    left: "items-start text-left max-w-2xl",
    right: "items-end text-right ml-auto max-w-2xl"
  }[align];

  return (
    <div className={`flex flex-col space-y-4 ${alignmentClasses} ${className}`}>
      {/* Top Badge */}
      {badge && (
        <div
          className={`inline-flex w-fit items-center gap-1.5 rounded-full bg-[#CDF5F8] px-4 py-1.5 text-[11px] font-semibold tracking-wider text-[#5C5C5C] uppercase shadow-2xs ${badgeClassName}`}
        >
          {badgeIcon !== undefined ? (
            badgeIcon
          ) : (
            <Zap className="h-3.5 w-3.5 fill-current text-[#5C5C5C]" />
          )}
          <span>{badge}</span>
        </div>
      )}

      {/* Main Title */}
      <h2
        className={`text-3xl leading-[1.18] font-bold tracking-tight text-[#141432] sm:text-4xl lg:text-[44px] ${titleClassName}`}
      >
        {title}
      </h2>

      {/* Optional Description */}
      {description && (
        <p
          className={`text-muted-foreground text-sm leading-relaxed font-medium sm:text-base ${descriptionClassName}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
