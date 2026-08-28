import * as React from "react";
import Link from "next/link";

import { Check } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const pillButtonVariants = cva(
  "group inline-flex shrink-0 cursor-pointer items-center rounded-full transition-all duration-300 select-none",
  {
    variants: {
      variant: {
        outline: "border-primary text-foreground hover:bg-primary/5 border active:scale-[0.98]",
        primary:
          "border border-transparent bg-[#864FFE] text-white shadow-md hover:bg-[#7238EE] hover:shadow-lg active:scale-[0.98]",
        solid:
          "border border-transparent bg-[#864FFE] text-white shadow-md hover:bg-[#7238EE] hover:shadow-lg active:scale-[0.98]",
        white:
          "hover:border-primary hover:text-primary border border-[#EDE8F5] bg-white text-[#141432] shadow-xs active:scale-[0.98]",
        dark: "border border-[#2D2D3F] bg-[#191924] text-white hover:bg-[#252535] active:scale-[0.98]"
      },
      size: {
        sm: "gap-2 py-1 pr-1.5 pl-3.5 text-xs",
        default: "gap-2.5 py-1.5 pr-1.5 pl-4 text-xs xl:gap-3 xl:py-2 xl:pr-2 xl:pl-6 xl:text-sm",
        lg: "gap-3 py-2 pr-2 pl-6 text-sm sm:gap-3.5 sm:py-2.5 sm:pr-2.5 sm:pl-7 sm:text-base"
      }
    },
    defaultVariants: {
      variant: "outline",
      size: "default"
    }
  }
);

const iconBadgeVariants = cva(
  "flex shrink-0 items-center justify-center rounded-full transition-all duration-300",
  {
    variants: {
      variant: {
        outline: "bg-primary/15 text-primary group-hover:bg-primary group-hover:text-white",
        primary: "text-primary bg-white shadow-2xs group-hover:scale-105",
        solid: "text-primary bg-white shadow-2xs group-hover:scale-105",
        white: "bg-primary/15 text-primary group-hover:bg-primary group-hover:text-white",
        dark: "group-hover:bg-primary bg-white/10 text-white group-hover:text-white"
      },
      size: {
        sm: "h-5 w-5",
        default: "h-6 w-6 xl:h-7 xl:w-7",
        lg: "h-7 w-7 sm:h-8 sm:w-8"
      }
    },
    defaultVariants: {
      variant: "outline",
      size: "default"
    }
  }
);

export interface PillButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof pillButtonVariants> {
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
      type = "button",
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
            variant === "white" && "group-hover:text-primary text-[#141432]",
            variant === "dark" && "text-white",
            labelClassName
          )}
        >
          {children}
        </span>
        <div className={cn(iconBadgeVariants({ variant, size }), badgeClassName)}>
          {icon !== undefined ? (
            icon
          ) : (
            <Check
              className={cn(
                "stroke-[2.5]",
                size === "sm"
                  ? "h-3 w-3"
                  : size === "lg"
                    ? "h-4 w-4 sm:h-4.5 sm:w-4.5"
                    : "h-3.5 w-3.5 xl:h-4 xl:w-4",
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
        type={type}
        className={cn(pillButtonVariants({ variant, size, className }))}
        {...props}
      >
        {content}
      </button>
    );
  }
);

PillButton.displayName = "PillButton";
