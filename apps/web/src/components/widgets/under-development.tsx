import { PillButton } from "@/components/ui/pill-button";
import { ArrowLeft, Construction, Sparkles } from "lucide-react";

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
    <div className="relative min-h-[75vh] w-full flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-[#35A3FF]/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Subtle dotted grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#864FFE 1px, transparent 1px)`,
          backgroundSize: "24px 24px"
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold tracking-wider uppercase mb-6 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>{badge}</span>
        </div>

        {/* Center Icon Illustration */}
        <div className="relative mb-8 group">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-linear-to-br from-[#141432] to-[#252545] dark:from-[#1D1D2C] dark:to-[#2B2B3F] text-white flex items-center justify-center shadow-xl border border-border/50 group-hover:scale-105 transition-transform duration-300">
            <Construction className="w-10 h-10 sm:w-12 sm:h-12 text-[#864FFE]" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-md">
            <Sparkles className="w-4 h-4" />
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground mb-4">
          {title}
        </h1>

        {/* Subtitle / Description */}
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-lg mb-8 font-medium">
          {description}
        </p>

        {/* Progress pill indicator */}
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-muted/60 border border-border/60 text-xs text-muted-foreground mb-10">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>In Active Construction</span>
          <span className="text-border">•</span>
          <span className="font-semibold text-foreground">Launch Target: {expectedDate}</span>
        </div>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <PillButton
            href="/"
            variant="primary"
            size="lg"
            icon={<ArrowLeft className="w-4 h-4" />}
          >
            Back to Home
          </PillButton>
        </div>
      </div>
    </div>
  );
}
