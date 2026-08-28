import Link from "next/link";
import { Zap, Briefcase } from "lucide-react";
import {
  SectionHeading,
  TeamMemberCard,
  DarkCtaBand
} from "@/components/widgets";
import { teamMembersData } from "@/data/techfirm-data";

export const metadata = {
  title: "Our Team — TechFirm IT Solutions",
  description: "Meet the certified cloud architects, cybersecurity auditors, and senior software engineers powering TechFirm."
};

export default function TeamPage() {
  return (
    <div className="w-full flex flex-col bg-background">
      {/* 1. HERO HEADER */}
      <section className="relative bg-dark-bg text-white py-20 lg:py-24 border-b border-dark-border overflow-hidden">
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-4 border border-primary/30">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>World-Class Technology Leaders</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4 text-white">
            Meet Our Expert Team Members
          </h1>

          <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6">
            Our team consists of veteran solutions architects, DevOps specialists, and security analysts with decades of collective Fortune 500 experience.
          </p>

          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-gray-400">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-primary">Our Team</span>
          </div>
        </div>
      </section>

      {/* 2. 8-MEMBER TEAM GRID */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <SectionHeading
            badge="Our Team"
            title="Senior Architects & Engineers"
            description="Direct access to senior talent on every project. No middle management or junior outsourcing."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembersData.map((member) => (
              <TeamMemberCard
                key={member.name}
                name={member.name}
                role={member.role}
                slug={member.slug}
                bio={member.bio}
                imageUrl={member.imageUrl || member.avatar}
                socials={member.socials}
              />
            ))}
          </div>

          {/* 3. JOIN OUR TEAM BANNER */}
          <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-dark-bg text-white flex flex-col md:flex-row items-center justify-between gap-8 border border-dark-border shadow-xl">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shrink-0 shadow-md">
                <Briefcase className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Want to Join Our Engineering Pod?</h3>
                <p className="text-sm text-gray-300 mt-1 max-w-md">
                  We are continuously hiring senior cloud architects, DevOps pros, and security analysts globally.
                </p>
              </div>
            </div>

            <Link
              href="/contact?topic=careers"
              className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-extrabold text-sm hover:bg-primary-deep hover:text-white shrink-0 transition-colors shadow-lg"
            >
              Explore Open Roles
            </Link>
          </div>
        </div>
      </section>

      {/* 4. GLOBAL DARK CTA BAND */}
      <DarkCtaBand />
    </div>
  );
}
