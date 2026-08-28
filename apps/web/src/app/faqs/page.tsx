"use client";

import { useState } from "react";
import Link from "next/link";
import { HelpCircle, Headphones, Zap, Search } from "lucide-react";
import {
  FaqAccordionItem,
  DarkCtaBand
} from "@/components/widgets";
import { faqsData } from "@/data/techfirm-data";

export default function FaqsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = ["All", "General", "Services", "Support", "Pricing", "Security"];

  const filteredFaqs = faqsData.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full flex flex-col bg-background">
      {/* 1. HERO HEADER */}
      <section className="relative bg-dark-bg text-white py-20 lg:py-24 border-b border-dark-border overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-4 border border-primary/30">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Help Center &amp; Documentation</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4 text-white">
            Frequently Asked Questions
          </h1>

          <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6">
            Find immediate answers regarding our enterprise hosting SLAs, security compliance, onboarding workflows, and technical support.
          </p>

          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-gray-400">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-primary">Our FAQs</span>
          </div>
        </div>
      </section>

      {/* 2. FAQ CONTENT SECTION WITH SEARCH & CATEGORY FILTER */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <Search className="w-5 h-5 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search FAQ questions (e.g. migration, SLA, pricing)..."
                className="w-full bg-background border border-border rounded-2xl pl-12 pr-4 py-4 text-sm sm:text-base text-foreground shadow-xs focus:outline-hidden focus:border-primary"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-foreground text-background shadow-md"
                    : "bg-card text-muted-foreground border border-border hover:bg-muted"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* FAQ Accordion List */}
          <div className="space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, idx) => (
                <FaqAccordionItem
                  key={faq.id}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={idx === 0}
                />
              ))
            ) : (
              <div className="text-center py-12 bg-card rounded-2xl border border-border p-8">
                <HelpCircle className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-foreground">No matching questions found</h3>
                <p className="text-sm text-muted-foreground mt-1">Try adjusting your search keywords or contact our team directly.</p>
              </div>
            )}
          </div>

          {/* 3. STILL HAVE QUESTIONS CARD */}
          <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-dark-bg text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-dark-border">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shrink-0 shadow-md">
                <Headphones className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Still have questions?</h3>
                <p className="text-sm text-gray-300 mt-1">Our engineering team is standing by 24/7 to assist you.</p>
              </div>
            </div>

            <Link
              href="/contact"
              className="px-6 py-3.5 rounded-xl bg-card text-foreground font-extrabold text-sm hover:bg-primary hover:text-primary-foreground shrink-0 transition-colors shadow-md"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>

      {/* 4. GLOBAL DARK CTA BAND */}
      <DarkCtaBand />
    </div>
  );
}
