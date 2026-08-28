"use client";

import { PillButton } from "@/components/ui";
import Image from "next/image";
import { BgTopLeft, BgTopRight } from "./service-icons";

// Process Step Icons
import step1Icon from "@/assets/service-solution/work-process/fi_2274794.png";
import step2Icon from "@/assets/service-solution/work-process/fi_3659761.png";
import step3Icon from "@/assets/service-solution/work-process/fi_3820107.png";

const processSteps = [
  {
    step: "01",
    icon: step1Icon,
    title: "Information Gather And Security Of Solutions",
    description:
      "By using sustainable materials, we bring beauty and strength to your home or business. Our team is proud to offer honest."
  },
  {
    step: "02",
    icon: step2Icon,
    title: "Commercial Planning For Business Consulting",
    description:
      "By using sustainable materials, we bring beauty and strength to your home or business. Our team is proud to offer honest."
  },
  {
    step: "03",
    icon: step3Icon,
    title: "Finished Proceed Of Your Consulting Solution",
    description:
      "By using sustainable materials, we bring beauty and strength to your home or business. Our team is proud to offer honest."
  }
];

export function ServiceWorkProcess() {
  return (
    <section className="relative mx-auto py-16 sm:py-24 lg:py-28 overflow-hidden bg-[#F5F6F7]">
      {/* Background Circuit & Glow Artwork */}
      <div className="absolute top-0 left-0 w-1/3 h-1/3 pointer-events-none opacity-40">
        <BgTopLeft className="w-full h-full object-cover" />
      </div>
      <div className="absolute top-0 right-0 w-1/3 h-1/3 pointer-events-none opacity-50">
        <BgTopRight className="w-full h-full object-cover" />
      </div>

      {/* Large Typography Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none z-0 overflow-hidden">
        <span className="text-[72px] sm:text-[110px] lg:text-[140px] font-black text-[#E2E7F7] tracking-widest whitespace-nowrap uppercase">
          WORK PROCESS-WORK PROCESS-WORK PROCESS-
        </span>
      </div>

      <div className="container relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Heading & CTA */}
          <div className="lg:col-span-5 text-left space-y-6">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#0D9488] uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-xs bg-[#0D9488]" />
              <span>OUR WORKING PROCESS</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#141432] tracking-tight leading-tight">
              Finished Task Follow The Work Process
            </h2>

            <p className="text-xs sm:text-sm text-[#5C5C6E] leading-relaxed font-medium">
              Control of their financial future by repairing and improving their credit scores team of the experts is dedicated to analyzing your credit report.
            </p>

            <div className="pt-2">
              <PillButton href="/services" variant="primary" size="lg">
                View Services
              </PillButton>
            </div>
          </div>

         {/* Right Column: 3 Process Step Cards */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {processSteps.map((step) => (
            <div
              key={step.step}
              className="relative rounded-3xl bg-white p-7 sm:p-8 pt-9 sm:pt-10 border border-[#EDE8F5] shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300 group flex flex-col text-left select-none"
            >
              {/* Number Badge — overlapping top-right corner */}
              <div className="absolute -top-4 -right-4 w-14 h-14 rounded-full bg-[#864FFE] text-white font-bold text-lg flex items-center justify-center shadow-lg ring-4 ring-white">
                {step.step}
              </div>

              {/* Icon — plain, no background box */}
              <div className="mb-5">
                <Image
                  src={step.icon}
                  alt={step.title}
                  width={40}
                  height={40}
                  className="w-9 h-9 sm:w-10 sm:h-10 object-contain"
                />
              </div>

              {/* Card Title & Divider */}
              <div className="space-y-3 mb-3">
                <h3 className="text-lg sm:text-xl font-bold text-[#141432] group-hover:text-primary transition-colors leading-snug">
                  {step.title}
                </h3>
                <div className="w-14 h-0.5 bg-[#864FFE] rounded-full" />
              </div>

              {/* Card Description */}
              <p className="text-sm text-[#8B8B9E] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        </div>
      </div>
    </section>
  );
}
