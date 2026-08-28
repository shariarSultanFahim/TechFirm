import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import Link from "next/link";
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 w-full mb-12 sm:mb-16">
      {contactMethods.map((method) => {
        const Icon = method.icon;
        return (
          <Link
            key={method.title}
            href={method.href}
            target={method.href.startsWith("http") ? "_blank" : undefined}
            rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="rounded-3xl border border-[#EDE8F5] bg-white p-7 sm:p-8 shadow-xs hover:shadow-xl hover:border-primary/40 transition-all duration-300 group flex flex-col justify-between select-none"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div
                  className={`w-12 h-12 rounded-2xl ${method.iconBg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-2xs`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div className="w-8 h-8 rounded-full bg-[#F3F4F6] text-[#141432] group-hover:bg-primary group-hover:text-white flex items-center justify-center transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-[#141432] tracking-tight group-hover:text-primary transition-colors mb-2">
                {method.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#5C5C6E] leading-relaxed mb-6 font-medium">
                {method.description}
              </p>
            </div>

            <div className="pt-4 border-t border-[#EDE8F5]">
              <span className="text-sm sm:text-base font-bold text-primary tracking-tight">
                {method.contact}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
