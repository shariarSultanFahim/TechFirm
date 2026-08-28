"use client";

import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/widgets";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Assets
import pricingBg from "@/assets/pricing/bg.png";
import shapeImg from "@/assets/pricing/shape.png";

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: string;
  annualPrice: string;
  isFeatured?: boolean;
  buttonText: string;
  buttonHref: string;
  bgColor: string;
  borderColor: string;
  features: {
    text: string;
    included: boolean;
  }[];
}

const pricingPlans: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    description: "For individuals and small teams with unlimited trial access.",
    monthlyPrice: "$00.00",
    annualPrice: "$00.00",
    buttonText: "Get Started →",
    buttonHref: "#pricing",
    bgColor: "bg-[#FFF8F3]",
    borderColor: "border-[#FBE6D6]",
    features: [
      { text: "Single Payment", included: true },
      { text: "Custom design & develop", included: false },
      { text: "Selling your own items", included: false }
    ]
  },
  {
    id: "advanced",
    name: "Advanced",
    description: "For individuals and small teams with unlimited trial access.",
    monthlyPrice: "$19.00",
    annualPrice: "$12.00",
    isFeatured: true,
    buttonText: "Get Started →",
    buttonHref: "#pricing",
    bgColor: "bg-[#F0F9FF]",
    borderColor: "border-[#BAE6FD]",
    features: [
      { text: "Single Payment", included: true },
      { text: "Custom design & develop", included: true },
      { text: "Selling your own items", included: true },
      { text: "Custom design & develop", included: true },
      { text: "Selling your own items", included: true }
    ]
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For individuals and small teams with unlimited trial access.",
    monthlyPrice: "$99.00",
    annualPrice: "$64.00",
    buttonText: "Get Started →",
    buttonHref: "#pricing",
    bgColor: "bg-[#F5F3FF]",
    borderColor: "border-[#EDE9FE]",
    features: [
      { text: "Single Payment", included: true },
      { text: "Selling on your own conditions", included: true },
      { text: "Selling your own items", included: true }
    ]
  }
];

