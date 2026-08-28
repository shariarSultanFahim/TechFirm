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
      className={`group rounded-3xl overflow-hidden border transition-all duration-300 hover:shadow-xl flex flex-col justify-between ${
        dark ? "bg-dark-card border-dark-border text-white" : "bg-card border-border text-foreground shadow-sm"
      }`}
    >
      <div>
        {displayImage ? (
          <div className="relative h-60 w-full overflow-hidden bg-gray-900">
            <img
              src={displayImage}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-bold py-1 px-3 rounded-full">
              {category}
            </div>
          </div>
        ) : (
          <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center p-6 text-primary">
            <span className="text-sm font-semibold uppercase tracking-wider">{category}</span>
          </div>
        )}

        <div className="p-6 md:p-8">
          <div className="text-xs text-primary font-semibold uppercase tracking-wider mb-2">
            Client: {client}
          </div>
          <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className={`text-sm leading-relaxed mb-6 ${dark ? "text-gray-300" : "text-muted-foreground"}`}>
            {displaySummary}
          </p>

          {metrics && metrics.length > 0 && (
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border/50 mb-6">
              {metrics.map((m, idx) => (
                <div key={idx}>
                  <div className="text-lg font-bold font-mono text-primary">{m.value}</div>
                  <div className={`text-xs ${dark ? "text-gray-400" : "text-muted-foreground"}`}>{m.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="p-6 md:p-8 pt-0">
        <a
          href={`/portfolio/${slug}`}
          className="inline-flex items-center gap-2 font-bold text-sm text-primary group-hover:translate-x-1 transition-transform"
        >
          View Case Study <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
