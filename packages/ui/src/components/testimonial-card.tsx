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
      className={`p-8 rounded-2xl border flex flex-col justify-between transition-all duration-300 hover:shadow-md ${
        dark ? "bg-dark-card border-dark-border text-white" : "bg-card border-border text-foreground shadow-sm"
      }`}
    >
      <div>
        <div className="flex gap-1 mb-4">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
          ))}
        </div>
        <p className={`text-base leading-relaxed italic mb-6 ${dark ? "text-gray-200" : "text-muted-foreground"}`}>
          &ldquo;{displayQuote}&rdquo;
        </p>
      </div>

      <div className="flex items-center gap-3">
        {displayAvatar ? (
          <img src={displayAvatar} alt={displayAuthor} className="w-12 h-12 rounded-full object-cover border-2 border-primary" />
        ) : (
          <div className="w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-base">
            {displayAuthor.charAt(0)}
          </div>
        )}
        <div>
          <div className={`font-bold text-sm ${dark ? "text-white" : "text-foreground"}`}>{displayAuthor}</div>
          {displayRole && <div className={`text-xs ${dark ? "text-gray-400" : "text-muted-foreground"}`}>{displayRole}</div>}
        </div>
      </div>
    </div>
  );
}
