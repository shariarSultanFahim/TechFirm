"use client";

import Image from "next/image";

import { Check, Zap } from "lucide-react";

import { IPortfolioItem } from "@repo/types";

import type { CaseStudy } from "./portfolio-data";

interface PortfolioDetailViewProps {
  caseStudy: CaseStudy | IPortfolioItem;
}

function resolveImage(img: unknown): string {
  if (!img) return "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200";
  if (typeof img === "string") return img;
  if (typeof img === "object" && img !== null && "src" in img) {
    return (img as { src: string }).src;
  }
  return "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200";
}

export function PortfolioDetailView({ caseStudy }: PortfolioDetailViewProps) {
  const challengeParagraphs =
    caseStudy.challengeText && caseStudy.challengeText.length > 0
      ? caseStudy.challengeText
      : [
          "Are you busy putting out IT fires instead of focusing on your core business? If your technology is draining resources rather than optimizing them, Netsurit can get you back on track.",
          "Your experts come with proven track records to make your working relationship of data-driven insights.",
          "In the face of increasing industry regulation and compliance requirements, the team was eager to maintain relentless customer focus and agility."
        ];

  const solutionParagraphs =
    caseStudy.solutionText && caseStudy.solutionText.length > 0
      ? caseStudy.solutionText
      : [
          "TechFirm architected a high-throughput reactive backend architecture with sub-millisecond edge caching.",
          "Implemented end-to-end automated deployment pipelines with blue-green canary rollouts.",
          "Unified mobile learning surfaces into a single seamless offline-first progressive web and native experience."
        ];

  const resultsList =
    caseStudy.results && caseStudy.results.length > 0
      ? caseStudy.results
      : [
          {
            title: "IT Service for You",
            description:
              "We know that every businesses' needs are completely different from the next."
          },
          {
            title: "Your Team Productive",
            description:
              "Our managed services include round-the-clock monitoring of your key infrastructure."
          },
          {
            title: "Predictable Costs 24/7",
            description: "Flat-rate fee programs ensure no unexpected surprise invoices."
          },
          {
            title: "Our Team is Ready to Help",
            description:
              "Part of what makes our managed services so exceptional is our instant response times."
          }
        ];

  const heroImageUrl = resolveImage(caseStudy.image);
  const bgImageUrl = caseStudy.bgImage ? resolveImage(caseStudy.bgImage) : null;

  return (
    <article className="w-full bg-white py-14 sm:py-20 lg:py-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 1. Header & Hero Mockup */}
        <div className="mb-12 grid grid-cols-1 items-center gap-8 sm:mb-16 lg:grid-cols-12 lg:gap-12">
          <div className="text-left lg:col-span-7">
            <div className="mb-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#CDF5F8] px-4 py-1 text-xs font-semibold text-[#0891B2]">
                <Zap className="h-3.5 w-3.5 fill-current text-[#5C5C5C]" />
                <span>Our Case Study Details</span>
              </span>
            </div>

            <h1 className="mb-4 text-3xl leading-tight font-semibold tracking-tight text-[#141432] sm:text-4xl lg:text-[40px]">
              {caseStudy.title}
            </h1>

            <p className="text-xs font-semibold text-[#0D9488] sm:text-sm">
              Industry: {caseStudy.industry || "Technology & Engineering"}
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="border-border/40 relative flex min-h-[260px] items-center justify-center overflow-hidden rounded-3xl border bg-[#150E3D] p-6 shadow-lg sm:p-8">
              {bgImageUrl && (
                <Image
                  src={bgImageUrl}
                  alt="Card pattern"
                  fill
                  priority
                  className="pointer-events-none object-cover opacity-60"
                  unoptimized
                />
              )}
              {heroImageUrl && (
                <div className="relative z-10 h-48 w-full sm:h-56">
                  <Image
                    src={heroImageUrl}
                    alt={caseStudy.title}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 2. Intro Paragraph */}
        {caseStudy.overview && (
          <div className="mx-auto mb-16 max-w-3xl text-center sm:mb-20">
            <p className="text-xs leading-relaxed font-medium text-[#5C5C6E] sm:text-sm">
              {caseStudy.overview}
            </p>
          </div>
        )}

        {/* 3. The Challenge Section */}
        <div className="mb-16 grid grid-cols-1 items-center gap-8 sm:mb-24 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-neutral-100 shadow-md">
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
                alt="The Challenge"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
                unoptimized
              />
            </div>
          </div>

          <div className="space-y-4 text-left lg:col-span-6">
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-[#141432] sm:text-3xl">
              The Challenge
            </h2>
            {challengeParagraphs.map((paragraph, idx) => (
              <p
                key={idx}
                className="text-xs leading-relaxed font-medium text-[#5C5C6E] sm:text-sm"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* 4. The Solution Section */}
        <div className="mb-16 grid grid-cols-1 items-center gap-8 sm:mb-24 lg:grid-cols-12 lg:gap-14">
          <div className="lg:order-2 lg:col-span-6">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-neutral-100 shadow-md">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop"
                alt="The Solution"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
                unoptimized
              />
            </div>
          </div>

          <div className="space-y-4 text-left lg:order-1 lg:col-span-6">
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-[#141432] sm:text-3xl">
              The Solution
            </h2>
            {solutionParagraphs.map((paragraph, idx) => (
              <p
                key={idx}
                className="text-xs leading-relaxed font-medium text-[#5C5C6E] sm:text-sm"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* 5. Results & Metrics Section */}
        <div className="mt-8 border-t border-[#EDE8F5] pt-12">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-[#141432] sm:text-3xl">
              Results & Business Impact
            </h2>
            <p className="text-xs text-[#5C5C6E] sm:text-sm">
              Quantified performance dividends delivered by TechFirm engineering pods.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {resultsList.map((res, idx) => (
              <div
                key={idx}
                className="space-y-2 rounded-2xl border border-[#EDE8F5] bg-[#F9FAFB] p-6 text-left"
              >
                <div className="bg-primary/10 text-primary mb-3 flex h-8 w-8 items-center justify-center rounded-full">
                  <Check className="h-4 w-4 stroke-[3]" />
                </div>
                <h3 className="text-base font-bold text-[#141432]">{res.title}</h3>
                <p className="text-xs leading-relaxed text-[#5C5C6E]">{res.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
