"use client";

import Link from "next/link";

import { SectionHeader } from "@/components/widgets";

import { CardTexture, FeatureIcon } from "./service-icons";

const features = [
  {
    id: "problem-resolutions",
    icon: "frame-0",
    title: "Problem Resolutions",
    description: "Affixed pretend account ten natural. Need eat week even yet that. Incommode."
  },
  {
    id: "data-analytics",
    icon: "frame-1",
    title: "Data Analytics",
    description: "Affixed pretend account ten natural. Need eat week even yet that. Incommode."
  },
  {
    id: "increase-income",
    icon: "frame-2",
    title: "Increase Income",
    description: "Affixed pretend account ten natural. Need eat week even yet that. Incommode."
  },
  {
    id: "analytics-options",
    icon: "frame-3",
    title: "Analytics options",
    description: "Affixed pretend account ten natural. Need eat week even yet that. Incommode."
  },
  {
    id: "generated-income",
    icon: "frame-4",
    title: "Generated Income",
    description: "Affixed pretend account ten natural. Need eat week even yet that. Incommode."
  },
  {
    id: "smart-integration",
    icon: "frame-5",
    title: "Smart Integration",
    description: "Affixed pretend account ten natural. Need eat week even yet that. Incommode."
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
      <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Link
            key={feature.id}
            href={`/services/${feature.id}`}
            className="hover:border-primary/40 group relative flex min-h-[240px] flex-col justify-between overflow-hidden rounded-3xl border border-[#EDE8F5] bg-white p-8 shadow-2xs transition-all duration-300 select-none hover:shadow-xl sm:p-9"
          >
            {/* Top-Right Dotted Matrix Texture */}
            <div className="pointer-events-none absolute top-0 right-0 opacity-80 transition-opacity group-hover:opacity-100">
              <CardTexture className="h-36 w-36" />
            </div>

            {/* Icon */}
            <div className="relative z-10 mb-8">
              <div className="flex h-12 w-12 items-center transition-transform duration-300 group-hover:scale-110">
                <FeatureIcon name={feature.icon} className="h-10 w-10 object-contain" />
              </div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-left">
              <h3 className="group-hover:text-primary mb-3 text-lg leading-snug font-bold text-[#141432] transition-colors sm:text-xl">
                {feature.title}
              </h3>
              <p className="text-xs leading-relaxed font-medium text-[#5C5C6E] sm:text-sm">
                {feature.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
