"use client";

import { ArrowBadgeIcon, UShapeBadgeIcon, WavesBadgeIcon } from "@/assets/icons";
import { SectionHeader } from "@/components/widgets";
import { Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Quote icon & Company partner logos
import logo3 from "@/assets/reviews/logos/Frame.png";
import logo6 from "@/assets/reviews/logos/Group 1597884324.png";
import logo4 from "@/assets/reviews/logos/Group 1597884325.png";
import logo1 from "@/assets/reviews/logos/Group-1.png";
import logo5 from "@/assets/reviews/logos/Group-2.png";
import logo2 from "@/assets/reviews/logos/Group.png";
import quoteRightImg from "@/assets/reviews/quote-right.png";

const clientLogos = [
  { id: "logo-1", src: logo1, alt: "CM Design Here" },
  { id: "logo-2", src: logo2, alt: "Techno" },
  { id: "logo-3", src: logo3, alt: "Creative" },
  { id: "logo-4", src: logo4, alt: "CM Logo" },
  { id: "logo-5", src: logo5, alt: "Techbrand" },
  { id: "logo-6", src: logo6, alt: "TreeTech" }
];

const testimonials = [
  {
    id: "review-1",
    quote:
      "Techfirm AI Website Builder takes out a lot of manual work. The website I built was spot on - I had to make only a few changes.",
    tags: ["Techfirm Horizons", "Best Quality"],
    author: {
      name: "John Samuel",
      role: "Assistant Manager",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    iconBg: "bg-linear-to-br from-[#00C0FA] to-[#007BFE]",
    IconComponent: WavesBadgeIcon,
    hasVideo: false
  },
  {
    id: "review-2",
    quote:
      "Techfirm AI Website Builder takes out a lot of manual work. The website I built was spot on - I had to make only a few changes.",
    tags: ["Techfirm Horizons", "Best Quality"],
    author: {
      name: "William Cambel",
      role: "Assistant Manager",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80"
    },
    iconBg: "bg-linear-to-br from-[#34D399] to-[#059669]",
    IconComponent: UShapeBadgeIcon,
    hasVideo: true
  },
  {
    id: "review-3",
    quote:
      "Techfirm AI Website Builder takes out a lot of manual work. The website I built was spot on - I had to make only a few changes.",
    tags: ["Techfirm Horizons", "Best Quality"],
    author: {
      name: "Sojol Saiful",
      role: "Assistant Manager",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    },
    iconBg: "bg-linear-to-br from-[#8B5CF6] to-[#6D28D9]",
    IconComponent: ArrowBadgeIcon,
    hasVideo: false
  },
  {
    id: "review-4",
    quote:
      "Techfirm AI Website Builder takes out a lot of manual work. The website I built was spot on - I had to make only a few changes.",
    tags: ["Techfirm Horizons", "Best Quality"],
    author: {
      name: "Sarah Jenkins",
      role: "Assistant Manager",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
    },
    iconBg: "bg-linear-to-br from-[#F59E0B] to-[#D97706]",
    IconComponent: WavesBadgeIcon,
    hasVideo: true
  }
];

// Duplicate for seamless infinite loop
const marqueeTestimonials = [...testimonials, ...testimonials];

export function ReviewsSection() {
  return (
    <section className="relative w-full bg-[#F9FAFB] py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* Background Decorative Dot Grid */}
      <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-70 pointer-events-none -z-10" />

      <div className="w-full">
        {/* 1. Section Header */}
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 mb-12 sm:mb-16">
          <SectionHeader
            badge="WHAT CLIENTS SAY"
            title={
              <>
                They succeeded online - <br />
                now it&apos;s your turn
              </>
            }
            align="center"
          />
        </div>

        {/* 2. Infinite Auto Scroll Carousel (Left to Right) */}
        <div className="relative w-full overflow-hidden mb-16 lg:mb-24 py-2">
          {/* Subtle edge fades for modern aesthetic */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-linear-to-r from-background to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-linear-to-l from-background to-transparent z-10" />

          {/* Marquee Track Moving Left to Right */}
          <div className="animate-marquee-ltr flex items-stretch gap-6 pl-4">
            {marqueeTestimonials.map((item, index) => {
              const BadgeIcon = item.IconComponent;
              return (
                <div
                  key={`${item.id}-${index}`}
                  className="w-[380px] sm:w-[440px] lg:w-[480px] shrink-0 bg-white rounded-2xl p-7 sm:p-8 border border-border/50 shadow-xs hover:shadow-lg hover:border-primary/30 transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: App Icon & Quote Mark */}
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className={`w-11 h-11 rounded-xl ${item.iconBg} flex items-center justify-center shadow-xs text-white`}
                      >
                        <BadgeIcon className="w-5 h-5 text-white" />
                      </div>

                      <div className="relative w-9 h-9 opacity-35 select-none">
                        <Image
                          src={quoteRightImg}
                          alt="Quote mark"
                          className="w-full h-auto object-contain"
                        />
                      </div>
                    </div>

                    {/* Testimonial Quote */}
                    <p className="text-[14px] sm:text-[15px] font-normal text-[#141432] leading-relaxed mb-6">
                      &ldquo;{item.quote}&rdquo;
                    </p>

                    {/* Feature Tags */}
                    <div className="flex flex-wrap items-center gap-2 mb-8">
                      {item.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-md bg-[#F3F4F6] text-[#6B7280] text-[11px] font-medium tracking-tight"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Row: User Avatar/Info & Watch Video Button */}
                  <div className="flex items-center justify-between pt-4 border-t border-border/30">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-border/40">
                        <Image
                          src={item.author.avatar}
                          alt={item.author.name}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-[#141432]">
                          {item.author.name}
                        </h4>
                        <p className="text-[11px] text-muted-foreground font-medium">
                          {item.author.role}
                        </p>
                      </div>
                    </div>

                    {item.hasVideo && (
                      <Link
                        href="#video"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors group"
                      >
                        <span>Watch Video</span>
                        <Play className="w-3 h-3 fill-primary text-primary group-hover:scale-110 transition-transform" />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Bottom Client / Partner Logos */}
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 sm:gap-10 lg:gap-12 items-center justify-items-center opacity-70 hover:opacity-100 transition-opacity">
            {clientLogos.map((logo) => (
              <div
                key={logo.id}
                className="h-10 sm:h-12 w-full flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-105"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  className="max-h-8 sm:max-h-10 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
