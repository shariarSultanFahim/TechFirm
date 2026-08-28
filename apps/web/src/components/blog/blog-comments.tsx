"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function BlogComments() {
  const [copied, setCopied] = useState(false);

  return (
    <div className="space-y-8 w-full mt-14 max-w-4xl mx-auto">
      {/* 1. Comments List Box */}
      <div className="rounded-3xl p-6 sm:p-8 border border-[#EDE8F5] bg-white shadow-2xs">
        <div className="mb-6">
          <h3 className="text-xl sm:text-2xl font-bold text-[#141432] tracking-tight">
            View Comments (3)
          </h3>
          <div className="w-12 h-1 bg-primary rounded-full mt-2" />
        </div>

        {/* Comment Items */}
        <div className="space-y-6">
          {/* Comment 1 */}
          <div className="flex items-start gap-3.5 sm:gap-4">
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden shrink-0 border border-border">
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
                <span className="text-xs text-muted-foreground">on October 9, 2026</span>
              </div>
              <p className="text-xs sm:text-sm text-[#5C5C6E] leading-relaxed">
                A look ahead at the emerging trends that will shape the enterprise cloud in 2026, from serverless shifts to groundbreaking multi-cloud orchestration.
              </p>
              <button
                type="button"
                className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline cursor-pointer pt-1"
              >
                <span>Reply Now</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Comment 2 (Nested / Indented Reply) */}
          <div className="flex items-start gap-3.5 sm:gap-4 pl-8 sm:pl-12 border-l-2 border-primary/20">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden shrink-0 border border-border">
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
                <span className="text-xs text-muted-foreground">on October 9, 2026</span>
              </div>
              <p className="text-xs sm:text-sm text-[#5C5C6E] leading-relaxed">
                You&apos;ve changed the way I think about this topic. I really appreciate your unique perspective on automation frameworks.
              </p>
              <button
                type="button"
                className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline cursor-pointer pt-1"
              >
                <span>Reply Now</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Comment 3 */}
          <div className="flex items-start gap-3.5 sm:gap-4">
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden shrink-0 border border-border">
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
                <span className="text-xs text-muted-foreground">on October 9, 2026</span>
              </div>
              <p className="text-xs sm:text-sm text-[#5C5C6E] leading-relaxed">
                Emerging trends that will shape the world in 2026, from lifestyle shifts to groundbreaking tech innovations.
              </p>
              <button
                type="button"
                className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline cursor-pointer pt-1"
              >
                <span>Reply Now</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Leave a Comment Form */}
      <div className="rounded-3xl p-6 sm:p-8 border border-[#EDE8F5] bg-white shadow-2xs">
        <div className="mb-6 text-left">
          <h3 className="text-xl sm:text-2xl font-bold text-[#141432] tracking-tight">
            Leave a Comment
          </h3>
          <div className="w-12 h-1 bg-primary rounded-full mt-2 mb-2" />
          <p className="text-xs text-muted-foreground font-medium">
            Your email address will not be published. Required fields are marked *
          </p>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-4 text-left">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#141432] mb-1.5">
                Name *
              </label>
              <input
                type="text"
                placeholder="Your name"
                required
                className="w-full px-4 py-3 rounded-xl border border-[#EDE8F5] bg-[#F9FAFB] text-xs sm:text-sm text-[#141432] placeholder-gray-400 focus:outline-hidden focus:border-primary focus:bg-white transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#141432] mb-1.5">
                Email *
              </label>
              <input
                type="email"
                placeholder="Your email"
                required
                className="w-full px-4 py-3 rounded-xl border border-[#EDE8F5] bg-[#F9FAFB] text-xs sm:text-sm text-[#141432] placeholder-gray-400 focus:outline-hidden focus:border-primary focus:bg-white transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#141432] mb-1.5">
              Your Comment *
            </label>
            <textarea
              rows={4}
              placeholder="Your comment"
              required
              className="w-full px-4 py-3 rounded-xl border border-[#EDE8F5] bg-[#F9FAFB] text-xs sm:text-sm text-[#141432] placeholder-gray-400 focus:outline-hidden focus:border-primary focus:bg-white transition-all resize-none"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="save-info"
              className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4 cursor-pointer"
            />
            <label htmlFor="save-info" className="text-xs text-muted-foreground cursor-pointer select-none">
              Save my name and email in this browser for the next time I comment.
            </label>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              Post Comment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
