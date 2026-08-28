import * as React from "react";

import { ArrowRight, PhoneCall } from "lucide-react";

export interface DarkCtaBandProps {
  badge?: string;
  title?: string;
  description?: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
}

export function DarkCtaBand({
  badge = "Ready to Transform Your IT?",
  title = "Let's Build Faster, Smarter & More Secure Systems Together",
  description = "Join hundreds of forward-thinking enterprises that trust TechFirm for mission-critical cloud, cyber-security, and modern architecture.",
  primaryCtaText = "Request a Free Consultation",
  primaryCtaHref = "/contact",
  secondaryCtaText = "Explore Our Pricing",
  secondaryCtaHref = "/pricing"
}: DarkCtaBandProps) {
  return (
    <section className="bg-dark-bg relative overflow-hidden py-20 text-white">
      <div className="bg-primary/10 pointer-events-none absolute -right-24 -bottom-24 h-96 w-96 rounded-full blur-3xl" />
      <div className="bg-primary/5 pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full blur-3xl" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        {badge && (
          <span className="bg-primary/20 text-primary border-primary/30 mb-6 inline-block rounded-full border px-4 py-1 text-xs font-bold tracking-wider uppercase">
            {badge}
          </span>
        )}

        <h2 className="mx-auto mb-6 max-w-3xl text-3xl leading-tight font-extrabold tracking-tight md:text-5xl">
          {title}
        </h2>

        <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-gray-300 md:text-lg">
          {description}
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={primaryCtaHref}
            className="bg-primary text-primary-foreground hover:bg-primary-deep hover:shadow-primary/20 inline-flex w-full items-center justify-center gap-2 rounded-xl px-8 py-4 text-base font-bold shadow-lg transition-all hover:text-white sm:w-auto"
          >
            {primaryCtaText} <ArrowRight className="h-5 w-5" />
          </a>

          {secondaryCtaText && (
            <a
              href={secondaryCtaHref}
              className="bg-dark-card border-dark-border hover:bg-dark-border inline-flex w-full items-center justify-center gap-2 rounded-xl border px-8 py-4 text-base font-bold text-white transition-all sm:w-auto"
            >
              <PhoneCall className="text-primary h-4 w-4" /> {secondaryCtaText}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
