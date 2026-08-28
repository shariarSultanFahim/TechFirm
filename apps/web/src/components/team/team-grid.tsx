import { TeamCard, type TeamMember } from "./team-card";

export const defaultTeamMembers: TeamMember[] = [
  {
    id: "michael-carter",
    name: "Michael Carter",
    role: "Senior Designer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "david-thompson",
    name: "David Thompson",
    role: "Senior Designer",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "james-anderson",
    name: "James Anderson",
    role: "Senior Designer",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "robert-mitchell",
    name: "Robert Mitchell",
    role: "Senior Designer",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "david-smith",
    name: "David Smith",
    role: "Senior Designer",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "matthew-scott",
    name: "Matthew Scott",
    role: "Senior Designer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "daniel-walker",
    name: "Daniel Walker",
    role: "Senior Designer",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "william-harris",
    name: "William Harris",
    role: "Senior Designer",
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=800&auto=format&fit=crop"
  }
];

interface TeamGridProps {
  members?: TeamMember[];
}

export function TeamGrid({ members = defaultTeamMembers }: TeamGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 w-full">
      {members.map((member) => (
        <TeamCard key={member.id} member={member} />
      ))}
    </div>
  );
}
