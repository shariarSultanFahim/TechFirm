"use client";

import { useState } from "react";
import Link from "next/link";
import { Zap, ShieldCheck } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import {
  SectionHeading,
  PricingCard,
  TestimonialCard,
  FaqAccordionItem,
  DarkCtaBand
} from "@/components/widgets";
import { get } from "@/lib/api";
import { testimonialsData, faqsData } from "@/data/techfirm-data";
import { IPlan, ApiResponse } from "@repo/types";

const fallbackPlans: IPlan[] = [
  {
    id: "p1",
    name: "Starter Solution",
    price: 29,
    billingPeriod: "monthly",
    features: [
      "1 Cloud Instance & 50GB SSD",
      "Weekly Automated Backups",
      "Standard SSL Certificate",
      "24/7 Email & Ticket Support",
      "Basic Threat Mitigation"
    ],
    isPopular: false,
    isActive: true,
    order: 1,
    description: "Ideal for startups and growing regional businesses.",
    buttonText: "Choose Starter"
  },
  {
    id: "p2",
    name: "Business Pro",
    price: 49,
    billingPeriod: "monthly",
    features: [
      "4 High-Performance vCPUs & 200GB SSD",
      "Daily Automated Backups & Snapshots",
      "Enterprise DDoS Protection",
      "Priority 24/7 Phone & Slack Support",
      "Multi-Cloud Integration & CDN",
      "Custom Domain & Free Migration"
    ],
    isPopular: true,
    isActive: true,
    order: 2,
    description: "Our most popular package for scaling companies and agencies.",
    buttonText: "Start Free Trial"
  },
  {
    id: "p3",
    name: "Enterprise Dedicated",
    price: 89,
    billingPeriod: "monthly",
    features: [
      "Dedicated Kubernetes Cluster",
      "Zero-Trust Security & SOC2 Compliance",
      "Custom SLA & 99.99% Uptime Guarantee",
      "Dedicated Solutions Architect",
      "Real-Time Incident Response Under 15m",
      "Unlimited API Traffic & Bandwidth"
    ],
    isPopular: false,
    isActive: true,
    order: 3,
    description: "Custom architecture designed for enterprise-grade workloads.",
    buttonText: "Contact Sales"
  }
];

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");

  const { data: plansData } = useQuery({
    queryKey: ["plans"],
    queryFn: async () => {
      try {
        const res = await get<ApiResponse<IPlan[]>>("/plans");
        return res.data || fallbackPlans;
      } catch {
        return fallbackPlans;
      }
    },
    initialData: fallbackPlans
  });

  const plans = plansData && plansData.length > 0 ? plansData : fallbackPlans;

  const filteredPlans = plans
    .filter((p) => (p.billingPeriod || "monthly") === billingPeriod && p.isActive !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const displayPlans =
    filteredPlans.length > 0
      ? filteredPlans
      : fallbackPlans.map((p) => ({
          ...p,
          price: billingPeriod === "annual" ? p.price * 10 : p.price,
          billingPeriod
        }));

  return (
    <div className="w-full flex flex-col bg-background">
      {/* 1. HERO HEADER */}
      <section className="relative bg-dark-bg text-white py-20 lg:py-24 border-b border-dark-border overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-4 border border-primary/30">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Predictable, Transparent Pricing</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4 text-white">
            Select Your Pricing Plan
          </h1>

          <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6">
            Simple, cost-effective infrastructure plans designed to scale with your traffic. Change or cancel anytime.
          </p>

          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-gray-400">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-primary">Pricing Plans</span>
          </div>
        </div>
      </section>

      {/* 2. PRICING CARDS WITH BILLING TOGGLE */}
      <section className="py-20 bg-muted/50 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Billing Switch */}
          <div className="flex items-center justify-center gap-4 mb-16">
            <button
              type="button"
              className={`text-sm font-bold cursor-pointer transition-colors ${
                billingPeriod === "monthly" ? "text-foreground" : "text-muted-foreground"
              }`}
              onClick={() => setBillingPeriod("monthly")}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() =>
                setBillingPeriod(billingPeriod === "monthly" ? "annual" : "monthly")
              }
              className="w-14 h-8 rounded-full bg-dark-bg p-1 relative flex items-center transition-colors cursor-pointer"
              aria-label="Toggle billing period"
            >
              <div
                className={`w-6 h-6 rounded-full bg-primary transition-transform duration-200 ${
                  billingPeriod === "annual" ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className={`text-sm font-bold cursor-pointer transition-colors ${
                  billingPeriod === "annual" ? "text-foreground" : "text-muted-foreground"
                }`}
                onClick={() => setBillingPeriod("annual")}
              >
                Annual Billing
              </button>
              <span className="px-2 py-0.5 rounded-full bg-accent text-accent-foreground text-[11px] font-extrabold uppercase">
                Save 20%
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
            {displayPlans.map((plan) => (
              <PricingCard
                key={plan.id}
                name={plan.name}
                price={plan.price}
                description={plan.description || ""}
                features={plan.features}
                isPopular={plan.isPopular}
                ctaText={plan.buttonText || "Choose Plan"}
                interval={billingPeriod === "annual" ? "year" : "month"}
              />
            ))}
          </div>

          <div className="mt-12 text-center text-xs text-muted-foreground max-w-lg mx-auto flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary-deep" />
            <span>30-Day Money-Back Guarantee • Zero Setup Charges • Instant Provisioning</span>
          </div>
        </div>
      </section>

      {/* 3. TRUSTED BY LOGO STRIP */}
      <section className="py-12 bg-background border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs uppercase font-extrabold tracking-widest text-muted-foreground mb-6">
            Trusted by modern product and engineering teams at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all">
            <span className="text-xl font-black tracking-tight text-foreground">CLOUDSCALE</span>
            <span className="text-xl font-black tracking-tight text-foreground">FINTECH CORP</span>
            <span className="text-xl font-black tracking-tight text-foreground">DATASYNC</span>
            <span className="text-xl font-black tracking-tight text-foreground">APEX LOGISTICS</span>
            <span className="text-xl font-black tracking-tight text-foreground">NEXUS AI</span>
          </div>
        </div>
      </section>

      {/* 4. TESTIMONIALS */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading
            badge="Customer Reviews"
            title="Real Feedback From Real Clients"
            description="Discover how TechFirm helps teams cut infrastructure expenses while raising stability."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonialsData.map((test) => (
              <TestimonialCard
                key={test.id || test.name}
                quote={test.content || test.quote || ""}
                author={test.name || test.author || ""}
                role={test.role || ""}
                company={test.company}
                avatarUrl={test.avatar || test.avatarUrl}
                rating={test.rating}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. PRICING FAQ */}
      <section className="py-20 bg-background border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <SectionHeading
            badge="Pricing Help"
            title="Frequently Asked Pricing Questions"
            description="Common questions about plans, billing periods, payment methods, and enterprise contracts."
          />

          <div className="space-y-4">
            {faqsData.map((faq, idx) => (
              <FaqAccordionItem
                key={faq.id}
                question={faq.question}
                answer={faq.answer}
                isOpen={idx === 0 || idx === 3}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. GLOBAL DARK CTA BAND */}
      <DarkCtaBand />
    </div>
  );
}
