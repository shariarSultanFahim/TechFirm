import { Metadata } from "next";
import { notFound } from "next/navigation";

import { IPost } from "@repo/types";

import { defaultPosts } from "@/lib/posts-data";

import { BlogDetailView, blogPostsData, getBlogPost } from "@/components/blog";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

async function fetchBlogPost(slug: string): Promise<IPost | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/posts/slug/${slug}`, {
      next: { revalidate: 60 }
    });
    if (res.ok) {
      const json = await res.json();
      return json.data || null;
    }
  } catch {
    // Fallback on SSR/build time if backend is offline
  }

  const fallback = defaultPosts.find((p) => p.slug === slug || p.id === slug);
  if (fallback) return fallback;

  return null;
}

export async function generateStaticParams() {
  const staticSlugs = blogPostsData.map((post) => ({
    slug: post.slug
  }));
  const defaultSlugs = defaultPosts.map((post) => ({
    slug: post.slug
  }));
  return [...staticSlugs, ...defaultSlugs];
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = (await fetchBlogPost(slug)) || getBlogPost(slug);

  if (!post) {
    return {
      title: "Blog — TechFirm",
      description: "Insights and tech architecture articles by TechFirm."
    };
  }

  return {
    title: `${post.title} — TechFirm Blog`,
    description: post.excerpt
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = (await fetchBlogPost(slug)) || getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="w-full bg-white">
      <BlogDetailView post={post} />
    </main>
  );
}
