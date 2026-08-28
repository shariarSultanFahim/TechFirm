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
    <section className="py-20 bg-dark-bg text-white relative overflow-hidden">
      <div className="absolute -right-24 -bottom-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-24 -top-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {badge && (
          <span className="inline-block px-4 py-1 text-xs font-bold rounded-full uppercase tracking-wider bg-primary/20 text-primary border border-primary/30 mb-6">
            {badge}
          </span>
        )}

        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight max-w-3xl mx-auto">
          {title}
        </h2>

        <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <a
            href={primaryCtaHref}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-bold rounded-xl text-base hover:bg-primary-deep hover:text-white transition-all shadow-lg hover:shadow-primary/20"
          >
            {primaryCtaText} <ArrowRight className="w-5 h-5" />
          </a>

          {secondaryCtaText && (
            <a
              href={secondaryCtaHref}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-dark-card text-white font-bold rounded-xl text-base border border-dark-border hover:bg-dark-border transition-all"
            >
              <PhoneCall className="w-4 h-4 text-primary" /> {secondaryCtaText}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
