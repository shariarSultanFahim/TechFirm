"use client";

import { Check, Zap } from "lucide-react";
import Image from "next/image";
import type { CaseStudy } from "./portfolio-data";

interface PortfolioDetailViewProps {
  caseStudy: CaseStudy;
}

export function PortfolioDetailView({ caseStudy }: PortfolioDetailViewProps) {
  const challengeParagraphs = caseStudy.challengeText || [
    "Are you busy putting out IT fires instead of focusing on your core business? If your technology is draining resources rather than optimizing them, Netsurit can get you back on track. A professionally managed services provider can give you the decisive edge to: If your technology is draining resources rather than optimizing them.",
    "Your experts come with proven track records to make your working relationship of data-driven insights. If your technology is draining resources rather than optimizing them, we can get you back on track. A professionally managed services provider.",
    "Additionally, in the face of increasing industry regulation and compliance requirements, Paysafe were eager to stay ahead of the curve in responding to these changes, whilst also maintaining the relentless customer focus and agility that is at the core of their DNA."
  ];

  const solutionParagraphs = caseStudy.solutionText || [
    "Your experts come with proven track records to make your working relationship of data-driven insights. If your technology is draining resources rather than optimizing them, we can get you back on track. A professionally managed services provider.",
    "You busy putting out IT fires instead of focusing on your core business? If your technology is draining resources rather than optimizing them, Netsurit can get you back on track. A professionally managed services provider can give you the decisive edge to: If your technology is draining resources rather than optimizing them.",
    "The face of increasing industry regulation and compliance requirements, Paysafe were eager to stay ahead of the curve in responding to these changes, whilst also maintaining the relentless customer focus and agility that is at the core of their DNA."
  ];

  const resultsList = caseStudy.results || [
    {
      title: "IT Service for You",
      description: "We know that every businesses' needs are completely different from the next."
    },
    {
      title: "Your Team Productive",
      description: "Our managed services include round-the-clock monitoring of your key infrastructure, computer."
    },
    {
      title: "Predictable Costs 24/7",
      description: "We doesn't charge you more when your network is down or a server fails. Our flat-rate fee programs."
    },
    {
      title: "Our Team is Ready to Help",
      description: "Part of what makes our managed services so exceptional is that we are always available."
    }
  ];

  return (
    <article className="w-full bg-white py-14 sm:py-20 lg:py-24">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. Header & Hero Mockup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12 sm:mb-16">
          <div className="lg:col-span-7 text-left">
            <div className="mb-4">
              <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-semibold bg-[#CDF5F8] text-[#0891B2]">
                <Zap className="w-3.5 h-3.5 fill-current text-[#5C5C5C]" />
                <span>Our Case Study Details</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-semibold text-[#141432] tracking-tight leading-tight mb-4">
              {caseStudy.title}
            </h1>

            <p className="text-xs sm:text-sm font-semibold text-[#0D9488]">
              Industry: {caseStudy.industry || "Banks & Insurance"}
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden bg-[#150E3D] p-6 sm:p-8 flex items-center justify-center shadow-lg border border-border/40 min-h-[260px]">
              {caseStudy.bgImage && (
                <Image
                  src={caseStudy.bgImage}
                  alt="Card pattern"
                  fill
                  priority
                  className="object-cover opacity-60 pointer-events-none"
                />
              )}
              {caseStudy.image && (
                <Image
                  src={caseStudy.image}
                  alt={caseStudy.title}
                  width={500}
                  height={320}
                  className="relative z-10 w-auto max-h-56 sm:max-h-64 object-contain"
                />
              )}
            </div>
          </div>
        </div>

        {/* 2. Intro Paragraph */}
        {caseStudy.overview && (
          <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
            <p className="text-xs sm:text-sm text-[#5C5C6E] leading-relaxed font-medium">
              {caseStudy.overview}
            </p>
          </div>
        )}

        {/* 3. The Challenge Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center mb-16 sm:mb-24">
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-md bg-neutral-100">
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
                alt="The Challenge"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
          </div>

          <div className="lg:col-span-6 text-left space-y-4">
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#141432] tracking-tight mb-4">
              The Challenge
            </h2>
            {challengeParagraphs.map((paragraph, idx) => (
              <p
                key={idx}
                className="text-xs sm:text-sm text-[#5C5C6E] leading-relaxed font-medium"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* 4. What Did Techfirm Do Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center mb-16 sm:mb-24">
          <div className="lg:col-span-6 text-left space-y-4 order-2 lg:order-1">
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#141432] tracking-tight mb-4">
              What did Techfirm do
            </h2>
            {solutionParagraphs.map((paragraph, idx) => (
              <p
                key={idx}
                className="text-xs sm:text-sm text-[#5C5C6E] leading-relaxed font-medium"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-md bg-neutral-100">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop"
                alt="What did Techfirm do"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>

        {/* 5. The Results Section */}
        <div className="text-left">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#141432] tracking-tight mb-8">
            The Results
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {resultsList.map((res, idx) => (
              <div key={idx} className="space-y-3">
                <div className="w-6 h-6 rounded-full bg-[#10B981] text-white flex items-center justify-center shadow-xs">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <h4 className="text-sm sm:text-base font-semibold text-[#141432] leading-tight">
                  {res.title}
                </h4>
                <p className="text-xs text-[#5C5C6E] leading-relaxed font-medium">
                  {res.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
