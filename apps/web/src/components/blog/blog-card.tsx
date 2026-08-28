import Image from "next/image";
import Link from "next/link";

import { ArrowUpRight } from "lucide-react";

import { IPost } from "@repo/types";

import type { BlogPost } from "./blog-data";

interface BlogCardProps {
  post: BlogPost | IPost;
}

export function BlogCard({ post }: BlogCardProps) {
  const imageUrl =
    "coverImage" in post && post.coverImage
      ? post.coverImage
      : "image" in post && post.image
        ? typeof post.image === "string"
          ? post.image
          : (post.image as { src: string }).src
        : "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200";

  const authorName = post.author?.name || "TechFirm Team";
  const authorAvatar = post.author?.avatar;

  const dateString =
    "publishedAt" in post && post.publishedAt
      ? new Date(post.publishedAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric"
        })
      : "date" in post && post.date
        ? post.date
        : "Recent";

  const commentsCount = post.commentsCount ?? 0;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block flex flex-col overflow-hidden rounded-3xl border border-[#EDE8F5] bg-white shadow-2xs transition-all duration-300 select-none hover:shadow-xl"
    >
      {/* 1. Feature Image */}
      <div className="relative aspect-[16/11] w-full overflow-hidden bg-neutral-100">
        <Image
          src={imageUrl}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          unoptimized
        />
      </div>

      {/* 2. Floating Author Pill Badge */}
      <div className="relative z-10 -mt-7 px-4 sm:px-5">
        <div className="flex items-center justify-between rounded-full border border-[#EDE8F5] bg-white px-3.5 py-2 shadow-md">
          <div className="flex items-center gap-2.5">
            {/* Avatar Icon */}
            <div className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#E5E7EB] text-[#9CA3AF]">
              {authorAvatar ? (
                <Image
                  src={authorAvatar}
                  alt={authorName}
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              )}
            </div>

            <div className="flex flex-col text-left">
              <span className="mb-0.5 text-[10px] leading-none font-medium text-gray-500">
                Posted by:
              </span>
              <span className="text-xs leading-none font-bold text-[#141432]">{authorName}</span>
            </div>
          </div>

          {/* Arrow Button */}
          <div className="group-hover:bg-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#141432] text-white shadow-2xs transition-colors">
            <ArrowUpRight className="h-4 w-4 stroke-[2.5]" />
          </div>
        </div>
      </div>

      {/* 3. Card Content */}
      <div className="flex grow flex-col justify-between px-5 pt-4 pb-6 text-left sm:px-6 sm:pb-7">
        <div>
          {/* Category */}
          <div className="text-primary mb-3 flex items-center gap-2 text-xs font-semibold">
            <span className="bg-primary h-0.5 w-4" />
            <span>{post.category}</span>
          </div>

          {/* Dashed Divider */}
          <div className="mb-3 border-t border-dashed border-gray-200" />

          {/* Date & Comments */}
          <div className="text-muted-foreground mb-2.5 text-xs font-medium">
            {dateString} &nbsp;•&nbsp; Comments {String(commentsCount).padStart(2, "0")}
          </div>

          {/* Title */}
          <h3 className="group-hover:text-primary mb-2.5 text-lg leading-snug font-bold tracking-tight text-[#141432] transition-colors sm:text-xl">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-muted-foreground line-clamp-2 text-xs leading-relaxed font-normal sm:text-sm">
            {post.excerpt}
          </p>
        </div>
      </div>
    </Link>
  );
}
