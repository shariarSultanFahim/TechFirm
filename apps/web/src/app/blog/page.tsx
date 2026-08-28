import { SectionHeader } from "@/components/widgets";
import { BlogGrid } from "@/components/blog";

export const metadata = {
  title: "The TechFirm Blog — Insights & Technology News",
  description: "Read expert articles, tutorials, and cloud technology insights from the TechFirm engineering team."
};

export default function BlogPage() {
  return (
    <main className="w-full bg-white py-16 sm:py-20 lg:py-24">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Reusable Section Header with landing page theming */}
        <SectionHeader
          align="center"
          badge="OUR BLOG & NEWS"
          title="The Techfirm blog"
          className="mb-12 sm:mb-16"
        />

        {/* Blog Post Grid */}
        <BlogGrid />
      </div>
    </main>
  );
}
