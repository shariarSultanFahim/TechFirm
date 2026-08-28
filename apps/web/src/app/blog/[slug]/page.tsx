import { UnderDevelopment } from "@/components/widgets";

export const metadata = {
  title: "Article — TechFirm",
  description: "Article insights and details."
};

export default function BlogPostPage() {
  return (
    <UnderDevelopment
      title="Article Details"
      badge="BLOG POST"
      description="This article is currently being updated with the latest research and technical documentation."
    />
  );
}
