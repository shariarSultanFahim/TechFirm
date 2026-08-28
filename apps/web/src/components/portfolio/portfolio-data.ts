import type { StaticImageData } from "next/image";

// Portfolio Image Assets
import aarexImg from "@/assets/portfolio/aarex/aarex.png";
import acceImg from "@/assets/portfolio/acce/acce.png";
import arcCardBg from "@/assets/portfolio/arc/arc-card-bg.png";
import arcImg from "@/assets/portfolio/arc/arc.png";
import abcImg from "@/assets/portfolio/abc/abc.png";
import freaImg from "@/assets/portfolio/frea/frea.png";
import razeCardBg from "@/assets/portfolio/raze/raze-card-bg.png";
import razeImg from "@/assets/portfolio/raze/raze.png";

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  category: string;
  industry?: string;
  overview?: string;
  image: StaticImageData;
  bgImage?: StaticImageData;
  isDark?: boolean;
  actionText: string;
  challengeText?: string[];
  solutionText?: string[];
  results?: {
    title: string;
    description: string;
  }[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: "arc",
    slug: "arc-intuitive-education-app",
    category: "Technology",
    industry: "Education & E-Learning",
    title: "Maximizing Efficiency with Proper Technology Implementation – Coffee Success Story",
    subtitle: "An elegant and intuitive education app that helps learners",
    overview:
      "Paysafe provides payment solutions that power the everyday. The multinational organisation operates multiple brands across the e-cash, payments processing and digital wallets spectrum, serving over 145 million customers of varying size and scale.",
    image: arcImg,
    bgImage: arcCardBg,
    isDark: true,
    actionText: "Lounge Project",
    challengeText: [
      "Are you busy putting out IT fires instead of focusing on your core business? If your technology is draining resources rather than optimizing them, Netsurit can get you back on track. A professionally managed services provider can give you the decisive edge to: If your technology is draining resources rather than optimizing them.",
      "Your experts come with proven track records to make your working relationship of data-driven insights. If your technology is draining resources rather than optimizing them, we can get you back on track. A professionally managed services provider.",
      "Additionally, in the face of increasing industry regulation and compliance requirements, Paysafe were eager to stay ahead of the curve in responding to these changes, whilst also maintaining the relentless customer focus and agility that is at the core of their DNA."
    ],
    solutionText: [
      "Your experts come with proven track records to make your working relationship of data-driven insights. If your technology is draining resources rather than optimizing them, we can get you back on track. A professionally managed services provider.",
      "You busy putting out IT fires instead of focusing on your core business? If your technology is draining resources rather than optimizing them, Netsurit can get you back on track. A professionally managed services provider can give you the decisive edge to: If your technology is draining resources rather than optimizing them.",
      "The face of increasing industry regulation and compliance requirements, Paysafe were eager to stay ahead of the curve in responding to these changes, whilst also maintaining the relentless customer focus and agility that is at the core of their DNA."
    ],
    results: [
      {
        title: "IT Service for You",
        description: "We know that every businesses' needs are completely different from the next."
      },
      {
        title: "Your Team Productive",
        description: "Our managed services include round-the-clock monitoring of your key infrastructure, computer."
      },
      {
        title: "Predictable Costs 24/7",
        description: "We doesn't charge you more when your network is down or a server fails. Our flat-rate fee programs."
      },
      {
        title: "Our Team is Ready to Help",
        description: "Part of what makes our managed services so exceptional is that we are always available."
      }
    ]
  },
  {
    id: "aarex",
    slug: "aarex-convenience-savings-rewards",
    category: "Technology",
    industry: "Retail & FinTech",
    title: "Convenience, savings and rewards at your fingertips",
    overview:
      "Aarex transforms consumer loyalty through frictionless mobile point-of-sale integrations and automated cashback rewards processing.",
    image: aarexImg,
    isDark: false,
    actionText: "Lounge Project",
    challengeText: [
      "Rapid user expansion required real-time transaction processing without degrading application responsiveness during peak retail discount events.",
      "Ensuring PCI-DSS level 1 compliance while scaling across multi-region server clusters with zero planned downtime."
    ],
    solutionText: [
      "TechFirm deployed microservices with distributed message queues, reducing transaction latency from 450ms down to 42ms.",
      "Configured automatic horizontally auto-scaling server groups with automated failover and end-to-end encryption."
    ],
    results: [
      {
        title: "99.999% SLA",
        description: "Zero downtime achieved throughout Black Friday and Cyber Week peak load surges."
      },
      {
        title: "10x Throughput",
        description: "Processed over 2.4 million transactions per day seamlessly."
      },
      {
        title: "Reduced Hosting Costs",
        description: "Optimized cloud server utilization saving 38% in monthly compute expenditure."
      },
      {
        title: "24/7 Monitoring",
        description: "Automated telemetry with instantaneous anomaly detection."
      }
    ]
  },
  {
    id: "acce",
    slug: "acce-private-trust-trading-platform",
    category: "Technology",
    industry: "Banks & Insurance",
    title: "Private trust management and trading platform",
    overview:
      "Acce powers institutional wealth management, asset custody, and multi-tenant portfolio trading platforms.",
    image: acceImg,
    isDark: false,
    actionText: "Lounge Project"
  },
  {
    id: "abc",
    slug: "abc-strategic-ai-application-public",
    category: "Technology",
    industry: "Public Sector & AI",
    title: "Strategic Move to an AI-supported application for Public",
    overview:
      "ABC modernizes public utility infrastructure using automated AI-driven load predictions and automated anomaly resolution.",
    image: abcImg,
    isDark: false,
    actionText: "Lounge Project"
  },
  {
    id: "frea",
    slug: "frea-optimising-future-proofing",
    category: "Technology",
    industry: "Cloud Engineering",
    title: "Building, optimising, and future-proofing existing",
    overview:
      "Frea re-engineers legacy server workflows into modern serverless architectures with robust CI/CD pipelines.",
    image: freaImg,
    isDark: false,
    actionText: "Lounge Project"
  },
  {
    id: "raze",
    slug: "raze-insurance-big-data-savings",
    category: "Technology",
    industry: "Enterprise Insurance",
    title: "Major Insurance Provider Saves $750k per Month With Big Data",
    overview:
      "Raze unlocks predictive risk models and real-time claim verification pipelines for top-tier insurance underwriters.",
    image: razeImg,
    bgImage: razeCardBg,
    isDark: true,
    actionText: "Lounge Project"
  }
];

export function getCaseStudyBySlug(slug: string): CaseStudy {
  const match = caseStudies.find((item) => item.slug === slug);
  if (match) return match;

  // Fallback to default ARC case study
  return {
    ...caseStudies[0]!,
    slug: slug
  };
}
