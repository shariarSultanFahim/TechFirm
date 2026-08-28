"use client";

import { useQuery } from "@tanstack/react-query";

import { ApiResponse, ITeamMember } from "@repo/types";

import { defaultTeamMembers } from "@/lib/team-data";

export { defaultTeamMembers };

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export function useTeam(params?: { search?: string }) {
  const search = params?.search || undefined;

  return useQuery<ITeamMember[]>({
    queryKey: ["public-team-members", { search }],
    queryFn: async () => {
      try {
        const queryParams = new URLSearchParams();
        queryParams.set("isActive", "true");
        if (search) queryParams.set("search", search);

        const res = await fetch(`${API_BASE_URL}/team?${queryParams.toString()}`);
        if (!res.ok) {
          return defaultTeamMembers;
        }
        const json: ApiResponse<ITeamMember[]> = await res.json();
        return json.data && json.data.length > 0 ? json.data : defaultTeamMembers;
      } catch {
        return defaultTeamMembers;
      }
    },
    initialData: defaultTeamMembers,
    staleTime: 60 * 1000
  });
}

export function useTeamMember(slug: string) {
  const defaultMember =
    defaultTeamMembers.find((m) => m.slug === slug || m.id === slug) || defaultTeamMembers[0]!;

  return useQuery<ITeamMember>({
    queryKey: ["public-team-member", slug],
    queryFn: async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/team/${slug}`);
        if (!res.ok) {
          return defaultMember;
        }
        const json: ApiResponse<ITeamMember> = await res.json();
        return json.data || defaultMember;
      } catch {
        return defaultMember;
      }
    },
    initialData: defaultMember,
    staleTime: 60 * 1000
  });
}
