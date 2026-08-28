import { notFound } from "next/navigation";
import {
  BlogDetailView,
  getBlogPost,
  blogPostsData
} from "@/components/blog";

export async function generateStaticParams() {
  return blogPostsData.map((post) => ({
    slug: post.slug
  }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  return {
    title: `${post.title} — TechFirm Blog`,
    description: post.excerpt
  };
}

export default async function BlogPostPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="w-full bg-white">
      <BlogDetailView post={post} />
    </main>
  );
}
