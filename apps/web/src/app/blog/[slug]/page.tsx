import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Quote
} from "lucide-react";
import { DarkCtaBand } from "@/components/widgets";
import { IPost } from "@repo/types";

const fallbackPosts: IPost[] = [
  {
    id: "post-1",
    title: "Optimizing Multi-Cloud Infrastructure for Resilient Microservices",
    slug: "optimizing-multi-cloud-infrastructure",
    excerpt: "Learn how modern IT teams achieve 99.99% availability by distributing workloads across hybrid cloud environments.",
    body: `Enterprises today are increasingly moving away from single-vendor lock-in. By adopting a multi-cloud approach with AWS, Azure, and Google Cloud, organizations can optimize costs and build fault-tolerant systems.

### Key Strategies for Seamless Hybrid Workloads
1. **Container Orchestration with Kubernetes**: Standardize your deployments across all cloud vendors using portable container pods.
2. **Unified Observability**: Ingest logs, metrics, and traces into centralized observability tooling.
3. **Automated CI/CD Pipelines**: Deploy seamlessly with automated rollback safeguards.

> "A well-architected cloud strategy does not just prevent downtime; it fundamentally accelerates your product development velocity."

### Conclusion
Deploying a multi-cloud setup requires thorough planning, but the security and availability dividends make it essential for forward-thinking engineering organizations.`,
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200",
    category: "Cloud Solutions",
    author: {
      name: "Michael Carter",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400",
      role: "Chief Solutions Architect"
    },
    publishedAt: "2026-01-15",
    isPublished: true,
    readTime: "6 min read",
    tags: ["Cloud", "DevOps", "Kubernetes", "Architecture"],
    commentsCount: 4
  },
  {
    id: "post-2",
    title: "Zero-Trust Cybersecurity Architecture: Safeguarding Enterprise Data",
    slug: "zero-trust-cybersecurity-architecture",
    excerpt: "Why perimeter defense is obsolete and how continuous identity verification protects high-value corporate assets.",
    body: `Traditional castle-and-moat security assumptions are invalid in today's remote and cloud-first operating environments. Zero-Trust operates on a simple principle: *Never trust, always verify*.

### Core Principles of Zero-Trust
- **Least Privilege Access**: Employees and microservices only have access to the exact resources required for their immediate tasks.
- **Continuous Multi-Factor Authentication**: Dynamic risk assessments verify tokens before every critical request.
- **End-to-End Encryption**: Data in transit and at rest is secured with state-of-the-art cryptographic standards.

Implementing these practices shields your business from credential compromise and lateral network attacks.`,
    coverImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200",
    category: "Cyber Security",
    author: {
      name: "Megan Palms",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400",
      role: "Online Director"
    },
    publishedAt: "2026-02-02",
    isPublished: true,
    readTime: "5 min read",
    tags: ["Security", "Zero-Trust", "Compliance"],
    commentsCount: 2
  }
];

export default async function BlogDetailsPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let post: IPost | undefined = fallbackPosts.find((p) => p.slug === slug);

  // Try to fetch from API
  try {
    const res = await fetch(`http://localhost:5000/api/v1/posts/slug/${slug}`, {
      next: { revalidate: 60 }
    });
    if (res.ok) {
      const json = await res.json();
      if (json.data) post = json.data;
    }
  } catch {
    // fallback
  }

  if (!post) {
    post = fallbackPosts[0];
  }

  const authorName = typeof post.author === "string" ? post.author : post.author?.name || "TechFirm Author";
  const authorAvatar = typeof post.author === "object" ? post.author?.avatar : undefined;
  const authorRole = typeof post.author === "object" ? post.author?.role : "Senior Architect";

  const publishedDate = post.publishedAt
    ? format(new Date(post.publishedAt), "dd MMMM yyyy")
    : "Recently";

  return (
    <div className="w-full flex flex-col bg-background">
      {/* 1. ARTICLE HEADER HERO */}
      <section className="relative bg-dark-bg text-white py-20 lg:py-24 border-b border-dark-border">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-4 border border-primary/30">
            <span>{post.category}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-6 leading-tight text-white">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-gray-300">
            <div className="flex items-center gap-2">
              {authorAvatar ? (
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-primary">
                  <Image
                    src={authorAvatar}
                    alt={authorName}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center">
                  {authorName[0]}
                </div>
              )}
              <span className="font-bold text-white">{authorName}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-primary" />
              <span>{publishedDate}</span>
            </div>

            {post.readTime && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-primary" />
                <span>{post.readTime}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. ARTICLE BODY CONTENT */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          {/* Cover Image */}
          <div className="relative w-full h-[380px] sm:h-[480px] rounded-3xl overflow-hidden shadow-2xl mb-12 border border-border">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Lead Paragraph */}
          <p className="text-xl sm:text-2xl text-foreground font-medium leading-relaxed mb-8 border-l-4 border-primary-deep pl-6 py-1">
            {post.excerpt}
          </p>

          {/* Article Body */}
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-6 leading-relaxed">
            <p>
              In high-traffic cloud environments, unexpected latency spikes or misconfigured cluster replicas can lead to thousands of dollars in lost transaction volume. Building resilience into your deployment pipelines ensures that your application remains responsive under extreme load conditions.
            </p>

            <div className="p-8 my-8 rounded-2xl bg-muted/40 border border-border">
              <Quote className="w-8 h-8 text-primary-deep mb-2" />
              <p className="text-lg font-bold text-foreground italic">
                &ldquo;Engineering reliability isn&apos;t just about preventing system failures; it is about guaranteeing business continuity when dependencies experience degraded performance.&rdquo;
              </p>
            </div>

            <h3 className="text-2xl font-bold text-foreground pt-4">
              Core Architectural Pillars
            </h3>
            <ul className="space-y-2 list-disc pl-6">
              <li>Multi-region auto-scaling pods with automated health checks.</li>
              <li>Encrypted database sharding with instant sub-second failover.</li>
              <li>Distributed caching layers using localized edge pops.</li>
            </ul>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-10 mt-10 border-t border-border">
              <span className="text-xs font-bold uppercase text-muted-foreground mr-2">Tags:</span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-lg bg-muted text-foreground text-xs font-semibold"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Author Box */}
          <div className="p-8 rounded-3xl bg-muted/40 border border-border mt-12 flex flex-col sm:flex-row items-center gap-6">
            <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0 border-2 border-primary">
              {authorAvatar ? (
                <Image
                  src={authorAvatar}
                  alt={authorName}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-2xl">
                  {authorName[0]}
                </div>
              )}
            </div>
            <div>
              <p className="text-xs uppercase font-extrabold text-primary-deep">Written By</p>
              <h4 className="text-xl font-bold text-foreground mt-0.5">{authorName}</h4>
              <p className="text-xs text-muted-foreground">{authorRole}</p>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                Contributing insights on cloud native architectures, distributed systems, and enterprise cybersecurity strategies at TechFirm.
              </p>
            </div>
          </div>

          {/* Back to Blog */}
          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-dark-bg text-white font-bold text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Articles</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. GLOBAL DARK CTA BAND */}
      <DarkCtaBand />
    </div>
  );
}
