"use client";

import { useState } from "react";

import { Minus, Plus, Search } from "lucide-react";

import { useFaqs } from "@/hooks/use-faqs";

import { SectionHeader } from "@/components/widgets";

const CATEGORIES = ["All", "General", "Services", "Support", "Pricing", "Security"];

export default function FaqsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [search, setSearch] = useState<string>("");

  const { data: faqs = [] } = useFaqs({
    category: selectedCategory === "All" ? undefined : selectedCategory,
    search: search || undefined
  });

  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <main className="w-full bg-white py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionHeader
          align="center"
          badge="OUR FAQ'S"
          title="Frequently Asked Questions"
          className="mb-8 sm:mb-10"
        />

        {/* Search & Category Filter Pills */}
        <div className="mb-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 rounded-full border border-[#EDE8F5] bg-[#F9FAFB] p-1.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`cursor-pointer rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? "bg-[#141432] text-white shadow-xs"
                    : "text-[#5C5C5C] hover:text-[#141432]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search topics..."
              className="w-full rounded-full border border-[#EDE8F5] bg-white py-2 pr-4 pl-10 text-xs text-[#141432] placeholder-[#9CA3AF] transition-colors focus:border-[#864FFE] focus:outline-hidden"
            />
          </div>
        </div>

        {/* FAQ Accordion List */}
        {faqs.length === 0 ? (
          <div className="text-muted-foreground py-12 text-center">
            <p className="text-sm font-semibold">No questions found matching your criteria.</p>
          </div>
        ) : (
          <div className="flex w-full flex-col space-y-3.5">
            {faqs.map((item, idx) => {
              const itemId = item.id || item._id || `faq-${idx}`;
              const isOpen = openId === itemId || (openId === null && idx === 0);

              if (isOpen) {
                return (
                  <div
                    key={itemId}
                    className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-xs transition-all duration-300"
                  >
                    {/* Active Header (Dark Navy) */}
                    <button
                      type="button"
                      onClick={() => toggleFAQ(itemId)}
                      className="flex w-full cursor-pointer items-center justify-between gap-4 bg-[#141432] px-6 py-4 text-left text-white transition-colors sm:px-8 sm:py-5"
                    >
                      <span className="text-sm font-bold tracking-tight text-white sm:text-base">
                        {item.question}
                      </span>
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-[#141432] shadow-2xs transition-transform sm:h-8 sm:w-8">
                        <Minus className="h-4 w-4 stroke-[2.5]" />
                      </div>
                    </button>

                    {/* Expanded Answer Content */}
                    <div className="bg-white px-6 py-6 text-xs leading-relaxed font-normal text-[#5C5C6E] sm:px-8 sm:text-sm">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                );
              }

              return (
                <button
                  key={itemId}
                  type="button"
                  onClick={() => toggleFAQ(itemId)}
                  className="group flex w-full cursor-pointer items-center justify-between gap-4 rounded-full border border-[#E5E7EB] bg-white px-6 py-3.5 text-left shadow-2xs transition-all duration-200 hover:border-[#D1D5DB] hover:shadow-xs sm:px-8 sm:py-4"
                >
                  <span className="group-hover:text-primary text-sm font-semibold tracking-tight text-[#141432] transition-colors sm:text-base">
                    {item.question}
                  </span>
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F3F4F6] text-[#141432] transition-all group-hover:bg-[#E5E7EB] sm:h-8 sm:w-8">
                    <Plus className="h-4 w-4 stroke-[2.5]" />
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
