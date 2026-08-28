import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "focus-visible:ring-ring inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 text-sm font-semibold whitespace-nowrap transition-all duration-200 outline-none select-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-linear-to-r from-[#864FFE] to-[#7033F5] text-white shadow-md hover:opacity-95 hover:shadow-lg active:scale-[0.98]",
        primary:
          "bg-linear-to-r from-[#864FFE] to-[#7033F5] text-white shadow-md hover:opacity-95 hover:shadow-lg active:scale-[0.98]",
        secondary: "bg-[#CDF5F8] text-[#141432] hover:bg-[#b8eef2] active:scale-[0.98]",
        outline:
          "border-border/70 hover:border-primary hover:text-primary hover:bg-primary/5 border bg-white text-[#141432] active:scale-[0.98]",
        ghost: "hover:bg-muted hover:text-primary text-[#141432] active:scale-[0.98]",
        destructive:
          "bg-destructive hover:bg-destructive/90 text-white shadow-sm active:scale-[0.98]",
        link: "text-primary h-auto p-0 font-medium underline-offset-4 hover:underline",
        white:
          "border-border/50 hover:border-primary hover:text-primary border bg-white text-[#141432] shadow-xs hover:shadow-sm active:scale-[0.98]"
      },
      size: {
        default: "h-10 rounded-lg px-5 py-2 text-sm",
        sm: "h-8 rounded-md px-3.5 text-xs",
        lg: "h-12 rounded-xl px-7 text-base",
        pill: "h-10 rounded-full px-6 text-xs font-bold",
        "pill-sm": "h-8 rounded-full px-4 text-xs font-semibold",
        "pill-lg": "h-12 rounded-full px-8 text-sm font-bold",
        icon: "size-10 rounded-full",
        "icon-sm": "size-8 rounded-full",
        "icon-lg": "size-12 rounded-full"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
