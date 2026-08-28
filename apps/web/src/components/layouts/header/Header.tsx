"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Check,
  ChevronDown,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Phone,
  Search,
  ShoppingCart,
  X
} from "lucide-react";

import { siteConfig } from "@/config/site";

import { useSiteConfig } from "@/hooks/use-site-config";

import { useCart } from "@/components/cart";
import { PillButton } from "@/components/ui/pill-button";

export function Header() {
  const { openCart, totalCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const pathname = usePathname();
  const { data: config } = useSiteConfig();

  const toggleDropdown = (title: string) => {
    setActiveDropdown(activeDropdown === title ? null : title);
  };

  // Close dropdowns on outside click or escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchModalOpen(false);
        setMobileMenuOpen(false);
        setActiveDropdown(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Prevent scroll when search modal or mobile menu is open
  useEffect(() => {
    if (searchModalOpen || mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [searchModalOpen, mobileMenuOpen]);

  return (
    <>
      {/* Top Utility Header Bar - Visible on screens 1024px+ (lg) */}
      {(config?.topBar?.isVisible ?? true) && (
        <div className="border-border/70 text-foreground relative z-10 hidden w-full border-b bg-[#f8f9fa] py-2.5 lg:block lg:py-3">
          <div className="container mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:gap-6">
            {/* Logo Section */}
            <div className="flex shrink-0 items-center gap-5 xl:gap-7">
              <Link href="/" className="group flex items-center gap-3">
                <div className="h-9 w-9 shrink-0 transition-transform group-hover:scale-105 xl:h-10 xl:w-10">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 42 41"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-full w-full"
                  >
                    <path
                      d="M7.91927 5.27564H34.0837C37.4463 5.28322 40.448 3.16882 41.573 1.90735e-06H7.94656C3.56476 1.90735e-06 0 3.56527 0 7.94656V8.52814C2.10536 6.43875 4.95312 5.26918 7.91927 5.27564Z"
                      fill="#864FFE"
                    />
                    <path
                      d="M19.9728 8.54832L7.91927 8.56247C3.88505 8.55429 0.488396 11.5778 0.0292969 15.5859V17.0785C1.93603 15.1936 4.45577 14.0555 7.13052 13.871C7.13052 13.8603 7.13457 13.8492 7.1376 13.8386H11.4153C12.8874 13.8389 14.0807 15.0323 14.0807 16.5045V32.4764C14.0807 36.8577 17.6459 40.4225 22.0272 40.423H22.6214C20.5275 38.3209 19.3532 35.4738 19.3563 32.5067V16.4676C19.3556 15.5727 19.2038 14.6844 18.9071 13.8401H20.0142C21.463 13.8457 22.6361 15.0188 22.6416 16.4676V32.5062C22.6338 35.8686 24.7478 38.8702 27.9163 39.9955V16.4949C27.9188 12.1131 24.354 8.54832 19.9728 8.54832Z"
                      fill="#864FFE"
                    />
                    <path
                      d="M34.0835 8.56247H27.9727C29.419 10.0192 30.4398 11.8435 30.925 13.8381H34.0517C38.4405 13.8389 41.9989 10.2818 41.9998 5.89307C41.9998 5.89257 41.9998 5.89206 41.9998 5.89155V5.29785C39.8974 7.39143 37.0505 8.5655 34.0835 8.56247Z"
                      fill="#864FFE"
                    />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-foreground text-xl leading-none font-black tracking-tight xl:text-[22px]">
                    {config?.siteName || "TechFirm"}
                  </span>
                  <span className="text-muted-foreground mt-0.5 text-[8px] font-bold tracking-[0.2em] uppercase xl:mt-1 xl:text-[8.5px]">
                    {config?.tagline || "IT SOLUTION COMPANY"}
                  </span>
                </div>
              </Link>

              {/* Vertical Divider with Diamond Node */}
              <div className="relative flex h-9 items-center justify-center px-1">
                <div className="bg-border relative flex h-full w-[1px] items-center justify-center">
                  <div className="border-border h-1.5 w-1.5 rotate-45 border bg-[#f8f9fa]" />
                </div>
              </div>
            </div>

            {/* Middle Contact Info Badges */}
            <div className="flex max-w-2xl flex-1 items-center justify-center gap-4 xl:gap-8">
              {/* 24/ Support */}
              <div className="flex items-center gap-2.5 xl:gap-3">
                <div className="dark:bg-muted border-border/40 text-foreground flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border bg-[#eef1f6] shadow-2xs xl:h-10 xl:w-10">
                  <Phone className="text-foreground h-4 w-4" />
                </div>
                <div>
                  <p className="text-foreground text-[11px] font-bold xl:text-xs">24/ Support</p>
                  <p className="text-muted-foreground text-[11px] font-medium whitespace-nowrap xl:text-xs">
                    {config?.contactPhone || siteConfig.contact.phone}
                  </p>
                </div>
              </div>

              {/* Our Email */}
              <div className="flex items-center gap-2.5 xl:gap-3">
                <div className="dark:bg-muted border-border/40 text-foreground flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border bg-[#eef1f6] shadow-2xs xl:h-10 xl:w-10">
                  <Mail className="text-foreground h-4 w-4" />
                </div>
                <div>
                  <p className="text-foreground text-[11px] font-bold xl:text-xs">Our Email</p>
                  <p className="text-muted-foreground max-w-[150px] truncate text-[11px] font-medium xl:max-w-none xl:text-xs">
                    {config?.contactEmail || siteConfig.contact.email}
                  </p>
                </div>
              </div>

              {/* Location (Shown on xl+) */}
              <div className="hidden items-center gap-3 xl:flex">
                <div className="dark:bg-muted border-border/40 text-foreground flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border bg-[#eef1f6] shadow-2xs">
                  <MapPin className="text-foreground h-4 w-4" />
                </div>
                <div>
                  <p className="text-foreground text-xs font-bold">Location</p>
                  <p className="text-muted-foreground max-w-[180px] truncate text-xs font-medium">
                    {config?.address || siteConfig.contact.address}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Social Icons */}
            <div className="flex shrink-0 items-center gap-4 xl:gap-6">
              <div className="text-foreground/80 flex items-center gap-3">
                <a
                  href={config?.socialLinks?.facebook || "#"}
                  className="hover:text-primary p-1 transition-colors"
                  aria-label="Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook className="h-3.5 w-3.5 fill-current xl:h-4 xl:w-4" />
                </a>
                <a
                  href={config?.socialLinks?.twitter || "#"}
                  className="hover:text-primary p-1 transition-colors"
                  aria-label="Twitter/X"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href={config?.socialLinks?.linkedin || "#"}
                  className="hover:text-primary p-1 transition-colors"
                  aria-label="LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-3.5 w-3.5 fill-current xl:h-4 xl:w-4" />
                </a>
                <a
                  href={config?.socialLinks?.instagram || "#"}
                  className="hover:text-primary p-1 transition-colors"
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="h-3.5 w-3.5 xl:h-4 xl:w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <header className="bg-background/95 border-border/70 sticky top-0 z-50 w-full border-b shadow-xs backdrop-blur-md transition-all">
        <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          {/* Logo - Visible on mobile/tablet (<lg) */}
          <div className="flex shrink-0 items-center gap-3 lg:hidden">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="h-9 w-9 shrink-0">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 42 41"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-full w-full"
                >
                  <path
                    d="M7.91927 5.27564H34.0837C37.4463 5.28322 40.448 3.16882 41.573 1.90735e-06H7.94656C3.56476 1.90735e-06 0 3.56527 0 7.94656V8.52814C2.10536 6.43875 4.95312 5.26918 7.91927 5.27564Z"
                    fill="#864FFE"
                  />
                  <path
                    d="M19.9728 8.54832L7.91927 8.56247C3.88505 8.55429 0.488396 11.5778 0.0292969 15.5859V17.0785C1.93603 15.1936 4.45577 14.0555 7.13052 13.871C7.13052 13.8603 7.13457 13.8492 7.1376 13.8386H11.4153C12.8874 13.8389 14.0807 15.0323 14.0807 16.5045V32.4764C14.0807 36.8577 17.6459 40.4225 22.0272 40.423H22.6214C20.5275 38.3209 19.3532 35.4738 19.3563 32.5067V16.4676C19.3556 15.5727 19.2038 14.6844 18.9071 13.8401H20.0142C21.463 13.8457 22.6361 15.0188 22.6416 16.4676V32.5062C22.6338 35.8686 24.7478 38.8702 27.9163 39.9955V16.4949C27.9188 12.1131 24.354 8.54832 19.9728 8.54832Z"
                    fill="#864FFE"
                  />
                  <path
                    d="M34.0835 8.56247H27.9727C29.419 10.0192 30.4398 11.8435 30.925 13.8381H34.0517C38.4405 13.8389 41.9989 10.2818 41.9998 5.89307C41.9998 5.89257 41.9998 5.89206 41.9998 5.89155V5.29785C39.8974 7.39143 37.0505 8.5655 34.0835 8.56247Z"
                    fill="#864FFE"
                  />
                </svg>
              </div>
              <span className="text-foreground text-xl font-black">TechFirm</span>
            </Link>
          </div>

          {/* Desktop Nav Links - Shown on screens 1024px+ (lg) */}
          <nav className="hidden items-center gap-4 lg:flex xl:gap-7 2xl:gap-9">
            {siteConfig.navigation.map((item) => {
              const hasChildren = item.children && item.children.length > 0;
              const isActive =
                pathname === item.href ||
                (hasChildren && item.children?.some((c) => pathname === c.href));

              if (!hasChildren) {
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className={`text-xs font-bold tracking-wider whitespace-nowrap uppercase transition-colors xl:text-[13px] ${
                      isActive ? "text-primary" : "text-foreground hover:text-primary"
                    }`}
                  >
                    {item.title}
                  </Link>
                );
              }

              return (
                <div
                  key={item.title}
                  className="group relative"
                  onMouseEnter={() => setActiveDropdown(item.title)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 py-2 text-xs font-bold tracking-wider whitespace-nowrap uppercase transition-colors xl:text-[13px] ${
                      isActive ? "text-primary" : "text-foreground hover:text-primary"
                    }`}
                  >
                    <span>{item.title}</span>
                    <ChevronDown className="text-muted-foreground group-hover:text-primary h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" />
                  </Link>

                  <div className="invisible absolute top-full left-0 z-50 w-64 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                    <div className="bg-card border-border rounded-lg border p-2 shadow-xl ring-1 ring-black/5">
                      {item.children?.map((child) => (
                        <Link
                          key={child.title}
                          href={child.href}
                          className="hover:bg-accent group/item block rounded-md p-3 transition-colors"
                        >
                          <p className="text-foreground group-hover/item:text-primary text-sm font-bold transition-colors">
                            {child.title}
                          </p>
                          {child.description && (
                            <p className="text-muted-foreground mt-0.5 line-clamp-1 text-xs">
                              {child.description}
                            </p>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>

          {/* Right Action Icons & Button */}
          <div className="flex shrink-0 items-center gap-2.5 sm:gap-3.5">
            {/* Search Icon Button */}
            <button
              type="button"
              onClick={() => setSearchModalOpen(true)}
              className="dark:bg-muted dark:hover:bg-muted/80 border-border/40 text-foreground hover:text-primary flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl border bg-[#eef1f6] shadow-2xs transition-all hover:bg-[#e2e6ee] sm:h-11 sm:w-11"
              aria-label="Search"
            >
              <Search className="h-4.5 w-4.5" />
            </button>

            {/* Cart Icon Button */}
            <button
              type="button"
              onClick={openCart}
              className="dark:bg-muted dark:hover:bg-muted/80 border-border/40 text-foreground hover:text-primary relative flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl border bg-[#eef1f6] shadow-2xs transition-all hover:bg-[#e2e6ee] sm:h-11 sm:w-11"
              aria-label="Open Cart"
            >
              <ShoppingCart className="h-4.5 w-4.5" />
              {totalCount > 0 && (
                <span className="bg-primary absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full text-[10px] font-bold text-white shadow-xs">
                  {totalCount}
                </span>
              )}
            </button>

            {/* Pill CTA Button - Shown on screens 1024px+ (lg) */}
            <PillButton
              href="/contact"
              variant="outline"
              size="default"
              className="hidden lg:inline-flex"
            >
              Get Started Now
            </PillButton>

            {/* Mobile/Tablet Menu Toggle - Shown below 1024px (<lg) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="dark:bg-muted text-foreground hover:text-primary border-border/40 shrink-0 cursor-pointer rounded-xl border bg-[#eef1f6] p-2.5 hover:bg-[#e2e6ee] focus:outline-hidden lg:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile/Tablet Nav Drawer */}
        {mobileMenuOpen && (
          <div className="bg-card border-border animate-in slide-in-from-top space-y-4 border-b px-6 py-6 duration-200 lg:hidden">
            <nav className="space-y-1">
              {siteConfig.navigation.map((item) => {
                const hasChildren = item.children && item.children.length > 0;
                if (!hasChildren) {
                  return (
                    <Link
                      key={item.title}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-foreground hover:bg-muted block rounded-lg px-3 py-2.5 text-base font-bold"
                    >
                      {item.title}
                    </Link>
                  );
                }

                return (
                  <div key={item.title} className="py-1">
                    <button
                      onClick={() => toggleDropdown(item.title)}
                      className="text-foreground hover:bg-muted flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-base font-bold"
                    >
                      <span>{item.title}</span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          activeDropdown === item.title ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {activeDropdown === item.title && (
                      <div className="bg-muted my-1 space-y-1 rounded-xl py-1 pr-2 pl-4">
                        {item.children?.map((child) => (
                          <Link
                            key={child.title}
                            href={child.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-muted-foreground hover:text-primary block px-3 py-2 text-sm font-semibold"
                          >
                            {child.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            <div className="border-border flex flex-col gap-3 border-t pt-4">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="border-primary text-foreground flex w-full items-center justify-center gap-2 rounded-full border py-3 text-center text-sm font-bold"
              >
                <span>Get Started Now</span>
                <div className="bg-primary/15 text-primary flex h-5 w-5 items-center justify-center rounded-full">
                  <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                </div>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal Overlay */}
      {searchModalOpen && (
        <div
          className="animate-in fade-in fixed inset-0 z-100 flex items-start justify-center bg-black/60 px-4 pt-24 backdrop-blur-sm duration-200 sm:pt-32"
          onClick={() => setSearchModalOpen(false)}
        >
          <div
            className="bg-card border-border animate-in zoom-in-95 relative w-full max-w-xl rounded-2xl border p-6 shadow-2xl duration-200 sm:p-7"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-foreground text-lg font-black">Search TechFirm</h3>
                <p className="text-muted-foreground mt-0.5 text-xs">
                  Find services, solutions, case studies, or blogs
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSearchModalOpen(false)}
                className="hover:bg-muted text-muted-foreground hover:text-foreground flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg transition-colors"
                aria-label="Close search"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative">
              <Search className="text-primary absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Type keywords (e.g., Cloud, Cyber Security, Consulting)..."
                className="bg-muted/80 border-border focus:ring-primary text-foreground w-full rounded-xl border py-3.5 pr-16 pl-12 text-sm font-medium transition-all focus:border-transparent focus:ring-2 focus:outline-none"
                autoFocus
              />
              <div className="absolute top-1/2 right-3.5 -translate-y-1/2">
                <kbd className="text-muted-foreground bg-card border-border rounded-md border px-2 py-1 text-[10px] font-bold shadow-2xs">
                  ESC
                </kbd>
              </div>
            </div>

            <div className="border-border text-muted-foreground mt-5 flex flex-wrap items-center justify-between gap-2 border-t pt-4 text-xs">
              <span className="font-semibold">Quick links:</span>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/services/cloud-integration"
                  onClick={() => setSearchModalOpen(false)}
                  className="bg-muted hover:bg-accent hover:text-primary rounded-md px-2.5 py-1 font-medium transition-colors"
                >
                  Cloud Integration
                </Link>
                <Link
                  href="/services/cyber-security"
                  onClick={() => setSearchModalOpen(false)}
                  className="bg-muted hover:bg-accent hover:text-primary rounded-md px-2.5 py-1 font-medium transition-colors"
                >
                  Cyber Security
                </Link>
                <Link
                  href="/portfolio"
                  onClick={() => setSearchModalOpen(false)}
                  className="bg-muted hover:bg-accent hover:text-primary rounded-md px-2.5 py-1 font-medium transition-colors"
                >
                  Portfolio
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
