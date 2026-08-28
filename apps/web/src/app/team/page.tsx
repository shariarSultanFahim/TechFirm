import { SectionHeader } from "@/components/widgets";
import { TeamGrid } from "@/components/team";

export const metadata = {
  title: "Meet Our Team — TechFirm",
  description: "Meet our expert team members, cloud engineers, architects, and designers driving innovation at TechFirm."
};

export default function TeamPage() {
  return (
    <main className="w-full bg-white py-16 sm:py-20 lg:py-24">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionHeader
          align="center"
          badge="OUR TEAM MEMBERS"
          title="Meet our expert team members"
          className="mb-12 sm:mb-16"
        />

        {/* Team Members Grid */}
        <TeamGrid />
      </div>
    </main>
  );
}
