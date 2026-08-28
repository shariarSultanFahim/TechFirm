"use client";

import { Zap } from "lucide-react";

import { caseStudies, DarkCaseCard, LightCaseCard } from "@/components/portfolio";
import { PillButton } from "@/components/ui";

export function AboutPortfolioSection() {
  const aarex = caseStudies.find((s) => s.id === "aarex") || caseStudies[0]!;
  const acce = caseStudies.find((s) => s.id === "acce") || caseStudies[1]!;
  const arc = caseStudies.find((s) => s.id === "arc") || caseStudies[2]!;

  return (
    <section className="mb-16 w-full py-8 sm:mb-20 sm:py-14">
      {/* Header */}
      <div className="mb-10 space-y-4 sm:mb-12">
        <div className="flex items-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#CDF5F8] px-3.5 py-1 text-xs font-semibold text-[#0891B2]">
            <Zap className="h-3.5 w-3.5 fill-current text-[#5C5C5C]" />
            <span>Our Portfolio</span>
          </span>
        </div>

        {/* Full-width Divider Accent */}
        <div className="h-0.5 w-full rounded-full bg-[#00D4D8]/30" />

        {/* Row: Title & View Portfolio Button */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <h2 className="max-w-2xl text-left text-2xl leading-tight font-bold tracking-tight text-[#141432] sm:text-3xl lg:text-4xl">
            We provide IT design for companies and businesses worldwide.
          </h2>

          <div className="flex shrink-0 justify-start md:justify-end">
            <PillButton href="/portfolio" variant="dark" size="lg">
              View Portfolio
            </PillButton>
          </div>
        </div>
      </div>

      {/* 2-Row Showcase Grid */}
      <div className="space-y-8">
        {/* Row 1: 2 Light Cards (Aarex & Acce) */}
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2">
          <LightCaseCard item={aarex} />
          <LightCaseCard item={acce} />
        </div>

        {/* Row 2: 1 Full-Width Dark Card (ARC) */}
        <DarkCaseCard item={arc} />
      </div>
    </section>
  );
}
