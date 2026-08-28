import { PillButton } from "@/components/ui";
import { ArrowLeft, SearchSlash, X } from "lucide-react";



export default function NotFound() {
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
        {/* Center Icon Illustration */}
        <div className="relative mb-8 group">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-linear-to-br from-[#141432] to-[#252545] dark:from-[#1D1D2C] dark:to-[#2B2B3F] text-white flex items-center justify-center shadow-xl border border-border/50 group-hover:scale-105 transition-transform duration-300">
            <SearchSlash className="w-10 h-10 sm:w-12 sm:h-12 text-[#864FFE]" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-md">
            <X className="w-4 h-4" />
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground mb-4">
          Not Found
        </h1>

        {/* Subtitle / Description */}
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-lg mb-8 font-medium">
          Opps! The Page you're looking for doesn't exist or has been moved.
        </p>

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
