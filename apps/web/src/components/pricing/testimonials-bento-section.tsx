"use client";

import { SectionHeader } from "@/components/widgets";
import { Play, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {/* Column 1: Tall Card 1 on Top, Compact Card 2 on Bottom */}
        <div className="flex flex-col gap-6 justify-between h-full">
          {/* Card 1 (Tall Top) */}
          <div className={`${cardBaseStyle} grow min-h-[300px] lg:min-h-[340px]`}>
            <blockquote className="text-sm sm:text-base text-[#141432] font-semibold leading-relaxed mb-8">
              &ldquo;Techfirm AI Website Builder takes out a lot of manual work. The website I built was spot on - I had to make only a few changes.&rdquo;
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border border-white/60 shadow-xs">
                <Image
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop"
                  alt="Sojol Saiful"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#141432] leading-tight">
                  Sojol Saiful
                </h4>
                <p className="text-xs text-muted-foreground font-medium">
                  Assistant Manager
                </p>
              </div>
            </div>
          </div>

          {/* Card 2 (Compact Bottom) */}
          <div className={`${cardBaseStyle} shrink-0`}>
            <blockquote className="text-sm sm:text-base text-[#141432] font-semibold leading-relaxed mb-8">
              &ldquo;Website Builder takes out a lot of manual work. The website I built was spot on.&rdquo;
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border border-white/60 shadow-xs">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
                  alt="David Warner"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#141432] leading-tight">
                  David Warner
                </h4>
                <p className="text-xs text-muted-foreground font-medium">
                  Assistant Manager
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: Compact Card 3 on Top, Tall Video Card 4 on Bottom */}
        <div className="flex flex-col gap-6 justify-between h-full">
          {/* Card 3 (Compact Top) */}
          <div className={`${cardBaseStyle} shrink-0`}>
            <blockquote className="text-sm sm:text-base text-[#141432] font-semibold leading-relaxed mb-8">
              &ldquo;Website Builder takes out a lot of manual work.&rdquo;
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border border-white/60 shadow-xs">
                <Image
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop"
                  alt="William Cambel"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#141432] leading-tight">
                  William Cambel
                </h4>
                <p className="text-xs text-muted-foreground font-medium">
                  Assistant Manager
                </p>
              </div>
            </div>
          </div>

          {/* Card 4 (Vibrant Cyan Video Feature Card - Grow to match height) */}
          <div className="relative rounded-3xl overflow-hidden bg-[#00D4D8] grow min-h-[380px] lg:min-h-[420px] shadow-lg group select-none flex flex-col justify-end">
            {isPlaying ? (
              <div className="relative w-full h-full bg-black min-h-[380px] lg:min-h-[420px]">
                <video
                  ref={videoRef}
                  src="/videos/review.mp4"
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                  onEnded={() => setIsPlaying(false)}
                />
                <button
                  type="button"
                  onClick={handleCloseVideo}
                  className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer shadow-md"
                  aria-label="Close Video"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <Image
                  src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop"
                  alt="Video Testimonial"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />

                {/* Bottom-right Watch Video button */}
                <div className="absolute bottom-5 right-5 z-10">
                  <button
                    type="button"
                    onClick={handleStartVideo}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#00A3A8] hover:text-white hover:bg-primary text-xs font-bold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer active:scale-95"
                  >
                    <span>Watch Video</span>
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Column 3: Compact Card 5 on Top, Tall Card 6 on Bottom */}
        <div className="flex flex-col gap-6 justify-between h-full">
          {/* Card 5 (Compact Top) */}
          <div className={`${cardBaseStyle} shrink-0`}>
            <blockquote className="text-sm sm:text-base text-[#141432] font-semibold leading-relaxed mb-8">
              &ldquo;Website Builder takes out a lot of manual work.&rdquo;
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border border-white/60 shadow-xs">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
                  alt="John Samuel"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#141432] leading-tight">
                  John Samuel
                </h4>
                <p className="text-xs text-muted-foreground font-medium">
                  Assistant Manager
                </p>
              </div>
            </div>
          </div>

          {/* Card 6 (Tall Bottom) */}
          <div className={`${cardBaseStyle} grow min-h-[300px] lg:min-h-[340px]`}>
            <blockquote className="text-sm sm:text-base text-[#141432] font-semibold leading-relaxed mb-8">
              &ldquo;Techfirm AI Website Builder takes out a lot of manual work. The website I built was spot on - I had to make only a few changes.&rdquo;
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border border-white/60 shadow-xs">
                <Image
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
                  alt="Saiful Islam"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#141432] leading-tight">
                  Saiful Islam
                </h4>
                <p className="text-xs text-muted-foreground font-medium">
                  Assistant Manager
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
