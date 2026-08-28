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
      className={`mb-4 overflow-hidden rounded-2xl border transition-all duration-200 ${
        dark
          ? "bg-dark-card border-dark-border text-white"
          : "bg-card border-border text-foreground shadow-sm"
      }`}
    >
      <button
        onClick={toggle}
        className="hover:text-primary flex w-full cursor-pointer items-center justify-between px-6 py-5 text-left text-base font-bold transition-colors md:text-lg"
        aria-expanded={open}
      >
        <span>{question}</span>
        <ChevronDown
          className={`text-primary h-5 w-5 flex-shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          className={`px-6 pb-5 text-sm leading-relaxed md:text-base ${
            dark ? "text-gray-300" : "text-muted-foreground"
          }`}
        >
          {answer}
        </div>
      )}
    </div>
  );
}
