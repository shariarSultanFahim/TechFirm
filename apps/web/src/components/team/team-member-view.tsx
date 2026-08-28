import Image from "next/image";
import Link from "next/link";

import { ArrowRight, Facebook, Github, Linkedin, Twitter } from "lucide-react";

import { ITeamMember } from "@repo/types";

import { SectionHeader } from "@/components/widgets";

import type { TeamMemberDetails } from "./team-data";

interface TeamMemberViewProps {
  member: TeamMemberDetails | ITeamMember;
}

export function TeamMemberView({ member }: TeamMemberViewProps) {
  // Normalize fields between static TeamMemberDetails and dynamic ITeamMember
  const name = member.name;
  const role = member.role;
  const badgeRole = ("badgeRole" in member && member.badgeRole) || role.toUpperCase();
  const photoUrl =
    ("photo" in member && member.photo) ||
    ("image" in member && member.image) ||
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800";
  const bio =
    member.bio ||
    "Over 15 years leading enterprise cloud transformations, Kubernetes cluster deployments, and hybrid cloud migrations.";
  const experienceYears =
    ("experience" in member && member.experience) ||
    ("experienceYears" in member && member.experienceYears) ||
    "10+ Years";
  const email = member.email || "info@techfirm.com";
  const phone = member.phone || "+1 (555) 019-2834";
  const signatureName = ("signatureName" in member && member.signatureName) || name;

  const socialLinks =
    ("socialLinks" in member && member.socialLinks) ||
    ("socials" in member && member.socials) ||
    {};

  const competencies = ("competencies" in member && member.competencies) || [
    "Cloud Architecture",
    "Kubernetes Deployments",
    "DevOps Automation",
    "Zero Trust Security",
    "High Availability",
    "Data Engineering"
  ];

  const rawSkills = ("skills" in member && member.skills) || [];
  const skillsList = Array.isArray(rawSkills)
    ? rawSkills.map((s, idx) => {
        if (typeof s === "string") {
          return { name: s, percentage: 85 - idx * 5 };
        }
        return s;
      })
    : [];

  return (
    <div className="w-full bg-white py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Reusable Section Header */}
        <SectionHeader align="center" badge={badgeRole} title={name} className="mb-12 sm:mb-16" />

        {/* 1. Main Profile Row (Photo + About Me) */}
        <div className="mb-16 grid grid-cols-1 items-center gap-10 sm:mb-20 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Portrait Photo */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-[#EDE8F5] bg-neutral-100 shadow-lg">
              <Image
                src={photoUrl}
                alt={name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center"
                unoptimized
              />
            </div>
          </div>

          {/* Right Column: Bio & Core Info */}
          <div className="flex flex-col justify-center lg:col-span-7">
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-[#141432] sm:text-3xl">
              About Me
            </h2>

            <p className="mb-6 text-xs leading-relaxed font-medium text-[#5C5C6E] sm:text-sm">
              {bio}
            </p>

            {/* 2-Column Competencies Box */}
            <div className="mb-6 grid grid-cols-1 gap-3 rounded-2xl border border-[#EDE8F5] bg-[#F9FAFB] p-5 sm:grid-cols-2 sm:p-6">
              {competencies.map((comp) => (
                <div
                  key={comp}
                  className="flex items-center gap-2.5 text-xs font-semibold text-[#141432] sm:text-sm"
                >
                  <div className="bg-primary/15 text-primary flex h-4 w-4 shrink-0 items-center justify-center rounded-full">
                    <ArrowRight className="h-2.5 w-2.5 stroke-[3]" />
                  </div>
                  <span>{comp}</span>
                </div>
              ))}
            </div>

            {/* Contact Metadata & Signature */}
            <div className="mb-6 flex flex-col justify-between gap-6 border-t border-[#EDE8F5] pt-5 sm:flex-row sm:items-center">
              <div className="space-y-1.5 text-xs sm:text-sm">
                <div>
                  <span className="font-bold text-[#141432]">Experience:</span>{" "}
                  <span className="font-medium text-[#5C5C6E]">{experienceYears}</span>
                </div>
                <div>
                  <span className="font-bold text-[#141432]">Email:</span>{" "}
                  <a
                    href={`mailto:${email}`}
                    className="hover:text-primary font-medium text-[#5C5C6E] transition-colors"
                  >
                    {email}
                  </a>
                </div>
                <div>
                  <span className="font-bold text-[#141432]">Phone:</span>{" "}
                  <a
                    href={`tel:${phone}`}
                    className="hover:text-primary font-medium text-[#5C5C6E] transition-colors"
                  >
                    {phone}
                  </a>
                </div>
              </div>

              {signatureName && (
                <div className="text-primary drop-shadow-2xs font-serif text-2xl tracking-wide italic select-none sm:text-3xl">
                  {signatureName}
                </div>
              )}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              {"linkedin" in socialLinks && socialLinks.linkedin && (
                <Link
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:bg-primary flex h-9 w-9 items-center justify-center rounded-full bg-[#F3F4F6] text-[#141432] shadow-2xs transition-colors hover:text-white"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </Link>
              )}
              {"twitter" in socialLinks && socialLinks.twitter && (
                <Link
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:bg-primary flex h-9 w-9 items-center justify-center rounded-full bg-[#F3F4F6] text-[#141432] shadow-2xs transition-colors hover:text-white"
                  aria-label="Twitter / X"
                >
                  <Twitter className="h-4 w-4" />
                </Link>
              )}
              {"github" in socialLinks && socialLinks.github && (
                <Link
                  href={socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:bg-primary flex h-9 w-9 items-center justify-center rounded-full bg-[#F3F4F6] text-[#141432] shadow-2xs transition-colors hover:text-white"
                  aria-label="GitHub"
                >
                  <Github className="h-4 w-4" />
                </Link>
              )}
              {"facebook" in socialLinks && socialLinks.facebook && (
                <Link
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:bg-primary flex h-9 w-9 items-center justify-center rounded-full bg-[#F3F4F6] text-[#141432] shadow-2xs transition-colors hover:text-white"
                  aria-label="Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* 2. Bottom Row Cards (Skills + Experience) */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Card: Skills */}
          <div className="flex flex-col justify-between rounded-3xl border border-[#EDE8F5] bg-[#F9FAFB] p-6 shadow-xs sm:p-8 lg:col-span-6">
            <div>
              <h3 className="mb-6 text-xl font-bold tracking-tight text-[#141432] sm:text-2xl">
                Technical Expertise & Skills
              </h3>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
                {skillsList.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="text-2xl font-extrabold text-[#141432] sm:text-3xl">
                      {skill.percentage}%
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#E5E7EB]">
                      <div
                        className="bg-primary h-full rounded-full transition-all duration-700"
                        style={{ width: `${skill.percentage}%` }}
                      />
                    </div>
                    <div className="text-xs font-semibold text-[#5C5C6E]">{skill.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Card: Professional Experience */}
          <div className="rounded-3xl border border-[#EDE8F5] bg-[#F9FAFB] p-6 shadow-xs sm:p-8 lg:col-span-6">
            <h3 className="mb-4 text-xl font-bold tracking-tight text-[#141432] sm:text-2xl">
              Leadership & Delivery Experience
            </h3>

            <div className="space-y-4 text-xs leading-relaxed font-normal text-[#5C5C6E] sm:text-sm">
              <p>
                Leading cross-functional engineering pods to deliver mission-critical software
                architectures, continuous integration pipelines, and secure cloud environments for
                Fortune 500 enterprises.
              </p>
              <p>
                Spearheading automated vulnerability testing, zero-downtime microservice migrations,
                and multi-region failover protocols with strict 99.99% uptime guarantees.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
