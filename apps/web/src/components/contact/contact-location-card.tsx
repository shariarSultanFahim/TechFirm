import Image from "next/image";
import { Server, ShieldCheck, Zap, Globe, Clock, Check } from "lucide-react";
import techfarmBg from "@/assets/techfarm/bg.png";

export function ContactLocationCard() {
  return (
    <div className="flex flex-col gap-6 h-full justify-between">
      {/* 1. Global Infrastructure SLA Card */}
      <div className="rounded-3xl border border-[#EDE8F5] bg-white p-7 sm:p-9 shadow-xs text-left relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-xs font-bold uppercase tracking-wider mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>All Systems Operational</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-[#141432] tracking-tight mb-3">
          Guaranteed Rapid Technical Response
        </h3>

        <p className="text-xs sm:text-sm text-[#5C5C6E] leading-relaxed mb-8 font-medium">
          Every inquiry directly routes to our senior tier-3 engineers and cloud specialists rather than automated bot loops.
        </p>

        {/* 3 Metrics */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#EDE8F5] mb-8">
          <div>
            <div className="text-xl sm:text-2xl font-extrabold text-[#141432]">
              99.99%
            </div>
            <div className="text-[11px] font-semibold text-muted-foreground">
              Uptime SLA
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-extrabold text-[#141432]">
              &lt; 15m
            </div>
            <div className="text-[11px] font-semibold text-muted-foreground">
              Response Time
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-extrabold text-[#141432]">
              24/7/365
            </div>
            <div className="text-[11px] font-semibold text-muted-foreground">
              Live Support
            </div>
          </div>
        </div>

        {/* 3 Checkmarks matching footer/hero */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-[#141432]">
            <div className="w-5 h-5 rounded-full bg-[#E0F7F6] text-[#0D9488] flex items-center justify-center shrink-0">
              <Check className="w-3 h-3 stroke-[3]" />
            </div>
            <span>Direct consultation with certified cloud architects</span>
          </div>
          <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-[#141432]">
            <div className="w-5 h-5 rounded-full bg-[#E0F7F6] text-[#0D9488] flex items-center justify-center shrink-0">
              <Check className="w-3 h-3 stroke-[3]" />
            </div>
            <span>Custom tailored migration & security roadmap</span>
          </div>
          <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-[#141432]">
            <div className="w-5 h-5 rounded-full bg-[#E0F7F6] text-[#0D9488] flex items-center justify-center shrink-0">
              <Check className="w-3 h-3 stroke-[3]" />
            </div>
            <span>Transparent pricing without hidden ingress fees</span>
          </div>
        </div>
      </div>

      {/* 2. Global Datacenter Network Graphic */}
      <div className="rounded-3xl border border-[#EDE8F5] bg-linear-to-br from-[#150E3D] to-[#251A5A] text-white p-7 sm:p-8 shadow-xs relative overflow-hidden flex flex-col justify-between select-none">
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A0A0C0]">
              Global Coverage
            </span>
            <span className="text-xs font-bold text-[#00D4D8]">
              12 Global Regions
            </span>
          </div>
          <h4 className="text-lg font-bold text-white mb-2">
            Low Latency Datacenter Clusters
          </h4>
          <p className="text-xs text-[#A0A0C0] leading-relaxed">
            North America, Europe, Asia Pacific, and Latin America edge locations.
          </p>
        </div>

        <div className="relative w-full h-32 mt-4 opacity-75">
          <Image
            src={techfarmBg}
            alt="World Datacenter Network"
            fill
            className="object-contain object-center"
          />
        </div>
      </div>
    </div>
  );
}
