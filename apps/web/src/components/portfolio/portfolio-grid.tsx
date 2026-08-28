"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight } from "lucide-react";
import { caseStudies, type CaseStudy } from "./portfolio-data";
import { PortfolioLogo } from "./portfolio-logos";

function LightCaseCard({ item }: { item: CaseStudy }) {
  return (
    <Link
      href={`/portfolio/${item.slug}`}
      className="relative rounded-3xl p-7 sm:p-9 bg-[#F9FAFB] border border-[#EDE8F5] shadow-2xs hover:shadow-xl hover:border-primary/40 transition-all duration-300 group flex flex-col justify-between overflow-hidden min-h-[360px] select-none"
    >
      {/* Top Category Badge */}
      <div className="mb-4">
        <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold bg-[#CDF5F8] text-[#0891B2]">
          {item.category}
        </span>
      </div>

      {/* Middle Content & Image */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center my-auto">
        <div className="sm:col-span-6 space-y-4">
          <div className="h-8 flex items-center">
            <PortfolioLogo id={item.id} className="h-7 w-auto object-contain" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-[#141432] group-hover:text-primary transition-colors leading-snug">
            {item.title}
          </h3>
        </div>

        {item.image && (
          <div className="sm:col-span-6 flex justify-center sm:justify-end">
            <Image
              src={item.image}
              alt={item.title}
              width={400}
              height={300}
              className="w-auto h-40 sm:h-48 object-contain group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
      </div>

      {/* Bottom Action Footer */}
      <div className="flex items-center justify-between pt-6 mt-4 border-t border-[#EDE8F5]/60">
        <span className="text-xs sm:text-sm font-semibold text-[#141432] group-hover:text-primary transition-colors">
          {item.actionText}
        </span>
        <div className="w-8 h-8 rounded-full bg-white group-hover:bg-primary group-hover:text-white flex items-center justify-center text-[#141432] transition-colors shadow-2xs">
          <ArrowDownRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}

function DarkCaseCard({ item }: { item: CaseStudy }) {
  return (
    <Link
      href={`/portfolio/${item.slug}`}
      className="relative rounded-3xl p-8 sm:p-12 bg-[#242627] text-white shadow-xl hover:shadow-2xl hover:border-primary/40 border border-transparent transition-all duration-300 group flex flex-col justify-between overflow-hidden min-h-[420px] select-none"
    >
      {/* Background Graphic Pattern */}
      {item.bgImage && (
        <Image
          src={item.bgImage}
          alt="Card Background Graphic"
          fill
          priority
          className="object-cover object-center opacity-85 pointer-events-none"
        />
      )}

      {/* Top Category Badge */}
      <div className="relative z-10 mb-4">
        <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold bg-[#CDF5F8] text-[#0891B2]">
          {item.category}
        </span>
      </div>

      {/* Middle Content & Feature Graphic */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
        <div className="lg:col-span-5 space-y-6">
          <div className="h-9 flex items-center">
            <PortfolioLogo id={item.id} className="h-8 w-auto object-contain" />
          </div>
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white group-hover:text-[#00D4D8] transition-colors leading-snug max-w-md">
            {item.title}
          </h3>
        </div>

        {item.image && (
          <div className="lg:col-span-7 flex justify-center lg:justify-end">
            <Image
              src={item.image}
              alt={item.title}
              width={650}
              height={420}
              className="w-auto max-h-64 sm:max-h-80 object-contain group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
      </div>

      {/* Bottom Action Footer */}
      <div className="relative z-10 flex items-center justify-between pt-6 mt-4 border-t border-white/10">
        <span className="text-xs sm:text-sm font-semibold text-white/90 group-hover:text-white transition-colors">
          {item.actionText}
        </span>
        <div className="w-8 h-8 rounded-full bg-white/15 group-hover:bg-primary group-hover:text-white flex items-center justify-center text-white transition-colors">
          <ArrowDownRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}

export function PortfolioGrid() {
  const aarex = caseStudies.find((s) => s.id === "aarex") || caseStudies[0]!;
  const acce = caseStudies.find((s) => s.id === "acce") || caseStudies[1]!;
  const arc = caseStudies.find((s) => s.id === "arc") || caseStudies[2]!;
  const abc = caseStudies.find((s) => s.id === "abc") || caseStudies[3]!;
  const frea = caseStudies.find((s) => s.id === "frea") || caseStudies[4]!;
  const raze = caseStudies.find((s) => s.id === "raze") || caseStudies[5]!;

  return (
    <div className="w-full space-y-8">
      {/* Row 1: 2 Light Cards (Aarex & Acce) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        <LightCaseCard item={aarex} />
        <LightCaseCard item={acce} />
      </div>

      {/* Row 2: 1 Full-Width Dark Card (ARC) */}
      <DarkCaseCard item={arc} />

      {/* Row 3: 2 Light Cards (ABC & Frea) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        <LightCaseCard item={abc} />
        <LightCaseCard item={frea} />
      </div>

      {/* Row 4: 1 Full-Width Dark Card (Raze) */}
      <DarkCaseCard item={raze} />
    </div>
  );
}
