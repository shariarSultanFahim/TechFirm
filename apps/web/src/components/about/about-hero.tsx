"use client";

import Image from "next/image";

import { Phone } from "lucide-react";

import heroLeftImg from "@/assets/about-us/hero/hero-left-section'.png";

import { PillButton } from "@/components/ui";

import { RoutineIcon1, RoutineIcon2, TaskIcon } from "./about-icons";

export function AboutHero() {
  return (
    <section className="mb-16 w-full py-8 sm:mb-24 sm:py-12">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left Column: Composite Shaped Cutout Graphic */}
        <div className="flex justify-center lg:col-span-6 lg:justify-start">
          <div className="relative w-full max-w-[480px] select-none">
            <Image
              src={heroLeftImg}
              alt="TechFirm IT Solutions & Certified Team"
              width={540}
              height={580}
              priority
              className="h-auto w-full object-contain drop-shadow-xl"
            />
          </div>
        </div>

        {/* Right Column: Company Overview & Benefits */}
        <div className="space-y-6 text-left lg:col-span-6">
          {/* Section Pill Sub-Badge */}
          <div className="flex items-center gap-2 text-[11px] font-bold tracking-wider text-[#864FFE] uppercase">
            <span className="h-1.5 w-1.5 rounded-xs bg-[#864FFE]" />
            <span>ABOUT OUR COMPANY</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl leading-tight font-bold tracking-tight text-[#141432] sm:text-4xl lg:text-[40px]">
            Techfirm IT Solution And Servicing Around Global The World
          </h2>

          {/* 3 Benefit Points */}
          <div className="space-y-6 pt-2">
            {/* Benefit 1 */}
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#864FFE]/10 p-2.5 shadow-2xs">
                <TaskIcon className="h-6 w-6 text-[#864FFE]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-[#141432] sm:text-lg">
                  Automate Task Creation
                </h3>
                <p className="text-xs leading-relaxed font-medium text-[#5C5C6E] sm:text-sm">
                  In today&apos;s competitive business, the demand for efficient cost-effective IT
                  solutions has never been more critic.
                </p>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#864FFE]/10 p-2.5 shadow-2xs">
                <RoutineIcon1 className="h-6 w-6 text-[#864FFE]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-[#141432] sm:text-lg">
                  Simplify your daily routines
                </h3>
                <p className="text-xs leading-relaxed font-medium text-[#5C5C6E] sm:text-sm">
                  In today&apos;s competitive business, the demand for efficient cost-effective IT
                  solutions has never been more critic.
                </p>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#864FFE]/10 p-2.5 shadow-2xs">
                <RoutineIcon2 className="h-6 w-6 text-[#864FFE]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-[#141432] sm:text-lg">
                  Simplify your daily routines
                </h3>
                <p className="text-xs leading-relaxed font-medium text-[#5C5C6E] sm:text-sm">
                  In today&apos;s competitive business, the demand for efficient cost-effective IT
                  solutions has never been more critic.
                </p>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-6 pt-4">
            <PillButton href="/services" variant="primary" size="lg">
              Get Started Now
            </PillButton>

            <a href="tel:+00479394888" className="group inline-flex items-center gap-3 select-none">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#864FFE] text-white shadow-md transition-transform group-hover:scale-105">
                <Phone className="h-4 w-4 fill-current" />
              </div>
              <div className="text-left">
                <div className="text-[11px] font-semibold text-[#8B8B9E]">Call Us 24/7</div>
                <div className="group-hover:text-primary text-sm font-bold text-[#141432] transition-colors">
                  +00 (47) 939 4888
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
