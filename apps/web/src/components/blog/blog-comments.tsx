"use client";

import { useState } from "react";
import Image from "next/image";

import { ArrowUpRight } from "lucide-react";

export function BlogComments() {
  const [copied, setCopied] = useState(false);

  return (
    <div className="mx-auto mt-14 w-full max-w-4xl space-y-8">
      {/* 1. Comments List Box */}
      <div className="rounded-3xl border border-[#EDE8F5] bg-white p-6 shadow-2xs sm:p-8">
        <div className="mb-6">
          <h3 className="text-xl font-bold tracking-tight text-[#141432] sm:text-2xl">
            View Comments (3)
          </h3>
          <div className="bg-primary mt-2 h-1 w-12 rounded-full" />
        </div>

        {/* Comment Items */}
        <div className="space-y-6">
          {/* Comment 1 */}
          <div className="flex items-start gap-3.5 sm:gap-4">
            <div className="border-border relative h-10 w-10 shrink-0 overflow-hidden rounded-full border sm:h-11 sm:w-11">
              <Image
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
                alt="Elliot Alderson"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 space-y-1 text-left">
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="text-sm font-bold text-[#141432]">Elliot Alderson</span>
                <span className="text-muted-foreground text-xs">on October 9, 2026</span>
              </div>
              <p className="text-xs leading-relaxed text-[#5C5C6E] sm:text-sm">
                A look ahead at the emerging trends that will shape the enterprise cloud in 2026,
                from serverless shifts to groundbreaking multi-cloud orchestration.
              </p>
              <button
                type="button"
                className="text-primary inline-flex cursor-pointer items-center gap-1 pt-1 text-xs font-bold hover:underline"
              >
                <span>Reply Now</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Comment 2 (Nested / Indented Reply) */}
          <div className="border-primary/20 flex items-start gap-3.5 border-l-2 pl-8 sm:gap-4 sm:pl-12">
            <div className="border-border relative h-9 w-9 shrink-0 overflow-hidden rounded-full border sm:h-10 sm:w-10">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
                alt="Elliot Alderson"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 space-y-1 text-left">
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="text-sm font-bold text-[#141432]">Elliot Alderson</span>
                <span className="text-muted-foreground text-xs">on October 9, 2026</span>
              </div>
              <p className="text-xs leading-relaxed text-[#5C5C6E] sm:text-sm">
                You&apos;ve changed the way I think about this topic. I really appreciate your
                unique perspective on automation frameworks.
              </p>
              <button
                type="button"
                className="text-primary inline-flex cursor-pointer items-center gap-1 pt-1 text-xs font-bold hover:underline"
              >
                <span>Reply Now</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Comment 3 */}
          <div className="flex items-start gap-3.5 sm:gap-4">
            <div className="border-border relative h-10 w-10 shrink-0 overflow-hidden rounded-full border sm:h-11 sm:w-11">
              <Image
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
                alt="Elliot Alderson"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 space-y-1 text-left">
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="text-sm font-bold text-[#141432]">Elliot Alderson</span>
                <span className="text-muted-foreground text-xs">on October 9, 2026</span>
              </div>
              <p className="text-xs leading-relaxed text-[#5C5C6E] sm:text-sm">
                Emerging trends that will shape the world in 2026, from lifestyle shifts to
                groundbreaking tech innovations.
              </p>
              <button
                type="button"
                className="text-primary inline-flex cursor-pointer items-center gap-1 pt-1 text-xs font-bold hover:underline"
              >
                <span>Reply Now</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Leave a Comment Form */}
      <div className="rounded-3xl border border-[#EDE8F5] bg-white p-6 shadow-2xs sm:p-8">
        <div className="mb-6 text-left">
          <h3 className="text-xl font-bold tracking-tight text-[#141432] sm:text-2xl">
            Leave a Comment
          </h3>
          <div className="bg-primary mt-2 mb-2 h-1 w-12 rounded-full" />
          <p className="text-muted-foreground text-xs font-medium">
            Your email address will not be published. Required fields are marked *
          </p>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-4 text-left">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#141432]">Name *</label>
              <input
                type="text"
                placeholder="Your name"
                required
                className="focus:border-primary w-full rounded-xl border border-[#EDE8F5] bg-[#F9FAFB] px-4 py-3 text-xs text-[#141432] placeholder-gray-400 transition-all focus:bg-white focus:outline-hidden sm:text-sm"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#141432]">Email *</label>
              <input
                type="email"
                placeholder="Your email"
                required
                className="focus:border-primary w-full rounded-xl border border-[#EDE8F5] bg-[#F9FAFB] px-4 py-3 text-xs text-[#141432] placeholder-gray-400 transition-all focus:bg-white focus:outline-hidden sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#141432]">
              Your Comment *
            </label>
            <textarea
              rows={4}
              placeholder="Your comment"
              required
              className="focus:border-primary w-full resize-none rounded-xl border border-[#EDE8F5] bg-[#F9FAFB] px-4 py-3 text-xs text-[#141432] placeholder-gray-400 transition-all focus:bg-white focus:outline-hidden sm:text-sm"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="save-info"
              className="text-primary focus:ring-primary h-4 w-4 cursor-pointer rounded border-gray-300"
            />
            <label
              htmlFor="save-info"
              className="text-muted-foreground cursor-pointer text-xs select-none"
            >
              Save my name and email in this browser for the next time I comment.
            </label>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="bg-primary hover:bg-primary/90 cursor-pointer rounded-xl px-8 py-3 text-xs font-bold text-white shadow-md transition-all hover:shadow-lg sm:text-sm"
            >
              Post Comment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
