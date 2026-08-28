"use client";

import { useState } from "react";
import Link from "next/link";
import { Zap } from "lucide-react";
import {
  CaseStudyCard,
  DarkCtaBand
} from "@/components/widgets";
import { caseStudiesData } from "@/data/techfirm-data";

export default function PortfolioPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  const categories = ["All", "Banks & Insurance", "Cloud Migration", "IoT & Managed IT"];

  const filteredItems = caseStudiesData.filter((item) => {
    if (selectedFilter === "All") return true;
    return item.category.toLowerCase() === selectedFilter.toLowerCase();
  });

  return (
    <div className="w-full flex flex-col bg-background">
      {/* 1. HERO HEADER */}
      <section className="relative bg-dark-bg text-white py-20 lg:py-24 border-b border-dark-border overflow-hidden">
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-4 border border-primary/30">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Proven Enterprise Impact</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4 text-white">
            Our Portfolio &amp; Case Studies
          </h1>

          <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6">
            Explore how our bespoke engineering solutions and cloud infrastructure architectures solved mission-critical bottlenecks for global brands.
          </p>

          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-gray-400">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-primary">Our Portfolio</span>
          </div>
        </div>
      </section>

      {/* 2. FILTER & PORTFOLIO GRID */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedFilter(cat)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  selectedFilter === cat
                    ? "bg-foreground text-background shadow-md"
                    : "bg-card text-muted-foreground border border-border hover:bg-muted"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <CaseStudyCard
                key={item.slug}
                title={item.title}
                category={item.category}
                client={item.client || ""}
                slug={item.slug}
                imageUrl={item.image || item.imageUrl}
                summary={item.excerpt || item.summary || ""}
                metrics={item.metrics}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. GLOBAL DARK CTA BAND */}
      <DarkCtaBand />
    </div>
  );
}
