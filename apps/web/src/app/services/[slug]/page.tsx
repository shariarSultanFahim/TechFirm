import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CheckCircle2,
  Download,
  Phone,
  Zap,
  ArrowRight
} from "lucide-react";
import {
  ProcessStep,
  FaqAccordionItem,
  DarkCtaBand
} from "@/components/widgets";
import { servicesData, processStepsData, faqsData } from "@/data/techfirm-data";
import { siteConfig } from "@/config/site";

export function generateStaticParams() {
  return servicesData.map((s) => ({ slug: s.slug }));
}

export default async function ServiceDetailsPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug) || servicesData[0];

  if (!service) {
    notFound();
  }

  return (
    <div className="w-full flex flex-col bg-background">
      {/* 1. HERO HEADER */}
      <section className="relative bg-dark-bg text-white py-20 lg:py-24 border-b border-dark-border overflow-hidden">
        <div className="absolute top-0 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-4 border border-primary/30">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Service Architecture Breakdown</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4 text-white">
            {service.title}
          </h1>

          <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6">
            {service.description}
          </p>

          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-gray-400">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <span>/</span>
            <span className="text-primary">{service.title}</span>
          </div>
        </div>
      </section>

      {/* 2. MAIN 2-COLUMN LAYOUT */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Content Area (8 Cols) */}
            <div className="lg:col-span-8 space-y-10">
              <div>
                <span className="text-xs uppercase font-extrabold text-primary-deep tracking-wider">
                  Overview &amp; Approach
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mt-1 mb-4">
                  Eliminating Technical Bottlenecks with High-Availability Architecture
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {service.fullContent}
                </p>
              </div>

              {/* Key Features Grid */}
              <div className="p-8 rounded-3xl bg-muted/40 border border-border">
                <h3 className="text-xl font-bold text-foreground mb-6">
                  What&apos;s Included In This Service
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-card p-4 rounded-xl border border-border shadow-xs">
                      <CheckCircle2 className="w-5 h-5 text-primary-deep shrink-0 mt-0.5" />
                      <span className="text-sm font-semibold text-foreground">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Working Process */}
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6">
                  Implementation Workflow
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {processStepsData.map((step) => (
                    <ProcessStep
                      key={step.stepNumber}
                      number={step.stepNumber}
                      title={step.title}
                      description={step.description}
                    />
                  ))}
                </div>
              </div>

              {/* FAQ */}
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6">
                  Service FAQs
                </h3>
                <div className="space-y-4">
                  {faqsData.slice(0, 3).map((faq, idx) => (
                    <FaqAccordionItem
                      key={faq.id}
                      question={faq.question}
                      answer={faq.answer}
                      isOpen={idx === 0}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar (4 Cols) */}
            <div className="lg:col-span-4 space-y-8">
              {/* Category List */}
              <div className="p-6 rounded-3xl bg-card border border-border shadow-xs">
                <h4 className="text-base font-bold text-foreground mb-4">
                  All Services
                </h4>
                <div className="space-y-1">
                  {servicesData.map((item) => (
                    <Link
                      key={item.id}
                      href={`/services/${item.slug}`}
                      className={`flex items-center justify-between p-3 rounded-xl text-xs sm:text-sm font-bold transition-colors ${
                        item.slug === service.slug
                          ? "bg-dark-bg text-white"
                          : "text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      <span>{item.title}</span>
                      <ArrowRight className="w-4 h-4 text-primary" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Download Brochure Card */}
              <div className="p-6 rounded-3xl bg-dark-bg text-white border border-dark-border shadow-xl">
                <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary flex items-center justify-center mb-4 border border-primary/30">
                  <Download className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white">Service Blueprint PDF</h4>
                <p className="text-xs text-gray-400 mt-1 mb-6 leading-relaxed">
                  Download our full technical documentation, SLA terms, and pricing matrices.
                </p>
                <a
                  href="/contact"
                  className="block text-center w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold text-xs hover:bg-primary-deep hover:text-white transition-colors"
                >
                  Download Brochure (PDF)
                </a>
              </div>

              {/* Direct Help Widget */}
              <div className="p-6 rounded-3xl bg-accent border border-accent-foreground/20">
                <h4 className="text-base font-bold text-accent-foreground mb-2">
                  Need Emergency Assistance?
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                  Speak directly with an on-call senior solutions architect now.
                </p>
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="flex items-center gap-2 font-extrabold text-sm text-foreground hover:text-primary-deep"
                >
                  <Phone className="w-4 h-4 text-primary-deep" />
                  <span>{siteConfig.contact.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. GLOBAL DARK CTA BAND */}
      <DarkCtaBand />
    </div>
  );
}
