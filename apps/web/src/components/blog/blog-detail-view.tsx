"use client";

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
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BlogComments } from "./blog-comments";
import type { BlogPost } from "./blog-data";

interface BlogDetailViewProps {
  post: BlogPost;
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

  return (
    <article className="w-full bg-white py-14 sm:py-20 lg:py-24">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. Header Metadata Pill */}
        <div className="flex flex-col max-w-4xl mx-auto items-center text-center mb-4">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-gray-200 bg-[#F9FAFB] text-xs text-muted-foreground font-medium mb-5 shadow-2xs">
            <div className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-primary" />
              <span>3</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-primary" />
              <span>09 January 2026</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-primary" />
              <span>09 Mins Read</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-[#141432] leading-tight mb-4">
            {post.title}
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-[#5C5C6E] leading-relaxed max-w-2xl mx-auto mb-6 font-medium">
            Revision is more than a typical content hub. It&apos;s a dynamic space for meaningful conversations and personal stories that resonate with people on an emotional level.
          </p>

          {/* Dashed Separator */}
          <div className="w-full border-t border-dashed border-gray-200 mb-6" />

          {/* Top Tag Badges */}
          <div className="flex items-center justify-center gap-3">
            <span className="px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
              #BUSINESS
            </span>
            <span className="px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#06B6D4]/10 text-[#0891B2] border border-[#06B6D4]/25">
              #MARKETING
            </span>
          </div>
        </div>

        {/* 2. Hero Feature Image */}
        <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-lg border border-[#EDE8F5] my-8 sm:my-10 bg-neutral-100">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 1440px) 100vw, 896px"
            className="object-cover object-center"
          />
        </div>

        {/* 3. Section 1: Intro & Strategies */}
        <div className="space-y-5 max-w-4xl mx-auto text-xs sm:text-sm text-[#5C5C6E] leading-relaxed font-normal text-left">
          <p>
            Prioritization, setting boundaries, taking breaks, and adapting to peak hours, remote workers can achieve more effective and fulfilling schedules in the digital age.
          </p>

          <p>
            By implementing time blocking, prioritization, setting boundaries, taking breaks, and adapting to peak hours, remote workers can achieve more effective and fulfilling schedules in the digital age. The boundaries between work and personal life can blur in remote work, making it essential to set clear expectations.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-[#141432] tracking-tight pt-4 mb-2">
            Strategies for Effective Schedules
          </h2>

          <p>
            Fulfilling schedules in the digital age. The boundaries between work and personal life can blur in remote work, making it essential to set clear expectations and time management strategies.
          </p>

          <p>
            In every field—whether you&apos;re a student, entrepreneur, team leader, or solo professional—it&apos;s easy to confuse activity with progress. You might spend hours responding to emails, putting out fires, or finishing small tasks, all while delaying the things that could actually drive meaningful outcomes. This constant state of motion can feel productive in the moment, but without prioritization, it rarely leads to significant growth. That&apos;s because not all tasks are created equal.
          </p>

          {/* Bullet Points */}
          <ul className="space-y-3 pt-2">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#141432] mt-2 shrink-0" />
              <span>
                The <strong>Eisenhower Matrix</strong> helps you evaluate every task by its urgency and <strong>importance</strong> so you can act on what truly <strong>matters</strong> now.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#141432] mt-2 shrink-0" />
              <span>
                The <strong>RICE Model</strong> evaluates reach, <strong>impact, confidence, and effort</strong> to prioritize based on value versus cost.
              </span>
            </li>
          </ul>
        </div>

        {/* 4. Middle In-Article Image */}
        <div className="relative w-full max-w-4xl mx-auto aspect-[16/9] rounded-3xl overflow-hidden shadow-md border border-[#EDE8F5] my-10 bg-neutral-100">
          <Image
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop"
            alt="Applying Frameworks in Workflow"
            fill
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover object-center"
          />
        </div>

        {/* 5. Section 2: Frameworks in Workflow */}
        <div className="space-y-5 max-w-4xl mx-auto text-xs sm:text-sm text-[#5C5C6E] leading-relaxed font-normal text-left">
          <h2 className="text-xl sm:text-2xl font-bold text-[#141432] tracking-tight mb-2">
            How to Apply Frameworks in Your Day-to-Day Workflow
          </h2>

          <p>
            The process is simple—and it works no matter your role, goals, or the type of work you&apos;re doing:
          </p>

          {/* Numbered List */}
          <ol className="space-y-3.5 pt-1">
            <li>
              <strong>1. Start with a full list of tasks or ideas:</strong> Don&apos;t worry about order—just write down everything that&apos;s on your plate so you can see it clearly.
            </li>
            <li>
              <strong>2. Pick a framework that fits your context:</strong> Choose based on what you&apos;re prioritizing—Eisenhower for urgent items, MoSCoW for shared plans, or RICE for resource-heavy projects.
            </li>
            <li>
              <strong>3. Evaluate and categorize everything honestly:</strong> Use objective criteria and sort your tasks accordingly—this is where clarity and action begin to take shape.
            </li>
          </ol>

          {/* 6. Quote Card */}
          <div className="my-8 p-8 rounded-2xl bg-[#F9FAFB] border-t-2 border-b-2 border-primary/40 text-center space-y-3">
            <blockquote className="text-base sm:text-lg font-bold text-[#141432] leading-relaxed italic">
              &ldquo;In solo work, frameworks are just as powerful. They help you beat indecision and overthinking by giving you a repeatable process&rdquo;.
            </blockquote>
            <div>
              <div className="text-xs font-bold text-primary">Adriana Martins</div>
              <div className="text-[11px] text-muted-foreground">Founder & Editor</div>
            </div>
          </div>

          {/* 7. Motivation Section */}
          <h2 className="text-xl sm:text-2xl font-bold text-[#141432] tracking-tight pt-2 mb-2">
            What Are The Main Types Of Motivation?
          </h2>

          <p>
            Putting out fires, or finishing small tasks, all, while delaying the things that could actually drive meaningful outcomes. This constant state of motion can feel productive in the moment, but without prioritization, it rarely leads to significant growth. That&apos;s because not all tasks are created equal.
          </p>

          <ul className="space-y-2.5 pt-1">
            <li className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#141432] shrink-0" />
              <span>Matrix helps you evaluate every task by its urgency</span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#141432] shrink-0" />
              <span>Prioritize based on value versus cost.</span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#141432] shrink-0" />
              <span>
                Rarely leads to{" "}
                <Link href="#" className="text-primary font-semibold hover:underline">
                  significant growth
                </Link>
              </span>
            </li>
          </ul>

          <p>
            This constant state of motion can feel productive in the moment, but without prioritization, it rarely leads to significant growth.
          </p>
        </div>

        {/* 8. Tags & Social Share Bar */}
        <div className="mt-12 max-w-4xl mx-auto pt-6 border-t border-dashed border-gray-200 space-y-4 text-left">
          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#141432]">
            <span className="font-bold">Tags:</span>
            <Link href="#" className="px-2.5 py-1 rounded-md bg-[#F3F4F6] text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
              #Education
            </Link>
            <Link href="#" className="px-2.5 py-1 rounded-md bg-[#F3F4F6] text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
              #Travel
            </Link>
            <Link href="#" className="px-2.5 py-1 rounded-md bg-[#F3F4F6] text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
              #Trending
            </Link>
            <Link href="#" className="px-2.5 py-1 rounded-md bg-[#F3F4F6] text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
              #IT
            </Link>
          </div>

          {/* Social Share Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <span className="text-xs font-bold text-[#141432]">Share This Post:</span>
            <button type="button" className="w-8 h-8 rounded-full bg-[#141432] text-white hover:bg-primary flex items-center justify-center transition-colors shadow-2xs cursor-pointer">
              <Facebook className="w-3.5 h-3.5" />
            </button>
            <button type="button" className="w-8 h-8 rounded-full bg-[#141432] text-white hover:bg-primary flex items-center justify-center transition-colors shadow-2xs cursor-pointer">
              <Twitter className="w-3.5 h-3.5" />
            </button>
            <button type="button" className="w-8 h-8 rounded-full bg-[#141432] text-white hover:bg-primary flex items-center justify-center transition-colors shadow-2xs cursor-pointer">
              <Youtube className="w-3.5 h-3.5" />
            </button>
            <button type="button" className="w-8 h-8 rounded-full bg-[#141432] text-white hover:bg-primary flex items-center justify-center transition-colors shadow-2xs cursor-pointer">
              <Linkedin className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Copy Link Input */}
          <div className="pt-2">
            <div className="flex items-center justify-between px-4 py-2.5 rounded-full border border-[#EDE8F5] bg-[#F9FAFB] text-xs text-muted-foreground max-w-md">
              <span className="truncate pr-2 select-all">
                https://bizantheme.com/techfirm/main/time-management
              </span>
              <button
                type="button"
                onClick={handleCopyLink}
                className="text-primary hover:text-primary/80 transition-colors cursor-pointer shrink-0"
                aria-label="Copy link"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* 9. Previous / Next Article Navigation */}
        <div className="grid max-w-4xl mx-auto grid-cols-1 sm:grid-cols-2 gap-6 mt-10 pt-8 border-t border-b border-dashed border-gray-200 pb-8 text-left">
          {/* Previous Post */}
          <Link
            href="/blog"
            className="flex items-center gap-4 group p-2 rounded-2xl hover:bg-[#F9FAFB] transition-colors"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#E0F7F6] text-[#0D9488] flex flex-col items-center justify-center shrink-0 shadow-2xs font-bold leading-none">
              <span className="text-sm">09</span>
              <span className="text-[9px] uppercase tracking-wider">JAN</span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-[11px] font-bold text-muted-foreground uppercase tracking-wider group-hover:text-primary transition-colors">
                <ChevronLeft className="w-3 h-3" />
                <span>PREVIOUS</span>
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-[#141432] group-hover:text-primary transition-colors line-clamp-1">
                Understanding Customer Journey Mapping
              </h4>
              <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                <User className="w-3 h-3" />
                <span>By John Smith</span>
              </div>
            </div>
          </Link>

          {/* Next Post */}
          <Link
            href="/blog"
            className="flex items-center justify-start sm:justify-end gap-4 group p-2 rounded-2xl hover:bg-[#F9FAFB] transition-colors"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#E0F7F6] text-[#0D9488] flex flex-col items-center justify-center shrink-0 shadow-2xs font-bold leading-none sm:order-2">
              <span className="text-sm">09</span>
              <span className="text-[9px] uppercase tracking-wider">JAN</span>
            </div>
            <div className="space-y-1 sm:text-right sm:order-1">
              <div className="flex items-center sm:justify-end gap-1 text-[11px] font-bold text-muted-foreground uppercase tracking-wider group-hover:text-primary transition-colors">
                <span>NEXT</span>
                <ChevronRight className="w-3 h-3" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-[#141432] group-hover:text-primary transition-colors line-clamp-1">
                More effective schedules in remote work
              </h4>
              <div className="flex items-center sm:justify-end gap-1 text-[11px] text-muted-foreground">
                <User className="w-3 h-3" />
                <span>By John Smith</span>
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
