import { BlogCard } from "./blog-card";
import { blogPostsData, type BlogPost } from "./blog-data";

interface BlogGridProps {
  posts?: BlogPost[];
}

export function BlogGrid({ posts = blogPostsData }: BlogGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8 w-full">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}
