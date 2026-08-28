import Image from "next/image";
import Link from "next/link";

import { ITeamMember } from "@repo/types";

export type TeamMember = {
  id?: string;
  _id?: string;
  name: string;
  role: string;
  image?: string;
  photo?: string;
  slug?: string;
};

interface TeamCardProps {
  member: TeamMember | ITeamMember;
}

export function TeamCard({ member }: TeamCardProps) {
  const photoUrl =
    (member as ITeamMember).photo ||
    (member as TeamMember).image ||
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800";
  const slug =
    (member as ITeamMember).slug || member.id || (member as ITeamMember)._id || "michael-carter";

  return (
    <Link
      href={`/team/${slug}`}
      className="group relative block aspect-[4/5] w-full overflow-hidden rounded-2xl bg-neutral-900 shadow-xs transition-all duration-300 select-none hover:shadow-xl"
    >
      {/* Grayscale Portrait Image */}
      <Image
        src={photoUrl}
        alt={member.name}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="object-cover object-center contrast-110 grayscale transition-all duration-500 group-hover:scale-105 group-hover:contrast-100"
      />

      {/* Dark Vignette Gradient Overlay at Bottom */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

      {/* Member Details */}
      <div className="absolute right-0 bottom-0 left-0 z-10 flex flex-col justify-end p-5 text-left sm:p-6">
        <span className="mb-1 text-[11px] font-medium tracking-wide text-[#D1D5DB] sm:text-xs">
          {member.role}
        </span>
        <h3 className="group-hover:text-primary text-lg leading-snug font-bold tracking-tight text-white transition-colors sm:text-xl">
          {member.name}
        </h3>
      </div>
    </Link>
  );
}
