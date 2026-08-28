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
      className={`relative rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between ${
        isPopular
          ? "bg-dark-bg text-white border-2 border-primary shadow-2xl scale-105 z-10"
          : "bg-card text-foreground border border-border shadow-sm hover:shadow-md"
      }`}
    >
      {isPopular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold py-1 px-4 rounded-full uppercase tracking-wider shadow-sm">
          Most Popular
        </div>
      )}

      <div>
        <div className="mb-6">
          <h3 className={`text-2xl font-bold mb-2 ${isPopular ? "text-white" : "text-foreground"}`}>
            {name}
          </h3>
          <p className={`text-sm ${isPopular ? "text-gray-300" : "text-muted-foreground"}`}>
            {description}
          </p>
        </div>

        <div className="mb-8">
          <span className="text-4xl md:text-5xl font-extrabold font-mono text-primary">${price}</span>
          <span className={`text-sm ml-2 ${isPopular ? "text-gray-400" : "text-muted-foreground"}`}>
            /{interval}
          </span>
        </div>

        <div className="space-y-3.5 mb-8">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-3 text-sm">
              <div className="w-5 h-5 rounded-full bg-accent text-accent-foreground flex items-center justify-center flex-shrink-0">
                <Check className="w-3.5 h-3.5" />
              </div>
              <span className={isPopular ? "text-gray-200" : "text-muted-foreground"}>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <a
        href={ctaHref}
        className={`w-full py-3.5 px-6 rounded-xl font-bold text-center text-sm transition-all duration-300 ${
          isPopular
            ? "bg-primary text-primary-foreground hover:bg-primary-deep hover:text-white shadow-lg"
            : "bg-foreground text-background hover:bg-primary hover:text-primary-foreground"
        }`}
      >
        {ctaText}
      </a>
    </div>
  );
}
