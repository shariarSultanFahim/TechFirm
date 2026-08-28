"use client";

import Image from "next/image";

// Process Step Icons
import step1Icon from "@/assets/service-solution/work-process/fi_2274794.png";
import step2Icon from "@/assets/service-solution/work-process/fi_3659761.png";
import step3Icon from "@/assets/service-solution/work-process/fi_3820107.png";

import { PillButton } from "@/components/ui";

import { BgTopLeft, BgTopRight } from "./service-icons";

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
    <section className="relative mx-auto overflow-hidden bg-[#F5F6F7] py-16 sm:py-24 lg:py-28">
      {/* Background Circuit & Glow Artwork */}
      <div className="pointer-events-none absolute top-0 left-0 h-1/3 w-1/3 opacity-40">
        <BgTopLeft className="h-full w-full object-cover" />
      </div>
      <div className="pointer-events-none absolute top-0 right-0 h-1/3 w-1/3 opacity-50">
        <BgTopRight className="h-full w-full object-cover" />
      </div>

      {/* Large Typography Watermark */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 z-0 w-full -translate-x-1/2 -translate-y-1/2 overflow-hidden text-center select-none">
        <span className="text-[72px] font-black tracking-widest whitespace-nowrap text-[#E2E7F7] uppercase sm:text-[110px] lg:text-[140px]">
          WORK PROCESS-WORK PROCESS-WORK PROCESS-
        </span>
      </div>

      <div className="relative z-10 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Heading & CTA */}
          <div className="space-y-6 text-left lg:col-span-5">
            <div className="flex items-center gap-1.5 text-[11px] font-bold tracking-widest text-[#0D9488] uppercase">
              <span className="h-1.5 w-1.5 rounded-xs bg-[#0D9488]" />
              <span>OUR WORKING PROCESS</span>
            </div>

            <h2 className="text-3xl leading-tight font-bold tracking-tight text-[#141432] sm:text-4xl lg:text-[42px]">
              Finished Task Follow The Work Process
            </h2>

            <p className="text-xs leading-relaxed font-medium text-[#5C5C6E] sm:text-sm">
              Control of their financial future by repairing and improving their credit scores team
              of the experts is dedicated to analyzing your credit report.
            </p>

            <div className="pt-2">
              <PillButton href="/services" variant="primary" size="lg">
                View Services
              </PillButton>
            </div>
          </div>

          {/* Right Column: 3 Process Step Cards */}
          <div className="flex flex-col gap-6 lg:col-span-7">
            {processSteps.map((step) => (
              <div
                key={step.step}
                className="hover:border-primary/40 group relative flex flex-col rounded-3xl border border-[#EDE8F5] bg-white p-7 pt-9 text-left shadow-sm transition-all duration-300 select-none hover:shadow-xl sm:p-8 sm:pt-10"
              >
                {/* Number Badge — overlapping top-right corner */}
                <div className="absolute -top-4 -right-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#864FFE] text-lg font-bold text-white shadow-lg ring-4 ring-white">
                  {step.step}
                </div>

                {/* Icon — plain, no background box */}
                <div className="mb-5">
                  <Image
                    src={step.icon}
                    alt={step.title}
                    width={40}
                    height={40}
                    className="h-9 w-9 object-contain sm:h-10 sm:w-10"
                  />
                </div>

                {/* Card Title & Divider */}
                <div className="mb-3 space-y-3">
                  <h3 className="group-hover:text-primary text-lg leading-snug font-bold text-[#141432] transition-colors sm:text-xl">
                    {step.title}
                  </h3>
                  <div className="h-0.5 w-14 rounded-full bg-[#864FFE]" />
                </div>

                {/* Card Description */}
                <p className="text-sm leading-relaxed text-[#8B8B9E]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
