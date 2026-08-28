import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-linear-to-r from-[#864FFE] to-[#7033F5] text-white shadow-md hover:shadow-lg hover:opacity-95 active:scale-[0.98]",
        primary:
          "bg-linear-to-r from-[#864FFE] to-[#7033F5] text-white shadow-md hover:shadow-lg hover:opacity-95 active:scale-[0.98]",
        secondary:
          "bg-[#CDF5F8] text-[#141432] hover:bg-[#b8eef2] active:scale-[0.98]",
        outline:
          "border border-border/70 bg-white text-[#141432] hover:border-primary hover:text-primary hover:bg-primary/5 active:scale-[0.98]",
        ghost:
          "text-[#141432] hover:bg-muted hover:text-primary active:scale-[0.98]",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 shadow-sm active:scale-[0.98]",
        link:
          "text-primary underline-offset-4 hover:underline p-0 h-auto font-medium",
        white:
          "bg-white text-[#141432] border border-border/50 shadow-xs hover:border-primary hover:text-primary hover:shadow-sm active:scale-[0.98]"
      },
      size: {
        default: "h-10 px-5 py-2 rounded-lg text-sm",
        sm: "h-8 px-3.5 rounded-md text-xs",
        lg: "h-12 px-7 rounded-xl text-base",
        pill: "h-10 px-6 rounded-full text-xs font-bold",
        "pill-sm": "h-8 px-4 rounded-full text-xs font-semibold",
        "pill-lg": "h-12 px-8 rounded-full text-sm font-bold",
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
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
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
