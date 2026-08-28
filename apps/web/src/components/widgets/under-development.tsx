import { ArrowLeft, Construction, Sparkles } from "lucide-react";

import { PillButton } from "@/components/ui/pill-button";

interface UnderDevelopmentProps {
  title?: string;
  badge?: string;
  description?: string;
  expectedDate?: string;
}

export function UnderDevelopment({
  title = "Page Under Development",
  badge = "COMING SOON",
  description = "We are crafting something exceptional for this space. Our engineers are hard at work putting the finishing touches on this experience.",
  expectedDate = "Q1 2026"
}: UnderDevelopmentProps) {
  return (
    <div className="relative flex min-h-[75vh] w-full items-center justify-center overflow-hidden bg-white px-4 py-20 sm:px-6 lg:px-8">
      {/* Ambient background glows */}
      <div className="bg-primary/10 pointer-events-none absolute top-1/3 left-1/2 h-[350px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]" />
      <div className="pointer-events-none absolute top-1/2 left-1/4 h-72 w-72 rounded-full bg-[#35A3FF]/10 blur-[80px]" />

      {/* Subtle dotted grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage: `radial-gradient(#864FFE 1px, transparent 1px)`,
          backgroundSize: "24px 24px"
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center text-center">
        {/* Top Badge */}
        <div className="bg-primary/10 text-primary border-primary/20 mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold tracking-wider uppercase shadow-xs">
          <Sparkles className="h-3.5 w-3.5 animate-pulse" />
          <span>{badge}</span>
        </div>

        {/* Center Icon Illustration */}
        <div className="group relative mb-8">
          <div className="border-border/50 flex h-20 w-20 items-center justify-center rounded-3xl border bg-linear-to-br from-[#141432] to-[#252545] text-white shadow-xl transition-transform duration-300 group-hover:scale-105 sm:h-24 sm:w-24 dark:from-[#1D1D2C] dark:to-[#2B2B3F]">
            <Construction className="h-10 w-10 text-[#864FFE] sm:h-12 sm:w-12" />
          </div>
          <div className="bg-primary absolute -right-2 -bottom-2 flex h-8 w-8 items-center justify-center rounded-full text-white shadow-md">
            <Sparkles className="h-4 w-4" />
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-foreground mb-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
          {title}
        </h1>

        {/* Subtitle / Description */}
        <p className="text-muted-foreground mb-8 max-w-lg text-sm leading-relaxed font-medium sm:text-base">
          {description}
        </p>

        {/* Progress pill indicator */}
        <div className="bg-muted/60 border-border/60 text-muted-foreground mb-10 inline-flex items-center gap-3 rounded-xl border px-4 py-2 text-xs">
          <span className="h-2 w-2 animate-ping rounded-full bg-emerald-500" />
          <span>In Active Construction</span>
          <span className="text-border">•</span>
          <span className="text-foreground font-semibold">Launch Target: {expectedDate}</span>
        </div>

        {/* Action Button */}
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <PillButton href="/" variant="primary" size="lg" icon={<ArrowLeft className="h-4 w-4" />}>
            Back to Home
          </PillButton>
        </div>
      </div>
    </div>
  );
}
