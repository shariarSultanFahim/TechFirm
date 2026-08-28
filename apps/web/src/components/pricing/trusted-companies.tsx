import Image from "next/image";

// Company logos
import asanaLogo from "@/assets/pricing/company-logo/asana.png";
import attractsLogo from "@/assets/pricing/company-logo/attracts.png";
import googleLogo from "@/assets/pricing/company-logo/google.png";
import spotifyLogo from "@/assets/pricing/company-logo/spotify.png";
import stripeLogo from "@/assets/pricing/company-logo/stripe.png";
import trustpilotLogo from "@/assets/pricing/company-logo/truspilot.png";
import webflowLogo from "@/assets/pricing/company-logo/wenflow.png";

const companyLogos = [
  { name: "Spotify", src: spotifyLogo },
  { name: "Webflow", src: webflowLogo },
  { name: "Trustpilot", src: trustpilotLogo },
  { name: "Asana", src: asanaLogo },
  { name: "Google", src: googleLogo },
  { name: "Stripe", src: stripeLogo },
  { name: "attracts", src: attractsLogo }
];

export function TrustedCompanies() {
  return (
    <div className="w-full pt-10 pb-4 text-center sm:pt-14">
      <p className="mb-8 text-xs font-semibold tracking-tight text-[#5C5C6E] sm:text-sm">
        Trusted by industry leaders:
      </p>

      <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16">
        {companyLogos.map((logo) => (
          <div
            key={logo.name}
            className="flex cursor-pointer items-center justify-center opacity-80 grayscale transition-all duration-300 select-none hover:opacity-100 hover:grayscale-0"
          >
            <Image src={logo.src} alt={logo.name} className="h-4 w-auto object-contain sm:h-5" />
          </div>
        ))}
      </div>
    </div>
  );
}
