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
          className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#CDF5F8] text-[#5C5C5C] text-[11px] font-semibold uppercase tracking-wider shadow-2xs w-fit ${badgeClassName}`}
        >
          {badgeIcon !== undefined ? (
            badgeIcon
          ) : (
            <Zap className="w-3.5 h-3.5 fill-current text-[#5C5C5C]" />
          )}
          <span>{badge}</span>
        </div>
      )}

      {/* Main Title */}
      <h2
        className={`text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#141432] tracking-tight leading-[1.18] ${titleClassName}`}
      >
        {title}
      </h2>

      {/* Optional Description */}
      {description && (
        <p
          className={`text-sm sm:text-base text-muted-foreground font-medium leading-relaxed ${descriptionClassName}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
