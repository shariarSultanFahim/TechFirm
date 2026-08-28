import Link from "next/link";

import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

import { siteConfig } from "@/config/site";

const contactMethods = [
  {
    icon: Phone,
    title: "Call Directly",
    description: "Speak with our cloud infrastructure advisors Mon–Fri 8am–6pm.",
    contact: siteConfig.contact.phone,
    href: `tel:${siteConfig.contact.phone}`,
    iconBg: "bg-primary/10 text-primary"
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "Our engineering operations triage queries within 15 minutes.",
    contact: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
    iconBg: "bg-[#06B6D4]/10 text-[#0891B2]"
  },
  {
    icon: MapPin,
    title: "Headquarters",
    description: siteConfig.contact.address,
    contact: "Get Directions",
    href: "https://maps.google.com",
    iconBg: "bg-[#10B981]/10 text-[#059669]"
  }
];

export function ContactInfoCards() {
  return (
    <div className="mb-12 grid w-full grid-cols-1 gap-6 sm:mb-16 sm:gap-7 md:grid-cols-3">
      {contactMethods.map((method) => {
        const Icon = method.icon;
        return (
          <Link
            key={method.title}
            href={method.href}
            target={method.href.startsWith("http") ? "_blank" : undefined}
            rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="hover:border-primary/40 group flex flex-col justify-between rounded-3xl border border-[#EDE8F5] bg-white p-7 shadow-xs transition-all duration-300 select-none hover:shadow-xl sm:p-8"
          >
            <div>
              <div className="mb-6 flex items-center justify-between">
                <div
                  className={`h-12 w-12 rounded-2xl ${method.iconBg} flex items-center justify-center shadow-2xs transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <div className="group-hover:bg-primary flex h-8 w-8 items-center justify-center rounded-full bg-[#F3F4F6] text-[#141432] transition-colors group-hover:text-white">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>

              <h3 className="group-hover:text-primary mb-2 text-lg font-bold tracking-tight text-[#141432] transition-colors sm:text-xl">
                {method.title}
              </h3>
              <p className="mb-6 text-xs leading-relaxed font-medium text-[#5C5C6E] sm:text-sm">
                {method.description}
              </p>
            </div>

            <div className="border-t border-[#EDE8F5] pt-4">
              <span className="text-primary text-sm font-bold tracking-tight sm:text-base">
                {method.contact}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
