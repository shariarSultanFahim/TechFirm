"use client";

import { useQuery } from "@tanstack/react-query";

import { ApiResponse, IFaq } from "@repo/types";

import { env } from "@/env";

const API_BASE_URL = env.NEXT_PUBLIC_API_URL;

export const defaultFaqs: IFaq[] = [
  {
    id: "default-1",
    question: "How do I know if I need a consultant?",
    answer:
      "If your internal IT team spends more time fighting fires than shipping features, or if you are planning a cloud migration, compliance audit (SOC2/GDPR), or infrastructure scaling, our consultants help save up to 40% in operational costs while preventing catastrophic downtime.",
    category: "General",
    order: 1,
    isActive: true
  },
  {
    id: "default-2",
    question: "What is your typical onboarding timeline for Managed IT?",
    answer:
      "Most organizations are fully onboarded within 5 to 10 business days. This includes network telemetry mapping, credential vaulting, automated monitoring setup, and an initial security vulnerability assessment.",
    category: "Services",
    order: 2,
    isActive: true
  },
  {
    id: "default-3",
    question: "What uptime and response time SLAs do you guarantee?",
    answer:
      "Our Enterprise agreements guarantee a 99.99% infrastructure uptime SLA and a maximum 15-minute response time for critical severity-1 incidents, backed by financially enforceable service credits.",
    category: "Support",
    order: 3,
    isActive: true
  },
  {
    id: "default-4",
    question: "Can I customize or upgrade my pricing plan later?",
    answer:
      "Yes, you can scale resources up or down at any time with prorated billing. You can also switch between monthly and annual billing with a single click from the customer portal.",
    category: "Pricing",
    order: 4,
    isActive: true
  },
  {
    id: "default-5",
    question: "How do you protect sensitive company data during migrations?",
    answer:
      "All data transfers use TLS 1.3 encryption with AES-256 encryption at rest. We utilize dedicated secure point-to-point tunnels and execute zero-data-loss validation checkpoints prior to final cutover.",
    category: "Security",
    order: 5,
    isActive: true
  }
];

export function useFaqs(params?: { category?: string; search?: string }) {
  const category = params?.category && params.category !== "All" ? params.category : undefined;
  const search = params?.search || undefined;

  return useQuery<IFaq[]>({
    queryKey: ["public-faqs", { category, search }],
    queryFn: async () => {
      try {
        const queryParams = new URLSearchParams();
        queryParams.set("isActive", "true");
        if (category) queryParams.set("category", category);
        if (search) queryParams.set("search", search);

        const res = await fetch(`${API_BASE_URL}/faqs?${queryParams.toString()}`);
        if (!res.ok) {
          return defaultFaqs;
        }
        const json: ApiResponse<IFaq[]> = await res.json();
        return json.data && json.data.length > 0 ? json.data : defaultFaqs;
      } catch {
        return defaultFaqs;
      }
    },
    initialData: defaultFaqs,
    staleTime: 60 * 1000
  });
}
