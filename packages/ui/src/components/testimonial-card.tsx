import * as React from "react";

import { Star } from "lucide-react";

export interface TestimonialItem {
  id?: string;
  quote?: string;
  content?: string;
  author?: string;
  name?: string;
  role?: string;
  company?: string;
  avatarUrl?: string;
  avatar?: string;
  posterImage?: string;
  rating?: number;
  dark?: boolean;
}

export type TestimonialCardProps = TestimonialItem;

export function TestimonialCard({
  quote,
  content,
  author,
  name,
  role = "",
  company,
  avatarUrl,
  avatar,
  rating = 5,
  dark = false
}: TestimonialCardProps) {
  const displayQuote = quote || content || "";
  const displayAuthor = author || name || "Client";
  const displayAvatar = avatarUrl || avatar;
  const displayRole = company ? (role ? `${role}, ${company}` : company) : role;

  return (
    <div
      className={`flex flex-col justify-between rounded-2xl border p-8 transition-all duration-300 hover:shadow-md ${
        dark
          ? "bg-dark-card border-dark-border text-white"
          : "bg-card border-border text-foreground shadow-sm"
      }`}
    >
      <div>
        <div className="mb-4 flex gap-1">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
          ))}
        </div>
        <p
          className={`mb-6 text-base leading-relaxed italic ${dark ? "text-gray-200" : "text-muted-foreground"}`}
        >
          &ldquo;{displayQuote}&rdquo;
        </p>
      </div>

      <div className="flex items-center gap-3">
        {displayAvatar ? (
          <img
            src={displayAvatar}
            alt={displayAuthor}
            className="border-primary h-12 w-12 rounded-full border-2 object-cover"
          />
        ) : (
          <div className="bg-accent text-accent-foreground flex h-12 w-12 items-center justify-center rounded-full text-base font-bold">
            {displayAuthor.charAt(0)}
          </div>
        )}
        <div>
          <div className={`text-sm font-bold ${dark ? "text-white" : "text-foreground"}`}>
            {displayAuthor}
          </div>
          {displayRole && (
            <div className={`text-xs ${dark ? "text-gray-400" : "text-muted-foreground"}`}>
              {displayRole}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
