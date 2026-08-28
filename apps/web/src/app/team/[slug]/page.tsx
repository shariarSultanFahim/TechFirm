import { notFound } from "next/navigation";
import {
  TeamMemberView,
  getTeamMember,
  teamMembersData
} from "@/components/team";

export async function generateStaticParams() {
  return teamMembersData.map((member) => ({
    slug: member.id
  }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const member = getTeamMember(slug);

  return {
    title: `${member.name} — TechFirm Leadership`,
    description: member.bio
  };
}

export default async function TeamMemberDetailsPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const member = getTeamMember(slug);

  if (!member) {
    notFound();
  }

  return (
    <main className="w-full bg-white">
      <TeamMemberView member={member} />
    </main>
  );
}
