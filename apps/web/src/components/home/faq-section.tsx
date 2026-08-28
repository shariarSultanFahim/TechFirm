"use client";

import { useState } from "react";
import Image from "next/image";

import faqImg from "@/assets/faq/faq-img.png";

import { useFaqs } from "@/hooks/use-faqs";

import { SectionHeader } from "@/components/widgets";

export function FaqSection({ bgColor }: { bgColor?: string }) {
  const { data: faqs = [] } = useFaqs();

  // Open first item or active item
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const displayFaqs = faqs.slice(0, 6);

  return (
    <section
      className="relative w-full overflow-hidden bg-white py-20 lg:py-28"
      style={{ backgroundColor: bgColor }}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Heading & FAQ Accordion */}
          <div className="flex flex-col justify-center lg:col-span-7">
            <SectionHeader
              align="left"
              badge="OUR FAQ'S"
              title="Common inquiries from clients"
              className="mb-8 max-w-xl lg:mb-10"
            />

            {/* FAQ Accordion List */}
            <div className="flex w-full flex-col space-y-3.5">
              {displayFaqs.map((item, idx) => {
                const itemId = item.id || item._id || `faq-${idx}`;
                const isOpen = openId === itemId || (openId === null && idx === 4);

                if (isOpen) {
                  return (
                    <div
                      key={itemId}
                      className="overflow-hidden rounded-2xl border border-[#EDE8F5] shadow-xs transition-all duration-300"
                    >
                      {/* Open Header Banner */}
                      <button
                        type="button"
                        onClick={() => toggleFAQ(itemId)}
                        className="flex w-full cursor-pointer items-center justify-between bg-[#141432] px-6 py-4.5 text-left text-white transition-colors sm:px-7 sm:py-5"
                      >
                        <span className="pr-4 text-sm font-semibold sm:text-base">
                          {item.question}
                        </span>
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white font-bold text-[#141432] shadow-xs">
                          <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none">
                            <path
                              d="M3 8H13"
                              stroke="currentColor"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                      </button>

                      {/* Open Answer Panel */}
                      <div className="bg-white p-6 text-sm leading-relaxed font-medium text-[#5C5C5C] sm:p-7">
                        <p>{item.answer}</p>
                      </div>
                    </div>
                  );
                }

                return (
                  /* Closed FAQ Item */
                  <button
                    key={itemId}
                    type="button"
                    onClick={() => toggleFAQ(itemId)}
                    className="group flex w-full cursor-pointer items-center justify-between rounded-full border border-[#EDE8F5] bg-white px-6 py-4 text-left transition-all duration-300 hover:border-[#864FFE]/40 hover:shadow-xs sm:px-7 sm:py-4.5"
                  >
                    <span className="pr-4 text-sm font-semibold text-[#141432] transition-colors group-hover:text-[#864FFE] sm:text-base">
                      {item.question}
                    </span>
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F3F4F6] font-bold text-[#141432] transition-colors group-hover:bg-[#864FFE] group-hover:text-white">
                      <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M8 3V13M3 8H13"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: FAQ Graphic/Illustration */}
          <div className="flex items-center justify-center lg:col-span-5">
            <div className="relative flex w-full max-w-md items-center justify-center lg:max-w-none">
              <Image
                src={faqImg}
                alt="Client Inquiries & Consultation Support"
                className="h-auto w-full object-contain drop-shadow-md transition-transform duration-500 hover:scale-[1.02]"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
