import Link from "next/link";
import { Cloud, ShieldCheck, Headphones, Code2, BarChart3, Cpu, Zap, CheckCircle2 } from "lucide-react";
import {
  SectionHeading,
  IconFeatureCard,
  ProcessStep,
  DarkCtaBand
} from "@/components/widgets";
import { servicesData, processStepsData } from "@/data/techfirm-data";

export const metadata = {
  title: "Our Services — TechFirm IT Solutions",
  description: "Explore our comprehensive suite of enterprise Cloud Solutions, Cyber Security, Managed IT, and Software Engineering services."
};

export default function ServicesPage() {
  const iconMap: Record<string, React.ReactNode> = {
    Cloud: <Cloud className="w-6 h-6" />,
    ShieldCheck: <ShieldCheck className="w-6 h-6" />,
    Headphones: <Headphones className="w-6 h-6" />,
    Code2: <Code2 className="w-6 h-6" />,
    BarChart3: <BarChart3 className="w-6 h-6" />,
    Cpu: <Cpu className="w-6 h-6" />
  };

  return (
    <div className="w-full flex flex-col bg-background">
      {/* 1. PAGE HEADER HERO */}
      <section className="relative bg-dark-bg text-white py-20 lg:py-24 border-b border-dark-border overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-4 border border-primary/30">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>End-To-End IT Excellence</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4 text-white">
            Our Technology Services
          </h1>

          <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6">
            From modern cloud architectures to zero-trust cybersecurity, we build and manage resilient systems that scale with your enterprise ambitions.
          </p>

          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-gray-400">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-primary">Our Services</span>
          </div>
        </div>
      </section>

      {/* 2. SERVICES 2x3 GRID */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading
            badge="Everything You Get"
            title="Tailored Solutions For Modern Enterprises"
            description="Explore our modular services designed to integrate smoothly into your business operations."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service) => {
              return (
                <div key={service.id} className="flex flex-col">
                  <IconFeatureCard
                    icon={iconMap[service.iconName] || <Cloud className="w-6 h-6" />}
                    title={service.title}
                    description={service.description}
                    href={`/services/${service.slug}`}
                    actionText="View Service Details"
                  />
                  <div className="mt-3 px-6 space-y-1.5">
                    {service.features.slice(0, 2).map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary-deep shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. WORK PROCESS (Frame 11 - 3-Step Section) */}
      <section className="py-20 bg-muted/40 border-t border-b border-border">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading
            badge="Our Working Process"
            title="Finished Task Follow The Work Process"
            description="A systematic, battle-tested execution framework that guarantees zero unexpected downtime and measurable ROI."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
      </section>

      {/* 4. VALUE PROPOSITION BANNER */}
      <section className="py-16 bg-dark-bg text-white border-b border-dark-border">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 max-w-6xl mx-auto">
            <div>
              <span className="text-xs uppercase font-extrabold text-primary tracking-wider">
                Need a Custom Service Package?
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold mt-1 text-white">
                Let Our Solutions Architects Design Your Roadmap
              </h3>
              <p className="text-sm text-gray-300 mt-2 max-w-xl">
                We analyze your existing stack and deliver a free architectural audit with concrete performance optimizations.
              </p>
            </div>

            <Link
              href="/contact"
              className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-extrabold text-sm hover:bg-primary-deep hover:text-white shrink-0 transition-colors shadow-lg"
            >
              Request Discovery Call
            </Link>
          </div>
        </div>
      </section>

      {/* 5. GLOBAL DARK CTA BAND */}
      <DarkCtaBand />
    </div>
  );
}
