import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  Zap,
  Shield,
  ArrowRight
} from "lucide-react";
import {
  SectionHeading,
  StatCounter,
  ProcessStep,
  TestimonialCard,
  DarkCtaBand,
  CaseStudyCard
} from "@/components/widgets";
import {
  processStepsData,
  testimonialsData,
  caseStudiesData
} from "@/data/techfirm-data";

export const metadata = {
  title: "About Us — TechFirm IT Solutions",
  description: "Learn about TechFirm's history, engineering philosophy, global datacenter infrastructure, and client success stories."
};

export default function AboutPage() {
  return (
    <div className="w-full flex flex-col bg-background">
      {/* 1. HERO HEADER */}
      <section className="relative bg-dark-bg text-white py-20 lg:py-24 border-b border-dark-border overflow-hidden">
        <div className="absolute top-0 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-4 border border-primary/30">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Pioneering Resilient IT</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4 text-white">
            About TechFirm
          </h1>

          <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6">
            We are a team of certified cloud architects, cybersecurity specialists, and DevOps engineers dedicated to solving enterprise scale challenges.
          </p>

          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-gray-400">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-primary">About Us</span>
          </div>
        </div>
      </section>

      {/* 2. COMPANY STORY & MISSION */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 relative">
              <div className="relative w-full h-96 sm:h-[450px] rounded-3xl overflow-hidden shadow-2xl border border-border">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200"
                  alt="TechFirm Engineering Pod"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 p-6 rounded-2xl bg-dark-bg text-white shadow-2xl border border-dark-border hidden sm:flex items-center gap-4">
                <div className="text-3xl font-black text-primary font-mono">12+</div>
                <div className="text-xs text-gray-300 uppercase tracking-wider font-bold">
                  Years Of Enterprise<br />Excellence
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-bold uppercase tracking-wider">
                <Shield className="w-3.5 h-3.5 fill-current" />
                <span>Our Engineering Philosophy</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight">
                Architecting Resilient Futures For High-Velocity Businesses
              </h2>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Founded with the belief that technology should be an accelerator rather than a headache, TechFirm provides end-to-end cloud migrations, zero-trust cybersecurity, and around-the-clock infrastructure oversight.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary-deep shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground font-medium">
                    Continuous 24/7/365 proactive monitoring with automated incident response.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary-deep shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground font-medium">
                    Certified AWS, Azure, GCP, and Kubernetes architects assigned to each account.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary-deep shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground font-medium">
                    Financially backed 99.99% uptime and 15-minute critical SLA guarantees.
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/team"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-dark-bg text-white font-bold text-sm hover:bg-primary hover:text-primary-foreground transition-colors shadow-md"
                >
                  <span>Meet Our Leadership Team</span>
                  <ArrowRight className="w-4 h-4 text-primary" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE METRICS */}
      <section className="py-16 bg-muted/50 border-t border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCounter
              value="250+"
              label="Enterprise Deployments"
              description="Successfully delivered and maintained globally."
            />
            <StatCounter
              value="99.99%"
              label="Measured Uptime"
              description="Historical uptime across all managed cloud clusters."
              dark
            />
            <StatCounter
              value="45+"
              label="Certified Specialists"
              description="Cloud engineers, CISSP auditors, and architects."
            />
            <StatCounter
              value="15m"
              label="Incident Resolution SLA"
              description="Swift triage and resolution of critical alerts."
            />
          </div>
        </div>
      </section>

      {/* 4. WORKING PROCESS */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading
            badge="Our Process"
            title="How We Deliver Predictable Excellence"
            description="Every partnership follows a rigorous, phased roadmap ensuring zero business disruption."
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

      {/* 5. CASE STUDY HIGHLIGHT */}
      <section className="py-20 bg-muted/40 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading
            badge="Portfolio Preview"
            title="Recent Client Transformations"
            description="Discover how we help technology leaders elevate performance and security."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {caseStudiesData.map((cs) => (
              <CaseStudyCard
                key={cs.slug}
                title={cs.title}
                category={cs.category}
                client={cs.client || ""}
                slug={cs.slug}
                imageUrl={cs.image || cs.imageUrl}
                summary={cs.excerpt || cs.summary || ""}
                metrics={cs.metrics}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <SectionHeading
            badge="Testimonials"
            title="What Technology Executives Say"
            description="Real endorsements from engineering leaders who rely on TechFirm."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonialsData.map((test) => (
              <TestimonialCard
                key={test.id || test.name}
                quote={test.content || test.quote || ""}
                author={test.name || test.author || ""}
                role={test.role || ""}
                company={test.company}
                avatarUrl={test.avatar || test.avatarUrl}
                rating={test.rating}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 7. GLOBAL DARK CTA BAND */}
      <DarkCtaBand />
    </div>
  );
}
