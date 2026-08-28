import { SectionHeader } from "@/components/widgets";
import { PortfolioGrid } from "@/components/portfolio";

export const metadata = {
  title: "Featured Case Studies & Portfolio — TechFirm",
  description: "Explore our recent client projects, enterprise cloud deployments, and technology transformation case studies."
};

export default function PortfolioPage() {
  return (
    <main className="w-full bg-white py-14 sm:py-20 lg:py-24">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Reusable Section Header with Landing Page Theming */}
        <SectionHeader
          align="center"
          badge="OUR CASE STUDIES"
          title="Featured case studies"
          className="mb-12 sm:mb-16"
        />

        {/* 4-Row Bento Case Studies Grid */}
        <PortfolioGrid />
      </div>
    </main>
  );
}
