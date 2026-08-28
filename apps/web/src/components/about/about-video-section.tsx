"use client";

import { useRef, useState } from "react";
import Image from "next/image";

import { Play, X } from "lucide-react";

import videoThumbnail from "@/assets/about-us/video/thumbnail.png";

export function AboutVideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleStartPlay = () => {
    setIsPlaying(true);
  };

  const handleClose = () => {
    setIsPlaying(false);
  };

  return (
    <section className="mb-16 w-full py-8 sm:mb-20 sm:py-14">
      <div className="mx-auto">
        <div className="group relative aspect-[16/9] w-full overflow-hidden border border-[#EDE8F5]/50 bg-black select-none sm:aspect-[21/9]">
          {isPlaying ? (
            <div className="relative h-full w-full bg-black">
              <video
                ref={videoRef}
                src="/videos/about-demo.mp4"
                controls
                autoPlay
                playsInline
                className="h-full w-full object-cover"
                onEnded={() => setIsPlaying(false)}
              />
              <button
                type="button"
                onClick={handleClose}
                className="absolute top-4 right-4 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white shadow-lg transition-colors hover:bg-black/80"
                aria-label="Close Video"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <>
              {/* Thumbnail Image */}
              <Image
                src={videoThumbnail}
                alt="TechFirm Datacenter Infrastructure Video"
                fill
                priority
                sizes="(max-width: 1440px) 100vw, 1280px"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-102"
              />

              {/* Ambient Dark Vignette */}
              <div className="pointer-events-none absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/10" />

              {/* Center Glowing Frosted Play Button matching screenshot */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  type="button"
                  onClick={handleStartPlay}
                  className="relative flex h-20 w-20 cursor-pointer items-center justify-center rounded-full border border-white/60 bg-white/30 text-white shadow-2xl backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-white/40 active:scale-95 sm:h-24 sm:w-24"
                  aria-label="Play Datacenter Video"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-white/40 to-white/80 shadow-inner sm:h-16 sm:w-16">
                    <Play className="h-7 w-7 translate-x-0.5 fill-white text-white sm:h-8 sm:w-8" />
                  </div>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
