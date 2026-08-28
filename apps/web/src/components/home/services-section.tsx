import Image, { StaticImageData } from "next/image";
import Link from "next/link";

import { Stat75kIcon, Stat98Icon, Stat2000Icon } from "@/assets/icons";
// Static image imports for service card graphics
import serviceImg3 from "@/assets/services/developer-firndly-768x615 1.png";
import serviceImg2 from "@/assets/services/Feature-Card-Footer 1.png";
import serviceImg1 from "@/assets/services/w=420 1.png";

import { Button } from "@/components/ui/button";
import { PillButton } from "@/components/ui/pill-button";
import { SectionHeader } from "@/components/widgets";

interface ServiceCardData {
  id: string;
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  buttonTextColor: string;
  image: StaticImageData;
  bgColor: string;
  borderColor: string;
}

const serviceCards: ServiceCardData[] = [
  {
    id: "conversions",
    title: "Monitor & analyze conversions effectively",
    description:
      "Monitoring and analyzing conversions effectively is essential for understanding how users interact.",
    buttonText: "Read More →",
    buttonHref: "#",
    buttonTextColor: "text-[#E64D4D]",
    image: serviceImg1,
    bgColor: "bg-[#FFF8F3]",
    borderColor: "border-[#FBE6D6]"
  },
  {
    id: "analytics",
    title: "Instantaneous data insights and analytics",
    description:
      "Instantaneous data insights and analytics refer to the real-time processing and interpretation of data.",
    buttonText: "Read More →",
    buttonHref: "#",
    buttonTextColor: "text-[#35A3FF]",
    image: serviceImg2,
    bgColor: "bg-[#F0F9FF]",
    borderColor: "border-[#E0F2FE]"
  },
  {
    id: "strategy",
    title: "Sales strategy and management techniques",
    description:
      "Sales strategy and management techniques are essential components for driving business growth and achieving revenue targets.",
    buttonText: "Read More →",
    buttonHref: "#",
    buttonTextColor: "text-[#4018C5]",
    image: serviceImg3,
    bgColor: "bg-[#F5F3FF]",
    borderColor: "border-[#EDE9FE]"
  }
];

export function ServicesSection() {
  return (
    <section className="relative w-full overflow-hidden bg-white py-20 lg:py-28">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header with Right CTA Button */}
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between lg:mb-16">
          <SectionHeader
            align="left"
            badge="OUR SERVICES"
            title="Monitor & analyze conversions effectively"
            className="max-w-2xl"
          />

          <div className="shrink-0 pb-1">
            <PillButton href="#services" variant="primary" size="lg">
              View All Services
            </PillButton>
          </div>
        </div>

        {/* 3 Service Feature Cards Grid */}
        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3 lg:gap-8">
          {serviceCards.map((card) => (
            <div
              key={card.id}
              className={`flex h-full flex-col justify-between rounded-xl border p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl sm:p-9 ${card.bgColor} ${card.borderColor}`}
            >
              {/* Card Header & Content */}
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <h3 className="mb-3 min-h-[56px] text-xl leading-snug font-bold tracking-tight text-[#141432] sm:min-h-[64px] sm:text-2xl">
                    {card.title}
                  </h3>
                  <p className="mb-6 min-h-[60px] text-sm leading-relaxed font-medium text-[#5C5C5C] sm:min-h-[72px]">
                    {card.description}
                  </p>
                </div>
                <Button
                  variant="white"
                  size="pill-sm"
                  className={`w-full rounded-full px-5 py-2 text-xs font-bold ${card.buttonTextColor} shadow-xs transition-all hover:shadow-md`}
                  asChild
                >
                  <Link href={card.buttonHref}>{card.buttonText}</Link>
                </Button>
              </div>

              {/* Card Graphic/Image */}
              <div className="relative mt-8 flex h-[200px] shrink-0 items-center justify-center overflow-hidden rounded-xl">
                <Image
                  src={card.image}
                  alt={card.title}
                  className="h-[200px] w-full object-fill drop-shadow-sm transition-transform duration-500 hover:scale-105"
                  priority={card.id === "conversions"}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Statistics / Metrics Row */}
        <div className="mt-16 pt-14 lg:pt-18">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:gap-14">
            {/* Stat 1: 98% */}
            <div className="flex flex-col items-start">
              <div className="mb-5 flex h-14 items-center sm:h-16">
                <Stat98Icon className="h-14 w-auto sm:h-16" />
              </div>
              <h4 className="mb-2 w-full border-t border-[#EDE8F5] pt-4 text-lg font-bold tracking-tight text-[#141432] sm:text-xl">
                Client Satisfaction
              </h4>
              <p className="max-w-xs text-xs leading-relaxed font-medium text-[#737373] sm:text-sm">
                Attention, we take out our round glasses and our sweater with elbow patches.
              </p>
            </div>

            {/* Stat 2: 2,000+ */}
            <div className="flex flex-col items-start">
              <div className="mb-5 flex h-14 items-center sm:h-16">
                <Stat2000Icon className="h-14 w-auto text-[#864FFE] sm:h-16" />
              </div>
              <h4 className="mb-2 w-full border-t border-[#EDE8F5] pt-4 text-lg font-bold tracking-tight text-[#141432] sm:text-xl">
                Conversion Rate
              </h4>
              <p className="max-w-xs text-xs leading-relaxed font-medium text-[#737373] sm:text-sm">
                Attention, we take out our round glasses and our sweater with elbow patches.
              </p>
            </div>

            {/* Stat 3: $75000+ */}
            <div className="flex flex-col items-start">
              <div className="mb-5 flex h-14 items-center sm:h-16">
                <Stat75kIcon className="h-14 w-auto sm:h-16" />
              </div>
              <h4 className="mb-2 w-full border-t border-[#EDE8F5] pt-4 text-lg font-bold tracking-tight text-[#141432] sm:text-xl">
                Revenue Growth
              </h4>
              <p className="max-w-xs text-xs leading-relaxed font-medium text-[#737373] sm:text-sm">
                Attention, we take out our round glasses and our sweater with elbow patches.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
