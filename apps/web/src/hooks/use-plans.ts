"use client";

import { useQuery } from "@tanstack/react-query";

import { ApiResponse, BillingPeriod, IPlan } from "@repo/types";

import { env } from "@/env";

const API_BASE_URL = env.NEXT_PUBLIC_API_URL;

export const defaultMonthlyPlans: IPlan[] = [
  {
    id: "default-plan-1",
    name: "Free",
    price: 0,
    billingPeriod: "monthly",
    features: ["Single Payment", "Custom design & develop", "Selling your own items"],
    isPopular: false,
    isActive: true,
    order: 1,
    description: "For individuals and small teams with unlimited trial access.",
    buttonText: "Get Started →"
  },
  {
    id: "default-plan-2",
    name: "Advanced",
    price: 19,
    billingPeriod: "monthly",
    features: [
      "Single Payment",
      "Custom design & develop",
      "Selling your own items",
      "Custom design & develop",
      "Selling your own items"
    ],
    isPopular: true,
    isActive: true,
    order: 2,
    description: "For individuals and small teams with unlimited trial access.",
    buttonText: "Get Started →"
  },
  {
    id: "default-plan-3",
    name: "Enterprise",
    price: 99,
    billingPeriod: "monthly",
    features: [
      "Single Payment",
      "Custom design & develop",
      "Selling your own items",
      "Custom design & develop",
      "Selling your own items"
    ],
    isPopular: false,
    isActive: true,
    order: 3,
    description: "For individuals and small teams with unlimited trial access.",
    buttonText: "Get Started →"
  }
];

export const defaultAnnualPlans: IPlan[] = [
  {
    id: "default-annual-1",
    name: "Free",
    price: 0,
    billingPeriod: "annual",
    features: ["Single Payment", "Custom design & develop", "Selling your own items"],
    isPopular: false,
    isActive: true,
    order: 1,
    description: "For individuals and small teams with unlimited trial access.",
    buttonText: "Get Started →"
  },
  {
    id: "default-annual-2",
    name: "Advanced",
    price: 12,
    billingPeriod: "annual",
    features: [
      "Single Payment",
      "Custom design & develop",
      "Selling your own items",
      "Custom design & develop",
      "Selling your own items"
    ],
    isPopular: true,
    isActive: true,
    order: 2,
    description: "For individuals and small teams with unlimited trial access.",
    buttonText: "Get Started →"
  },
  {
    id: "default-annual-3",
    name: "Enterprise",
    price: 69,
    billingPeriod: "annual",
    features: [
      "Single Payment",
      "Custom design & develop",
      "Selling your own items",
      "Custom design & develop",
      "Selling your own items"
    ],
    isPopular: false,
    isActive: true,
    order: 3,
    description: "For individuals and small teams with unlimited trial access.",
    buttonText: "Get Started →"
  }
];

export function usePlans(billingPeriod?: BillingPeriod) {
  const fallback = billingPeriod === "annual" ? defaultAnnualPlans : defaultMonthlyPlans;

  return useQuery<IPlan[]>({
    queryKey: ["public-pricing-plans", billingPeriod],
    queryFn: async () => {
      try {
        const queryParams = new URLSearchParams();
        queryParams.set("isActive", "true");
        if (billingPeriod) queryParams.set("billingPeriod", billingPeriod);

        const res = await fetch(`${API_BASE_URL}/plans?${queryParams.toString()}`);
        if (!res.ok) {
          return fallback;
        }
        const json: ApiResponse<IPlan[]> = await res.json();
        return json.data && json.data.length > 0 ? json.data : fallback;
      } catch {
        return fallback;
      }
    },
    initialData: fallback,
    staleTime: 60 * 1000
  });
}
