import Image from "next/image";
import Link from "next/link";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
}

interface TeamCardProps {
  member: TeamMember;
}

export function TeamCard({ member }: TeamCardProps) {
  return (
    <Link
      href={`/team/${member.id}`}
      className="group relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-900 shadow-xs hover:shadow-xl transition-all duration-300 select-none block"
    >
      {/* Grayscale Portrait Image */}
      <Image
        src={member.image}
        alt={member.name}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="object-cover object-center grayscale contrast-110 group-hover:scale-105 group-hover:contrast-100 transition-all duration-500"
      />

      {/* Dark Vignette Gradient Overlay at Bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />

      {/* Member Details */}
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 z-10 flex flex-col justify-end text-left">
        <span className="text-[11px] sm:text-xs font-medium text-[#D1D5DB] tracking-wide mb-1">
          {member.role}
        </span>
        <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug group-hover:text-primary transition-colors">
          {member.name}
        </h3>
      </div>
    </Link>
  );
}
