"use client";

import { useCart } from "@/components/cart";
import { PillButton } from "@/components/ui/pill-button";
import { siteConfig } from "@/config/site";
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
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function Header() {
  const { openCart, totalCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const pathname = usePathname();


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
      <div className="relative z-10 w-full bg-[#f8f9fa] border-b border-border/70 text-foreground py-2.5 lg:py-3 hidden lg:block">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4 lg:gap-6">
          {/* Logo Section */}
          <div className="flex items-center gap-5 xl:gap-7 shrink-0">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 xl:w-10 xl:h-10 shrink-0 group-hover:scale-105 transition-transform">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 42 41"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
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
                <span className="text-xl xl:text-[22px] font-black tracking-tight text-foreground leading-none">
                  TechFirm
                </span>
                <span className="text-[8px] xl:text-[8.5px] font-bold tracking-[0.2em] text-muted-foreground uppercase mt-0.5 xl:mt-1">
                  IT SOLUTION COMPANY
                </span>
              </div>
            </Link>

            {/* Vertical Divider with Diamond Node */}
            <div className="flex items-center justify-center relative h-9 px-1">
              <div className="w-[1px] h-full bg-border relative flex items-center justify-center">
                <div className="w-1.5 h-1.5 rotate-45 bg-[#f8f9fa] border border-border" />
              </div>
            </div>
          </div>

          {/* Middle Contact Info Badges */}
          <div className="flex items-center gap-4 xl:gap-8 flex-1 justify-center max-w-2xl">
            {/* 24/ Support */}
            <div className="flex items-center gap-2.5 xl:gap-3">
              <div className="w-9 h-9 xl:w-10 xl:h-10 rounded-xl bg-[#eef1f6] dark:bg-muted border border-border/40 flex items-center justify-center text-foreground shrink-0 shadow-2xs">
                <Phone className="w-4 h-4 text-foreground" />
              </div>
              <div>
                <p className="text-[11px] xl:text-xs font-bold text-foreground">24/ Support</p>
                <p className="text-[11px] xl:text-xs text-muted-foreground font-medium whitespace-nowrap">{siteConfig.contact.phone}</p>
              </div>
            </div>

            {/* Our Email */}
            <div className="flex items-center gap-2.5 xl:gap-3">
              <div className="w-9 h-9 xl:w-10 xl:h-10 rounded-xl bg-[#eef1f6] dark:bg-muted border border-border/40 flex items-center justify-center text-foreground shrink-0 shadow-2xs">
                <Mail className="w-4 h-4 text-foreground" />
              </div>
              <div>
                <p className="text-[11px] xl:text-xs font-bold text-foreground">Our Email</p>
                <p className="text-[11px] xl:text-xs text-muted-foreground font-medium truncate max-w-[150px] xl:max-w-none">{siteConfig.contact.email}</p>
              </div>
            </div>

            {/* Location (Shown on xl+) */}
            <div className="hidden xl:flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#eef1f6] dark:bg-muted border border-border/40 flex items-center justify-center text-foreground shrink-0 shadow-2xs">
                <MapPin className="w-4 h-4 text-foreground" />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">Location</p>
                <p className="text-xs text-muted-foreground font-medium truncate max-w-[180px]">
                  {siteConfig.contact.address}
                </p>
              </div>
            </div>
          </div>

          {/* Right Social & Language Selector */}
          <div className="flex items-center gap-4 xl:gap-6 shrink-0">
            {/* Social Icons */}
            <div className="flex items-center gap-3 text-foreground/80">
              <a
                href="#"
                className="hover:text-primary transition-colors p-1"
                aria-label="Facebook"
              >
                <Facebook className="w-3.5 h-3.5 xl:w-4 xl:h-4 fill-current" />
              </a>
              <a
                href="#"
                className="hover:text-primary transition-colors p-1"
                aria-label="Twitter/X"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#"
                className="hover:text-primary transition-colors p-1"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5 xl:w-4 xl:h-4 fill-current" />
              </a>
              <a
                href="#"
                className="hover:text-primary transition-colors p-1"
                aria-label="Instagram"
              >
                <Instagram className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
              </a>
            </div>

            
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md border-b border-border/70 shadow-xs transition-all">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
          {/* Logo - Visible on mobile/tablet (<lg) */}
          <div className="flex lg:hidden items-center gap-3 shrink-0">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 shrink-0">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 42 41"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
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
              <span className="text-xl font-black text-foreground">TechFirm</span>
            </Link>
          </div>

          {/* Desktop Nav Links - Shown on screens 1024px+ (lg) */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-7 2xl:gap-9">
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
                    className={`text-xs xl:text-[13px] font-bold tracking-wider uppercase transition-colors whitespace-nowrap ${
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
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(item.title)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 text-xs xl:text-[13px] font-bold tracking-wider uppercase transition-colors py-2 whitespace-nowrap ${
                      isActive ? "text-primary" : "text-foreground hover:text-primary"
                    }`}
                  >
                    <span>{item.title}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-muted-foreground group-hover:rotate-180 group-hover:text-primary transition-transform duration-200" />
                  </Link>

                  <div className="absolute top-full left-0 pt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="bg-card rounded-lg p-2 shadow-xl border border-border ring-1 ring-black/5">
                      {item.children?.map((child) => (
                        <Link
                          key={child.title}
                          href={child.href}
                          className="block p-3 rounded-md hover:bg-accent transition-colors group/item"
                        >
                          <p className="text-sm font-bold text-foreground group-hover/item:text-primary transition-colors">
                            {child.title}
                          </p>
                          {child.description && (
                            <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
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
          <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
            {/* Search Icon Button */}
            <button
              type="button"
              onClick={() => setSearchModalOpen(true)}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#eef1f6] dark:bg-muted hover:bg-[#e2e6ee] dark:hover:bg-muted/80 border border-border/40 flex items-center justify-center text-foreground hover:text-primary transition-all cursor-pointer shadow-2xs shrink-0"
              aria-label="Search"
            >
              <Search className="w-4.5 h-4.5" />
            </button>

            {/* Cart Icon Button */}
            <button
              type="button"
              onClick={openCart}
              className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#eef1f6] dark:bg-muted hover:bg-[#e2e6ee] dark:hover:bg-muted/80 border border-border/40 flex items-center justify-center text-foreground hover:text-primary transition-all shadow-2xs shrink-0 cursor-pointer"
              aria-label="Open Cart"
            >
              <ShoppingCart className="w-4.5 h-4.5" />
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
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
              className="lg:hidden p-2.5 rounded-xl bg-[#eef1f6] dark:bg-muted hover:bg-[#e2e6ee] text-foreground hover:text-primary border border-border/40 focus:outline-hidden cursor-pointer shrink-0"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile/Tablet Nav Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-card border-b border-border px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
            <nav className="space-y-1">
              {siteConfig.navigation.map((item) => {
                const hasChildren = item.children && item.children.length > 0;
                if (!hasChildren) {
                  return (
                    <Link
                      key={item.title}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-2.5 px-3 rounded-lg font-bold text-base text-foreground hover:bg-muted"
                    >
                      {item.title}
                    </Link>
                  );
                }

                return (
                  <div key={item.title} className="py-1">
                    <button
                      onClick={() => toggleDropdown(item.title)}
                      className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg font-bold text-base text-foreground hover:bg-muted cursor-pointer"
                    >
                      <span>{item.title}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          activeDropdown === item.title ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {activeDropdown === item.title && (
                      <div className="pl-4 pr-2 py-1 space-y-1 bg-muted rounded-xl my-1">
                        {item.children?.map((child) => (
                          <Link
                            key={child.title}
                            href={child.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block py-2 px-3 text-sm font-semibold text-muted-foreground hover:text-primary"
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

            <div className="pt-4 border-t border-border flex flex-col gap-3">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 text-center rounded-full border border-primary text-foreground font-bold text-sm flex items-center justify-center gap-2"
              >
                <span>Get Started Now</span>
                <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center text-primary">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal Overlay */}
      {searchModalOpen && (
        <div
          className="fixed inset-0 z-100 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-24 sm:pt-32 px-4 animate-in fade-in duration-200"
          onClick={() => setSearchModalOpen(false)}
        >
          <div
            className="bg-card w-full max-w-xl rounded-2xl p-6 sm:p-7 shadow-2xl border border-border animate-in zoom-in-95 duration-200 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-lg font-black text-foreground">Search TechFirm</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Find services, solutions, case studies, or blogs</p>
              </div>
              <button
                type="button"
                onClick={() => setSearchModalOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative">
              <Search className="w-5 h-5 text-primary absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Type keywords (e.g., Cloud, Cyber Security, Consulting)..."
                className="w-full pl-12 pr-16 py-3.5 rounded-xl bg-muted/80 border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-medium text-foreground transition-all"
                autoFocus
              />
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                <kbd className="px-2 py-1 text-[10px] font-bold text-muted-foreground bg-card border border-border rounded-md shadow-2xs">
                  ESC
                </kbd>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-border flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
              <span className="font-semibold">Quick links:</span>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/services/cloud-integration"
                  onClick={() => setSearchModalOpen(false)}
                  className="px-2.5 py-1 rounded-md bg-muted hover:bg-accent hover:text-primary transition-colors font-medium"
                >
                  Cloud Integration
                </Link>
                <Link
                  href="/services/cyber-security"
                  onClick={() => setSearchModalOpen(false)}
                  className="px-2.5 py-1 rounded-md bg-muted hover:bg-accent hover:text-primary transition-colors font-medium"
                >
                  Cyber Security
                </Link>
                <Link
                  href="/portfolio"
                  onClick={() => setSearchModalOpen(false)}
                  className="px-2.5 py-1 rounded-md bg-muted hover:bg-accent hover:text-primary transition-colors font-medium"
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
