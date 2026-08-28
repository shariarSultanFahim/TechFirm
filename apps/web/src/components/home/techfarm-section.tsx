import Image from "next/image";
import Link from "next/link";

import { TechFirmButtonLogo } from "@/assets/icons";
import techfarmBg from "@/assets/techfarm/bg.png";

export function TechfarmSection() {
  return (
    <section className="relative w-full overflow-hidden bg-white py-10 sm:py-14 lg:py-20">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex w-full items-center justify-center">
          {/* World Map Dotted Graphic with Community Avatars & Partner Badges */}
          <div className="relative mx-auto w-full max-w-6xl">
            <Image
              src={techfarmBg}
              alt="TechFirm Global Network"
              className="pointer-events-none h-auto w-full object-contain drop-shadow-xs select-none"
              priority
            />

            {/* Center TechFirm SVG Button from assets/techfarm/button-logo.svg */}
            <div className="absolute inset-0 z-10 mt-20 flex items-center justify-center">
              <Link
                href="#about"
                className="inline-block cursor-pointer transition-transform duration-300 hover:scale-105 hover:drop-shadow-xl active:scale-95"
                aria-label="TechFirm IT Solution Company"
              >
                <TechFirmButtonLogo className="h-auto w-[100px] drop-shadow-lg md:w-[170px]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
