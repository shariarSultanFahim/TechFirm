"use client";

import Link from "next/link";
import { ArrowUp, Mail, Zap, Phone, MapPin, Linkedin, Twitter, Github } from "lucide-react";
import { siteConfig } from "@/config/site";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-dark-bg text-gray-400 text-sm border-t border-dark-border">
      <div className="container mx-auto px-4 sm:px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 xl:gap-12">
          {/* Column 1: Brand & Contact */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-3 group inline-block">
              <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-md">
                <Zap className="w-5 h-5 fill-current" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Tech<span className="text-primary">Firm</span>
              </span>
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Delivering high-impact technology solutions, resilient cloud infrastructures, and 24/7 managed IT operations for ambitious companies worldwide.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-gray-300 font-semibold">{siteConfig.contact.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-gray-300">{siteConfig.contact.email}</span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-gray-300">{siteConfig.contact.address}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-dark-card border border-dark-border flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/40 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-dark-card border border-dark-border flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/40 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-dark-card border border-dark-border flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/40 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-extrabold text-sm uppercase tracking-wider mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-primary transition-colors">
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-primary transition-colors">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:text-primary transition-colors">
                  FAQ & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="text-white font-extrabold text-sm uppercase tracking-wider mb-5">
              Our Services
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/services" className="hover:text-primary transition-colors">
                  All Services
                </Link>
              </li>
              <li>
                <Link href="/services/cloud-integration" className="hover:text-primary transition-colors">
                  Cloud Solutions
                </Link>
              </li>
              <li>
                <Link href="/services/cyber-security" className="hover:text-primary transition-colors">
                  Cyber Security
                </Link>
              </li>
              <li>
                <Link href="/services/managed-it" className="hover:text-primary transition-colors">
                  Managed IT
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-primary transition-colors">
                  Our Portfolio
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="text-white font-extrabold text-sm uppercase tracking-wider mb-5">
              Newsletter
            </h4>
            <p className="text-xs text-gray-400 mb-4 leading-relaxed">
              Subscribe to receive the latest cloud computing trends and cybersecurity alerts.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2.5">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full bg-dark-card border border-dark-border rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-hidden focus:border-primary"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-primary text-primary-foreground font-bold text-xs hover:bg-primary-deep hover:text-white transition-colors shadow-md cursor-pointer"
              >
                Subscribe Now
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-dark-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} TechFirm Inc. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link href="/faqs" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/faqs" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>

            <button
              onClick={scrollToTop}
              className="w-9 h-9 rounded-full bg-dark-card border border-dark-border flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors shadow-xs cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
