"use client";

import { useQuery } from "@tanstack/react-query";

import { ApiResponse, ISiteConfig } from "@repo/types";

import { get } from "@/lib/api";

export const DEFAULT_SITE_CONFIG: ISiteConfig = {
  siteName: "TechFirm",
  siteLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200",
  tagline: "IT SOLUTION COMPANY",
  contactEmail: "contact@techfirm.com",
  contactPhone: "+1 (555) 234-5678",
  workingHours: "Mon - Fri: 9:00 AM - 6:00 PM",
  address: "1200 Tech Blvd, Suite 400, San Francisco, CA",
  socialLinks: {
    facebook: "https://facebook.com/techfirm",
    twitter: "https://twitter.com/techfirm",
    linkedin: "https://linkedin.com/company/techfirm",
    instagram: "https://instagram.com/techfirm",
    github: "https://github.com/techfirm"
  },
  topBar: {
    announcement: "24/7 Managed Cloud Support & Zero-Trust IT Services",
    isVisible: true
  },
  ctaBand: {
    title: "Ready to Launch with Techfirm?",
    subtitle:
      "Start hosting with lightning speed, built-in security, and real support that scales with you.",
    buttonText: "7-Day Free Trial",
    buttonHref: "#pricing",
    badges: ["Ironclad Security", "99.99% Uptime", "Zero Contract Lock-in"]
  },
  footer: {
    copyrightText: "Copyright @2026 BizanTheme All Rights Reserved",
    collaborateLinks: [
      { label: "Book Discovery Call", href: "#contact" },
      { label: "Cloud Advisory", href: "#services" },
      { label: "Request Audit", href: "#contact" }
    ],
    myAccountLinks: [
      { label: "Customer Portal", href: "/login" },
      { label: "Support Ticket", href: "#contact" },
      { label: "Documentation", href: "#" }
    ],
    serviceLinks: [
      { label: "Cloud Modernization", href: "#services" },
      { label: "Managed Kubernetes", href: "#services" },
      { label: "Zero-Trust Security", href: "#services" }
    ],
    bottomLinks: [
      { label: "Terms of Service", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Security Whitepaper", href: "#" }
    ]
  }
};

export function useSiteConfig() {
  return useQuery<ISiteConfig>({
    queryKey: ["site-config"],
    queryFn: async () => {
      try {
        const res = await get<ApiResponse<ISiteConfig>>("/site-config");
        return res.data || DEFAULT_SITE_CONFIG;
      } catch {
        return DEFAULT_SITE_CONFIG;
      }
    },
    initialData: DEFAULT_SITE_CONFIG
  });
}
