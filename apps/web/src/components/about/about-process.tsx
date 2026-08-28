"use client";

import Link from "next/link";

import { ArrowDownRight } from "lucide-react";

import { SectionHeader } from "@/components/widgets";

import { CloudAccelIcon, MailReceptionIcon, SafeStableIcon } from "./about-icons";

const processSteps = [
  {
    step: "Step 01",
    icon: SafeStableIcon,
    title: "Unique Solutions",
    description:
      "Know-how and every thing you will need to receive fast, reliable printing services.",
    href: "/services"
  },
  {
    step: "Step 02",
    icon: CloudAccelIcon,
    title: "Project Overview",
    description:
      "Know-how and every thing you will need to receive fast, reliable printing services.",
    href: "/services"
  },
  {
    step: "Step 03",
    icon: MailReceptionIcon,
    title: "Digital Instrument",
    description:
      "Know-how and every thing you will need to receive fast, reliable printing services.",
    href: "/services"
  }
];

export function AboutProcess() {
  return (
    <section className="w-full py-8 sm:py-14">
      {/* Header */}
      <SectionHeader
        align="center"
        badge="OUR WORKING PROCESS"
        title="How Techfirm Working Process"
        className="mb-14 sm:mb-20"
      />

      {/* 3 Step Connected Workflow */}
      <div className="relative grid grid-cols-1 items-start gap-12 sm:gap-8 md:grid-cols-3">
        {/* Curved Dotted Connecting Line for Desktop */}
        <div className="pointer-events-none absolute top-12 right-1/6 left-1/6 z-0 hidden h-12 md:block">
          <svg
            className="h-full w-full"
            viewBox="0 0 700 60"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M 50 30 Q 200 60 350 30 T 650 30"
              stroke="#D1D5DB"
              strokeWidth="2"
              strokeDasharray="6 6"
              fill="none"
            />
          </svg>
        </div>

        {processSteps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.step}
              className="group relative z-10 mx-auto flex max-w-xs flex-col items-center space-y-4 text-center select-none"
            >
              {/* Icon Graphic */}
              <div className="flex h-16 w-16 items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <Icon className="h-14 w-14 object-contain" />
              </div>

              {/* Step Badge */}
              <span className="inline-block rounded-full bg-[#141432] px-4 py-1 text-xs font-bold text-white shadow-2xs">
                {step.step}
              </span>

              {/* Content */}
              <div className="space-y-2">
                <h3 className="group-hover:text-primary text-lg font-bold text-[#141432] transition-colors sm:text-xl">
                  {step.title}
                </h3>
                <p className="text-xs leading-relaxed font-medium text-[#5C5C6E] sm:text-sm">
                  {step.description}
                </p>
              </div>

              {/* Action Link */}
              <div className="pt-2">
                <Link
                  href={step.href}
                  className="group-hover:text-primary inline-flex cursor-pointer items-center gap-1.5 text-xs font-bold text-[#141432] transition-colors sm:text-sm"
                >
                  <span>Explore More</span>
                  <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
