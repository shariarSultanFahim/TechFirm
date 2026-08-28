"use client";

import { Zap } from "lucide-react";
import { PillButton } from "@/components/ui";
import {
  caseStudies,
  LightCaseCard,
  DarkCaseCard
} from "@/components/portfolio";

export function AboutPortfolioSection() {
  const aarex = caseStudies.find((s) => s.id === "aarex") || caseStudies[0]!;
  const acce = caseStudies.find((s) => s.id === "acce") || caseStudies[1]!;
  const arc = caseStudies.find((s) => s.id === "arc") || caseStudies[2]!;

  return (
    <section className="w-full py-8 sm:py-14 mb-16 sm:mb-20">
      {/* Header */}
      <div className="space-y-4 mb-10 sm:mb-12">
        <div className="flex items-center">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#CDF5F8] text-[#0891B2]">
            <Zap className="w-3.5 h-3.5 fill-current text-[#5C5C5C]" />
            <span>Our Portfolio</span>
          </span>
        </div>

        {/* Full-width Divider Accent */}
        <div className="w-full h-0.5 bg-[#00D4D8]/30 rounded-full" />

        {/* Row: Title & View Portfolio Button */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#141432] tracking-tight leading-tight max-w-2xl text-left">
            We provide IT design for companies and businesses worldwide.
          </h2>

          <div className="shrink-0 flex justify-start md:justify-end">
            <PillButton href="/portfolio" variant="dark" size="lg">
              View Portfolio
            </PillButton>
          </div>
        </div>
      </div>

      {/* 2-Row Showcase Grid */}
      <div className="space-y-8">
        {/* Row 1: 2 Light Cards (Aarex & Acce) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <LightCaseCard item={aarex} />
          <LightCaseCard item={acce} />
        </div>

        {/* Row 2: 1 Full-Width Dark Card (ARC) */}
        <DarkCaseCard item={arc} />
      </div>
    </section>
  );
}
