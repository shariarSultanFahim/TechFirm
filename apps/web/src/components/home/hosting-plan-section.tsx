"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import bgTextureImg from "@/assets/hosting-plan/bg-texture.png";
import {
  CloudIcon,
  GlobeIcon,
  LeftArrowIcon,
  RightArrowIcon,
  ServerIcon,
  WordpressIcon
} from "@/assets/icons";

import { Button } from "@/components/ui";
import { SectionHeader } from "@/components/widgets";

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
    <section className="relative w-full overflow-hidden bg-[#F9FAFB] py-16 sm:py-20 lg:py-24">
      {/* Background Texture Graphic on the Right */}
      <div className="pointer-events-none absolute top-0 right-0 z-0 flex h-full w-[550px] items-start justify-end overflow-hidden opacity-50 select-none lg:w-[750px]">
        <Image
          src={bgTextureImg}
          alt="Hosting plan background texture"
          className="h-auto w-full object-contain object-right-top"
          priority
        />
      </div>

      <div className="relative z-10 container mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header: Reusable SectionHeader & Carousel Arrows */}
        <div className="mb-12 flex flex-col justify-between gap-6 sm:mb-16 md:flex-row md:items-end">
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
              className="border-border/40 hover:bg-muted hover:text-primary flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border bg-white text-[#141432] shadow-2xs shadow-md transition-all hover:scale-105 active:scale-95"
              aria-label="Previous plan"
            >
              <LeftArrowIcon className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="border-border/40 hover:bg-muted hover:text-primary flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border bg-white text-[#141432] shadow-2xs shadow-md transition-all hover:scale-105 active:scale-95"
              aria-label="Next plan"
            >
              <RightArrowIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Outer White Card Strip / Hosting Plan Cards */}
        <div className="grid grid-cols-1 items-stretch gap-6 rounded-xl bg-white sm:grid-cols-2 lg:grid-cols-4">
          {hostingPlans.map((plan) => {
            const Icon = plan.IconComponent;

            if (plan.isFeatured) {
              return (
                /* Featured Dark VPS Hosting Card */
                <div
                  key={plan.id}
                  className="hover:shadow-primary/10 relative z-10 flex flex-col justify-between rounded-2xl border border-white/10 bg-[#141233] p-7 text-white shadow-2xl transition-all"
                >
                  <div>
                    {/* SVG Icon */}
                    <div className="mb-6 flex h-14 w-14 items-center">
                      <Icon className="h-12 w-12" />
                    </div>

                    <p className="text-xs font-bold tracking-wide text-[#c4b5fd]">
                      Starts at {plan.price}
                    </p>

                    <h3 className="mt-2 mb-3 text-xl font-bold text-white">{plan.title}</h3>

                    <p className="text-xs leading-relaxed text-gray-300">{plan.description}</p>
                  </div>

                  <div className="pt-8">
                    <Button variant="primary" size="pill-sm" asChild>
                      <Link href={plan.href}>Learn More</Link>
                    </Button>
                  </div>
                </div>
              );
            }

            return (
              /* Standard Light Hosting Plan Card */
              <div
                key={plan.id}
                className="hover:bg-muted/30 flex flex-col justify-between rounded-2xl p-6 transition-all"
              >
                <div>
                  {/* SVG Icon */}
                  <div className="mb-6 flex h-14 w-14 items-center">
                    <Icon className="h-12 w-12" />
                  </div>

                  <p className="text-primary text-xs font-bold tracking-wide">
                    Starts at {plan.price}
                  </p>

                  <h3 className="mt-2 mb-3 text-xl font-bold text-[#141432]">{plan.title}</h3>

                  <p className="text-muted-foreground text-xs leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                <div className="pt-8">
                  <Button
                    variant="outline"
                    size="pill-sm"
                    className="border-border hover:border-primary hover:text-primary hover:bg-primary/5 text-[#141432]"
                    asChild
                  >
                    <Link href={plan.href}>Learn More</Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
