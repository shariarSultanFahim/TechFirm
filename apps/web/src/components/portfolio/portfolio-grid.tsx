"use client";

import Image from "next/image";
import Link from "next/link";

import { ArrowDownRight } from "lucide-react";

import { IPortfolioItem } from "@repo/types";

import { usePortfolio } from "@/hooks/use-portfolio";

import { caseStudies, type CaseStudy } from "./portfolio-data";
import { PortfolioLogo } from "./portfolio-logos";

export function LightCaseCard({ item }: { item: CaseStudy }) {
  return (
    <Link
      href={`/portfolio/${item.slug}`}
      className="hover:border-primary/40 group relative flex min-h-[360px] flex-col justify-between overflow-hidden rounded-3xl border border-[#EDE8F5] bg-[#F9FAFB] p-7 shadow-2xs transition-all duration-300 select-none hover:shadow-xl sm:p-9"
    >
      {/* Top Category Badge */}
      <div className="mb-4">
        <span className="inline-block rounded-full bg-[#CDF5F8] px-3.5 py-1 text-xs font-semibold text-[#0891B2]">
          {item.category}
        </span>
      </div>

      {/* Middle Content & Image */}
      <div className="my-auto grid grid-cols-1 items-center gap-6 sm:grid-cols-12">
        <div className="space-y-4 sm:col-span-6">
          <div className="flex h-8 items-center">
            <PortfolioLogo id={item.id} className="h-20 w-auto object-contain" />
          </div>
          <h3 className="group-hover:text-primary text-lg leading-snug font-bold text-[#141432] transition-colors sm:text-xl">
            {item.title}
          </h3>
        </div>

        {item.image && (
          <div className="flex justify-center sm:col-span-6 sm:justify-end">
            <Image
              src={item.image}
              alt={item.title}
              width={400}
              height={300}
              className="h-40 w-auto object-contain transition-transform duration-500 group-hover:scale-105 sm:h-48"
            />
          </div>
        )}
      </div>

      {/* Bottom Action Footer */}
      <div className="mt-4 flex items-center justify-between border-t border-[#EDE8F5]/60 pt-6">
        <span className="group-hover:text-primary text-xs font-semibold text-[#141432] transition-colors sm:text-sm">
          {item.actionText}
        </span>
        <div className="group-hover:bg-primary flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#141432] shadow-2xs transition-colors group-hover:text-white">
          <ArrowDownRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}

export function DarkCaseCard({ item }: { item: CaseStudy }) {
  return (
    <Link
      href={`/portfolio/${item.slug}`}
      className="hover:border-primary/40 group relative flex min-h-[420px] flex-col justify-between overflow-hidden rounded-3xl border border-transparent bg-[#242627] p-8 text-white shadow-xl transition-all duration-300 select-none hover:shadow-2xl sm:p-12"
    >
      {/* Background Graphic Pattern */}
      {item.bgImage && (
        <Image
          src={item.bgImage}
          alt="Card Background Graphic"
          fill
          priority
          className="pointer-events-none object-cover object-center opacity-85"
        />
      )}

      {/* Top Category Badge */}
      <div className="relative z-10 mb-4">
        <span className="inline-block rounded-full bg-[#CDF5F8] px-3.5 py-1 text-xs font-semibold text-[#0891B2]">
          {item.category}
        </span>
      </div>

      {/* Middle Content & Feature Graphic */}
      <div className="relative z-10 my-auto grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-5">
          <div className="flex h-9 items-center">
            <PortfolioLogo id={item.id} className="h-20 w-auto object-contain" />
          </div>
          <h3 className="max-w-md text-xl leading-snug font-bold text-white transition-colors group-hover:text-[#00D4D8] sm:text-2xl lg:text-3xl">
            {item.title}
          </h3>
        </div>

        {item.image && (
          <div className="flex justify-center lg:col-span-7 lg:justify-end">
            <Image
              src={item.image}
              alt={item.title}
              width={650}
              height={420}
              className="max-h-64 w-auto object-contain transition-transform duration-500 group-hover:scale-105 sm:max-h-80"
            />
          </div>
        )}
      </div>

      {/* Bottom Action Footer */}
      <div className="relative z-10 mt-4 flex items-center justify-between border-t border-white/10 pt-6">
        <span className="text-xs font-semibold text-white/90 transition-colors group-hover:text-white sm:text-sm">
          {item.actionText}
        </span>
        <div className="group-hover:bg-primary flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white transition-colors group-hover:text-white">
          <ArrowDownRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}

function resolveCaseStudy(keyId: string, apiItems: IPortfolioItem[]): CaseStudy {
  const staticItem = caseStudies.find((s) => s.id === keyId) || caseStudies[0]!;

  const apiMatch = apiItems.find(
    (s) => s.id === keyId || s.slug.startsWith(keyId) || s.slug.includes(keyId)
  );

  if (!apiMatch) return staticItem;

  return {
    ...staticItem,
    title: apiMatch.title || staticItem.title,
    slug: apiMatch.slug || staticItem.slug,
    category: apiMatch.category || staticItem.category,
    actionText: apiMatch.actionText || staticItem.actionText
  };
}

export function PortfolioGrid() {
  const { data: apiItems = [] } = usePortfolio();

  const aarex = resolveCaseStudy("aarex", apiItems);
  const acce = resolveCaseStudy("acce", apiItems);
  const arc = resolveCaseStudy("arc", apiItems);
  const abc = resolveCaseStudy("abc", apiItems);
  const frea = resolveCaseStudy("frea", apiItems);
  const raze = resolveCaseStudy("raze", apiItems);

  return (
    <div className="w-full space-y-8">
      {/* Row 1: 2 Light Cards (Aarex & Acce) */}
      <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2">
        <LightCaseCard item={aarex} />
        <LightCaseCard item={acce} />
      </div>

      {/* Row 2: 1 Full-Width Dark Card (ARC) */}
      <DarkCaseCard item={arc} />

      {/* Row 3: 2 Light Cards (ABC & Frea) */}
      <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2">
        <LightCaseCard item={abc} />
        <LightCaseCard item={frea} />
      </div>

      {/* Row 4: 1 Full-Width Dark Card (Raze) */}
      <DarkCaseCard item={raze} />
    </div>
  );
}
