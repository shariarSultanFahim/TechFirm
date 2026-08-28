"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Copy,
  Eye,
  Facebook,
  Linkedin,
  Twitter,
  User,
  Youtube
} from "lucide-react";

import { IPost } from "@repo/types";

import { BlogComments } from "./blog-comments";
import type { BlogPost } from "./blog-data";

interface BlogDetailViewProps {
  post: BlogPost | IPost;
}

export function BlogDetailView({ post }: BlogDetailViewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const title = post.title;
  const excerpt = post.excerpt;
  const body = "body" in post && post.body ? post.body : "";
  const imageUrl =
    "coverImage" in post && post.coverImage
      ? post.coverImage
      : "image" in post && post.image
        ? typeof post.image === "string"
          ? post.image
          : (post.image as { src: string }).src
        : "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200";

  const authorName = post.author?.name || "TechFirm Team";
  const dateFormatted =
    "publishedAt" in post && post.publishedAt
      ? new Date(post.publishedAt).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric"
        })
      : "date" in post && post.date
        ? post.date
        : "January 2026";

  const readTime = "readTime" in post && post.readTime ? post.readTime : "6 min read";
  const category = post.category || "Cloud Solutions";
  const tags: string[] =
    "tags" in post && post.tags ? post.tags : ["#BUSINESS", "#TECHNOLOGY", "#SECURITY"];

  return (
    <article className="w-full bg-white py-14 sm:py-20 lg:py-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 1. Header Metadata Pill */}
        <div className="mx-auto mb-4 flex max-w-4xl flex-col items-center text-center">
          <div className="text-muted-foreground mb-5 inline-flex items-center gap-3 rounded-full border border-gray-200 bg-[#F9FAFB] px-4 py-1.5 text-xs font-medium shadow-2xs">
            <div className="flex items-center gap-1">
              <Eye className="text-primary h-3.5 w-3.5" />
              <span>3</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Calendar className="text-primary h-3.5 w-3.5" />
              <span>{dateFormatted}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Clock className="text-primary h-3.5 w-3.5" />
              <span>{readTime}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="mb-4 text-3xl leading-tight font-extrabold tracking-tight text-[#141432] sm:text-4xl lg:text-[44px]">
            {title}
          </h1>

          {/* Subtitle / Excerpt */}
          <p className="mx-auto mb-6 max-w-2xl text-xs leading-relaxed font-medium text-[#5C5C6E] sm:text-sm">
            {excerpt}
          </p>

          {/* Dashed Separator */}
          <div className="mb-6 w-full border-t border-dashed border-gray-200" />

          {/* Top Tag Badges */}
          <div className="flex items-center justify-center gap-3">
            <span className="bg-primary/10 text-primary border-primary/20 rounded-full border px-3.5 py-1 text-[11px] font-bold tracking-wider uppercase">
              #{category.toUpperCase()}
            </span>
            {tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[#06B6D4]/25 bg-[#06B6D4]/10 px-3.5 py-1 text-[11px] font-bold tracking-wider text-[#0891B2] uppercase"
              >
                {tag.startsWith("#") ? tag : `#${tag}`}
              </span>
            ))}
          </div>
        </div>

        {/* 2. Hero Feature Image */}
        <div className="relative my-8 aspect-[16/9] w-full overflow-hidden rounded-3xl border border-[#EDE8F5] bg-neutral-100 shadow-lg sm:my-10">
          <Image
            src={imageUrl}
            alt={title}
            fill
            priority
            sizes="(max-width: 1440px) 100vw, 896px"
            className="object-cover object-center"
            unoptimized
          />
        </div>

        {/* 3. Section: Article Content / Markdown Render */}
        <div className="mx-auto max-w-4xl space-y-5 text-left text-xs leading-relaxed font-normal text-[#5C5C6E] sm:text-sm">
          {body ? (
            <div className="prose prose-neutral max-w-none space-y-4 text-xs leading-relaxed text-[#5C5C6E] sm:text-sm">
              {body.split("\n\n").map((paragraph, pIdx) => {
                if (paragraph.startsWith("## ")) {
                  return (
                    <h2
                      key={pIdx}
                      className="mb-2 pt-4 text-xl font-bold tracking-tight text-[#141432] sm:text-2xl"
                    >
                      {paragraph.replace("## ", "")}
                    </h2>
                  );
                }
                if (paragraph.startsWith("### ")) {
                  return (
                    <h3
                      key={pIdx}
                      className="mb-1 pt-3 text-lg font-bold tracking-tight text-[#141432] sm:text-xl"
                    >
                      {paragraph.replace("### ", "")}
                    </h3>
                  );
                }
                if (paragraph.startsWith("> ")) {
                  return (
                    <div
                      key={pIdx}
                      className="border-primary my-6 rounded-2xl border-l-4 bg-[#F9FAFB] p-6 text-left font-semibold text-[#141432] italic"
                    >
                      {paragraph.replace("> ", "")}
                    </div>
                  );
                }
                return <p key={pIdx}>{paragraph}</p>;
              })}
            </div>
          ) : (
            <>
              <p>
                Prioritization, setting boundaries, taking breaks, and adapting to peak hours,
                remote workers can achieve more effective and fulfilling schedules in the digital
                age.
              </p>
              <p>
                By implementing time blocking, prioritization, setting boundaries, taking breaks,
                and adapting to peak hours, remote workers can achieve more effective and fulfilling
                schedules in the digital age.
              </p>
              <h2 className="mb-2 pt-4 text-xl font-bold tracking-tight text-[#141432] sm:text-2xl">
                Strategies for Effective Schedules
              </h2>
              <p>
                Fulfilling schedules in the digital age. The boundaries between work and personal
                life can blur in remote work, making it essential to set clear expectations and time
                management strategies.
              </p>
            </>
          )}
        </div>

        {/* 8. Tags & Social Share Bar */}
        <div className="mx-auto mt-12 max-w-4xl space-y-4 border-t border-dashed border-gray-200 pt-6 text-left">
          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#141432]">
            <span className="font-bold">Tags:</span>
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-muted-foreground rounded-md bg-[#F3F4F6] px-2.5 py-1 transition-colors"
              >
                {tag.startsWith("#") ? tag : `#${tag}`}
              </span>
            ))}
          </div>

          {/* Social Share Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <span className="text-xs font-bold text-[#141432]">Share This Post:</span>
            <button
              type="button"
              className="hover:bg-primary flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#141432] text-white shadow-2xs transition-colors"
            >
              <Facebook className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              className="hover:bg-primary flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#141432] text-white shadow-2xs transition-colors"
            >
              <Twitter className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              className="hover:bg-primary flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#141432] text-white shadow-2xs transition-colors"
            >
              <Youtube className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              className="hover:bg-primary flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#141432] text-white shadow-2xs transition-colors"
            >
              <Linkedin className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Copy Link Input */}
          <div className="pt-2">
            <div className="text-muted-foreground flex max-w-md items-center justify-between rounded-full border border-[#EDE8F5] bg-[#F9FAFB] px-4 py-2.5 text-xs">
              <span className="truncate pr-2 select-all">
                https://techfirm.com/blog/{post.slug}
              </span>
              <button
                type="button"
                onClick={handleCopyLink}
                className="text-primary hover:text-primary/80 shrink-0 cursor-pointer transition-colors"
                aria-label="Copy link"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-emerald-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 9. Previous / Next Article Navigation */}
        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-6 border-t border-b border-dashed border-gray-200 pt-8 pb-8 text-left sm:grid-cols-2">
          <Link
            href="/blog"
            className="group flex items-center gap-4 rounded-2xl p-2 transition-colors hover:bg-[#F9FAFB]"
          >
            <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-2xl bg-[#E0F7F6] leading-none font-bold text-[#0D9488] shadow-2xs">
              <span className="text-sm">09</span>
              <span className="text-[9px] tracking-wider uppercase">JAN</span>
            </div>
            <div className="space-y-1">
              <div className="text-muted-foreground group-hover:text-primary flex items-center gap-1 text-[11px] font-bold tracking-wider uppercase transition-colors">
                <ChevronLeft className="h-3 w-3" />
                <span>PREVIOUS</span>
              </div>
              <h4 className="group-hover:text-primary line-clamp-1 text-xs font-bold text-[#141432] transition-colors sm:text-sm">
                Optimizing Multi-Cloud Infrastructure
              </h4>
              <div className="text-muted-foreground flex items-center gap-1 text-[11px]">
                <User className="h-3 w-3" />
                <span>By {authorName}</span>
              </div>
            </div>
          </Link>

          <Link
            href="/blog"
            className="group flex items-center justify-start gap-4 rounded-2xl p-2 transition-colors hover:bg-[#F9FAFB] sm:justify-end"
          >
            <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-2xl bg-[#E0F7F6] leading-none font-bold text-[#0D9488] shadow-2xs sm:order-2">
              <span className="text-sm">20</span>
              <span className="text-[9px] tracking-wider uppercase">JAN</span>
            </div>
            <div className="space-y-1 sm:order-1 sm:text-right">
              <div className="text-muted-foreground group-hover:text-primary flex items-center gap-1 text-[11px] font-bold tracking-wider uppercase transition-colors sm:justify-end">
                <span>NEXT</span>
                <ChevronRight className="h-3 w-3" />
              </div>
              <h4 className="group-hover:text-primary line-clamp-1 text-xs font-bold text-[#141432] transition-colors sm:text-sm">
                Zero-Trust Cybersecurity Framework
              </h4>
              <div className="text-muted-foreground flex items-center gap-1 text-[11px] sm:justify-end">
                <User className="h-3 w-3" />
                <span>By Marcus Chen</span>
              </div>
            </div>
          </Link>
        </div>

        {/* 10. Comments & Leave a Comment */}
        <BlogComments />
      </div>
    </article>
  );
}
