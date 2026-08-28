"use client";

import { useState } from "react";
import Image from "next/image";
import { SectionHeader } from "@/components/widgets";
import faqImg from "@/assets/faq/faq-img.png";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    id: "need-consultant",
    question: "How do I know if I need a consultant?",
    answer:
      "If your business is facing scaling challenges, inefficient operations, or requires specialized technical expertise to accelerate growth, partnering with our consulting team can provide targeted solutions and strategic clarity."
  },
  {
    id: "consulting-services",
    question: "What types of consulting services do you offer?",
    answer:
      "We provide end-to-end consulting spanning cloud infrastructure architecture, scalable software development, workflow automation, performance optimization, and custom technical strategy."
  },
  {
    id: "firm-different",
    question: "What makes your consulting firm different from others?",
    answer:
      "We combine deep engineering rigor with agile business strategy, delivering actionable, production-ready outcomes rather than theoretical slide decks."
  },
  {
    id: "engagement-duration",
    question: "What makes your consulting firm different from others?",
    answer:
      "Our iterative sprint models allow rapid deployment and measurable ROI, offering hands-on execution from day one with continuous collaboration."
  },
  {
    id: "who-benefit",
    question: "Who can benefit from your consulting services?",
    answer:
      "Through a combination of data-driven insights and innovative approaches, we work closely with you to develop customized."
  }
];

export function FaqSection() {
  // Default open the 5th item to match the reference screenshot
  const [openId, setOpenId] = useState<string | null>("who-benefit");

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="relative w-full py-20 lg:py-28 overflow-hidden bg-white">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Heading & FAQ Accordion */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <SectionHeader
              align="left"
              badge="OUR FAQ'S"
              title="Common inquiries from clients"
              className="mb-8 lg:mb-10 max-w-xl"
            />

            {/* FAQ Accordion List */}
            <div className="flex flex-col space-y-3.5 w-full">
              {faqItems.map((item) => {
                const isOpen = openId === item.id;

                if (isOpen) {
                  return (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-[#EDE8F5] overflow-hidden shadow-xs transition-all duration-300"
                    >
                      {/* Open Header Banner */}
                      <button
                        type="button"
                        onClick={() => toggleFAQ(item.id)}
                        className="w-full bg-[#141432] text-white px-6 py-4.5 sm:px-7 sm:py-5 flex items-center justify-between text-left transition-colors"
                      >
                        <span className="font-semibold text-sm sm:text-base pr-4">
                          {item.question}
                        </span>
                        <div className="w-7 h-7 rounded-full bg-white text-[#141432] flex items-center justify-center shrink-0 font-bold shadow-xs">
                          <svg
                            className="w-3.5 h-3.5"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
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
                      <div className="bg-white p-6 sm:p-7 text-[#5C5C5C] text-sm leading-relaxed font-medium">
                        <p>{item.answer}</p>
                      </div>
                    </div>
                  );
                }

                return (
                  /* Closed FAQ Item */
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleFAQ(item.id)}
                    className="w-full bg-white border border-[#EDE8F5] rounded-full px-6 py-4 sm:px-7 sm:py-4.5 flex items-center justify-between text-left transition-all duration-300 hover:border-[#864FFE]/40 hover:shadow-xs group"
                  >
                    <span className="font-semibold text-[#141432] text-sm sm:text-base pr-4 group-hover:text-[#864FFE] transition-colors">
                      {item.question}
                    </span>
                    <div className="w-7 h-7 rounded-full bg-[#F3F4F6] text-[#141432] flex items-center justify-center shrink-0 font-bold transition-colors group-hover:bg-[#864FFE] group-hover:text-white">
                      <svg
                        className="w-3.5 h-3.5"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
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
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-full max-w-md lg:max-w-none flex items-center justify-center">
              <Image
                src={faqImg}
                alt="Client Inquiries & Consultation Support"
                className="w-full h-auto object-contain drop-shadow-md transition-transform duration-500 hover:scale-[1.02]"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
