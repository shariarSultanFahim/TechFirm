import {
  AboutHero,
  AboutPortfolioSection,
  AboutProcess,
  AboutStats,
  AboutVideoSection
} from "@/components/about";
import { PricingSection, ReviewsSection } from "@/components/home";
import { SectionHeader } from "@/components/widgets";

export const metadata = {
  title: "About Us — TechFirm IT Solutions",
  description:
    "Learn about TechFirm's engineering philosophy, mission, and global cloud infrastructure services."
};

export default function AboutPage() {
  return (
    <main className="w-full bg-white py-14 sm:py-20 lg:py-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 1. Header Section */}
        <SectionHeader
          align="center"
          badge="ABOUT TECHFIRM"
          title="Dedicated to delivering excellence"
          className="mb-8 sm:mb-12"
        />

        {/* 2. About Company Overview Hero */}
        <AboutHero />

        {/* 3. Under Hero 4 Stats Numbers */}
        <AboutStats />

        {/* 4. How Techfirm Working Process */}
        <AboutProcess />

        {/* 5. Featured Portfolio Showcase */}
        <AboutPortfolioSection />
      </div>

      {/* 6. Review Section */}
      <ReviewsSection />

      {/* 7. Datacenter Video Section */}
      <AboutVideoSection />

      {/* 8. Pricing Plans */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <PricingSection />
      </div>
    </main>
  );
}
