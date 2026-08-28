"use client";

import { IPost } from "@repo/types";

import { usePosts } from "@/hooks/use-posts";

import { BlogCard } from "./blog-card";
import { type BlogPost } from "./blog-data";

interface BlogGridProps {
  posts?: (BlogPost | IPost)[];
  category?: string;
  search?: string;
}

export function BlogGrid({ posts: propPosts, category, search }: BlogGridProps) {
  const { data: hookPosts = [] } = usePosts({ category, search });
  const posts = propPosts || hookPosts;

  if (posts.length === 0) {
    return (
      <div className="text-muted-foreground col-span-full w-full py-12 text-center">
        <p className="text-sm font-semibold">No articles found in this category.</p>
      </div>
    );
  }

  return (
    <div className="grid w-full grid-cols-1 gap-7 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, idx) => {
        const key =
          (post as IPost).id || (post as IPost).slug || (post as BlogPost).id || `blog-${idx}`;
        return <BlogCard key={key} post={post} />;
      })}
    </div>
  );
}