export function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("monthly");

  return (
    <section className="relative mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 overflow-hidden bg-white">
      {/* Background Globe Dotted Texture */}
      <div className="hidden lg:block absolute top-0 left-0 w-full h-full pointer-events-none select-none overflow-hidden z-0">
        <Image
          src={pricingBg}
          alt="Pricing Background Graphic"
          className="absolute -top-10 -left-10 sm:left-0 w-auto h-[110%] max-w-none object-contain opacity-70"
          priority
        />
      </div>

      <div className="container relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Top-Right Sparkle Shape */}
        <div className="relative mx-auto max-w-2xl text-center mb-10">
          <SectionHeader
            align="center"
            badge="WHAT CLIENTS SAY"
            title="Select Your Pricing Plan"
            className="relative"
          />

          {/* Top Right Floating Accent Shape */}
          <div className="absolute -top-2 right-0 sm:right-4 md:-right-8 w-8 sm:w-10 h-auto pointer-events-none">
            <Image
              src={shapeImg}
              alt="Decorative Shape"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Billing Cycle Switcher with Save 35% Badge */}
        <div className="flex justify-center items-center mb-16">
          <div className="relative inline-flex items-center bg-[#F3F4F6] p-1 rounded-full shadow-inner">
            {/* Monthly Tab */}
            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              className={`relative z-10 px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                billingCycle === "monthly"
                  ? "bg-[#864FFE] text-white shadow-md"
                  : "text-[#141432] hover:text-[#864FFE]"
              }`}
            >
              Monthly
            </button>

            {/* Annually Tab */}
            <button
              type="button"
              onClick={() => setBillingCycle("annually")}
              className={`relative z-10 px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                billingCycle === "annually"
                  ? "bg-[#864FFE] text-white shadow-md"
                  : "text-[#141432] hover:text-[#864FFE]"
              }`}
            >
              Annualy
            </button>

            {/* "Save 35%" Angled Badge */}
            <div className="absolute -top-3.5 -right-7 sm:-right-8 bg-[#141432] text-white text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-full rotate-[32deg] shadow-md tracking-tight whitespace-nowrap">
              Save 35%
            </div>
          </div>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-6xl mx-auto">
          {pricingPlans.map((plan) => {
            const price =
              billingCycle === "monthly" ? plan.monthlyPrice : plan.annualPrice;

            if (plan.isFeatured) {
              return (
                /* Featured Card with Gradient Glow Border & Elevation */
                <div
                  key={plan.id}
                  className="relative rounded-3xl p-1.5 bg-gradient-to-b from-[#BAE6FD] via-[#864FFE] to-[#FB923C] shadow-xl md:-translate-y-4 transition-all duration-300 hover:shadow-2xl"
                >
                  <div className="rounded-[22px] p-7 sm:p-9 bg-[#F0F9FF] h-full flex flex-col justify-between">
                    <div>
                      {/* Plan Header */}
                      <h3 className="text-2xl font-bold text-[#141432] tracking-tight mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#5C5C5C] leading-relaxed mb-6 font-medium">
                        {plan.description}
                      </p>

                      {/* Price */}
                      <div className="mb-6">
                        <div className="text-3xl sm:text-4xl font-bold text-[#141432] tracking-tight">
                          {price}
                        </div>
                        <div className="text-xs text-[#737373] font-medium mt-1">
                          /Per Month
                        </div>
                      </div>

                      {/* CTA Button */}
                      <Button
                        variant="white"
                        size="pill-sm"
                        className="w-full rounded-full px-5 py-2.5 text-xs font-bold text-[#141432] hover:text-[#864FFE] shadow-xs hover:shadow-md mb-8"
                        asChild
                      >
                        <Link href={plan.buttonHref}>{plan.buttonText}</Link>
                      </Button>

                      {/* Features List */}
                      <ul className="space-y-3.5">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-3">
                            <div className="w-4 h-4 rounded-full bg-[#141432] flex items-center justify-center text-white shrink-0">
                              <svg
                                className="w-2.5 h-2.5"
                                viewBox="0 0 12 12"
                                fill="none"
                              >
                                <path
                                  d="M2.5 6L5 8.5L9.5 3.5"
                                  stroke="currentColor"
                                  strokeWidth="1.75"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <span className="text-xs sm:text-sm font-medium text-[#141432]">
                              {feature.text}
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
                key={plan.id}
                className={`flex flex-col justify-between rounded-3xl p-7 sm:p-9 border transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 ${plan.bgColor} ${plan.borderColor}`}
              >
                <div>
                  {/* Plan Header */}
                  <h3 className="text-2xl font-bold text-[#141432] tracking-tight mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5C5C5C] leading-relaxed mb-6 font-medium">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="text-3xl sm:text-4xl font-bold text-[#141432] tracking-tight">
                      {price}
                    </div>
                    <div className="text-xs text-[#737373] font-medium mt-1">
                      /Per Month
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button
                    variant="white"
                    size="pill-sm"
                    className="w-full rounded-full px-5 py-2.5 text-xs font-bold text-[#141432] hover:text-[#864FFE] shadow-xs hover:shadow-md mb-8"
                    asChild
                  >
                    <Link href={plan.buttonHref}>{plan.buttonText}</Link>
                  </Button>

                  {/* Features List */}
                  <ul className="space-y-3.5">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        {feature.included ? (
                          <div className="w-4 h-4 rounded-full bg-[#141432] flex items-center justify-center text-white shrink-0">
                            <svg
                              className="w-2.5 h-2.5"
                              viewBox="0 0 12 12"
                              fill="none"
                            >
                              <path
                                d="M2.5 6L5 8.5L9.5 3.5"
                                stroke="currentColor"
                                strokeWidth="1.75"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        ) : (
                          <svg
                            className="w-4 h-4 text-[#D1D5DB] shrink-0"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M3.5 8L6.5 11L12.5 5"
                              stroke="currentColor"
                              strokeWidth="1.75"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                        <span
                          className={`text-xs sm:text-sm font-medium ${
                            feature.included
                              ? "text-[#141432]"
                              : "text-[#8C8C8C]"
                          }`}
                        >
                          {feature.text}
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
