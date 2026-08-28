"use client";

import Link from "next/link";
import { ArrowDownRight } from "lucide-react";
import { SectionHeader } from "@/components/widgets";
import {
  SafeStableIcon,
  CloudAccelIcon,
  MailReceptionIcon
} from "./about-icons";

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
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-8 items-start">
        {/* Curved Dotted Connecting Line for Desktop */}
        <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-12 pointer-events-none z-0">
          <svg
            className="w-full h-full"
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
              className="relative z-10 flex flex-col items-center text-center space-y-4 max-w-xs mx-auto group select-none"
            >
              {/* Icon Graphic */}
              <div className="w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Icon className="w-14 h-14 object-contain" />
              </div>

              {/* Step Badge */}
              <span className="inline-block px-4 py-1 rounded-full bg-[#141432] text-white text-xs font-bold shadow-2xs">
                {step.step}
              </span>

              {/* Content */}
              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-[#141432] group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5C5C6E] leading-relaxed font-medium">
                  {step.description}
                </p>
              </div>

              {/* Action Link */}
              <div className="pt-2">
                <Link
                  href={step.href}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#141432] group-hover:text-primary transition-colors cursor-pointer"
                >
                  <span>Explore More</span>
                  <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
