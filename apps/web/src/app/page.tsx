import {
  HeroSection,
  CloudControlPanelSection,
  HostingPlanSection,
  ReviewsSection,
  ServicesSection,
  PricingSection,
  FaqSection,
  TechfarmSection
} from "@/components/home";

export default function HomePage() {
  return (
    <main className="w-full flex flex-col bg-background overflow-hidden">
      {/* 1. Hero Banner with Domain Search & Server Graphics */}
      <HeroSection />

      {/* 2. Cloud Server Control Panel Tailored for WordPress */}
      <CloudControlPanelSection />

      {/* 3. Hosting Plans & Pricing Carousel/Grid */}
      <HostingPlanSection />

      {/* 4. Client Reviews & Partner Logos */}
      <ReviewsSection />

      {/* 5. Our Services & Key Statistics */}
      <ServicesSection />

      {/* 6. Pricing Plans */}
      <PricingSection />

      {/* 7. Common Inquiries & Frequently Asked Questions */}
      <FaqSection />

      {/* 8. Global Network & Community Map */}
      <TechfarmSection />
    </main>
  );
}
