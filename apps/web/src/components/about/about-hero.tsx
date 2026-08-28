"use client";

import Image from "next/image";
import { Phone } from "lucide-react";
import { PillButton } from "@/components/ui";
import heroLeftImg from "@/assets/about-us/hero/hero-left-section'.png";
import { TaskIcon, RoutineIcon1, RoutineIcon2 } from "./about-icons";

export function AboutHero() {
  return (
    <section className="w-full py-8 sm:py-12 mb-16 sm:mb-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Composite Shaped Cutout Graphic */}
        <div className="lg:col-span-6 flex justify-center lg:justify-start">
          <div className="relative w-full max-w-[480px] select-none">
            <Image
              src={heroLeftImg}
              alt="TechFirm IT Solutions & Certified Team"
              width={540}
              height={580}
              priority
              className="w-full h-auto object-contain drop-shadow-xl"
            />
          </div>
        </div>

        {/* Right Column: Company Overview & Benefits */}
        <div className="lg:col-span-6 text-left space-y-6">
          {/* Section Pill Sub-Badge */}
          <div className="flex items-center gap-2 text-[11px] font-bold text-[#864FFE] uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-xs bg-[#864FFE]" />
            <span>ABOUT OUR COMPANY</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#141432] tracking-tight leading-tight">
            Techfirm IT Solution And Servicing Around Global The World
          </h2>

          {/* 3 Benefit Points */}
          <div className="space-y-6 pt-2">
            {/* Benefit 1 */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-2xl bg-[#864FFE]/10 flex items-center justify-center shrink-0 p-2.5 shadow-2xs">
                <TaskIcon className="w-6 h-6 text-[#864FFE]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-[#141432]">
                  Automate Task Creation
                </h3>
                <p className="text-xs sm:text-sm text-[#5C5C6E] leading-relaxed font-medium">
                  In today&apos;s competitive business, the demand for efficient cost-effective IT solutions has never been more critic.
                </p>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-2xl bg-[#864FFE]/10 flex items-center justify-center shrink-0 p-2.5 shadow-2xs">
                <RoutineIcon1 className="w-6 h-6 text-[#864FFE]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-[#141432]">
                  Simplify your daily routines
                </h3>
                <p className="text-xs sm:text-sm text-[#5C5C6E] leading-relaxed font-medium">
                  In today&apos;s competitive business, the demand for efficient cost-effective IT solutions has never been more critic.
                </p>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-2xl bg-[#864FFE]/10 flex items-center justify-center shrink-0 p-2.5 shadow-2xs">
                <RoutineIcon2 className="w-6 h-6 text-[#864FFE]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-[#141432]">
                  Simplify your daily routines
                </h3>
                <p className="text-xs sm:text-sm text-[#5C5C6E] leading-relaxed font-medium">
                  In today&apos;s competitive business, the demand for efficient cost-effective IT solutions has never been more critic.
                </p>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-6 pt-4">
            <PillButton href="/services" variant="primary" size="lg">
              Get Started Now
            </PillButton>

            <a
              href="tel:+00479394888"
              className="inline-flex items-center gap-3 group select-none"
            >
              <div className="w-11 h-11 rounded-full bg-[#864FFE] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform shrink-0">
                <Phone className="w-4 h-4 fill-current" />
              </div>
              <div className="text-left">
                <div className="text-[11px] font-semibold text-[#8B8B9E]">Call Us 24/7</div>
                <div className="text-sm font-bold text-[#141432] group-hover:text-primary transition-colors">
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
