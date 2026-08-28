"use client";

import bgTextureImg from "@/assets/hosting-plan/bg-texture.png";
import {
  CloudIcon,
  GlobeIcon,
  LeftArrowIcon,
  RightArrowIcon,
  ServerIcon,
  WordpressIcon
} from "@/assets/icons";
import { SectionHeader } from "@/components/widgets";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const hostingPlans = [
  {
    id: "web-hosting",
    title: "Web Hosting",
    price: "$3.75/mo*",
    description: "Easy, affordable, and includes a free domain for a year. Score!",
    IconComponent: GlobeIcon,
    href: "/services/web-hosting",
    isFeatured: false
  },
  {
    id: "wordpress-hosting",
    title: "WordPress Hosting",
    price: "$3.75/mo*",
    description: "Easy, affordable, and includes a free domain for a year. Score!",
    IconComponent: WordpressIcon,
    href: "/services/wordpress-hosting",
    isFeatured: false
  },
  {
    id: "vps-hosting",
    title: "VPS Hosting",
    price: "$3.75/mo*",
    description: "Easy, affordable, and includes a free domain for a year. Score!",
    IconComponent: ServerIcon,
    href: "/services/vps-hosting",
    isFeatured: true
  },
  {
    id: "dedicated-hosting",
    title: "Dedicated hosting",
    price: "$3.75/mo*",
    description: "Easy, affordable, and includes a free domain for a year. Score!",
    IconComponent: CloudIcon,
    href: "/services/dedicated-hosting",
    isFeatured: false
  }
];

export function HostingPlanSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  const handlePrev = () => {
    setActiveSlide((prev) => (prev > 0 ? prev - 1 : hostingPlans.length - 1));
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev < hostingPlans.length - 1 ? prev + 1 : 0));
  };

  return (
    <section className="relative w-full bg-[#F9FAFB] py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* Background Texture Graphic on the Right */}
      <div className="absolute top-0 right-0 w-[550px] lg:w-[750px] h-full pointer-events-none opacity-50 select-none z-0 overflow-hidden flex items-start justify-end">
        <Image
          src={bgTextureImg}
          alt="Hosting plan background texture"
          className="w-full h-auto object-contain object-right-top"
          priority
        />
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header: Reusable SectionHeader & Carousel Arrows */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <SectionHeader
            badge="60% OFF CLOUD HOSTING"
            title={
              <>
                Pick your perfect web <br className="hidden sm:inline" />
                hosting plan. We got &apos;em all.
              </>
            }
            align="left"
          />

          {/* Navigation Carousel Buttons */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <button
              type="button"
              onClick={handlePrev}
              className="w-12 h-12 rounded-full bg-white shadow-md border border-border/40 flex items-center justify-center text-[#141432] hover:bg-muted hover:text-primary transition-all cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
              aria-label="Previous plan"
            >
              <LeftArrowIcon className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="w-12 h-12 rounded-full bg-white shadow-md border border-border/40 flex items-center justify-center text-[#141432] hover:bg-muted hover:text-primary transition-all cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
              aria-label="Next plan"
            >
              <RightArrowIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Outer White Card Strip / Hosting Plan Cards */}
        <div className="bg-white rounded-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {hostingPlans.map((plan) => {
            const Icon = plan.IconComponent;

            if (plan.isFeatured) {
              return (
                /* Featured Dark VPS Hosting Card */
                <div
                  key={plan.id}
                  className="rounded-2xl bg-[#141233] p-7 text-white shadow-2xl flex flex-col justify-between border border-white/10 relative z-10 transition-all hover:shadow-primary/10"
                >
                  <div>
                    {/* SVG Icon */}
                    <div className="w-14 h-14 mb-6 flex  items-center">
                      <Icon className="w-12 h-12 " />
                    </div>

                    <p className="text-xs font-bold text-[#c4b5fd] tracking-wide">
                      Starts at {plan.price}
                    </p>

                    <h3 className="text-xl font-bold text-white mt-2 mb-3">
                      {plan.title}
                    </h3>

                    <p className="text-xs text-gray-300 leading-relaxed">
                      {plan.description}
                    </p>
                  </div>

                  <div className="pt-8">
                    <Link
                      href={plan.href}
                      className="inline-flex items-center justify-center px-7 py-2.5 rounded-full bg-linear-to-r from-[#864FFE] to-[#7033F5] text-white text-xs font-bold shadow-md hover:shadow-lg hover:opacity-95 transition-all"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              );
            }

            return (
              /* Standard Light Hosting Plan Card */
              <div
                key={plan.id}
                className="rounded-2xl p-6 flex flex-col justify-between transition-all hover:bg-muted/30"
              >
                <div>
                  {/* SVG Icon */}
                  <div className="w-14 h-14 mb-6 flex items-center">
                    <Icon className="w-12 h-12" />
                  </div>

                  <p className="text-xs font-bold text-primary tracking-wide">
                    Starts at {plan.price}
                  </p>

                  <h3 className="text-xl font-bold text-[#141432] mt-2 mb-3">
                    {plan.title}
                  </h3>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                <div className="pt-8">
                  <Link
                    href={plan.href}
                    className="inline-flex items-center justify-center px-6 py-2.5 rounded-full border border-border text-xs font-bold text-[#141432] hover:border-primary hover:text-primary hover:bg-primary/5 transition-all"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
