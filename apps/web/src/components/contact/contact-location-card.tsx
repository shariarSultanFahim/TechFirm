import Image from "next/image";

import { Check, Clock, Globe, Server, ShieldCheck, Zap } from "lucide-react";

import techfarmBg from "@/assets/techfarm/bg.png";

export function ContactLocationCard() {
  return (
    <div className="flex h-full flex-col justify-between gap-6">
      {/* 1. Global Infrastructure SLA Card */}
      <div className="relative overflow-hidden rounded-3xl border border-[#EDE8F5] bg-white p-7 text-left shadow-xs sm:p-9">
        {/* Subtle background glow */}
        <div className="bg-primary/5 pointer-events-none absolute top-0 right-0 h-64 w-64 rounded-full blur-3xl" />

        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200/60 bg-emerald-50 px-3 py-1 text-xs font-bold tracking-wider text-emerald-700 uppercase">
          <span className="h-2 w-2 animate-ping rounded-full bg-emerald-500" />
          <span>All Systems Operational</span>
        </div>

        <h3 className="mb-3 text-xl font-bold tracking-tight text-[#141432] sm:text-2xl">
          Guaranteed Rapid Technical Response
        </h3>

        <p className="mb-8 text-xs leading-relaxed font-medium text-[#5C5C6E] sm:text-sm">
          Every inquiry directly routes to our senior tier-3 engineers and cloud specialists rather
          than automated bot loops.
        </p>

        {/* 3 Metrics */}
        <div className="mb-8 grid grid-cols-3 gap-3 border-t border-[#EDE8F5] pt-4">
          <div>
            <div className="text-xl font-extrabold text-[#141432] sm:text-2xl">99.99%</div>
            <div className="text-muted-foreground text-[11px] font-semibold">Uptime SLA</div>
          </div>
          <div>
            <div className="text-xl font-extrabold text-[#141432] sm:text-2xl">&lt; 15m</div>
            <div className="text-muted-foreground text-[11px] font-semibold">Response Time</div>
          </div>
          <div>
            <div className="text-xl font-extrabold text-[#141432] sm:text-2xl">24/7/365</div>
            <div className="text-muted-foreground text-[11px] font-semibold">Live Support</div>
          </div>
        </div>

        {/* 3 Checkmarks matching footer/hero */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-xs font-semibold text-[#141432] sm:text-sm">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E0F7F6] text-[#0D9488]">
              <Check className="h-3 w-3 stroke-[3]" />
            </div>
            <span>Direct consultation with certified cloud architects</span>
          </div>
          <div className="flex items-center gap-3 text-xs font-semibold text-[#141432] sm:text-sm">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E0F7F6] text-[#0D9488]">
              <Check className="h-3 w-3 stroke-[3]" />
            </div>
            <span>Custom tailored migration & security roadmap</span>
          </div>
          <div className="flex items-center gap-3 text-xs font-semibold text-[#141432] sm:text-sm">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E0F7F6] text-[#0D9488]">
              <Check className="h-3 w-3 stroke-[3]" />
            </div>
            <span>Transparent pricing without hidden ingress fees</span>
          </div>
        </div>
      </div>

      {/* 2. Global Datacenter Network Graphic */}
      <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#EDE8F5] bg-linear-to-br from-[#150E3D] to-[#251A5A] p-7 text-white shadow-xs select-none sm:p-8">
        <div className="relative z-10">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider text-[#A0A0C0] uppercase">
              Global Coverage
            </span>
            <span className="text-xs font-bold text-[#00D4D8]">12 Global Regions</span>
          </div>
          <h4 className="mb-2 text-lg font-bold text-white">Low Latency Datacenter Clusters</h4>
          <p className="text-xs leading-relaxed text-[#A0A0C0]">
            North America, Europe, Asia Pacific, and Latin America edge locations.
          </p>
        </div>

        <div className="relative mt-4 h-32 w-full opacity-75">
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
