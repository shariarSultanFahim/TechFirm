import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  caseStudies,
  getCaseStudyBySlug,
  PortfolioDetailView
} from "@/components/portfolio";

interface PortfolioDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return caseStudies.map((study) => ({
    slug: study.slug
  }));
}

export async function generateMetadata({
  params
}: PortfolioDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  return {
    title: `${study.title} — Case Study — TechFirm`,
    description:
      study.overview ||
      "Discover how TechFirm engineered high performance cloud server solutions for enterprise transformation."
  };
}

export default async function PortfolioDetailPage({
  params
}: PortfolioDetailPageProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  return <PortfolioDetailView caseStudy={study} />;
}
