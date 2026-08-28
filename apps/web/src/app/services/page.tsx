import Image from "next/image";
import { SectionHeader } from "@/components/widgets";
import {
  ServiceFeaturesGrid,
  ServiceWorkProcess
} from "@/components/services";
import heroImg from "@/assets/service-solution/hero-img.png";

export const metadata = {
  title: "Services & Solutions — TechFirm",
  description:
    "Explore TechFirm's comprehensive suite of cloud computing, IT management, cybersecurity, and enterprise consulting solutions."
};

export default function ServicesPage() {
  return (
    <main className="w-full bg-white py-14 sm:py-20 lg:py-24">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. Header Section */}
        <SectionHeader
          align="center"
          badge="OUR SERVICES"
          title="Services & Solutions"
          className="mb-8 sm:mb-12"
        />

        {/* 2. Hero Feature Image */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden shadow-lg border border-[#EDE8F5] mb-8 bg-neutral-100">
          <Image
            src={heroImg}
            alt="Services & Solutions Team"
            fill
            priority
            sizes="(max-width: 1440px) 100vw, 1280px"
            className="object-cover object-center"
          />
        </div>

        {/* 3. Everything You Get With Techfirm Features Grid */}
        <ServiceFeaturesGrid />
      </div>

      {/* 4. Finished Task Follow The Work Process Section */}
      <ServiceWorkProcess />
    </main>
  );
}
