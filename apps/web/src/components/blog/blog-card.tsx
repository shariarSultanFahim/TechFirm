import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { BlogPost } from "./blog-data";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="rounded-3xl border border-[#EDE8F5] bg-white overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 group flex flex-col block select-none"
    >
      {/* 1. Feature Image */}
      <div className="relative w-full aspect-[16/11] overflow-hidden bg-neutral-100">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* 2. Floating Author Pill Badge */}
      <div className="relative z-10 -mt-7 px-4 sm:px-5">
        <div className="bg-white rounded-full px-3.5 py-2 shadow-md border border-[#EDE8F5] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {/* Avatar Icon */}
            <div className="w-8 h-8 rounded-full bg-[#E5E7EB] text-[#9CA3AF] flex items-center justify-center overflow-hidden shrink-0">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>

            <div className="flex flex-col text-left">
              <span className="text-[10px] text-gray-500 font-medium leading-none mb-0.5">
                Posted by:
              </span>
              <span className="text-xs font-bold text-[#141432] leading-none">
                {post.author.name}
              </span>
            </div>
          </div>

          {/* Arrow Button */}
          <div className="w-8 h-8 rounded-full bg-[#141432] text-white flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors shadow-2xs">
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </div>
        </div>
      </div>

      {/* 3. Card Content */}
      <div className="px-5 sm:px-6 pt-4 pb-6 sm:pb-7 flex flex-col grow justify-between text-left">
        <div>
          {/* Category */}
          <div className="flex items-center gap-2 text-xs font-semibold text-primary mb-3">
            <span className="w-4 h-0.5 bg-primary" />
            <span>{post.category}</span>
          </div>

          {/* Dashed Divider */}
          <div className="border-t border-dashed border-gray-200 mb-3" />

          {/* Date & Comments */}
          <div className="text-xs text-muted-foreground font-medium mb-2.5">
            {post.date} &nbsp;•&nbsp; Comments {String(post.commentsCount).padStart(2, "0")}
          </div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold text-[#141432] tracking-tight group-hover:text-primary transition-colors leading-snug mb-2.5">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed font-normal">
            {post.excerpt}
          </p>
        </div>
      </div>
    </Link>
  );
}
