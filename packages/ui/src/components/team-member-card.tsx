import * as React from "react";
import { Linkedin, Twitter, Mail } from "lucide-react";

export interface TeamMemberItem {
  name: string;
  role: string;
  slug?: string;
  bio?: string;
  imageUrl?: string;
  photo?: string;
  avatar?: string;
  email?: string;
  linkedin?: string;
  twitter?: string;
  socials?: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
  dark?: boolean;
}

export type TeamMemberCardProps = TeamMemberItem;

export function TeamMemberCard({
  name,
  role,
  slug,
  bio,
  imageUrl,
  photo,
  avatar,
  email,
  linkedin,
  twitter,
  socials,
  dark = false
}: TeamMemberCardProps) {
  const displayImage = imageUrl || photo || avatar;
  const linkedinUrl = socials?.linkedin || linkedin;
  const twitterUrl = socials?.twitter || twitter;
  const emailUrl = socials?.email || email;

  return (
    <div
      className={`group rounded-3xl overflow-hidden border transition-all duration-300 hover:shadow-lg flex flex-col justify-between ${
        dark ? "bg-dark-card border-dark-border text-white" : "bg-card border-border text-foreground shadow-sm"
      }`}
    >
      <div>
        <div className="relative h-64 w-full overflow-hidden bg-gray-800">
          {displayImage ? (
            <img
              src={displayImage}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-accent text-accent-foreground text-4xl font-black">
              {name.charAt(0)}
            </div>
          )}
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold tracking-tight mb-1 group-hover:text-primary transition-colors">
            {slug ? <a href={`/team/${slug}`}>{name}</a> : name}
          </h3>
          <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">{role}</div>
          {bio && (
            <p className={`text-sm line-clamp-2 leading-relaxed mb-4 ${dark ? "text-gray-300" : "text-muted-foreground"}`}>
              {bio}
            </p>
          )}
        </div>
      </div>

      <div className="p-6 pt-0 flex items-center justify-between border-t border-border/40">
        <div className="flex items-center gap-3">
          {linkedinUrl && (
            <a href={linkedinUrl} className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-4 h-4" />
            </a>
          )}
          {twitterUrl && (
            <a href={twitterUrl} className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
              <Twitter className="w-4 h-4" />
            </a>
          )}
          {emailUrl && (
            <a href={`mailto:${emailUrl}`} className="text-muted-foreground hover:text-primary transition-colors" aria-label="Email">
              <Mail className="w-4 h-4" />
            </a>
          )}
        </div>
        {slug && (
          <a href={`/team/${slug}`} className="text-xs font-bold text-primary hover:underline">
            Profile &rarr;
          </a>
        )}
      </div>
    </div>
  );
}
