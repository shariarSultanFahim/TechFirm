import { TechFirmButtonLogo } from "@/assets/icons";
import techfarmBg from "@/assets/techfarm/bg.png";
import Image from "next/image";
import Link from "next/link";

export function TechfarmSection() {
  return (
    <section className="relative w-full py-10 sm:py-14 lg:py-20 overflow-hidden bg-white">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full flex items-center justify-center">
          {/* World Map Dotted Graphic with Community Avatars & Partner Badges */}
          <div className="relative w-full max-w-6xl mx-auto">
            <Image
              src={techfarmBg}
              alt="TechFirm Global Network"
              className="w-full h-auto object-contain drop-shadow-xs select-none pointer-events-none"
              priority
            />

            {/* Center TechFirm SVG Button from assets/techfarm/button-logo.svg */}
            <div className="absolute inset-0 flex mt-20 items-center justify-center z-10">
              <Link
                href="#about"
                className="transition-transform duration-300 hover:scale-105 hover:drop-shadow-xl active:scale-95 cursor-pointer inline-block"
                aria-label="TechFirm IT Solution Company"
              >
                <TechFirmButtonLogo className="w-[100px] md:w-[170px] h-auto drop-shadow-lg" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
