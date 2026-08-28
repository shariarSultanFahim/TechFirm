"use client";

import videoThumbnail from "@/assets/about-us/video/thumbnail.png";
import { Play, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

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
    <section className="w-full py-8 sm:py-14 mb-16 sm:mb-20">
      <div className="mx-auto">
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] overflow-hidden bg-black border border-[#EDE8F5]/50 group select-none">
          {isPlaying ? (
            <div className="relative w-full h-full bg-black">
              <video
                ref={videoRef}
                src="/videos/about-demo.mp4"
                controls
                autoPlay
                playsInline
                className="w-full h-full object-cover"
                onEnded={() => setIsPlaying(false)}
              />
              <button
                type="button"
                onClick={handleClose}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer shadow-lg"
                aria-label="Close Video"
              >
                <X className="w-5 h-5" />
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
                className="object-cover object-center group-hover:scale-102 transition-transform duration-700"
              />

              {/* Ambient Dark Vignette */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors pointer-events-none" />

              {/* Center Glowing Frosted Play Button matching screenshot */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  type="button"
                  onClick={handleStartPlay}
                  className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/30 backdrop-blur-md border border-white/60 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-white/40 active:scale-95 transition-all duration-300 cursor-pointer"
                  aria-label="Play Datacenter Video"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-white/40 to-white/80 flex items-center justify-center shadow-inner">
                    <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white text-white translate-x-0.5" />
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
