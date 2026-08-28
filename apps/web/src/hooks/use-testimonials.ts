"use client";

import { useQuery } from "@tanstack/react-query";

import { ApiResponse, ITestimonial } from "@repo/types";

import { env } from "@/env";

const API_BASE_URL = env.NEXT_PUBLIC_API_URL;

export const defaultTestimonials: ITestimonial[] = [
  {
    id: "default-1",
    quote:
      "TechFirm migrated our entire core banking ledger to a hybrid cloud setup in less than 3 weeks without a single second of unexpected downtime. Their 24/7 support team is exceptional.",
    tags: ["FinTech", "Cloud Migration"],
    authorName: "Jonathan Vance",
    authorRole: "CTO",
    company: "Fintech Global Group",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
    rating: 5,
    iconBg: "bg-linear-to-br from-[#00C0FA] to-[#007BFE]",
    hasVideo: false,
    order: 1,
    isActive: true
  },
  {
    id: "default-2",
    quote:
      "The zero-trust security architecture TechFirm implemented passed our SOC2 Type II audit with flying colors. We feel completely confident in our compliance posture.",
    tags: ["Security", "SOC2 Compliance"],
    authorName: "Sophia Martinez",
    authorRole: "VP of Engineering",
    company: "Logistics Pro Europe",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200",
    rating: 5,
    iconBg: "bg-linear-to-br from-[#34D399] to-[#059669]",
    hasVideo: true,
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    posterImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800",
    order: 2,
    isActive: true
  },
  {
    id: "default-3",
    quote:
      "Our cloud hosting bill was reduced by 35% in month one, while our application throughput doubled. Working with TechFirm has been one of our highest-ROI decisions.",
    tags: ["Cost Optimization", "Performance"],
    authorName: "Alexander Becker",
    authorRole: "Head of Operations",
    company: "CloudScale SaaS",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200",
    rating: 5,
    iconBg: "bg-linear-to-br from-[#8B5CF6] to-[#6D28D9]",
    hasVideo: false,
    order: 3,
    isActive: true
  }
];

export function useTestimonials() {
  return useQuery<ITestimonial[]>({
    queryKey: ["public-testimonials"],
    queryFn: async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/testimonials?isActive=true`);
        if (!res.ok) {
          return defaultTestimonials;
        }
        const json: ApiResponse<ITestimonial[]> = await res.json();
        return json.data && json.data.length > 0 ? json.data : defaultTestimonials;
      } catch {
        return defaultTestimonials;
      }
    },
    initialData: defaultTestimonials,
    staleTime: 60 * 1000
  });
}
