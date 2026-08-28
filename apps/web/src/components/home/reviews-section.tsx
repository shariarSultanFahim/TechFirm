"use client";

import Image from "next/image";
import Link from "next/link";

import { Play } from "lucide-react";

import { ArrowBadgeIcon, UShapeBadgeIcon, WavesBadgeIcon } from "@/assets/icons";
// Quote icon & Company partner logos
import logo3 from "@/assets/reviews/logos/Frame.png";
import logo6 from "@/assets/reviews/logos/Group 1597884324.png";
import logo4 from "@/assets/reviews/logos/Group 1597884325.png";
import logo1 from "@/assets/reviews/logos/Group-1.png";
import logo5 from "@/assets/reviews/logos/Group-2.png";
import logo2 from "@/assets/reviews/logos/Group.png";
import quoteRightImg from "@/assets/reviews/quote-right.png";

import { useTestimonials } from "@/hooks/use-testimonials";

import { SectionHeader } from "@/components/widgets";

const clientLogos = [
  { id: "logo-1", src: logo1, alt: "CM Design Here" },
  { id: "logo-2", src: logo2, alt: "Techno" },
  { id: "logo-3", src: logo3, alt: "Creative" },
  { id: "logo-4", src: logo4, alt: "CM Logo" },
  { id: "logo-5", src: logo5, alt: "Techbrand" },
  { id: "logo-6", src: logo6, alt: "TreeTech" }
];

const badgeIcons = [WavesBadgeIcon, UShapeBadgeIcon, ArrowBadgeIcon];

export function ReviewsSection() {
  const { data: testimonials = [] } = useTestimonials();

  // Duplicate for seamless infinite marquee loop
  const marqueeTestimonials = testimonials.length > 0 ? [...testimonials, ...testimonials] : [];

  return (
    <section className="relative w-full overflow-hidden bg-[#F9FAFB] py-16 sm:py-20 lg:py-24">
      {/* Background Decorative Dot Grid */}
      <div className="pointer-events-none absolute top-0 right-0 -z-10 h-[300px] w-[400px] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-70" />

      <div className="w-full">
        {/* 1. Section Header */}
        <div className="container mx-auto mb-12 max-w-7xl px-4 sm:mb-16 sm:px-6">
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
        <div className="relative mb-16 w-full overflow-hidden py-2 lg:mb-24">
          {/* Subtle edge fades for modern aesthetic */}
          <div className="from-background pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r to-transparent sm:w-32" />
          <div className="from-background pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l to-transparent sm:w-32" />

          {/* Marquee Track Moving Left to Right */}
          <div className="animate-marquee-ltr flex items-stretch gap-6 pl-4">
            {marqueeTestimonials.map((item, index) => {
              const BadgeIcon = badgeIcons[index % badgeIcons.length];
              const authorAvatar =
                item.avatar ||
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80";

              return (
                <div
                  key={`${item.id || item._id}-${index}`}
                  className="border-border/50 hover:border-primary/30 flex w-[380px] shrink-0 flex-col justify-between rounded-2xl border bg-white p-7 shadow-xs transition-all hover:shadow-lg sm:w-[440px] sm:p-8 lg:w-[480px]"
                >
                  <div>
                    {/* Top Row: App Icon & Quote Mark */}
                    <div className="mb-6 flex items-center justify-between">
                      <div
                        className={`h-11 w-11 rounded-xl ${
                          item.iconBg || "bg-linear-to-br from-[#00C0FA] to-[#007BFE]"
                        } flex items-center justify-center text-white shadow-xs`}
                      >
                        <BadgeIcon className="h-5 w-5 text-white" />
                      </div>

                      <div className="relative h-9 w-9 opacity-35 select-none">
                        <Image
                          src={quoteRightImg}
                          alt="Quote mark"
                          className="h-auto w-full object-contain"
                        />
                      </div>
                    </div>

                    {/* Testimonial Quote */}
                    <p className="mb-6 text-[14px] leading-relaxed font-normal text-[#141432] sm:text-[15px]">
                      &ldquo;{item.quote}&rdquo;
                    </p>

                    {/* Feature Tags */}
                    {item.tags && item.tags.length > 0 && (
                      <div className="mb-8 flex flex-wrap items-center gap-2">
                        {item.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="rounded-md bg-[#F3F4F6] px-3 py-1 text-[11px] font-medium tracking-tight text-[#6B7280]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Bottom Row: User Avatar/Info & Watch Video Button */}
                  <div className="border-border/30 flex items-center justify-between border-t pt-4">
                    <div className="flex items-center gap-3">
                      <div className="border-border/40 relative h-10 w-10 shrink-0 overflow-hidden rounded-full border">
                        <Image
                          src={authorAvatar}
                          alt={item.authorName}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#141432] sm:text-sm">
                          {item.authorName}
                        </h4>
                        <p className="text-muted-foreground text-[11px] font-medium">
                          {item.authorRole} {item.company ? `• ${item.company}` : ""}
                        </p>
                      </div>
                    </div>

                    {item.hasVideo && (
                      <Link
                        href={item.videoUrl || "#video"}
                        target={item.videoUrl ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 group inline-flex items-center gap-1.5 text-xs font-semibold transition-colors"
                      >
                        <span>Watch Video</span>
                        <Play className="fill-primary text-primary h-3 w-3 transition-transform group-hover:scale-110" />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Bottom Client / Partner Logos */}
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-2 items-center justify-items-center gap-8 opacity-70 transition-opacity hover:opacity-100 sm:grid-cols-3 sm:gap-10 md:grid-cols-6 lg:gap-12">
            {clientLogos.map((logo) => (
              <div
                key={logo.id}
                className="flex h-10 w-full transform items-center justify-center grayscale transition-all duration-300 hover:scale-105 hover:grayscale-0 sm:h-12"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  className="max-h-8 w-auto object-contain sm:max-h-10"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
