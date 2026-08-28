import * as React from "react";
import { Calendar, User, ArrowRight } from "lucide-react";
import { format } from "date-fns";

export interface BlogPostCardProps {
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  author: string;
  publishedAt?: string | Date;
  imageUrl?: string;
  dark?: boolean;
}

export function BlogPostCard({
  title,
  excerpt,
  slug,
  category,
  author,
  publishedAt,
  imageUrl,
  dark = false
}: BlogPostCardProps) {
  let displayDate = "Recently";
  if (publishedAt) {
    try {
      displayDate = format(new Date(publishedAt), "dd MMM yyyy");
    } catch {
      displayDate = String(publishedAt);
    }
  }

  return (
    <div
      className={`group rounded-3xl overflow-hidden border transition-all duration-300 hover:shadow-lg flex flex-col justify-between ${
        dark ? "bg-dark-card border-dark-border text-white" : "bg-card border-border text-foreground shadow-sm"
      }`}
    >
      <div>
        {imageUrl ? (
          <div className="relative h-52 w-full overflow-hidden bg-gray-900">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-bold py-1 px-3 rounded-full">
              {category}
            </div>
          </div>
        ) : (
          <div className="h-44 bg-gradient-to-tr from-gray-900 to-gray-800 flex items-center justify-center p-6 text-primary">
            <span className="text-xs font-bold uppercase tracking-wider">{category}</span>
          </div>
        )}

        <div className="p-6 md:p-8">
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-primary" /> {displayDate}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-primary" /> {author}
            </span>
          </div>

          <h3 className="text-xl font-bold tracking-tight mb-3 line-clamp-2 group-hover:text-primary transition-colors">
            <a href={`/blog/${slug}`}>{title}</a>
          </h3>

          <p className={`text-sm leading-relaxed line-clamp-3 mb-6 ${dark ? "text-gray-300" : "text-muted-foreground"}`}>
            {excerpt}
          </p>
        </div>
      </div>

      <div className="p-6 md:p-8 pt-0">
        <a
          href={`/blog/${slug}`}
          className="inline-flex items-center gap-2 text-sm font-bold text-primary group-hover:translate-x-1 transition-transform"
        >
          Read Article <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
