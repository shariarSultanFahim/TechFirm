"use client";

import Image from "next/image";
import Link from "next/link";

// Assets
import footerBg from "@/assets/footer/footer-bg.png";
import logoImg from "@/assets/logo/logo.png";
import pricingBg from "@/assets/pricing/bg.png";
import shapeImg from "@/assets/pricing/shape.png";

import { useSiteConfig } from "@/hooks/use-site-config";

import { PillButton } from "@/components/ui/pill-button";

export function Footer() {
  const { data: config } = useSiteConfig();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const collaborateLinks = config?.footer?.collaborateLinks?.length
    ? config.footer.collaborateLinks
    : [
        { label: "Partners", href: "#" },
        { label: "Partners Program", href: "#" },
        { label: "Affiliate Program", href: "#" },
        { label: "Community", href: "#" },
        { label: "HR Partner Program", href: "#" }
      ];

  const myAccountLinks = config?.footer?.myAccountLinks?.length
    ? config.footer.myAccountLinks
    : [
        { label: "Company", href: "/about" },
        { label: "Customer Success", href: "/portfolio" },
        { label: "Resources", href: "/blog" },
        { label: "Talk an Expert", href: "/contact" }
      ];

  const serviceLinks = config?.footer?.serviceLinks?.length
    ? config.footer.serviceLinks
    : [
        { label: "Software Development", href: "/services" },
        { label: "Cloud Services", href: "/services" },
        { label: "AI Machine Learning", href: "/services" },
        { label: "Data Security", href: "/services" },
        { label: "Managed IT Support", href: "/services" }
      ];

  const bottomLinks = config?.footer?.bottomLinks?.length
    ? config.footer.bottomLinks
    : [
        { label: "Faqs", href: "/faqs" },
        { label: "Setting", href: "#" },
        { label: "Privacy", href: "/privacy" },
        { label: "Contact", href: "/contact" }
      ];

  const ctaBadges = config?.ctaBand?.badges?.length
    ? config.ctaBand.badges
    : ["Lightning Speed", "Ironclad Security", "Scalable Hosting"];

  return (
    <footer className="relative w-full">
      {/* 1. Top CTA Launch Banner Card overlapping the footer */}
      <div className="relative z-10 container mx-auto -mb-40 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-lg bg-[#191924] px-6 py-14 text-center text-white shadow-2xl sm:px-12 sm:py-16">
          {/* Background image texture from assets/footer/footer-bg.png */}
          <div className="pointer-events-none absolute inset-0 z-0 select-none">
            <Image
              src={footerBg}
              alt="CTA Background Pattern"
              fill
              className="object-cover object-center opacity-90"
              priority
            />
          </div>

          {/* Subtle radial lighting glow */}
          <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/25 via-transparent to-transparent" />

          <div className="relative z-10 mx-auto max-w-2xl">
            <h2 className="mb-3 text-2xl font-bold tracking-tight text-white sm:mb-4 sm:text-3xl lg:text-4xl">
              {config?.ctaBand?.title || "Ready to Launch with Techfirm?"}
            </h2>
            <p className="mx-auto mb-8 max-w-lg text-xs leading-relaxed font-medium text-[#A0A0B0] sm:text-sm">
              {config?.ctaBand?.subtitle ||
                "Start hosting with lightning speed, built-in security, and real support — in just a few clicks."}
            </p>

            {/* Purple Pill CTA Button */}
            <div className="mb-8 inline-block">
              <PillButton
                href={config?.ctaBand?.buttonHref || "#pricing"}
                variant="primary"
                size="lg"
              >
                {config?.ctaBand?.buttonText || "7-Day Free Trial"}
              </PillButton>
            </div>

            {/* Green Checkmark Badges */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[#D1D5DB] sm:gap-8">
              {ctaBadges.map((badge, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 rounded-full border border-[#303046] bg-[#222232] px-3.5 py-1.5"
                >
                  <svg className="h-3.5 w-3.5 text-[#22C55E]" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3.5 8L6.5 11L12.5 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Actual Footer Starts here */}
      <div className="relative overflow-hidden bg-[#F9FAFB] pt-40 pb-8">
        {/* Background Globe Dotted Texture */}
        <div className="pointer-events-none absolute bottom-0 left-0 z-0 hidden h-full w-full overflow-hidden opacity-60 select-none lg:block">
          <Image
            src={pricingBg}
            alt="Footer Background Graphic"
            className="absolute -bottom-10 -left-10 h-[100%] w-auto max-w-none object-contain"
          />
        </div>
        {/* 2. Main Footer Links & Newsletter */}
        <div className="relative z-10">
          <div className="container mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-10 pb-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
              {/* Column 1: Collaborate */}
              <div className="lg:col-span-2">
                <h4 className="mb-5 text-base font-bold tracking-tight text-[#141432]">
                  Collaborate
                </h4>
                <ul className="space-y-3 text-xs font-medium text-[#5C5C5C] sm:text-sm">
                  {collaborateLinks.map((item, idx) => (
                    <li key={idx}>
                      <Link href={item.href} className="transition-colors hover:text-[#864FFE]">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 2: My Account */}
              <div className="lg:col-span-2">
                <h4 className="mb-5 text-base font-bold tracking-tight text-[#141432]">
                  My Account
                </h4>
                <ul className="space-y-3 text-xs font-medium text-[#5C5C5C] sm:text-sm">
                  {myAccountLinks.map((item, idx) => (
                    <li key={idx}>
                      <Link href={item.href} className="transition-colors hover:text-[#864FFE]">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3: Service */}
              <div className="lg:col-span-3">
                <h4 className="mb-5 text-base font-bold tracking-tight text-[#141432]">Service</h4>
                <ul className="space-y-3 text-xs font-medium text-[#5C5C5C] sm:text-sm">
                  {serviceLinks.map((item, idx) => (
                    <li key={idx}>
                      <Link href={item.href} className="transition-colors hover:text-[#864FFE]">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 4: Logo & Newsletter */}
              <div className="relative lg:col-span-5">
                {/* Top right sparkle accent */}
                <div className="pointer-events-none absolute -top-4 right-0 h-auto w-8 sm:w-9">
                  <Image
                    src={shapeImg}
                    alt="Decorative shape"
                    className="h-auto w-full object-contain"
                  />
                </div>

                {/* Logo */}
                <div className="mb-6">
                  <Image
                    src={logoImg}
                    alt="TechFirm IT SOLUTION COMPANY"
                    className="h-10 w-auto object-contain"
                  />
                </div>

                {/* Newsletter Input + Submit Button */}
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="relative mb-3 flex max-w-md items-center"
                >
                  <div className="relative w-full">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-[#737373]">
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                      >
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full rounded-full border border-[#EDE8F5] bg-white py-3.5 pr-32 pl-11 text-xs text-[#141432] placeholder-[#9CA3AF] shadow-xs transition-all focus:border-[#864FFE] focus:outline-hidden sm:text-sm"
                    />
                    <button
                      type="submit"
                      className="absolute top-1.5 right-1.5 bottom-1.5 flex cursor-pointer items-center gap-1.5 rounded-full bg-[#141432] px-6 text-xs font-bold text-white shadow-sm transition-colors hover:bg-[#864FFE]"
                    >
                      <span>Sign Up</span>
                      <span>&gt;</span>
                    </button>
                  </div>
                </form>

                <p className="text-xs font-medium text-[#737373]">
                  By subscribing, you&apos;re accept{" "}
                  <Link
                    href="/privacy"
                    className="underline transition-colors hover:text-[#141432]"
                  >
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </div>

            {/* Scroll To Top Centered Floating Button */}
            <div className="relative z-20 -mb-5 flex justify-center">
              <button
                type="button"
                onClick={scrollToTop}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-[#141432] text-white shadow-md transition-colors hover:bg-[#864FFE]"
                aria-label="Scroll to top"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m18 15-6-6-6 6" />
                </svg>
              </button>
            </div>

            {/* Bottom Bar: Copyright & Bottom Links */}
            <div className="flex flex-col items-center justify-between gap-4 border-t border-[#EDE8F5] pt-8 text-xs font-medium text-[#737373] sm:flex-row">
              <p>
                {config?.footer?.copyrightText || "Copyright @2026 BizanTheme All Rights Reserved"}
              </p>
              <div className="flex items-center gap-6">
                {bottomLinks.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    className="transition-colors hover:text-[#141432]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
