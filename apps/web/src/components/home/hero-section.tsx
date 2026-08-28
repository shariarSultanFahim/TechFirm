"use client";

import { useState } from "react";
import Image from "next/image";

import { Check, ChevronDown, ChevronRight, Star } from "lucide-react";

import heroBgRightImg from "@/assets/hero/hero-bg-right.png";
import heroTopImg from "@/assets/hero/hero-top.png";

import { Button } from "@/components/ui";

const tldPricingList = [
  { tld: ".com", price: "$39/Year" },
  { tld: ".net", price: "$39/Year" },
  { tld: ".org", price: "$39/Year" },
  { tld: ".biz", price: "$39/Year" },
  { tld: ".xyz", price: "$39/Year" }
];

export function HeroSection() {
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [domainName, setDomainName] = useState("");
  const [selectedTld, setSelectedTld] = useState(".com");
  const [tldDropdownOpen, setTldDropdownOpen] = useState(false);
  const [searchResult, setSearchResult] = useState<string | null>(null);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setEmailSubmitted(true);
  };

  const handleDomainSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domainName.trim()) return;
    const clean = domainName
      .toLowerCase()
      .trim()
      .replace(/https?:\/\//, "")
      .split(".")[0];
    setSearchResult(`🎉 Great news! "${clean}${selectedTld}" is available for $9.99/yr.`);
  };

  return (
    <section className="bg-background relative w-full overflow-hidden py-8 sm:py-12 lg:py-14">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        {/* Top Hero Grid */}
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Hero Content - Centered on Mobile/Tablet (<lg), Left-aligned on Desktop (lg+) */}
          <div className="mx-auto flex w-full max-w-xl flex-col items-center space-y-5 text-center lg:col-span-6 lg:mx-0 lg:items-start lg:text-left">
            {/* Reviews Rating Badge */}
            <div className="flex items-center justify-center gap-2 lg:justify-start">
              <div className="flex items-center gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <span className="text-foreground text-xs font-bold tracking-tight">
                4.1/5 <span className="text-muted-foreground font-semibold">(14k Reviews)</span>
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-center text-3xl leading-[1.15] font-bold tracking-tight text-[#141432] sm:text-4xl md:text-5xl lg:text-left lg:text-[52px]">
              Your Web Hosting <br />
              Performance
            </h1>

            {/* Checklist */}
            <div className="mx-auto w-fit space-y-2 pt-0.5 text-left lg:mx-0">
              <div className="text-muted-foreground flex items-center gap-2.5 text-sm font-medium">
                <Check className="h-4 w-4 shrink-0 stroke-[3] text-emerald-500" />
                <span>Customer happiness guarantee</span>
              </div>
              <div className="text-muted-foreground flex items-center gap-2.5 text-sm font-medium">
                <Check className="h-4 w-4 shrink-0 stroke-[3] text-emerald-500" />
                <span>Clients are experts in web development</span>
              </div>
              <div className="text-muted-foreground flex items-center gap-2.5 text-sm font-medium">
                <Check className="h-4 w-4 shrink-0 stroke-[3] text-emerald-500" />
                <span>Websites that are presently hosted.</span>
              </div>
            </div>

            {/* Email Signup Form */}
            <form
              onSubmit={handleEmailSubmit}
              className="flex w-full flex-col items-center pt-1 lg:items-start"
            >
              <div className="flex w-full max-w-md flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  required
                  className="border-border bg-card text-foreground placeholder:text-muted-foreground/80 focus:ring-primary w-full rounded-full border px-6 py-3 text-sm shadow-2xs transition-all focus:border-transparent focus:ring-2 focus:outline-none sm:w-64"
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="pill"
                  className="w-full shrink-0 sm:w-auto"
                >
                  <span>Sign Up</span>
                  <ChevronRight className="h-4 w-4 stroke-[2.5]" />
                </Button>
              </div>

              {emailSubmitted && (
                <p className="animate-in fade-in mt-2 w-full max-w-md rounded-xl border border-emerald-200 bg-emerald-50 p-2.5 text-center text-xs font-semibold text-emerald-600 duration-200 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400">
                  ✓ Thank you! We&apos;ve sent an onboarding link to your email.
                </p>
              )}
            </form>
          </div>

          {/* Right Hero Visual with Background Layer and Top Server Layer */}
          <div className="relative hidden items-center lg:col-span-6 lg:flex lg:justify-end">
            {/* Background Mesh Image */}
            <div className="pointer-events-none absolute -top-10 right-0 z-0 h-[115%] w-[115%] max-w-[540px] opacity-85 select-none">
              <Image
                src={heroBgRightImg}
                alt="Hero background mesh pattern"
                className="h-full w-full object-contain"
                priority
              />
            </div>

            {/* Foreground Server Top Image */}
            <div className="animate-in fade-in zoom-in-95 relative z-10 w-full max-w-[480px] duration-500">
              <Image
                src={heroTopImg}
                alt="Cloud server stacks and global analytics"
                className="h-auto w-full object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>

        {/* Bottom Dark Domain Search Card */}
        <div className="relative mx-auto mt-6 max-w-4xl overflow-hidden rounded-2xl border border-white/5 bg-[#14141E] p-6 text-white shadow-2xl sm:mt-8 sm:p-10 lg:mt-10">
          {/* Subtle decorative glow */}
          <div className="bg-primary/10 pointer-events-none absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full blur-3xl" />

          <h2 className="relative z-10 mb-6 text-center text-2xl font-black tracking-tight text-white sm:text-3xl">
            Looking for a Perfect Domain Name?
          </h2>

          {/* Search Bar Form */}
          <form onSubmit={handleDomainSearch} className="relative z-10 mx-auto max-w-2xl">
            <div className="focus-within:border-primary/60 flex items-center justify-between rounded-full border border-white/10 bg-[#222230] p-1.5 pl-6 shadow-inner transition-all">
              <input
                type="text"
                value={domainName}
                onChange={(e) => setDomainName(e.target.value)}
                placeholder="Domain.com"
                className="min-w-0 flex-1 bg-transparent pr-2 text-sm text-white placeholder-gray-400 focus:outline-none sm:text-base"
              />

              <div className="flex shrink-0 items-center gap-1 sm:gap-2">
                {/* TLD Dropdown Selector */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setTldDropdownOpen(!tldDropdownOpen)}
                    className="flex cursor-pointer items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-gray-300 transition-colors hover:text-white"
                  >
                    <span>{selectedTld}</span>
                    <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
                  </button>

                  {tldDropdownOpen && (
                    <div className="absolute right-0 bottom-full z-20 mb-2 w-24 rounded-xl border border-white/10 bg-[#1a1a26] py-1 shadow-xl">
                      {tldPricingList.map((item) => (
                        <button
                          key={item.tld}
                          type="button"
                          onClick={() => {
                            setSelectedTld(item.tld);
                            setTldDropdownOpen(false);
                          }}
                          className={`hover:bg-primary/20 hover:text-primary w-full cursor-pointer px-3 py-1.5 text-left text-xs font-semibold transition-colors ${
                            selectedTld === item.tld ? "text-primary bg-white/5" : "text-gray-300"
                          }`}
                        >
                          {item.tld}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Search Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="pill"
                  className="shrink-0 px-6 py-3 sm:px-8"
                >
                  <span>Search</span>
                  <ChevronRight className="h-4 w-4 stroke-[2.5]" />
                </Button>
              </div>
            </div>

            {searchResult && (
              <p className="text-accent-foreground bg-accent/90 border-accent-foreground/20 animate-in fade-in mt-3 rounded-xl border p-2.5 text-center text-xs font-semibold duration-200">
                {searchResult}
              </p>
            )}
          </form>

          {/* TLD Pricing Cards */}
          <div className="relative z-10 mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {tldPricingList.map((item) => (
              <div
                key={item.tld}
                className="hover:border-primary/40 flex w-20 flex-col items-center justify-center gap-1 rounded-xl border border-white/5 bg-[#222230]/90 px-2 py-3 text-center transition-all hover:bg-[#28283a] sm:w-24"
              >
                <span className="text-sm font-black tracking-tight text-white sm:text-base">
                  {item.tld}
                </span>
                <span className="text-[10px] font-medium text-gray-400 sm:text-xs">
                  {item.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
