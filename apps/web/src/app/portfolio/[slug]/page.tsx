import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Zap
} from "lucide-react";
import { DarkCtaBand } from "@/components/widgets";
import { caseStudiesData } from "@/data/techfirm-data";

export function generateStaticParams() {
  return caseStudiesData.map((c) => ({ slug: c.slug }));
}

export default async function PortfolioDetailsPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = caseStudiesData.find((c) => c.slug === slug) || caseStudiesData[0];

  if (!project) {
    notFound();
  }

  return (
    <div className="w-full flex flex-col bg-background">
      {/* 1. HERO HEADER */}
      <section className="relative bg-dark-bg text-white py-20 lg:py-24 border-b border-dark-border">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-4 border border-primary/30">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Case Study Details • {project.category}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-6 leading-tight text-white">
            {project.title}
          </h1>

          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-gray-400">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/portfolio" className="hover:text-white transition-colors">Portfolio</Link>
            <span>/</span>
            <span className="text-primary">{project.category}</span>
          </div>
        </div>
      </section>

      {/* 2. PROJECT HERO IMAGE & METADATA BAR */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="relative w-full h-[400px] sm:h-[500px] rounded-3xl overflow-hidden shadow-2xl mb-12 border border-border bg-muted">
            <Image
              src={project.image || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200"}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Project Meta Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-8 rounded-2xl bg-muted/40 border border-border mb-12">
            <div>
              <p className="text-xs uppercase font-bold text-muted-foreground">Client</p>
              <p className="text-base font-extrabold text-foreground mt-1">{project.client || "Global Partner"}</p>
            </div>
            <div>
              <p className="text-xs uppercase font-bold text-muted-foreground">Industry</p>
              <p className="text-base font-extrabold text-foreground mt-1">{project.category}</p>
            </div>
            <div>
              <p className="text-xs uppercase font-bold text-muted-foreground">Timeline</p>
              <p className="text-base font-extrabold text-foreground mt-1">6 Weeks Delivery</p>
            </div>
            <div>
              <p className="text-xs uppercase font-bold text-muted-foreground">Status</p>
              <p className="text-base font-extrabold text-primary-deep mt-1">Production Live</p>
            </div>
          </div>

          {/* Problem & Solution Breakdown */}
          <div className="space-y-10 text-muted-foreground leading-relaxed text-base sm:text-lg">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-4">
                The Business Challenge
              </h2>
              <p>
                Prior to partnering with TechFirm, the client faced high operational latency, escalating infrastructure costs, and frequent single-point-of-failure outages during peak traffic windows. The legacy monolith was unable to keep up with distributed global workloads.
              </p>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-4">
                TechFirm Architectural Solution
              </h2>
              <p>
                Our engineering pod engineered a cloud-native, auto-scaling Kubernetes cluster deployed across 3 redundant regions. We incorporated zero-trust API gateway proxies, immutable CI/CD deployment validation, and automated disaster recovery failover triggers.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="p-5 rounded-xl bg-accent border border-accent-foreground/20 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary-deep shrink-0 mt-0.5" />
                  <span className="text-sm font-bold text-accent-foreground">99.99% Guaranteed Infrastructure Uptime</span>
                </div>
                <div className="p-5 rounded-xl bg-accent border border-accent-foreground/20 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary-deep shrink-0 mt-0.5" />
                  <span className="text-sm font-bold text-accent-foreground">Zero-Data-Loss Active Disaster Recovery</span>
                </div>
              </div>
            </div>

            {/* Results Grid */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="p-8 rounded-3xl bg-dark-bg text-white my-10 border border-dark-border">
                <h3 className="text-xl font-bold mb-6 text-primary">
                  Quantitative Business Outcomes
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                  {project.metrics.map((m, idx) => (
                    <div key={idx}>
                      <p className="text-3xl sm:text-4xl font-black font-mono text-primary">{m.value}</p>
                      <p className="text-xs text-gray-400 mt-1 uppercase font-semibold">{m.label}</p>
                    </div>
                  ))}
                  <div>
                    <p className="text-3xl sm:text-4xl font-black font-mono text-white">0s</p>
                    <p className="text-xs text-gray-400 mt-1 uppercase font-semibold">Unscheduled Downtime</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Bar */}
          <div className="mt-16 pt-8 border-t border-border flex items-center justify-between">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-sm font-bold text-foreground hover:text-primary-deep"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Portfolio</span>
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-dark-bg text-white font-bold text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <span>Build A Similar Solution</span>
              <ArrowRight className="w-4 h-4 text-primary" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. GLOBAL DARK CTA BAND */}
      <DarkCtaBand />
    </div>
  );
}
