import * as React from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const pillButtonVariants = cva(
  "inline-flex items-center rounded-full transition-all duration-300 group shrink-0 cursor-pointer select-none",
  {
    variants: {
      variant: {
        outline:
          "border border-primary text-foreground hover:bg-primary/5 active:scale-[0.98]",
        primary:
          "bg-[#864FFE] hover:bg-[#7238EE] text-white shadow-md hover:shadow-lg active:scale-[0.98] border border-transparent",
        solid:
          "bg-[#864FFE] hover:bg-[#7238EE] text-white shadow-md hover:shadow-lg active:scale-[0.98] border border-transparent",
        white:
          "bg-white border border-[#EDE8F5] text-[#141432] hover:border-primary hover:text-primary shadow-xs active:scale-[0.98]",
        dark:
          "bg-[#191924] border border-[#2D2D3F] text-white hover:bg-[#252535] active:scale-[0.98]"
      },
      size: {
        sm: "pl-3.5 pr-1.5 py-1 text-xs gap-2",
        default: "pl-4 pr-1.5 py-1.5 xl:pl-6 xl:pr-2 xl:py-2 text-xs xl:text-sm gap-2.5 xl:gap-3",
        lg: "pl-6 sm:pl-7 pr-2 sm:pr-2.5 py-2 sm:py-2.5 text-sm sm:text-base gap-3 sm:gap-3.5"
      }
    },
    defaultVariants: {
      variant: "outline",
      size: "default"
    }
  }
);

const iconBadgeVariants = cva(
  "rounded-full flex items-center justify-center transition-all duration-300 shrink-0",
  {
    variants: {
      variant: {
        outline:
          "bg-primary/15 text-primary group-hover:bg-primary group-hover:text-white",
        primary:
          "bg-white text-primary group-hover:scale-105 shadow-2xs",
        solid:
          "bg-white text-primary group-hover:scale-105 shadow-2xs",
        white:
          "bg-primary/15 text-primary group-hover:bg-primary group-hover:text-white",
        dark:
          "bg-white/10 text-white group-hover:bg-primary group-hover:text-white"
      },
      size: {
        sm: "w-5 h-5",
        default: "w-6 h-6 xl:w-7 xl:h-7",
        lg: "w-7 h-7 sm:w-8 sm:h-8"
      }
    },
    defaultVariants: {
      variant: "outline",
      size: "default"
    }
  }
);

export interface PillButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof pillButtonVariants> {
  href?: string;
  target?: string;
  rel?: string;
  icon?: React.ReactNode;
  iconClassName?: string;
  badgeClassName?: string;
  labelClassName?: string;
}

export const PillButton = React.forwardRef<HTMLButtonElement, PillButtonProps>(
  (
    {
      className,
      variant = "outline",
      size = "default",
      href,
      target,
      rel,
      icon,
      iconClassName,
      badgeClassName,
      labelClassName,
      children,
      ...props
    },
    ref
  ) => {
    const content = (
      <>
        <span
          className={cn(
            "font-bold tracking-tight whitespace-nowrap transition-colors",
            variant === "outline" && "text-foreground group-hover:text-primary",
            (variant === "primary" || variant === "solid") && "text-white",
            variant === "white" && "text-[#141432] group-hover:text-primary",
            variant === "dark" && "text-white",
            labelClassName
          )}
        >
          {children}
        </span>
        <div
          className={cn(
            iconBadgeVariants({ variant, size }),
            badgeClassName
          )}
        >
          {icon !== undefined ? (
            icon
          ) : (
            <Check
              className={cn(
                "stroke-[2.5]",
                size === "sm"
                  ? "w-3 h-3"
                  : size === "lg"
                    ? "w-4 h-4 sm:w-4.5 sm:h-4.5"
                    : "w-3.5 h-3.5 xl:w-4 xl:h-4",
                iconClassName
              )}
            />
          )}
        </div>
      </>
    );

    if (href) {
      return (
        <Link
          href={href}
          target={target}
          rel={rel}
          className={cn(pillButtonVariants({ variant, size, className }))}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        type="button"
        className={cn(pillButtonVariants({ variant, size, className }))}
        {...props}
      >
        {content}
      </button>
    );
  }
);

PillButton.displayName = "PillButton";
