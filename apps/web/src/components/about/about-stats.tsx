"use client";

import { StarBadge1, StarBadge2, StarBadge3, StarBadge4 } from "./about-icons";

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
    <section className="mb-16 w-full py-8 sm:mb-24 sm:py-12">
      <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;
          if (item.isFeatured) {
            return (
              <div
                key={item.id}
                className="group relative flex min-h-[260px] flex-col items-center justify-between rounded-3xl border-2 border-dashed border-white/20 bg-[#0B1528] p-8 text-center text-white shadow-xl transition-all duration-300 select-none hover:shadow-2xl"
              >
                {/* Purple Star Badge Icon */}
                <div className="mb-6 flex h-16 w-16 items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-14 w-14 object-contain" />
                </div>

                <div className="space-y-1">
                  <div className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                    {item.value}
                  </div>
                  <div className="text-xs font-semibold text-white/80 sm:text-sm">{item.label}</div>
                </div>
              </div>
            );
          }

          return (
            <div
              key={item.id}
              className="hover:border-primary/40 group relative flex min-h-[260px] flex-col items-center justify-between rounded-3xl border-2 border-dashed border-[#D9E2EC] bg-white p-8 text-center shadow-2xs transition-all duration-300 select-none hover:shadow-xl"
            >
              {/* Purple Star Badge Icon */}
              <div className="mb-6 flex h-16 w-16 items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <Icon className="h-14 w-14 object-contain" />
              </div>

              <div className="space-y-1">
                <div className="group-hover:text-primary text-3xl font-extrabold tracking-tight text-[#141432] transition-colors sm:text-4xl">
                  {item.value}
                </div>
                <div className="text-xs font-semibold text-[#5C5C6E] sm:text-sm">{item.label}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
