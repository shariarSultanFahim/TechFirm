import { FaqSection, PricingSection } from "@/components/home";
import { TestimonialsBentoSection, TrustedCompanies } from "@/components/pricing";
import { SectionHeader } from "@/components/widgets";

export const metadata = {
  title: "Pricing Plans — TechFirm",
  description: "Explore transparent pricing tiers and flexible server hosting plans tailored for your business."
};

export default function PricingPage() {
  return (
    <main className="w-full bg-[#F9FAFB] py-14 sm:py-20 lg:py-24">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Reusable Section Header */}
        <SectionHeader
          align="center"
          badge="PRICING PLAN"
          title="Our pricing plan for customer"
          className="mb-8 sm:mb-12"
        />

        {/* Pricing Card Section with Globe Background & Monthly/Annual Switcher */}
        <div className="rounded-3xl border border-[#EDE8F5] shadow-xs overflow-hidden bg-white">
          <PricingSection />
        </div>

        {/* Trusted By Industry Leaders Logo Bar */}
        <TrustedCompanies />

        {/* What People Say About Us Bento Grid */}
        <TestimonialsBentoSection />

        {/* FAQ */}
        <FaqSection bgColor="#F9FAFB" />
      </div>
    </main>
  );
}
