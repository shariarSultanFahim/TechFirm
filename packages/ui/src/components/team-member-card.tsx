import * as React from "react";

import { Mail } from "lucide-react";

import { LinkedinIcon, TwitterIcon } from "./social-icons";

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
      className={`group flex flex-col justify-between overflow-hidden rounded-3xl border transition-all duration-300 hover:shadow-lg ${
        dark
          ? "bg-dark-card border-dark-border text-white"
          : "bg-card border-border text-foreground shadow-sm"
      }`}
    >
      <div>
        <div className="relative h-64 w-full overflow-hidden bg-gray-800">
          {displayImage ? (
            <img
              src={displayImage}
              alt={name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="bg-accent text-accent-foreground flex h-full w-full items-center justify-center text-4xl font-black">
              {name.charAt(0)}
            </div>
          )}
        </div>

        <div className="p-6">
          <h3 className="group-hover:text-primary mb-1 text-xl font-bold tracking-tight transition-colors">
            {slug ? <a href={`/team/${slug}`}>{name}</a> : name}
          </h3>
          <div className="text-primary mb-3 text-xs font-semibold tracking-wider uppercase">
            {role}
          </div>
          {bio && (
            <p
              className={`mb-4 line-clamp-2 text-sm leading-relaxed ${dark ? "text-gray-300" : "text-muted-foreground"}`}
            >
              {bio}
            </p>
          )}
        </div>
      </div>

      <div className="border-border/40 flex items-center justify-between border-t p-6 pt-0">
        <div className="flex items-center gap-3">
          {linkedinUrl && (
            <a
              href={linkedinUrl}
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
          )}
          {twitterUrl && (
            <a
              href={twitterUrl}
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Twitter"
            >
              <TwitterIcon className="h-4 w-4" />
            </a>
          )}
          {emailUrl && (
            <a
              href={`mailto:${emailUrl}`}
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
          )}
        </div>
        {slug && (
          <a href={`/team/${slug}`} className="text-primary text-xs font-bold hover:underline">
            Profile &rarr;
          </a>
        )}
      </div>
    </div>
  );
}
