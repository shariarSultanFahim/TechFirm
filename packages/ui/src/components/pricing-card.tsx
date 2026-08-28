import * as React from "react";

import { Check } from "lucide-react";

export interface PricingCardProps {
  name: string;
  price: number;
  interval?: "month" | "year";
  description: string;
  features: string[];
  isPopular?: boolean;
  ctaText?: string;
  ctaHref?: string;
}

export function PricingCard({
  name,
  price,
  interval = "month",
  description,
  features,
  isPopular = false,
  ctaText = "Choose Plan",
  ctaHref = "/contact"
}: PricingCardProps) {
  return (
    <div
      className={`relative flex flex-col justify-between rounded-3xl p-8 transition-all duration-300 ${
        isPopular
          ? "bg-dark-bg border-primary z-10 scale-105 border-2 text-white shadow-2xl"
          : "bg-card text-foreground border-border border shadow-sm hover:shadow-md"
      }`}
    >
      {isPopular && (
        <div className="bg-primary text-primary-foreground absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold tracking-wider uppercase shadow-sm">
          Most Popular
        </div>
      )}

      <div>
        <div className="mb-6">
          <h3 className={`mb-2 text-2xl font-bold ${isPopular ? "text-white" : "text-foreground"}`}>
            {name}
          </h3>
          <p className={`text-sm ${isPopular ? "text-gray-300" : "text-muted-foreground"}`}>
            {description}
          </p>
        </div>

        <div className="mb-8">
          <span className="text-primary font-mono text-4xl font-extrabold md:text-5xl">
            ${price}
          </span>
          <span className={`ml-2 text-sm ${isPopular ? "text-gray-400" : "text-muted-foreground"}`}>
            /{interval}
          </span>
        </div>

        <div className="mb-8 space-y-3.5">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-3 text-sm">
              <div className="bg-accent text-accent-foreground flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full">
                <Check className="h-3.5 w-3.5" />
              </div>
              <span className={isPopular ? "text-gray-200" : "text-muted-foreground"}>
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>

      <a
        href={ctaHref}
        className={`w-full rounded-xl px-6 py-3.5 text-center text-sm font-bold transition-all duration-300 ${
          isPopular
            ? "bg-primary text-primary-foreground hover:bg-primary-deep shadow-lg hover:text-white"
            : "bg-foreground text-background hover:bg-primary hover:text-primary-foreground"
        }`}
      >
        {ctaText}
      </a>
    </div>
  );
}
