import { Metadata } from "next";
import { notFound } from "next/navigation";

import { ITeamMember } from "@repo/types";

import { env } from "@/env";

import { defaultTeamMembers } from "@/lib/team-data";

import { getTeamMember, teamMembersData, TeamMemberView } from "@/components/team";

const API_BASE_URL = env.NEXT_PUBLIC_API_URL;

async function fetchTeamMember(slug: string): Promise<ITeamMember | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/team/${slug}`, {
      next: { revalidate: 60 }
    });
    if (res.ok) {
      const json = await res.json();
      return json.data || null;
    }
  } catch {
    // API not reachable during build/SSR, fallback to static/default data
  }

  const fallback = defaultTeamMembers.find((m) => m.slug === slug || m.id === slug);
  if (fallback) return fallback;

  return null;
}

export async function generateStaticParams() {
  const staticSlugs = teamMembersData.map((member) => ({
    slug: member.id
  }));
  const defaultSlugs = defaultTeamMembers.map((member) => ({
    slug: member.slug
  }));
  return [...staticSlugs, ...defaultSlugs];
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const member = (await fetchTeamMember(slug)) || getTeamMember(slug);

  if (!member) {
    return {
      title: "Team Member — TechFirm Leadership",
      description: "TechFirm team leadership and consulting engineers."
    };
  }

  return {
    title: `${member.name} — TechFirm Leadership`,
    description: member.bio || "TechFirm team leadership and consulting engineer."
  };
}

export default async function TeamMemberDetailsPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const member = (await fetchTeamMember(slug)) || getTeamMember(slug);

  if (!member) {
    notFound();
  }

  return (
    <main className="w-full bg-white">
      <TeamMemberView member={member} />
    </main>
  );
}
