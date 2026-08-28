"use client";

import { ITeamMember } from "@repo/types";

import { useTeam } from "@/hooks/use-team";

import { TeamCard, type TeamMember } from "./team-card";

interface TeamGridProps {
  members?: (TeamMember | ITeamMember)[];
}

export function TeamGrid({ members: propMembers }: TeamGridProps) {
  const { data: hookMembers = [] } = useTeam();
  const members = propMembers || hookMembers;

  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-4">
      {members.map((member, idx) => {
        const key =
          (member as ITeamMember).id ||
          (member as ITeamMember).slug ||
          (member as TeamMember).id ||
          `team-${idx}`;
        return <TeamCard key={key} member={member} />;
      })}
    </div>
  );
}
