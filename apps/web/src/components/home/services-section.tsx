import {
  CheckBadgeIcon,
  Stat2000Icon,
  Stat75kIcon,
  Stat98Icon
} from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/widgets";
import Image from "next/image";
import Link from "next/link";

// Static image imports for service card graphics
import serviceImg3 from "@/assets/services/developer-firndly-768x615 1.png";
import serviceImg2 from "@/assets/services/Feature-Card-Footer 1.png";
import serviceImg1 from "@/assets/services/w=420 1.png";

interface ServiceCardData {
  id: string;
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  image: any;
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
    image: serviceImg3,
    bgColor: "bg-[#F5F3FF]",
    borderColor: "border-[#EDE9FE]"
  }
];

export function ServicesSection() {
  return (
    <section className="relative w-full py-20 lg:py-28 overflow-hidden bg-white">
      <div className="container max-w-7xl mx-auto ">
        {/* Section Header with Right CTA Button */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 lg:mb-16">
          <SectionHeader
            align="left"
            badge="OUR SERVICES"
            title="Monitor & analyze conversions effectively"
            className="max-w-2xl"
          />

          <div className="shrink-0 pb-1">
            <Button
              variant="primary"
              size="pill-lg"
              className="gap-3 shadow-md hover:shadow-lg"
              asChild
            >
              <Link href="#services">
                <span>View All Services</span>
                <CheckBadgeIcon />
              </Link>
            </Button>
          </div>
        </div>

        {/* 3 Service Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {serviceCards.map((card) => (
            <div
              key={card.id}
              className={`flex flex-col justify-between rounded-xl p-7 sm:p-9 border transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 ${card.bgColor} ${card.borderColor}`}
            >
              {/* Card Header & Content */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#141432] leading-snug tracking-tight mb-3">
                  {card.title}
                </h3>
                <p className="text-sm text-[#5C5C5C] leading-relaxed mb-6 font-medium">
                  {card.description}
                </p>
                <Button
                  variant="white"
                  size="pill-sm"
                  className="rounded-full px-5 py-2 text-xs font-bold text-[#141432] hover:text-[#864FFE] shadow-xs hover:shadow-md"
                  asChild
                >
                  <Link href={card.buttonHref}>{card.buttonText}</Link>
                </Button>
              </div>

              {/* Card Graphic/Image */}
              <div className="relative mt-8 flex items-center justify-center overflow-hidden rounded-xl">
                <Image
                  src={card.image}
                  alt={card.title}
                  className="w-full h-[200px] object-fill drop-shadow-sm transition-transform duration-500 hover:scale-105"
                  priority={card.id === "conversions"}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Statistics / Metrics Row */}
        <div className="pt-14 lg:pt-18 mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
            {/* Stat 1: 98% */}
            <div className="flex flex-col items-start">
              <div className="mb-5 h-14 sm:h-16 flex items-center">
                <Stat98Icon className="h-14 sm:h-16 w-auto" />
              </div>
              <h4 className="border-t border-[#EDE8F5] w-full pt-4 text-lg sm:text-xl font-bold text-[#141432] mb-2 tracking-tight">
                Client Satisfaction
              </h4>
              <p className="text-xs sm:text-sm text-[#737373] leading-relaxed max-w-xs font-medium">
                Attention, we take out our round glasses and our sweater with elbow patches.
              </p>
            </div>

            {/* Stat 2: 2,000+ */}
            <div className="flex flex-col items-start">
              <div className="mb-5 h-14 sm:h-16 flex items-center">
                <Stat2000Icon className="h-14 sm:h-16 w-auto text-[#864FFE]" />
              </div>
              <h4 className="border-t border-[#EDE8F5] w-full pt-4  text-lg sm:text-xl font-bold text-[#141432] mb-2 tracking-tight">
                Conversion Rate
              </h4>
              <p className="text-xs sm:text-sm text-[#737373] leading-relaxed max-w-xs font-medium">
                Attention, we take out our round glasses and our sweater with elbow patches.
              </p>
            </div>

            {/* Stat 3: $75000+ */}
            <div className="flex flex-col items-start">
              <div className="mb-5 h-14 sm:h-16 flex items-center">
                <Stat75kIcon className="h-14 sm:h-16 w-auto" />
              </div>
              <h4 className="border-t border-[#EDE8F5] w-full pt-4  text-lg sm:text-xl font-bold text-[#141432] mb-2 tracking-tight">
                Revenue Growth
              </h4>
              <p className="text-xs sm:text-sm text-[#737373] leading-relaxed max-w-xs font-medium">
                Attention, we take out our round glasses and our sweater with elbow patches.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
