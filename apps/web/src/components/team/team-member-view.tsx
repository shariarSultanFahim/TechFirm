import Image from "next/image";
import Link from "next/link";
import { Facebook, Twitter, Globe, Instagram, ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/widgets";
import type { TeamMemberDetails } from "./team-data";

interface TeamMemberViewProps {
  member: TeamMemberDetails;
}

export function TeamMemberView({ member }: TeamMemberViewProps) {
  return (
    <div className="w-full bg-white py-16 sm:py-20 lg:py-24">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Reusable Section Header with landing page theming */}
        <SectionHeader
          align="center"
          badge={member.badgeRole || member.role.toUpperCase()}
          title={member.name}
          className="mb-12 sm:mb-16"
        />

        {/* 1. Main Profile Row (Photo + About Me) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16 sm:mb-20">
          {/* Left Column: Portrait Photo */}
          <div className="lg:col-span-5">
            <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-lg border border-[#EDE8F5] bg-neutral-100">
              <Image
                src={member.image}
                alt={member.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Right Column: Bio & Core Info */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#141432] tracking-tight mb-4">
              About Me
            </h2>

            <p className="text-xs sm:text-sm text-[#5C5C6E] leading-relaxed mb-6 font-medium">
              {member.bio}
            </p>

            {/* 2-Column Competencies Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-5 sm:p-6 rounded-2xl bg-[#F9FAFB] border border-[#EDE8F5] mb-6">
              {member.competencies.map((comp) => (
                <div key={comp} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#141432]">
                  <div className="w-4 h-4 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0">
                    <ArrowRight className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>{comp}</span>
                </div>
              ))}
            </div>

            {/* Contact Metadata & Signature */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-5 border-t border-[#EDE8F5] mb-6">
              <div className="space-y-1.5 text-xs sm:text-sm">
                <div>
                  <span className="font-bold text-[#141432]">Experience:</span>{" "}
                  <span className="text-[#5C5C6E] font-medium">{member.experienceYears}</span>
                </div>
                <div>
                  <span className="font-bold text-[#141432]">Email:</span>{" "}
                  <a href={`mailto:${member.email}`} className="text-[#5C5C6E] hover:text-primary transition-colors font-medium">
                    {member.email}
                  </a>
                </div>
                <div>
                  <span className="font-bold text-[#141432]">Phone:</span>{" "}
                  <a href={`tel:${member.phone}`} className="text-[#5C5C6E] hover:text-primary transition-colors font-medium">
                    {member.phone}
                  </a>
                </div>
              </div>

              {member.signatureName && (
                <div className="font-serif italic text-2xl sm:text-3xl text-primary tracking-wide select-none drop-shadow-2xs">
                  {member.signatureName}
                </div>
              )}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <Link
                href={member.socials?.facebook || "#"}
                className="w-9 h-9 rounded-full bg-[#F3F4F6] hover:bg-primary hover:text-white text-[#141432] flex items-center justify-center transition-colors shadow-2xs"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </Link>
              <Link
                href={member.socials?.twitter || "#"}
                className="w-9 h-9 rounded-full bg-[#F3F4F6] hover:bg-primary hover:text-white text-[#141432] flex items-center justify-center transition-colors shadow-2xs"
                aria-label="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </Link>
              <Link
                href={member.socials?.globe || "#"}
                className="w-9 h-9 rounded-full bg-[#F3F4F6] hover:bg-primary hover:text-white text-[#141432] flex items-center justify-center transition-colors shadow-2xs"
                aria-label="Website"
              >
                <Globe className="w-4 h-4" />
              </Link>
              <Link
                href={member.socials?.instagram || "#"}
                className="w-9 h-9 rounded-full bg-[#F3F4F6] hover:bg-primary hover:text-white text-[#141432] flex items-center justify-center transition-colors shadow-2xs"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* 2. Bottom Row Cards (Skills + Experience) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Card: Volunteer / Professional Skills */}
          <div className="lg:col-span-6 rounded-3xl bg-[#F9FAFB] p-6 sm:p-8 border border-[#EDE8F5] shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#141432] mb-6 tracking-tight">
                Volunteer Skills
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                {member.skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="text-2xl sm:text-3xl font-extrabold text-[#141432]">
                      {skill.percentage}%
                    </div>
                    <div className="h-1.5 w-full bg-[#E5E7EB] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-700"
                        style={{ width: `${skill.percentage}%` }}
                      />
                    </div>
                    <div className="text-xs font-semibold text-[#5C5C6E]">
                      {skill.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Card: Volunteer / Professional Experience */}
          <div className="lg:col-span-6 rounded-3xl bg-[#F9FAFB] p-6 sm:p-8 border border-[#EDE8F5] shadow-xs">
            <h3 className="text-xl sm:text-2xl font-bold text-[#141432] mb-4 tracking-tight">
              Volunteer Experience
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-[#5C5C6E] leading-relaxed font-normal">
              {member.experienceDescription.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
