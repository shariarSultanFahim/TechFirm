"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { BillingPeriod } from "@repo/types";

// Assets
import pricingBg from "@/assets/pricing/bg.png";
import shapeImg from "@/assets/pricing/shape.png";

import { usePlans } from "@/hooks/use-plans";

import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/widgets";

const CARD_STYLES = [
  { bgColor: "bg-[#FFF8F3]", borderColor: "border-[#FBE6D6]" },
  { bgColor: "bg-[#F0F9FF]", borderColor: "border-[#BAE6FD]" },
  { bgColor: "bg-[#F5F3FF]", borderColor: "border-[#EDE9FE]" }
];

export function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<BillingPeriod>("monthly");
  const { data: plans = [] } = usePlans(billingCycle);

  return (
    <section className="relative mx-auto overflow-hidden bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      {/* Background Globe Dotted Texture */}
      <div className="pointer-events-none absolute top-0 left-0 z-0 hidden h-full w-full overflow-hidden select-none lg:block">
        <Image
          src={pricingBg}
          alt="Pricing Background Graphic"
          className="absolute -top-10 -left-10 h-[110%] w-auto max-w-none object-contain opacity-70 sm:left-0"
          priority
        />
      </div>

      <div className="relative z-10 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header with Top-Right Sparkle Shape */}
        <div className="relative mx-auto mb-10 max-w-2xl text-center">
          <SectionHeader
            align="center"
            badge="WHAT CLIENTS SAY"
            title="Select Your Pricing Plan"
            className="relative"
          />

          {/* Top Right Floating Accent Shape */}
          <div className="pointer-events-none absolute -top-2 right-0 h-auto w-8 sm:right-4 sm:w-10 md:-right-8">
            <Image src={shapeImg} alt="Decorative Shape" className="h-auto w-full object-contain" />
          </div>
        </div>

        {/* Billing Cycle Switcher with Save 35% Badge */}
        <div className="mb-16 flex items-center justify-center">
          <div className="relative inline-flex items-center rounded-full bg-[#F3F4F6] p-1 shadow-inner">
            {/* Monthly Tab */}
            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              className={`relative z-10 cursor-pointer rounded-full px-6 py-2 text-xs font-semibold transition-all duration-300 sm:text-sm ${
                billingCycle === "monthly"
                  ? "bg-[#864FFE] text-white shadow-md"
                  : "text-[#141432] hover:text-[#864FFE]"
              }`}
            >
              Monthly
            </button>

            {/* Annual Tab */}
            <button
              type="button"
              onClick={() => setBillingCycle("annual")}
              className={`relative z-10 cursor-pointer rounded-full px-6 py-2 text-xs font-semibold transition-all duration-300 sm:text-sm ${
                billingCycle === "annual"
                  ? "bg-[#864FFE] text-white shadow-md"
                  : "text-[#141432] hover:text-[#864FFE]"
              }`}
            >
              Annually
            </button>

            {/* "Save 35%" Angled Badge */}
            <div className="absolute -top-3.5 -right-7 rotate-[32deg] rounded-full bg-[#141432] px-2.5 py-0.5 text-[10px] font-bold tracking-tight whitespace-nowrap text-white shadow-md sm:-right-8 sm:text-[11px]">
              Save 35%
            </div>
          </div>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {plans.slice(0, 3).map((plan, idx) => {
            const formattedPrice = `$${Number(plan.price).toFixed(2)}`;
            const isFeatured = plan.isPopular || idx === 1;
            const style = CARD_STYLES[idx % CARD_STYLES.length] || CARD_STYLES[0]!;
            const buttonText = plan.buttonText || "Get Started →";
            const buttonHref = "#pricing";

            if (isFeatured) {
              return (
                /* Featured Card with Gradient Glow Border & Elevation */
                <div
                  key={plan.id || plan._id || `plan-${idx}`}
                  className="relative rounded-3xl bg-gradient-to-b from-[#BAE6FD] via-[#864FFE] to-[#FB923C] p-1.5 shadow-xl transition-all duration-300 hover:shadow-2xl md:-translate-y-4"
                >
                  <div className="flex h-full flex-col justify-between rounded-[22px] bg-[#F0F9FF] p-7 sm:p-9">
                    <div>
                      {/* Plan Header */}
                      <h3 className="mb-2 text-2xl font-bold tracking-tight text-[#141432]">
                        {plan.name}
                      </h3>
                      <p className="mb-6 text-xs leading-relaxed font-medium text-[#5C5C5C] sm:text-sm">
                        {plan.description ||
                          "For individuals and small teams with unlimited trial access."}
                      </p>

                      {/* Price */}
                      <div className="mb-6">
                        <div className="text-3xl font-bold tracking-tight text-[#141432] sm:text-4xl">
                          {formattedPrice}
                        </div>
                        <div className="mt-1 text-xs font-medium text-[#737373]">
                          /{billingCycle === "annual" ? "Per Year" : "Per Month"}
                        </div>
                      </div>

                      {/* CTA Button */}
                      <Button
                        variant="white"
                        size="pill-sm"
                        className="mb-8 w-full cursor-pointer rounded-full px-5 py-2.5 text-xs font-bold text-[#141432] shadow-xs hover:text-[#864FFE] hover:shadow-md"
                        asChild
                      >
                        <Link href={buttonHref}>{buttonText}</Link>
                      </Button>

                      {/* Features List */}
                      <ul className="space-y-3.5">
                        {plan.features.map((featureText, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-3">
                            <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#141432] text-white">
                              <svg className="h-2.5 w-2.5" viewBox="0 0 12 12" fill="none">
                                <path
                                  d="M2.5 6L5 8.5L9.5 3.5"
                                  stroke="currentColor"
                                  strokeWidth="1.75"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <span className="text-xs font-medium text-[#141432] sm:text-sm">
                              {featureText}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              /* Regular Cards (Free, Enterprise) */
              <div
                key={plan.id || plan._id || `plan-${idx}`}
                className={`flex flex-col justify-between rounded-3xl border p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl sm:p-9 ${style.bgColor} ${style.borderColor}`}
              >
                <div>
                  {/* Plan Header */}
                  <h3 className="mb-2 text-2xl font-bold tracking-tight text-[#141432]">
                    {plan.name}
                  </h3>
                  <p className="mb-6 text-xs leading-relaxed font-medium text-[#5C5C5C] sm:text-sm">
                    {plan.description ||
                      "For individuals and small teams with unlimited trial access."}
                  </p>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="text-3xl font-bold tracking-tight text-[#141432] sm:text-4xl">
                      {formattedPrice}
                    </div>
                    <div className="mt-1 text-xs font-medium text-[#737373]">
                      /{billingCycle === "annual" ? "Per Year" : "Per Month"}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button
                    variant="white"
                    size="pill-sm"
                    className="mb-8 w-full cursor-pointer rounded-full px-5 py-2.5 text-xs font-bold text-[#141432] shadow-xs hover:text-[#864FFE] hover:shadow-md"
                    asChild
                  >
                    <Link href={buttonHref}>{buttonText}</Link>
                  </Button>

                  {/* Features List */}
                  <ul className="space-y-3.5">
                    {plan.features.map((featureText, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-3">
                        <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#141432] text-white">
                          <svg className="h-2.5 w-2.5" viewBox="0 0 12 12" fill="none">
                            <path
                              d="M2.5 6L5 8.5L9.5 3.5"
                              stroke="currentColor"
                              strokeWidth="1.75"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <span className="text-xs font-medium text-[#141432] sm:text-sm">
                          {featureText}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
