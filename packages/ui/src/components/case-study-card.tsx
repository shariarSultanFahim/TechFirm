import * as React from "react";

import { ArrowUpRight } from "lucide-react";

export interface CaseStudyItem {
  title: string;
  category: string;
  client: string;
  slug: string;
  imageUrl?: string;
  image?: string;
  summary?: string;
  excerpt?: string;
  metrics?: { label: string; value: string }[];
  dark?: boolean;
  variant?: "dark" | "light" | "phones" | string;
}

export type CaseStudyCardProps = CaseStudyItem;

export function CaseStudyCard({
  title,
  category,
  client,
  slug,
  imageUrl,
  image,
  summary,
  excerpt,
  metrics,
  dark = false
}: CaseStudyCardProps) {
  const displayImage = imageUrl || image;
  const displaySummary = summary || excerpt || "";

  return (
    <div
      className={`group flex flex-col justify-between overflow-hidden rounded-3xl border transition-all duration-300 hover:shadow-xl ${
        dark
          ? "bg-dark-card border-dark-border text-white"
          : "bg-card border-border text-foreground shadow-sm"
      }`}
    >
      <div>
        {displayImage ? (
          <div className="relative h-60 w-full overflow-hidden bg-gray-900">
            <img
              src={displayImage}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="bg-primary text-primary-foreground absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-bold">
              {category}
            </div>
          </div>
        ) : (
          <div className="text-primary flex h-48 items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 p-6">
            <span className="text-sm font-semibold tracking-wider uppercase">{category}</span>
          </div>
        )}

        <div className="p-6 md:p-8">
          <div className="text-primary mb-2 text-xs font-semibold tracking-wider uppercase">
            Client: {client}
          </div>
          <h3 className="group-hover:text-primary mb-3 text-xl font-bold tracking-tight transition-colors md:text-2xl">
            {title}
          </h3>
          <p
            className={`mb-6 text-sm leading-relaxed ${dark ? "text-gray-300" : "text-muted-foreground"}`}
          >
            {displaySummary}
          </p>

          {metrics && metrics.length > 0 && (
            <div className="border-border/50 mb-6 grid grid-cols-2 gap-3 border-t pt-4">
              {metrics.map((m, idx) => (
                <div key={idx}>
                  <div className="text-primary font-mono text-lg font-bold">{m.value}</div>
                  <div className={`text-xs ${dark ? "text-gray-400" : "text-muted-foreground"}`}>
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="p-6 pt-0 md:p-8">
        <a
          href={`/portfolio/${slug}`}
          className="text-primary inline-flex items-center gap-2 text-sm font-bold transition-transform group-hover:translate-x-1"
        >
          View Case Study <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
