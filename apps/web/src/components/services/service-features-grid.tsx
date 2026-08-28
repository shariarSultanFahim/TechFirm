"use client";

import Link from "next/link";
import { SectionHeader } from "@/components/widgets";
import { FeatureIcon, CardTexture } from "./service-icons";

const features = [
  {
    id: "problem-resolutions",
    icon: "frame-0",
    title: "Problem Resolutions",
    description:
      "Affixed pretend account ten natural. Need eat week even yet that. Incommode."
  },
  {
    id: "data-analytics",
    icon: "frame-1",
    title: "Data Analytics",
    description:
      "Affixed pretend account ten natural. Need eat week even yet that. Incommode."
  },
  {
    id: "increase-income",
    icon: "frame-2",
    title: "Increase Income",
    description:
      "Affixed pretend account ten natural. Need eat week even yet that. Incommode."
  },
  {
    id: "analytics-options",
    icon: "frame-3",
    title: "Analytics options",
    description:
      "Affixed pretend account ten natural. Need eat week even yet that. Incommode."
  },
  {
    id: "generated-income",
    icon: "frame-4",
    title: "Generated Income",
    description:
      "Affixed pretend account ten natural. Need eat week even yet that. Incommode."
  },
  {
    id: "smart-integration",
    icon: "frame-5",
    title: "Smart Integration",
    description:
      "Affixed pretend account ten natural. Need eat week even yet that. Incommode."
  }
];

export function ServiceFeaturesGrid() {
  return (
    <section className="w-full py-16 sm:py-20 lg:py-24">
      {/* Header */}
      <SectionHeader
        align="center"
        badge="ACHIEVE RESULTS"
        title="Everything You Get With Techfirm"
        description="Superior Space offers a seamless design experience that accelerates."
        className="mb-12 sm:mb-16"
      />

      {/* 6 Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {features.map((feature) => (
          <Link
            key={feature.id}
            href={`/services/${feature.id}`}
            className="relative rounded-3xl bg-white p-8 sm:p-9 border border-[#EDE8F5] shadow-2xs hover:shadow-xl hover:border-primary/40 transition-all duration-300 group overflow-hidden flex flex-col justify-between select-none min-h-[240px]"
          >
            {/* Top-Right Dotted Matrix Texture */}
            <div className="absolute top-0 right-0 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
              <CardTexture className="w-36 h-36" />
            </div>

            {/* Icon */}
            <div className="relative z-10 mb-8">
              <div className="w-12 h-12 flex items-center transition-transform duration-300 group-hover:scale-110">
                <FeatureIcon name={feature.icon} className="w-10 h-10 object-contain" />
              </div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-left">
              <h3 className="text-lg sm:text-xl font-bold text-[#141432] group-hover:text-primary transition-colors mb-3 leading-snug">
                {feature.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#5C5C6E] leading-relaxed font-medium">
                {feature.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
