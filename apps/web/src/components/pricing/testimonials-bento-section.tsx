"use client";

import { useRef, useState } from "react";
import Image from "next/image";

import { Play, X } from "lucide-react";

import { SectionHeader } from "@/components/widgets";

export function TestimonialsBentoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleStartVideo = () => {
    setIsPlaying(true);
  };

  const handleCloseVideo = () => {
    setIsPlaying(false);
  };

  const cardBaseStyle =
    "rounded-3xl p-7 sm:p-8 transition-all duration-300 flex flex-col justify-between bg-[#F9FAFB] hover:bg-white border border-[#EDE8F5]  group";

  return (
    <section className="w-full pt-16 sm:pt-20 lg:pt-24">
      {/* Reusable Section Header with landing page theming */}
      <SectionHeader
        align="center"
        badge="OUR TESTIMONIALS"
        title="What People Say About Us"
        className="mb-12 sm:mb-16"
      />

      {/* 3-Column Bento Grid with Equal Column Heights */}
      <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Column 1: Tall Card 1 on Top, Compact Card 2 on Bottom */}
        <div className="flex h-full flex-col justify-between gap-6">
          {/* Card 1 (Tall Top) */}
          <div className={`${cardBaseStyle} min-h-[300px] grow lg:min-h-[340px]`}>
            <blockquote className="mb-8 text-sm leading-relaxed font-semibold text-[#141432] sm:text-base">
              &ldquo;Techfirm AI Website Builder takes out a lot of manual work. The website I built
              was spot on - I had to make only a few changes.&rdquo;
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-white/60 shadow-xs">
                <Image
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop"
                  alt="Sojol Saiful"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="text-sm leading-tight font-bold text-[#141432]">Sojol Saiful</h4>
                <p className="text-muted-foreground text-xs font-medium">Assistant Manager</p>
              </div>
            </div>
          </div>

          {/* Card 2 (Compact Bottom) */}
          <div className={`${cardBaseStyle} shrink-0`}>
            <blockquote className="mb-8 text-sm leading-relaxed font-semibold text-[#141432] sm:text-base">
              &ldquo;Website Builder takes out a lot of manual work. The website I built was spot
              on.&rdquo;
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-white/60 shadow-xs">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
                  alt="David Warner"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="text-sm leading-tight font-bold text-[#141432]">David Warner</h4>
                <p className="text-muted-foreground text-xs font-medium">Assistant Manager</p>
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: Compact Card 3 on Top, Tall Video Card 4 on Bottom */}
        <div className="flex h-full flex-col justify-between gap-6">
          {/* Card 3 (Compact Top) */}
          <div className={`${cardBaseStyle} shrink-0`}>
            <blockquote className="mb-8 text-sm leading-relaxed font-semibold text-[#141432] sm:text-base">
              &ldquo;Website Builder takes out a lot of manual work.&rdquo;
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-white/60 shadow-xs">
                <Image
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop"
                  alt="William Cambel"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="text-sm leading-tight font-bold text-[#141432]">William Cambel</h4>
                <p className="text-muted-foreground text-xs font-medium">Assistant Manager</p>
              </div>
            </div>
          </div>

          {/* Card 4 (Vibrant Cyan Video Feature Card - Grow to match height) */}
          <div className="group relative flex min-h-[380px] grow flex-col justify-end overflow-hidden rounded-3xl bg-[#00D4D8] shadow-lg select-none lg:min-h-[420px]">
            {isPlaying ? (
              <div className="relative h-full min-h-[380px] w-full bg-black lg:min-h-[420px]">
                <video
                  ref={videoRef}
                  src="/videos/review.mp4"
                  controls
                  autoPlay
                  playsInline
                  className="h-full w-full object-cover"
                  onEnded={() => setIsPlaying(false)}
                />
                <button
                  type="button"
                  onClick={handleCloseVideo}
                  className="absolute top-4 right-4 z-20 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white shadow-md transition-colors hover:bg-black/80"
                  aria-label="Close Video"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <>
                <Image
                  src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop"
                  alt="Video Testimonial"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />

                {/* Bottom-right Watch Video button */}
                <div className="absolute right-5 bottom-5 z-10">
                  <button
                    type="button"
                    onClick={handleStartVideo}
                    className="hover:bg-primary inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-bold text-[#00A3A8] shadow-lg transition-all duration-300 hover:text-white hover:shadow-xl active:scale-95"
                  >
                    <span>Watch Video</span>
                    <Play className="h-3.5 w-3.5 fill-current" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Column 3: Compact Card 5 on Top, Tall Card 6 on Bottom */}
        <div className="flex h-full flex-col justify-between gap-6">
          {/* Card 5 (Compact Top) */}
          <div className={`${cardBaseStyle} shrink-0`}>
            <blockquote className="mb-8 text-sm leading-relaxed font-semibold text-[#141432] sm:text-base">
              &ldquo;Website Builder takes out a lot of manual work.&rdquo;
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-white/60 shadow-xs">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
                  alt="John Samuel"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="text-sm leading-tight font-bold text-[#141432]">John Samuel</h4>
                <p className="text-muted-foreground text-xs font-medium">Assistant Manager</p>
              </div>
            </div>
          </div>

          {/* Card 6 (Tall Bottom) */}
          <div className={`${cardBaseStyle} min-h-[300px] grow lg:min-h-[340px]`}>
            <blockquote className="mb-8 text-sm leading-relaxed font-semibold text-[#141432] sm:text-base">
              &ldquo;Techfirm AI Website Builder takes out a lot of manual work. The website I built
              was spot on - I had to make only a few changes.&rdquo;
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-white/60 shadow-xs">
                <Image
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
                  alt="Saiful Islam"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="text-sm leading-tight font-bold text-[#141432]">Saiful Islam</h4>
                <p className="text-muted-foreground text-xs font-medium">Assistant Manager</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
