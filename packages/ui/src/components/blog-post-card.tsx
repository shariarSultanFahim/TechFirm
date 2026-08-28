import * as React from "react";

import { ArrowRight, Calendar, User } from "lucide-react";
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
      className={`group flex flex-col justify-between overflow-hidden rounded-3xl border transition-all duration-300 hover:shadow-lg ${
        dark
          ? "bg-dark-card border-dark-border text-white"
          : "bg-card border-border text-foreground shadow-sm"
      }`}
    >
      <div>
        {imageUrl ? (
          <div className="relative h-52 w-full overflow-hidden bg-gray-900">
            <img
              src={imageUrl}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="bg-primary text-primary-foreground absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-bold">
              {category}
            </div>
          </div>
        ) : (
          <div className="text-primary flex h-44 items-center justify-center bg-gradient-to-tr from-gray-900 to-gray-800 p-6">
            <span className="text-xs font-bold tracking-wider uppercase">{category}</span>
          </div>
        )}

        <div className="p-6 md:p-8">
          <div className="text-muted-foreground mb-3 flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5">
              <Calendar className="text-primary h-3.5 w-3.5" /> {displayDate}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="text-primary h-3.5 w-3.5" /> {author}
            </span>
          </div>

          <h3 className="group-hover:text-primary mb-3 line-clamp-2 text-xl font-bold tracking-tight transition-colors">
            <a href={`/blog/${slug}`}>{title}</a>
          </h3>

          <p
            className={`mb-6 line-clamp-3 text-sm leading-relaxed ${dark ? "text-gray-300" : "text-muted-foreground"}`}
          >
            {excerpt}
          </p>
        </div>
      </div>

      <div className="p-6 pt-0 md:p-8">
        <a
          href={`/blog/${slug}`}
          className="text-primary inline-flex items-center gap-2 text-sm font-bold transition-transform group-hover:translate-x-1"
        >
          Read Article <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
