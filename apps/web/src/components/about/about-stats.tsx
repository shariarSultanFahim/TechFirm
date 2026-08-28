"use client";

import {
  StarBadge1,
  StarBadge2,
  StarBadge3,
  StarBadge4
} from "./about-icons";

const stats = [
  {
    id: "happy-customers",
    icon: StarBadge1,
    value: "28K+",
    label: "Happy Customers",
    isFeatured: false
  },
  {
    id: "project-completed",
    icon: StarBadge2,
    value: "23k+",
    label: "Project Completed",
    isFeatured: false
  },
  {
    id: "business-growth",
    icon: StarBadge3,
    value: "86K+",
    label: "Business Growth",
    isFeatured: true
  },
  {
    id: "years-experience",
    icon: StarBadge4,
    value: "24+",
    label: "Years Experience",
    isFeatured: false
  }
];

export function AboutStats() {
  return (
    <section className="w-full py-8 sm:py-12 mb-16 sm:mb-24">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-stretch">
        {stats.map((item) => {
          const Icon = item.icon;
          if (item.isFeatured) {
            return (
              <div
                key={item.id}
                className="relative rounded-3xl p-8 bg-[#0B1528] text-white text-center shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-center justify-between select-none group border-2 border-dashed border-white/20 min-h-[260px]"
              >
                {/* Purple Star Badge Icon */}
                <div className="w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-14 h-14 object-contain" />
                </div>

                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    {item.value}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-white/80">
                    {item.label}
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div
              key={item.id}
              className="relative rounded-3xl p-8 bg-white text-center border-2 border-dashed border-[#D9E2EC] shadow-2xs hover:shadow-xl hover:border-primary/40 transition-all duration-300 flex flex-col items-center justify-between select-none group min-h-[260px]"
            >
              {/* Purple Star Badge Icon */}
              <div className="w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Icon className="w-14 h-14 object-contain" />
              </div>

              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold text-[#141432] group-hover:text-primary transition-colors tracking-tight">
                  {item.value}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-[#5C5C6E]">
                  {item.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
