"use client";

import { Minus, Plus, Zap } from "lucide-react";
import { useState } from "react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: "need-consultant",
    question: "How do I know if I need a consultant?",
    answer:
      "If your team is facing complex infrastructure decisions, technical debt, scaling roadblocks, or requires specialized enterprise guidance to hit aggressive growth goals, a dedicated consulting partner accelerates execution and prevents costly architectural missteps."
  },
  {
    id: "consulting-services",
    question: "What types of consulting services do you offer?",
    answer:
      "We provide full-lifecycle IT consulting including cloud architecture design, DevOps and CI/CD automation, zero-trust cybersecurity audits, server virtualization, database clustering, and 24/7 managed infrastructure support."
  },
  {
    id: "firm-different-1",
    question: "What makes your consulting firm different from others?",
    answer:
      "We pair elite senior engineers directly with your team rather than layers of account managers. Our recommendations are grounded in production-tested architectures and backed by financially backed SLAs."
  },
  {
    id: "firm-different-2",
    question: "What makes your consulting firm different from others?",
    answer:
      "Our agile sprint-based methodology ensures rapid time-to-value. We focus on pragmatic, high-impact improvements with continuous knowledge transfer so your internal team gains lasting capabilities."
  },
  {
    id: "who-benefit",
    question: "Who can benefit from your consulting services?",
    answer:
      "Co-Managed IT Services— We support internal IT as an extension of your team. This role includes patching, repetitive tasks, one-off services, and special projects. We handle the backend while in-house IT manages everything else."
  },
  {
    id: "maximize-responsiveness",
    question: "How do you maximize responsiveness?",
    answer:
      "Our distributed 24/7 Operations Center operates with automated telemetry, instant Slack/Teams alerting bridges, and guaranteed 15-minute response times for critical severity incidents."
  },
  {
    id: "business-problems",
    question: "What business problems do you solve?",
    answer:
      "We solve infrastructure downtime, slow application performance, compliance hurdles (HIPAA, SOC 2, GDPR), ballooning cloud costs, and security vulnerabilities before they impact your customers."
  },
  {
    id: "industry-focus",
    question: "What is your industry focus?",
    answer:
      "We serve high-velocity SaaS companies, e-commerce platforms, financial technology, healthcare tech, and enterprise organizations that require 99.99% uptime and bulletproof reliability."
  },
  {
    id: "two-primary-services",
    question: "What are your two primary services?",
    answer:
      "Our two cornerstone pillars are Cloud Infrastructure Engineering (multi-cloud migrations, Kubernetes orchestration, cost optimization) and Fully Managed Enterprise IT Support (continuous monitoring, zero-trust security, and disaster recovery)."
  }
];

export default function FaqsPage() {
  const [openId, setOpenId] = useState<string | null>("need-consultant");

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <main className="w-full bg-white py-16 sm:py-20 lg:py-24">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Badge & Title */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#E0F7F6] text-[#0D9488] text-xs font-semibold uppercase tracking-wider mb-4 shadow-2xs">
            <Zap className="w-3.5 h-3.5 fill-current text-[#0D9488]" />
            <span>Our FAQ&apos;s</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-[#141432] leading-tight">
            Frequently Asked Questions
          </h1>
        </div>

        {/* FAQ Accordion List */}
        <div className="flex flex-col space-y-3.5 w-full">
          {faqData.map((item) => {
            const isOpen = openId === item.id;

            if (isOpen) {
              return (
                <div
                  key={item.id}
                  className="rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden shadow-xs transition-all duration-300"
                >
                  {/* Active Header (Dark Navy) */}
                  <button
                    type="button"
                    onClick={() => toggleFAQ(item.id)}
                    className="w-full bg-[#150E3D] text-white px-6 sm:px-8 py-4 sm:py-5 flex items-center justify-between gap-4 text-left cursor-pointer transition-colors"
                  >
                    <span className="text-sm sm:text-base font-bold text-white tracking-tight">
                      {item.question}
                    </span>
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-[#150E3D] flex items-center justify-center shrink-0 transition-transform shadow-2xs">
                      <Minus className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  </button>

                  {/* Expanded Answer Content */}
                  <div className="px-6 sm:px-8 py-6 bg-white text-xs sm:text-sm text-[#5C5C6E] leading-relaxed font-normal">
                    <p>{item.answer}</p>
                  </div>
                </div>
              );
            }

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleFAQ(item.id)}
                className="w-full rounded-full border border-[#E5E7EB] bg-white hover:border-[#D1D5DB] px-6 sm:px-8 py-3.5 sm:py-4 flex items-center justify-between gap-4 text-left cursor-pointer transition-all duration-200 group shadow-2xs hover:shadow-xs"
              >
                <span className="text-sm sm:text-base font-semibold text-[#141432] group-hover:text-primary transition-colors tracking-tight">
                  {item.question}
                </span>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#F3F4F6] group-hover:bg-[#E5E7EB] text-[#141432] flex items-center justify-center shrink-0 transition-all">
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </main>
  );
}
