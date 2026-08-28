"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

export interface FaqItem {
  id?: string;
  question: string;
  answer: string;
  category?: string;
}

export interface FaqAccordionItemProps {
  question: string;
  answer: string;
  isOpen?: boolean;
  onToggle?: () => void;
  dark?: boolean;
}

export function FaqAccordionItem({
  question,
  answer,
  isOpen = false,
  onToggle,
  dark = false
}: FaqAccordionItemProps) {
  const [internalOpen, setInternalOpen] = React.useState(isOpen);
  const open = onToggle ? isOpen : internalOpen;
  const toggle = onToggle || (() => setInternalOpen((prev) => !prev));

  return (
    <div
      className={`border rounded-2xl overflow-hidden transition-all duration-200 mb-4 ${
        dark ? "bg-dark-card border-dark-border text-white" : "bg-card border-border text-foreground shadow-sm"
      }`}
    >
      <button
        onClick={toggle}
        className="w-full py-5 px-6 flex items-center justify-between text-left font-bold text-base md:text-lg hover:text-primary transition-colors cursor-pointer"
        aria-expanded={open}
      >
        <span>{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          className={`px-6 pb-5 text-sm md:text-base leading-relaxed ${
            dark ? "text-gray-300" : "text-muted-foreground"
          }`}
        >
          {answer}
        </div>
      )}
    </div>
  );
}
