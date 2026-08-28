import {
  HeroSection,
  CloudControlPanelSection,
  HostingPlanSection
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
    </main>
  );
}
