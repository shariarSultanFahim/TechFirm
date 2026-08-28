"use client";

import { useQuery } from "@tanstack/react-query";

import { ApiResponse, ISiteConfig } from "@repo/types";

import { get } from "@/lib/api";

export const defaultSiteConfig: ISiteConfig = {
  siteName: "TechFirm",
  siteLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200",
  tagline: "IT SOLUTION COMPANY",
  contactEmail: "contact@techfirm.com",
  contactPhone: "+1 (555) 234-5678",
  workingHours: "Mon - Fri: 9:00 AM - 6:00 PM",
  address: "1200 Tech Blvd, Suite 400, San Francisco, CA 94107",
  socialLinks: {
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
    github: "https://github.com"
  },
  topBar: {
    announcement: "24/7 Managed Cloud Support & Zero-Trust IT Services",
    isVisible: true
  },
  ctaBand: {
    title: "Ready to Launch with Techfirm?",
    subtitle:
      "Start hosting with lightning speed, built-in security, and real support — in just a few clicks.",
    buttonText: "7-Day Free Trial",
    buttonHref: "#pricing",
    badges: ["Lightning Speed", "Ironclad Security", "Scalable Hosting"]
  },
  footer: {
    copyrightText: "Copyright @2026 BizanTheme All Rights Reserved",
    collaborateLinks: [
      { label: "Partners", href: "#" },
      { label: "Partners Program", href: "#" },
      { label: "Affiliate Program", href: "#" },
      { label: "Community", href: "#" },
      { label: "HR Partner Program", href: "#" }
    ],
    myAccountLinks: [
      { label: "Company", href: "/about" },
      { label: "Customer Success", href: "/portfolio" },
      { label: "Resources", href: "/blog" },
      { label: "Talk an Expert", href: "/contact" }
    ],
    serviceLinks: [
      { label: "Software Development", href: "/services" },
      { label: "Cloud Services", href: "/services" },
      { label: "AI Machine Learning", href: "/services" },
      { label: "Data Security", href: "/services" },
      { label: "Software Development", href: "/services" }
    ],
    bottomLinks: [
      { label: "Faqs", href: "/faqs" },
      { label: "Setting", href: "#" },
      { label: "Privacy", href: "/privacy" },
      { label: "Contact", href: "/contact" }
    ]
  }
};

export function useSiteConfig() {
  return useQuery<ISiteConfig>({
    queryKey: ["site-config"],
    queryFn: async () => {
      try {
        const res = await get<ApiResponse<ISiteConfig>>("/site-config");
        return res.data || defaultSiteConfig;
      } catch {
        return defaultSiteConfig;
      }
    },
    staleTime: 1000 * 60 * 5 // 5 minutes
  });
}
