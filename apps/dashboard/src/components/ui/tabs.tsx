"use client";

import * as React from "react";

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

function Tabs({ className, orientation = "horizontal", ...props }: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn(
        "group/tabs flex w-full flex-col gap-6",
        orientation === "vertical" && "flex-row gap-6",
        className
      )}
      {...props}
    />
  );
}

const tabsListVariants = cva(
  "group/tabs-list bg-muted/60 text-muted-foreground inline-flex items-center rounded-xl p-1",
  {
    variants: {
      variant: {
        default: "bg-muted/60",
        line: "border-border gap-1 rounded-none border-b bg-transparent p-0"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

function TabsList({
  className,
  variant = "default",
  ...props
}: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        "text-muted-foreground hover:text-foreground hover:bg-muted/80 inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-xs font-bold transition-all select-none sm:text-sm",
        "data-[active]:bg-background data-[active]:text-foreground data-[selected]:bg-background data-[selected]:text-foreground data-[active]:shadow-xs data-[selected]:shadow-xs",
        "data-active:bg-background data-active:text-foreground data-active:shadow-xs",
        "focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn("w-full flex-1 text-sm outline-hidden focus-visible:outline-hidden", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants };
