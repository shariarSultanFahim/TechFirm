"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Zap
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { TopUtilityBar } from "@/components/widgets";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const toggleDropdown = (title: string) => {
    setActiveDropdown(activeDropdown === title ? null : title);
  };

  return (
    <>
      <TopUtilityBar />
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md border-b border-border shadow-xs transition-all">
        <div className="container mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-11 h-11 rounded-xl bg-dark-bg text-primary flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Zap className="w-6 h-6 fill-current text-primary" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-foreground">
                Tech<span className="text-primary-deep">Firm</span>
              </span>
              <p className="text-[9px] font-bold tracking-widest text-muted-foreground uppercase -mt-1">
                IT Solution Company
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
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
                    className={`px-3.5 py-2 rounded-lg text-sm font-bold transition-colors ${
                      isActive
                        ? "text-primary-deep bg-accent"
                        : "text-foreground hover:text-primary-deep hover:bg-muted"
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
                  <button
                    type="button"
                    className={`flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-bold transition-colors ${
                      isActive
                        ? "text-primary-deep bg-accent"
                        : "text-foreground hover:text-primary-deep hover:bg-muted"
                    }`}
                  >
                    <span>{item.title}</span>
                    <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:rotate-180 transition-transform duration-200" />
                  </button>

                  <div className="absolute top-full left-0 pt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="bg-card rounded-2xl p-2 shadow-xl border border-border ring-1 ring-black/5">
                      {item.children?.map((child) => (
                        <Link
                          key={child.title}
                          href={child.href}
                          className="block p-3 rounded-xl hover:bg-accent transition-colors group/item"
                        >
                          <p className="text-sm font-bold text-foreground group-hover/item:text-primary-deep transition-colors">
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

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-dark-bg text-white font-bold text-sm hover:bg-primary hover:text-primary-foreground hover:shadow-lg transition-all duration-200"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-4 h-4 text-primary" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-muted hover:bg-muted/80 text-foreground focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
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
                      className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg font-bold text-base text-foreground hover:bg-muted"
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
                            className="block py-2 px-3 text-sm font-semibold text-muted-foreground hover:text-primary-deep"
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
                className="w-full py-3 text-center rounded-xl bg-dark-bg text-white font-bold text-sm shadow-md"
              >
                Get Started Now
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
