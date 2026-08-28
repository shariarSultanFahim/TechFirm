"use client";

import heroBgRightImg from "@/assets/hero/hero-bg-right.png";
import heroTopImg from "@/assets/hero/hero-top.png";
import { Check, ChevronDown, ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
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
    const clean = domainName.toLowerCase().trim().replace(/https?:\/\//, "").split(".")[0];
    setSearchResult(`🎉 Great news! "${clean}${selectedTld}" is available for $9.99/yr.`);
  };

  return (
    <section className="relative w-full bg-background py-8 sm:py-12 lg:py-14 overflow-hidden">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Hero Content - Centered on Mobile/Tablet (<lg), Left-aligned on Desktop (lg+) */}
          <div className="w-full lg:col-span-6 space-y-5 flex flex-col items-center lg:items-start text-center lg:text-left max-w-xl mx-auto lg:mx-0">
            {/* Reviews Rating Badge */}
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <div className="flex items-center gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs font-bold text-foreground tracking-tight">
                4.1/5 <span className="text-muted-foreground font-semibold">(14k Reviews)</span>
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold tracking-tight text-[#141432] leading-[1.15] text-center lg:text-left">
              Your Web Hosting <br />
              Performance
            </h1>

            {/* Checklist */}
            <div className="space-y-2 pt-0.5 w-fit mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-2.5 text-sm font-medium text-muted-foreground">
                <Check className="w-4 h-4 text-emerald-500 stroke-[3] shrink-0" />
                <span>Customer happiness guarantee</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-medium text-muted-foreground">
                <Check className="w-4 h-4 text-emerald-500 stroke-[3] shrink-0" />
                <span>Clients are experts in web development</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-medium text-muted-foreground">
                <Check className="w-4 h-4 text-emerald-500 stroke-[3] shrink-0" />
                <span>Websites that are presently hosted.</span>
              </div>
            </div>

            {/* Email Signup Form */}
            <form onSubmit={handleEmailSubmit} className="pt-1 w-full flex flex-col items-center lg:items-start">
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 w-full max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  required
                  className="w-full sm:w-64 px-6 py-3 rounded-full border border-border bg-card text-foreground placeholder:text-muted-foreground/80 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-2xs"
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="pill"
                  className="w-full sm:w-auto shrink-0"
                >
                  <span>Sign Up</span>
                  <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                </Button>
              </div>

              {emailSubmitted && (
                <p className="mt-2 text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400 p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-800 max-w-md w-full text-center animate-in fade-in duration-200">
                  ✓ Thank you! We&apos;ve sent an onboarding link to your email.
                </p>
              )}
            </form>
          </div>

          {/* Right Hero Visual with Background Layer and Top Server Layer */}
          <div className="hidden lg:col-span-6 relative lg:flex items-center lg:justify-end">
            {/* Background Mesh Image */}
            <div className="absolute -top-10 right-0 w-[115%] max-w-[540px] h-[115%] pointer-events-none opacity-85 z-0 select-none">
              <Image
                src={heroBgRightImg}
                alt="Hero background mesh pattern"
                className="w-full h-full object-contain"
                priority
              />
            </div>

            {/* Foreground Server Top Image */}
            <div className="relative z-10 w-full max-w-[480px] animate-in fade-in zoom-in-95 duration-500">
              <Image
                src={heroTopImg}
                alt="Cloud server stacks and global analytics"
                className="w-full h-auto object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>

        {/* Bottom Dark Domain Search Card */}
        <div className="max-w-4xl mx-auto mt-6 sm:mt-8 lg:mt-10 p-6 sm:p-10 rounded-2xl bg-[#14141E] text-white shadow-2xl border border-white/5 relative overflow-hidden">
          {/* Subtle decorative glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-primary/10 blur-3xl rounded-full pointer-events-none" />

          <h2 className="text-2xl sm:text-3xl font-black text-center text-white mb-6 tracking-tight relative z-10">
            Looking for a Perfect Domain Name?
          </h2>

          {/* Search Bar Form */}
          <form onSubmit={handleDomainSearch} className="max-w-2xl mx-auto relative z-10">
            <div className="flex items-center justify-between p-1.5 pl-6 bg-[#222230] rounded-full border border-white/10 shadow-inner focus-within:border-primary/60 transition-all">
              <input
                type="text"
                value={domainName}
                onChange={(e) => setDomainName(e.target.value)}
                placeholder="Domain.com"
                className="bg-transparent text-white placeholder-gray-400 text-sm sm:text-base focus:outline-none flex-1 min-w-0 pr-2"
              />

              <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                {/* TLD Dropdown Selector */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setTldDropdownOpen(!tldDropdownOpen)}
                    className="flex items-center gap-1 text-xs text-gray-300 font-bold px-2.5 py-1.5 hover:text-white transition-colors cursor-pointer"
                  >
                    <span>{selectedTld}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                  </button>

                  {tldDropdownOpen && (
                    <div className="absolute right-0 bottom-full mb-2 w-24 bg-[#1a1a26] border border-white/10 rounded-xl shadow-xl py-1 z-20">
                      {tldPricingList.map((item) => (
                        <button
                          key={item.tld}
                          type="button"
                          onClick={() => {
                            setSelectedTld(item.tld);
                            setTldDropdownOpen(false);
                          }}
                          className={`w-full px-3 py-1.5 text-xs text-left font-semibold hover:bg-primary/20 hover:text-primary transition-colors cursor-pointer ${
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
                  className="px-6 sm:px-8 py-3 shrink-0"
                >
                  <span>Search</span>
                  <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                </Button>
              </div>
            </div>

            {searchResult && (
              <p className="mt-3 text-xs font-semibold text-accent-foreground bg-accent/90 p-2.5 rounded-xl border border-accent-foreground/20 text-center animate-in fade-in duration-200">
                {searchResult}
              </p>
            )}
          </form>

          {/* TLD Pricing Cards */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-6 relative z-10">
            {tldPricingList.map((item) => (
              <div
                key={item.tld}
                className="w-20 sm:w-24 py-3 px-2 rounded-xl bg-[#222230]/90 border border-white/5 text-center flex flex-col items-center justify-center gap-1 hover:border-primary/40 hover:bg-[#28283a] transition-all"
              >
                <span className="text-sm sm:text-base font-black text-white tracking-tight">
                  {item.tld}
                </span>
                <span className="text-[10px] sm:text-xs text-gray-400 font-medium">
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
