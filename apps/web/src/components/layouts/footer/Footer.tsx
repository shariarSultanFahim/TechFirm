"use client";

import { PillButton } from "@/components/ui/pill-button";
import Image from "next/image";
import Link from "next/link";

// Assets
import footerBg from "@/assets/footer/footer-bg.png";
import logoImg from "@/assets/logo/logo.png";
import pricingBg from "@/assets/pricing/bg.png";
import shapeImg from "@/assets/pricing/shape.png";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
  <footer className="relative w-full">
    {/* 1. Top CTA Launch Banner Card overlapping the footer */}
    <div className="container relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mb-40">
        <div className="relative rounded-lg  bg-[#191924] text-white py-14 sm:py-16 px-6 sm:px-12 text-center overflow-hidden shadow-2xl">
          {/* Background image texture from assets/footer/footer-bg.png */}
          <div className="absolute inset-0 pointer-events-none select-none z-0">
            <Image
              src={footerBg}
              alt="CTA Background Pattern"
              fill
              className="object-cover object-center opacity-90"
              priority
            />
          </div>

          {/* Subtle radial lighting glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/25 via-transparent to-transparent pointer-events-none z-0" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-3 sm:mb-4">
              Ready to Launch with Techfirm?
            </h2>
            <p className="text-xs sm:text-sm text-[#A0A0B0] leading-relaxed mb-8 max-w-lg mx-auto font-medium">
              Start hosting with lightning speed, built-in security, and real support — in just a few clicks.
            </p>

            {/* Purple Pill CTA Button */}
            <div className="inline-block mb-8">
              <PillButton
                href="#pricing"
                variant="primary"
                size="lg"
              >
                7-Day Free Trial
              </PillButton>
            </div>

            {/* 3 Green Checkmark Badges */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-[#D1D5DB]">
              <div className="flex items-center gap-2 bg-[#222232] px-3.5 py-1.5 rounded-full border border-[#303046]">
                <svg className="w-3.5 h-3.5 text-[#22C55E]" viewBox="0 0 16 16" fill="none">
                  <path d="M3.5 8L6.5 11L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Lightning Speed</span>
              </div>

              <div className="flex items-center gap-2 bg-[#222232] px-3.5 py-1.5 rounded-full border border-[#303046]">
                <svg className="w-3.5 h-3.5 text-[#22C55E]" viewBox="0 0 16 16" fill="none">
                  <path d="M3.5 8L6.5 11L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Ironclad Security</span>
              </div>

              <div className="flex items-center gap-2 bg-[#222232] px-3.5 py-1.5 rounded-full border border-[#303046]">
                <svg className="w-3.5 h-3.5 text-[#22C55E]" viewBox="0 0 16 16" fill="none">
                  <path d="M3.5 8L6.5 11L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Scalable Hosting</span>
              </div>
            </div>
          </div>
        </div>
    </div>
    {/* Actual Footer Starts here */}
    <div className="relative bg-[#F9FAFB] pt-40 pb-8 overflow-hidden">
      {/* Background Globe Dotted Texture (Left side, matching reference) */}
      <div className="hidden lg:block absolute bottom-0 left-0 w-full h-full pointer-events-none select-none overflow-hidden z-0 opacity-60">
        <Image
          src={pricingBg}
          alt="Footer Background Graphic"
          className="absolute -bottom-10 -left-10 w-auto h-[100%] max-w-none object-contain"
        />
      </div>
      {/* 2. Main Footer Links & Newsletter */}
      <div className=" relative z-10">
        <div className="container max-w-7xl mx-auto pt-4 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12">
          {/* Column 1: Collaborate */}
          <div className="lg:col-span-2">
            <h4 className="text-base font-bold text-[#141432] mb-5 tracking-tight">Collaborate</h4>
            <ul className="space-y-3 text-xs sm:text-sm text-[#5C5C5C] font-medium">
              <li>
                <Link href="#" className="hover:text-[#864FFE] transition-colors">
                  Partners
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#864FFE] transition-colors">
                  Partners Program
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#864FFE] transition-colors">
                  Affiliate Program
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#864FFE] transition-colors">
                  Community
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#864FFE] transition-colors">
                  HR Partner Program
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: My Account */}
          <div className="lg:col-span-2">
            <h4 className="text-base font-bold text-[#141432] mb-5 tracking-tight">My Account</h4>
            <ul className="space-y-3 text-xs sm:text-sm text-[#5C5C5C] font-medium">
              <li>
                <Link href="#" className="hover:text-[#864FFE] transition-colors">
                  Company
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#864FFE] transition-colors">
                  Customer Success
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#864FFE] transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#864FFE] transition-colors">
                  Talk an Expert
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Service */}
          <div className="lg:col-span-3">
            <h4 className="text-base font-bold text-[#141432] mb-5 tracking-tight">Service</h4>
            <ul className="space-y-3 text-xs sm:text-sm text-[#5C5C5C] font-medium">
              <li>
                <Link href="#" className="hover:text-[#864FFE] transition-colors">
                  Software Development
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#864FFE] transition-colors">
                  Cloud Services
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#864FFE] transition-colors">
                  AI Machine Learning
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#864FFE] transition-colors">
                  Data Security
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#864FFE] transition-colors">
                  Software Development
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Logo & Newsletter */}
          <div className="lg:col-span-5 relative">
            {/* Top right sparkle accent */}
            <div className="absolute -top-4 right-0 w-8 sm:w-9 h-auto pointer-events-none">
              <Image src={shapeImg} alt="Decorative shape" className="w-full h-auto object-contain" />
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
            <form onSubmit={(e) => e.preventDefault()} className="relative flex items-center max-w-md mb-3">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#737373]">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full pl-11 pr-32 py-3.5 bg-white border border-[#EDE8F5] rounded-full text-xs sm:text-sm text-[#141432] placeholder-[#9CA3AF] focus:outline-hidden focus:border-[#864FFE] transition-all shadow-xs"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-6 bg-[#141432] hover:bg-[#864FFE] text-white text-xs font-bold rounded-full transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <span>Sign Up</span>
                  <span>&gt;</span>
                </button>
              </div>
            </form>

            <p className="text-xs text-[#737373] font-medium">
              By subscribing, you&apos;re accept{" "}
              <Link href="/privacy" className="underline hover:text-[#141432] transition-colors">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>

        {/* Scroll To Top Centered Floating Button */}
        <div className="flex justify-center -mb-5 relative z-20">
          <button
            type="button"
            onClick={scrollToTop}
            className="w-10 h-10 rounded-xl bg-[#141432] hover:bg-[#864FFE] text-white flex items-center justify-center shadow-md transition-colors cursor-pointer"
            aria-label="Scroll to top"
          >
            <svg
              className="w-4 h-4"
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
        <div className="border-t border-[#EDE8F5] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#737373] font-medium">
          <p>Copyright @2026 BizanTheme All Rights Reserved</p>
          <div className="flex items-center gap-6">
            <Link href="/faqs" className="hover:text-[#141432] transition-colors">
              Faqs
            </Link>
            <Link href="/setting" className="hover:text-[#141432] transition-colors">
              Setting
            </Link>
            <Link href="/privacy" className="hover:text-[#141432] transition-colors">
              Privacy
            </Link>
            <Link href="/contact" className="hover:text-[#141432] transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
      </div>
    </div>
    </footer>
  );
}
