"use client";

import geminiLogo from "@/assets/service-solution/service-details/gemeni-logo.png";
import { PillButton } from "@/components/ui";
import { ArrowRight, Check, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ServiceDetail } from "./service-data";
import { ServiceWorkProcess } from "./service-work-process";

interface ServiceDetailViewProps {
  service: ServiceDetail;
}

export function ServiceDetailView({ service }: ServiceDetailViewProps) {
  return (
    <article className="w-full bg-white pb-16 sm:pb-24">
      {/* 1. Full-Width Hero Banner with Background Image & Contained max-w-7xl Content */}
      <div className="relative w-full overflow-hidden min-h-[360px] sm:min-h-[420px] lg:min-h-[460px] flex items-center mb-16 sm:mb-24">
        {/* Background Banner Image */}
        <Image
          src={geminiLogo}
          alt={service.title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-right"
        />

        {/* Content Container */}
        <div className="container relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-xl text-left">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold mb-4 shadow-2xs">
              <Zap className="w-3.5 h-3.5 fill-current text-white" />
              <span>Service Details</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-white tracking-tight leading-tight mb-4">
              {service.title}
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed mb-8 font-medium max-w-lg">
              {service.heroSubtitle}
            </p>

            {/* CTA Button */}
            <div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-white/90 text-[#141432] text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all duration-300 active:scale-95 cursor-pointer"
              >
                <span>Schedule A Free Consultation</span>
                <ArrowRight className="w-4 h-4 text-primary" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Page Content Body */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
        {/* 2. Boost Productivity & Performance Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16 sm:mb-24">
          <div className="lg:col-span-6 text-left space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#141432] tracking-tight leading-snug mb-3">
                {service.productivityTitle}
              </h2>
              <p className="text-xs sm:text-sm text-[#5C5C6E] leading-relaxed font-medium">
                {service.productivityDescription}
              </p>
            </div>

            <div className="w-full h-px bg-[#EDE8F5]" />

            {/* Bullet Points */}
            <ul className="space-y-3">
              {service.bullets1.map((bullet, idx) => (
                <li key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-[#5C5C6E] font-medium">
                  <span className="text-[#00D4D8] font-bold text-base">→</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            <div className="pt-2">
              <PillButton href="/contact" variant="primary" size="lg">
                Get Started Now
              </PillButton>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-md bg-neutral-100 border border-[#EDE8F5]">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop"
                alt="Productivity Team"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>

        {/* 3. All Your Business Finances Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16 sm:mb-24">
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-md bg-neutral-100 border border-[#EDE8F5]">
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
                alt="Business Finances Team"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
          </div>

          <div className="lg:col-span-6 text-left space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#141432] tracking-tight leading-snug">
              {service.financesTitle}
            </h2>

            <div className="space-y-4">
              {service.financesParagraphs.map((para, idx) => (
                <p key={idx} className="text-xs sm:text-sm text-[#5C5C6E] leading-relaxed font-medium">
                  {para}
                </p>
              ))}
            </div>

            {/* 2 Metric Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* Card 1 (Light) */}
              <div className="rounded-2xl p-6 bg-[#F9FAFB] border border-[#EDE8F5] shadow-2xs space-y-1 text-left">
                <div className="text-3xl sm:text-4xl font-extrabold text-[#141432]">
                  {service.metrics.stat1}
                </div>
                <p className="text-xs text-[#5C5C6E] font-medium leading-relaxed">
                  {service.metrics.label1}
                </p>
              </div>

              {/* Card 2 (Cyan) */}
              <div className="rounded-2xl p-6 bg-[#864FFE] text-white shadow-md space-y-1 text-left">
                <div className="text-3xl sm:text-4xl font-extrabold text-white">
                  {service.metrics.stat2}
                </div>
                <p className="text-xs text-white/90 font-medium leading-relaxed">
                  {service.metrics.label2}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Bottom Summary & 4-Item Checkmarks Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start pt-6 border-t border-[#EDE8F5]">
          {/* Left Column: Summary & Bullets */}
          <div className="lg:col-span-6 text-left space-y-5">
            <p className="text-xs sm:text-sm text-[#5C5C6E] leading-relaxed font-medium">
              {service.summaryText}
            </p>

            <ul className="space-y-3 pt-2">
              {service.bullets2.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#5C5C6E] font-medium">
                  <span className="text-[#00D4D8] font-bold text-base leading-none">→</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: 2x2 Grid of Checkmark Results */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 text-left">
            {service.results.map((res, idx) => (
              <div key={idx} className="space-y-2.5">
                <div className="w-6 h-6 rounded-full bg-[#10B981] text-white flex items-center justify-center shadow-xs">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <h4 className="text-sm font-bold text-[#141432] leading-tight">
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

      {/* 4. Finished Task Follow The Work Process Section */}
      <ServiceWorkProcess />
    </article>
  );
}
