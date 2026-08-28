"use client";

import Image from "next/image";
import Link from "next/link";

import { ArrowRight, Check, Zap } from "lucide-react";

import geminiLogo from "@/assets/service-solution/service-details/gemeni-logo.png";

import { PillButton } from "@/components/ui";

import type { ServiceDetail } from "./service-data";
import { ServiceWorkProcess } from "./service-work-process";

interface ServiceDetailViewProps {
  service: ServiceDetail;
}

export function ServiceDetailView({ service }: ServiceDetailViewProps) {
  return (
    <article className="w-full bg-white pb-16 sm:pb-24">
      {/* 1. Full-Width Hero Banner with Background Image & Contained max-w-7xl Content */}
      <div className="relative mb-16 flex min-h-[360px] w-full items-center overflow-hidden sm:mb-24 sm:min-h-[420px] lg:min-h-[460px]">
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
        <div className="relative z-10 container mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="max-w-xl text-left">
            {/* Top Pill Badge */}
            <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3.5 py-1 text-xs font-semibold text-white shadow-2xs backdrop-blur-md">
              <Zap className="h-3.5 w-3.5 fill-current text-white" />
              <span>Service Details</span>
            </div>

            {/* Title */}
            <h1 className="mb-4 text-3xl leading-tight font-bold tracking-tight text-white sm:text-4xl lg:text-[44px]">
              {service.title}
            </h1>

            {/* Subtitle */}
            <p className="mb-8 max-w-lg text-xs leading-relaxed font-medium text-white/90 sm:text-sm">
              {service.heroSubtitle}
            </p>

            {/* CTA Button */}
            <div>
              <Link
                href="/contact"
                className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-6 py-3 text-xs font-bold text-[#141432] shadow-md transition-all duration-300 hover:bg-white/90 hover:shadow-lg active:scale-95 sm:text-sm"
              >
                <span>Schedule A Free Consultation</span>
                <ArrowRight className="text-primary h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Page Content Body */}
      <div className="container mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        {/* 2. Boost Productivity & Performance Section */}
        <div className="mb-16 grid grid-cols-1 items-center gap-10 sm:mb-24 lg:grid-cols-12 lg:gap-14">
          <div className="space-y-6 text-left lg:col-span-6">
            <div>
              <h2 className="mb-3 text-2xl leading-snug font-bold tracking-tight text-[#141432] sm:text-3xl">
                {service.productivityTitle}
              </h2>
              <p className="text-xs leading-relaxed font-medium text-[#5C5C6E] sm:text-sm">
                {service.productivityDescription}
              </p>
            </div>

            <div className="h-px w-full bg-[#EDE8F5]" />

            {/* Bullet Points */}
            <ul className="space-y-3">
              {service.bullets1.map((bullet, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-3 text-xs font-medium text-[#5C5C6E] sm:text-sm"
                >
                  <span className="text-base font-bold text-[#00D4D8]">→</span>
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
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-[#EDE8F5] bg-neutral-100 shadow-md">
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
        <div className="mb-16 grid grid-cols-1 items-center gap-10 sm:mb-24 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-[#EDE8F5] bg-neutral-100 shadow-md">
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
                alt="Business Finances Team"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
          </div>

          <div className="space-y-6 text-left lg:col-span-6">
            <h2 className="text-2xl leading-snug font-bold tracking-tight text-[#141432] sm:text-3xl">
              {service.financesTitle}
            </h2>

            <div className="space-y-4">
              {service.financesParagraphs.map((para, idx) => (
                <p
                  key={idx}
                  className="text-xs leading-relaxed font-medium text-[#5C5C6E] sm:text-sm"
                >
                  {para}
                </p>
              ))}
            </div>

            {/* 2 Metric Stat Cards */}
            <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
              {/* Card 1 (Light) */}
              <div className="space-y-1 rounded-2xl border border-[#EDE8F5] bg-[#F9FAFB] p-6 text-left shadow-2xs">
                <div className="text-3xl font-extrabold text-[#141432] sm:text-4xl">
                  {service.metrics.stat1}
                </div>
                <p className="text-xs leading-relaxed font-medium text-[#5C5C6E]">
                  {service.metrics.label1}
                </p>
              </div>

              {/* Card 2 (Cyan) */}
              <div className="space-y-1 rounded-2xl bg-[#864FFE] p-6 text-left text-white shadow-md">
                <div className="text-3xl font-extrabold text-white sm:text-4xl">
                  {service.metrics.stat2}
                </div>
                <p className="text-xs leading-relaxed font-medium text-white/90">
                  {service.metrics.label2}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Bottom Summary & 4-Item Checkmarks Section */}
        <div className="grid grid-cols-1 items-start gap-10 border-t border-[#EDE8F5] pt-6 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Summary & Bullets */}
          <div className="space-y-5 text-left lg:col-span-6">
            <p className="text-xs leading-relaxed font-medium text-[#5C5C6E] sm:text-sm">
              {service.summaryText}
            </p>

            <ul className="space-y-3 pt-2">
              {service.bullets2.map((bullet, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-xs font-medium text-[#5C5C6E] sm:text-sm"
                >
                  <span className="text-base leading-none font-bold text-[#00D4D8]">→</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: 2x2 Grid of Checkmark Results */}
          <div className="grid grid-cols-1 gap-6 text-left sm:grid-cols-2 sm:gap-8 lg:col-span-6">
            {service.results.map((res, idx) => (
              <div key={idx} className="space-y-2.5">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#10B981] text-white shadow-xs">
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                </div>
                <h4 className="text-sm leading-tight font-bold text-[#141432]">{res.title}</h4>
                <p className="text-xs leading-relaxed font-medium text-[#5C5C6E]">
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
