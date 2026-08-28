"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Zap, BookOpen } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import {
  BlogPostCard,
  DarkCtaBand
} from "@/components/widgets";
import { get } from "@/lib/api";
import { IPost, ApiResponse } from "@repo/types";

const fallbackPosts: IPost[] = [
  {
    id: "post-1",
    title: "Optimizing Multi-Cloud Infrastructure for Resilient Microservices",
    slug: "optimizing-multi-cloud-infrastructure",
    excerpt: "Learn how modern IT teams achieve 99.99% availability by distributing workloads across hybrid cloud environments.",
    body: "Multi-cloud architectures offer unparalleled redundancy and failover capabilities...",
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
    tags: ["Cloud", "DevOps", "Kubernetes"],
    commentsCount: 4
  },
  {
    id: "post-2",
    title: "Zero-Trust Cybersecurity Architecture: Safeguarding Enterprise Data",
    slug: "zero-trust-cybersecurity-architecture",
    excerpt: "Why perimeter defense is obsolete and how continuous identity verification protects high-value corporate assets.",
    body: "Traditional castle-and-moat security assumptions are invalid in today's remote operating environments...",
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
  },
  {
    id: "post-3",
    title: "Maximizing ROI Through Intelligent Business IT Consulting",
    slug: "maximizing-roi-through-it-consulting",
    excerpt: "How aligning technology initiatives with core business goals reduces operational overhead by up to 40%.",
    body: "Technology investments should never happen in isolation from strategic revenue drivers...",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200",
    category: "IT Consulting",
    author: {
      name: "David Sterling",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400",
      role: "Senior Consultant"
    },
    publishedAt: "2026-02-18",
    isPublished: true,
    readTime: "4 min read",
    tags: ["Consulting", "Strategy", "Management"],
    commentsCount: 6
  },
  {
    id: "post-4",
    title: "Building High-Throughput Web Applications with Next.js & Turborepo",
    slug: "building-high-throughput-web-apps",
    excerpt: "A deep dive into monorepo structure, server-side caching, and modern web application performance.",
    body: "Modern web experiences demand instantaneous page loads and seamless real-time interactions...",
    coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200",
    category: "Web Development",
    author: {
      name: "Michael Carter",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400",
      role: "Chief Solutions Architect"
    },
    publishedAt: "2026-02-22",
    isPublished: true,
    readTime: "7 min read",
    tags: ["NextJS", "TypeScript", "Frontend"],
    commentsCount: 3
  },
  {
    id: "post-5",
    title: "Demystifying Managed IT Services: What Every CTO Should Know",
    slug: "demystifying-managed-it-services",
    excerpt: "Discover the tangible benefits of 24/7 outsourced IT operations, SLAs, and dedicated incident management.",
    body: "When scaling a company, internal IT teams often get overwhelmed by tier-1 tickets...",
    coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200",
    category: "Managed IT",
    author: {
      name: "Elena Rostova",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400",
      role: "Head of Infrastructure"
    },
    publishedAt: "2026-02-25",
    isPublished: true,
    readTime: "5 min read",
    tags: ["Managed Services", "Operations", "SLA"],
    commentsCount: 1
  },
  {
    id: "post-6",
    title: "Data Protection and Disaster Recovery Strategies for 2026",
    slug: "data-protection-disaster-recovery-2026",
    excerpt: "Building resilient data backup pipelines and zero-downtime failover systems across geographically distributed regions.",
    body: "System outages and data loss incidents can permanently damage customer trust...",
    coverImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200",
    category: "Data Security",
    author: {
      name: "David Sterling",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400",
      role: "Senior Consultant"
    },
    publishedAt: "2026-02-27",
    isPublished: true,
    readTime: "6 min read",
    tags: ["Data", "Disaster Recovery", "Backups"],
    commentsCount: 5
  }
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    "All",
    "Cloud Solutions",
    "Cyber Security",
    "IT Consulting",
    "Web Development",
    "Managed IT"
  ];

  const { data: postsData } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      try {
        const res = await get<ApiResponse<IPost[]>>("/posts");
        return res.data || fallbackPosts;
      } catch {
        return fallbackPosts;
      }
    },
    initialData: fallbackPosts
  });

  const posts = postsData && postsData.length > 0 ? postsData : fallbackPosts;

  const filteredPosts = posts.filter((post) => {
    const matchesCat =
      selectedCategory === "All" ||
      post.category?.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      searchQuery.trim() === "" ||
      post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="w-full flex flex-col bg-background">
      {/* 1. HERO HEADER */}
      <section className="relative bg-dark-bg text-white py-20 lg:py-24 border-b border-dark-border overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-4 border border-primary/30">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>TechFirm Insights &amp; Articles</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4 text-white">
            The TechFirm Blog
          </h1>

          <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6">
            In-depth architectural breakdowns, zero-trust cybersecurity strategies, and cloud migration guides from our senior engineering pod.
          </p>

          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-gray-400">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-primary">Our Blog</span>
          </div>
        </div>
      </section>

      {/* 2. BLOG LISTING SECTION */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          {/* Search and Category Filter */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-foreground text-background shadow-md"
                      : "bg-card text-muted-foreground border border-border hover:bg-muted"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-foreground focus:outline-hidden focus:border-primary shadow-xs"
              />
            </div>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <BlogPostCard
                key={post.id || post.slug}
                title={post.title}
                excerpt={post.excerpt}
                slug={post.slug}
                category={post.category}
                author={typeof post.author === "string" ? post.author : post.author?.name || "TechFirm Team"}
                publishedAt={post.publishedAt}
                imageUrl={post.coverImage}
              />
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16 bg-card rounded-3xl border border-border p-8">
              <BookOpen className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-foreground">No articles found</h3>
              <p className="text-sm text-muted-foreground mt-1">Try searching with different keywords or choosing another category.</p>
            </div>
          )}
        </div>
      </section>

      {/* 3. GLOBAL DARK CTA BAND */}
      <DarkCtaBand />
    </div>
  );
}
