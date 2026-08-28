"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Search,
  Server,
  Shield,
  Zap,
  Star,
  Globe,
  Cpu,
  Headphones,
  BarChart3,
  Cloud,
  Check
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import {
  SectionHeading,
  StatCounter,
  IconFeatureCard,
  PricingCard,
  FaqAccordionItem,
  DarkCtaBand,
  TestimonialCard,
  CaseStudyCard
} from "@/components/widgets";
import {
  servicesData,
  domainTldsData,
  testimonialsData,
  faqsData,
  caseStudiesData
} from "@/data/techfirm-data";
import { get } from "@/lib/api";
import { IPlan, ApiResponse } from "@repo/types";

const fallbackPlans: IPlan[] = [
  {
    id: "plan-1",
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
    id: "plan-2",
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
    id: "plan-3",
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

export default function HomePage() {
  const [domainQuery, setDomainQuery] = useState("");
  const [domainResult, setDomainResult] = useState<string | null>(null);
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

  const handleDomainSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domainQuery.trim()) return;
    const clean = domainQuery.toLowerCase().trim().replace(/https?:\/\//, "");
    setDomainResult(`🎉 Great news! "${clean}.com" is available for $9.99/yr.`);
  };

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
    <div className="w-full flex flex-col bg-background overflow-hidden">
      {/* 1. HERO SECTION (Frame 02 - 3:14692) */}
      <section className="relative bg-linear-to-b from-muted/60 via-background to-background pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-bold uppercase tracking-wider shadow-xs">
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>Next-Generation IT Solutions</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.15]">
                Your Web Hosting &amp; <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-primary-deep to-blue-600">
                  Cloud Performance
                </span>{" "}
                Partner.
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
                Experience ultra-low latency, automated backups, and 99.99% guaranteed uptime with our enterprise cloud infrastructure and 24/7 dedicated support.
              </p>

              {/* Fast Domain Search Box */}
              <form onSubmit={handleDomainSearch} className="max-w-lg pt-2">
                <div className="flex flex-col sm:flex-row items-center gap-2 p-2 bg-card rounded-2xl border-2 border-primary/30 shadow-lg shadow-primary/5 focus-within:border-primary transition-all">
                  <div className="flex items-center gap-2 w-full px-3 py-2">
                    <Search className="w-5 h-5 text-muted-foreground shrink-0" />
                    <input
                      type="text"
                      value={domainQuery}
                      onChange={(e) => setDomainQuery(e.target.value)}
                      placeholder="Find your perfect domain (e.g. mycompany)"
                      className="w-full bg-transparent text-sm sm:text-base text-foreground placeholder-muted-foreground focus:outline-hidden"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-dark-bg text-white font-bold text-sm hover:bg-primary hover:text-primary-foreground shrink-0 transition-colors cursor-pointer"
                  >
                    Search
                  </button>
                </div>

                {domainResult && (
                  <p className="mt-2 text-xs font-semibold text-accent-foreground bg-accent p-2 rounded-lg border border-accent-foreground/20">
                    {domainResult}
                  </p>
                )}
              </form>

              {/* Social Proof Badges */}
              <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-border">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <div className="w-9 h-9 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center ring-2 ring-card">
                      JD
                    </div>
                    <div className="w-9 h-9 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center ring-2 ring-card">
                      SM
                    </div>
                    <div className="w-9 h-9 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center ring-2 ring-card">
                      AK
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="text-xs font-bold text-foreground ml-1">4.9/5</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground font-medium">From 14k+ verified client reviews</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-primary-deep" />
                  <span>Customer Happiness Guarantee</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual / Server Graphics */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl bg-linear-to-br from-dark-bg to-[#1E1B4B] p-8 text-white shadow-2xl border border-dark-border">
                <div className="flex items-center justify-between border-b border-dark-border pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-xs font-mono text-primary font-semibold">
                    STATUS: 99.99% ONLINE
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-dark-card border border-dark-border flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Server className="w-6 h-6 text-primary" />
                      <div>
                        <p className="text-sm font-bold">Cloud Cluster Alpha</p>
                        <p className="text-xs text-gray-400">Amsterdam DC-1 • 64 Nodes</p>
                      </div>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-400 font-bold border border-emerald-800">
                      Active
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-dark-card border border-dark-border flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Shield className="w-6 h-6 text-primary" />
                      <div>
                        <p className="text-sm font-bold">Zero-Trust Firewall</p>
                        <p className="text-xs text-gray-400">Layer 7 DDoS Filter Engaged</p>
                      </div>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-teal-950 text-primary font-bold border border-primary/30">
                      Shielded
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-dark-card border border-dark-border flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Cpu className="w-6 h-6 text-primary" />
                      <div>
                        <p className="text-sm font-bold">NVMe Storage Engine</p>
                        <p className="text-xs text-gray-400">0.12ms Read Latency</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-primary">
                      7.4 GB/s
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-dark-border flex items-center justify-between text-xs text-gray-400">
                  <span>SSL Encrypted: TLS 1.3</span>
                  <span className="text-primary font-bold">⚡ Ultra Fast</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DOMAIN TLD PRICE BAR */}
      <section className="py-6 bg-card border-b border-border">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12">
            {domainTldsData.map((item) => (
              <div key={item.tld} className="flex items-center gap-2">
                <span className="font-extrabold text-foreground text-sm tracking-tight">{item.tld}</span>
                <span className="text-xs font-bold text-primary-deep">{item.price}</span>
                <span className="text-[10px] text-muted-foreground line-through">{item.renewal}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CORE SERVICES (SERVICES CARDS) */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading
            badge="Tailored Engineering"
            title="Comprehensive IT & Cloud Services"
            description="From scalable web hosting to proactive cyber-defense and managed operations, we engineer tech that scales seamlessly."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((svc) => (
              <IconFeatureCard
                key={svc.id}
                icon={<Cloud className="w-6 h-6" />}
                title={svc.title}
                description={svc.description}
                href={`/services/${svc.slug}`}
                actionText="Explore Service"
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. METRICS / STATS COUNTERS */}
      <section className="py-16 bg-dark-bg text-white border-y border-dark-border">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCounter value="99.99%" label="Uptime Guaranteed" description="High availability SLA" dark />
            <StatCounter value="15 Min" label="Incident Response" description="24/7 proactive SOC" dark />
            <StatCounter value="500+" label="Global Clients" description="Across 42 countries" dark />
            <StatCounter value="100 Gbps" label="Network Backbone" description="Global CDN mesh" dark />
          </div>
        </div>
      </section>

      {/* 5. PRICING TIERS */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading
            badge="Transparent Pricing"
            title="Flexible Plans for Growing Infrastructure"
            description="Choose the ideal support level and computing resources for your applications. Scale anytime."
          />

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-sm font-bold ${billingPeriod === "monthly" ? "text-foreground" : "text-muted-foreground"}`}>
              Monthly Billing
            </span>
            <button
              onClick={() => setBillingPeriod(billingPeriod === "monthly" ? "annual" : "monthly")}
              className="relative w-14 h-7 rounded-full bg-dark-bg p-1 transition-colors cursor-pointer"
            >
              <div
                className={`w-5 h-5 rounded-full bg-primary transition-transform duration-200 ${
                  billingPeriod === "annual" ? "translate-x-7" : "translate-x-0"
                }`}
              />
            </button>
            <span className={`text-sm font-bold flex items-center gap-1.5 ${billingPeriod === "annual" ? "text-foreground" : "text-muted-foreground"}`}>
              <span>Annual Billing</span>
              <span className="text-[10px] font-black uppercase tracking-wider bg-accent text-accent-foreground px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </span>
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
        </div>
      </section>

      {/* 6. FEATURED CASE STUDIES */}
      <section className="py-20 bg-muted/40 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading
            badge="Proven Results"
            title="Featured Case Studies &amp; Projects"
            description="Explore how our engineering teams deployed resilient systems for high-growth modern businesses."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {caseStudiesData.slice(0, 3).map((study) => (
              <CaseStudyCard
                key={study.slug}
                title={study.title}
                category={study.category}
                client={study.client || ""}
                slug={study.slug}
                imageUrl={study.image || study.imageUrl}
                summary={study.excerpt || study.summary || ""}
                metrics={study.metrics}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-card border border-border text-foreground font-bold text-sm hover:bg-muted hover:border-primary transition-all"
            >
              <span>View All Case Studies</span>
              <ArrowRight className="w-4 h-4 text-primary" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. CLIENT TESTIMONIALS */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading
            badge="Client Testimonials"
            title="Trusted by 500+ Engineering Teams"
            description="Read what CTOs, lead DevOps engineers, and startup founders say about working with TechFirm."
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

      {/* 8. FAQS */}
      <section className="py-20 bg-muted/40 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <SectionHeading
            badge="Have Questions?"
            title="Frequently Asked Questions"
            description="Find instant answers to common questions regarding cloud deployments, migrations, and support."
          />

          <div className="space-y-4">
            {faqsData.slice(0, 5).map((faq, idx) => (
              <FaqAccordionItem
                key={faq.id}
                question={faq.question}
                answer={faq.answer}
                isOpen={idx === 0}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 9. GLOBAL DARK CTA BAND */}
      <DarkCtaBand />
    </div>
  );
}
