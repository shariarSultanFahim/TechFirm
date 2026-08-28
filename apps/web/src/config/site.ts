import { env } from "@/env";
import type { SiteConfig } from "@/types/site-config";

export interface TechfirmSiteConfig extends SiteConfig {
  contact: {
    phone: string;
    email: string;
    supportHours: string;
    address: string;
  };
  navigation: Array<{
    title: string;
    href: string;
    children?: Array<{ title: string; href: string; description?: string }>;
  }>;
}

export const siteConfig: TechfirmSiteConfig = {
  name: "TechFirm — IT Solution & Technology Agency",
  description:
    "Empowering enterprises with cutting-edge Cloud Solutions, Cyber Security, Managed IT Services, and Agile Software Engineering.",
  url: env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  author: "TechFirm Global Inc.",
  locale: "en",
  themeColor: "#12121C",
  keywords: [
    "TechFirm",
    "IT Solutions",
    "Cloud Hosting",
    "Cyber Security",
    "Managed IT Services",
    "IT Consulting",
    "Software Architecture"
  ],
  social: {
    twitter: "https://twitter.com/techfirm",
    github: "https://github.com/shariarSultanFahim",
    linkedin: "https://linkedin.com/company/techfirm"
  },
  ogImage: "/og.jpg",
  contact: {
    phone: "+1.809.659.8654",
    email: "yourdomain@gmail.com",
    supportHours: "24/7 Support",
    address: "Graaf Florisstraat 22-A, 3021 CH Rotterdam"
  },
  navigation: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Pages",
      href: "/about",
      children: [
        { title: "About Us", href: "/about", description: "Learn about our mission, vision, and team." },
        { title: "Our Team", href: "/team", description: "Meet our senior architects and engineers." },
        { title: "Our Pricing Plan", href: "/pricing", description: "Transparent tiered pricing for all business sizes." },
        { title: "Our FAQs", href: "/faqs", description: "Frequently asked questions and answers." }
      ]
    },
    {
      title: "Services",
      href: "/services",
      // children: [
      //   { title: "All Services", href: "/services", description: "Comprehensive IT service directory." },
      //   { title: "Cloud Integration", href: "/services/cloud-integration", description: "Scalable multi-cloud deployments." },
      //   { title: "Cyber Security", href: "/services/cyber-security", description: "Zero-trust identity and threat mitigation." },
      //   { title: "Managed IT Services", href: "/services/managed-it", description: "24/7 proactive monitoring and support." }
      // ]
    },
    {
      title: "Portfolio",
      href: "/portfolio",
    },
    {
      title: "Blog",
      href: "/blog",
      // children: [
      //   { title: "Blog Grid", href: "/blog", description: "Latest industry news and technology insights." },
      //   { title: "Blog Standard", href: "/blog", description: "Featured in-depth technical analysis." }
      // ]
    },
    { title: "Contact", href: "/contact" }
  ]
} as const;
