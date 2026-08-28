import {
  ContactForm,
  ContactInfoCards,
  ContactLocationCard
} from "@/components/contact";
import { FaqSection } from "@/components/home";
import { SectionHeader } from "@/components/widgets";

export const metadata = {
  title: "Contact Us — TechFirm Cloud Solutions",
  description: "Get in touch with TechFirm for cloud hosting, zero-trust security audits, and 24/7 managed infrastructure support."
};

export default function ContactPage() {
  return (
    <main className="w-full bg-[#F9FAFB] py-14 sm:py-20 lg:py-24">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Reusable Section Header with Landing Page Theming */}
        <SectionHeader
          align="center"
          badge="GET IN TOUCH"
          title="Let's build something extraordinary together"
          description="Have questions about our cloud infrastructure, cybersecurity services, or custom enterprise architecture? We are ready to help."
          className="mb-12 sm:mb-16 max-w-2xl"
        />

        {/* 3 Contact Method Cards */}
        <ContactInfoCards />

        {/* Form + Location / SLA Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16 sm:mb-20">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
          <div className="lg:col-span-5">
            <ContactLocationCard />
          </div>
        </div>

        {/* Common Inquiries & FAQ */}
        <FaqSection bgColor="#F9FAFB" />
      </div>
    </main>
  );
}
