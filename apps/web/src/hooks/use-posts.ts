"use client";

import { useQuery } from "@tanstack/react-query";

import { ApiResponse, IPost } from "@repo/types";

import { defaultPosts } from "@/lib/posts-data";

export { defaultPosts };

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export function usePosts(params?: { category?: string; search?: string }) {
  const category = params?.category && params.category !== "All" ? params.category : undefined;
  const search = params?.search || undefined;

  return useQuery<IPost[]>({
    queryKey: ["public-posts", { category, search }],
    queryFn: async () => {
      try {
        const queryParams = new URLSearchParams();
        queryParams.set("isPublished", "true");
        if (category) queryParams.set("category", category);
        if (search) queryParams.set("search", search);

        const res = await fetch(`${API_BASE_URL}/posts?${queryParams.toString()}`);
        if (!res.ok) {
          return defaultPosts;
        }
        const json: ApiResponse<IPost[]> = await res.json();
        return json.data && json.data.length > 0 ? json.data : defaultPosts;
      } catch {
        return defaultPosts;
      }
    },
    initialData: defaultPosts,
    staleTime: 60 * 1000
  });
}

export function usePost(slug: string) {
  const defaultPost =
    defaultPosts.find((p) => p.slug === slug || p.id === slug) || defaultPosts[0]!;

  return useQuery<IPost>({
    queryKey: ["public-post", slug],
    queryFn: async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/posts/slug/${slug}`);
        if (!res.ok) {
          return defaultPost;
        }
        const json: ApiResponse<IPost> = await res.json();
        return json.data || defaultPost;
      } catch {
        return defaultPost;
      }
    },
    initialData: defaultPost,
    staleTime: 60 * 1000
  });
}
