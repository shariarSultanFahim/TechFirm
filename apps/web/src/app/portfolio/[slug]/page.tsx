import { Metadata } from "next";
import { notFound } from "next/navigation";

import { IPortfolioItem } from "@repo/types";

import { defaultPortfolio } from "@/lib/portfolio-data";

import { caseStudies, getCaseStudyBySlug, PortfolioDetailView } from "@/components/portfolio";

interface PortfolioDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

async function fetchPortfolioItem(slug: string): Promise<IPortfolioItem | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/portfolio/slug/${slug}`, {
      next: { revalidate: 60 }
    });
    if (res.ok) {
      const json = await res.json();
      return json.data || null;
    }
  } catch {
    // Fallback during offline build
  }

  const fallback = defaultPortfolio.find((p) => p.slug === slug || p.id === slug);
  if (fallback) return fallback;

  return null;
}

export async function generateStaticParams() {
  const staticSlugs = caseStudies.map((study) => ({
    slug: study.slug
  }));
  const defaultSlugs = defaultPortfolio.map((study) => ({
    slug: study.slug
  }));
  return [...staticSlugs, ...defaultSlugs];
}

export async function generateMetadata({ params }: PortfolioDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = (await fetchPortfolioItem(slug)) || getCaseStudyBySlug(slug);

  if (!study) {
    return {
      title: "Case Study — TechFirm",
      description: "Discover how TechFirm engineered high performance cloud solutions."
    };
  }

  return {
    title: `${study.title} — Case Study — TechFirm`,
    description:
      study.overview ||
      "Discover how TechFirm engineered high performance cloud server solutions for enterprise transformation."
  };
}

export default async function PortfolioDetailPage({ params }: PortfolioDetailPageProps) {
  const { slug } = await params;
  const study = (await fetchPortfolioItem(slug)) || getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  return <PortfolioDetailView caseStudy={study} />;
}
