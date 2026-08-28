import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Mail,
  Phone,
  Zap
} from "lucide-react";
import { DarkCtaBand } from "@/components/widgets";
import { teamMembersData } from "@/data/techfirm-data";
import { siteConfig } from "@/config/site";

export function generateStaticParams() {
  return teamMembersData.map((m) => ({ slug: m.slug }));
}

export default async function TeamMemberDetailsPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const member = teamMembersData.find((m) => m.slug === slug) || teamMembersData[0];

  if (!member) {
    notFound();
  }

  const skills = [
    { name: "Cloud Architecture & Kubernetes", level: 95 },
    { name: "Zero-Trust Cybersecurity & Compliance", level: 90 },
    { name: "DevOps & CI/CD Pipeline Automation", level: 88 },
    { name: "Enterprise IT Consulting & Roadmapping", level: 92 }
  ];

  return (
    <div className="w-full flex flex-col bg-background">
      {/* 1. HERO HEADER */}
      <section className="relative bg-dark-bg text-white py-20 lg:py-24 border-b border-dark-border">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-4 border border-primary/30">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Senior Leadership Profile</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-2 text-white">
            {member.name}
          </h1>

          <p className="text-base text-primary font-bold tracking-wide uppercase mb-6">
            {member.role}
          </p>

          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-gray-400">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/team" className="hover:text-white transition-colors">Our Team</Link>
            <span>/</span>
            <span className="text-primary">{member.name}</span>
          </div>
        </div>
      </section>

      {/* 2. PROFILE & BIO SECTION */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Photo & Contact Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative w-full h-[420px] rounded-3xl overflow-hidden shadow-xl border border-border bg-muted">
                <Image
                  src={member.photo || member.imageUrl || member.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400"}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6 rounded-2xl bg-muted/40 border border-border space-y-4">
                <h4 className="text-sm font-bold text-foreground uppercase tracking-wider">
                  Direct Contact
                </h4>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-primary-deep" />
                  <a href={`mailto:${member.email}`} className="text-foreground hover:text-primary-deep font-semibold">
                    {member.email}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-primary-deep" />
                  <a href={`tel:${siteConfig.contact.phone}`} className="text-foreground hover:text-primary-deep font-semibold">
                    {siteConfig.contact.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Right Bio & Skills */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <span className="text-xs uppercase font-extrabold text-primary-deep tracking-wider">
                  Biography &amp; Expertise
                </span>
                <h2 className="text-3xl font-extrabold text-foreground mt-1 mb-4">
                  About {member.name}
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {member.bio}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mt-4">
                  With deep hands-on expertise in hybrid cloud orchestration, zero-trust architectures, and enterprise reliability engineering, {member.name} spearheads strategic initiatives across our global client portfolio.
                </p>
              </div>

              {/* Skill Bars */}
              <div className="space-y-4 pt-4 border-t border-border">
                <h3 className="text-lg font-bold text-foreground">Core Competencies</h3>
                {skills.map((skill) => (
                  <div key={skill.name} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold text-foreground">
                      <span>{skill.name}</span>
                      <span className="font-mono">{skill.level}%</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-linear-to-r from-primary-deep to-primary rounded-full transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-dark-bg text-white font-bold text-sm hover:bg-primary hover:text-primary-foreground transition-colors shadow-md"
                >
                  <span>Book A Consultation with {member.name.split(" ")[0]}</span>
                  <Zap className="w-4 h-4 text-primary" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. GLOBAL DARK CTA BAND */}
      <DarkCtaBand />
    </div>
  );
}
