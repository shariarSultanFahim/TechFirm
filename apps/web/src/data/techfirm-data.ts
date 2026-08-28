import { FaqItem, TestimonialItem, CaseStudyItem, TeamMemberItem } from "@repo/ui";

export const servicesData = [
  {
    id: "cloud-integration",
    title: "Cloud Solutions & Migration",
    slug: "cloud-integration",
    description: "Seamless workload transition into secure, scalable AWS, Azure, and Google Cloud environments.",
    iconName: "Cloud",
    features: [
      "Zero-Downtime Migration Pipelines",
      "Cost-Optimized Auto-Scaling",
      "Multi-Region Hybrid Architecture",
      "24/7 Managed Cloud Monitoring"
    ],
    fullContent: "Are you busy putting out IT fires instead of focusing on your core business? If your technology is draining resources rather than optimizing them, TechFirm's Cloud Solutions provide high-availability infrastructure, automated disaster recovery, and continuous optimization."
  },
  {
    id: "cyber-security",
    title: "Zero-Trust Cyber Security",
    slug: "cyber-security",
    description: "Proactive threat intelligence, continuous endpoint monitoring, and SOC2/GDPR compliance frameworks.",
    iconName: "ShieldCheck",
    features: [
      "Automated Penetration Auditing",
      "Real-Time SIEM Monitoring",
      "Identity & Access Management (IAM)",
      "Instant Ransomware Mitigation"
    ],
    fullContent: "Safeguard your mission-critical company assets with comprehensive vulnerability management, endpoint detection and response (EDR), and tailored security policies designed for modern distributed teams."
  },
  {
    id: "managed-it",
    title: "24/7 Managed IT Support",
    slug: "managed-it",
    description: "Comprehensive outsourced IT helpdesk, network observability, and proactive hardware maintenance.",
    iconName: "Headphones",
    features: [
      "15-Minute Guaranteed SLA",
      "Remote & On-Site Engineering",
      "Automated Health Diagnostics",
      "Employee Tech Onboarding"
    ],
    fullContent: "Eliminate downtime with round-the-clock incident response, unified ticketing management, and proactive hardware/software patch cycles."
  },
  {
    id: "software-engineering",
    title: "Custom Software & Web Apps",
    slug: "software-engineering",
    description: "High-performance full-stack web, mobile, and API development with modern microservice architectures.",
    iconName: "Code2",
    features: [
      "Modern React / Next.js & NestJS",
      "High-Throughput GraphQL / REST APIs",
      "Microservices & Event-Driven Systems",
      "Rigorous CI/CD & Automated Testing"
    ],
    fullContent: "Accelerate your product roadmap with agile engineering pods specializing in scalable frontend interfaces and resilient backend services."
  },
  {
    id: "data-analytics",
    title: "Data Integration & BI",
    slug: "data-analytics",
    description: "Centralized data lakehouse engineering, ETL pipelines, and real-time executive dashboards.",
    iconName: "BarChart3",
    features: [
      "Automated ETL / ELT Workflows",
      "Snowflake & BigQuery Data Warehousing",
      "Interactive PowerBI & Looker Models",
      "Predictive Machine Learning Insights"
    ],
    fullContent: "Turn fragmented customer and operational data into actionable revenue-driving metrics with automated analytics pipelines."
  },
  {
    id: "it-consulting",
    title: "Strategic IT Consulting",
    slug: "it-consulting",
    description: "Executive technology roadmapping, enterprise software selection, and digital transformation strategy.",
    iconName: "Cpu",
    features: [
      "Digital Maturity Assessments",
      "Vendor & License Rationalization",
      "Disaster Recovery Planning",
      "Technology ROI Optimization"
    ],
    fullContent: "Align technology investments directly with your 3-year strategic growth targets under the guidance of veteran enterprise architects."
  }
];

export const processStepsData = [
  {
    stepNumber: "01",
    title: "Information Gathering & Audit",
    description: "We conduct a thorough audit of your existing infrastructure, security posture, and business objectives to identify high-impact opportunities."
  },
  {
    stepNumber: "02",
    title: "Commercial & Architecture Planning",
    description: "Our senior architects design a customized, cost-effective blueprint with transparent milestones, SLAs, and security controls."
  },
  {
    stepNumber: "03",
    title: "Execution & 24/7 Managed Support",
    description: "We deploy the solution with zero business disruption and provide continuous 24/7 monitoring, patch updates, and rapid incident response."
  }
];

export const teamMembersData: TeamMemberItem[] = [
  {
    name: "Michael Carter",
    role: "Chief Solutions Architect",
    slug: "michael-carter",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800",
    bio: "Over 15 years leading enterprise cloud transformations, Kubernetes cluster deployments, and hybrid cloud migrations across North America and Europe.",
    email: "m.carter@techfirm.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com"
  },
  {
    name: "Megan Palms",
    role: "Online Director",
    slug: "megan-palms",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800",
    bio: "Specialist in digital product direction, enterprise UX strategy, and global customer success operations.",
    email: "m.palms@techfirm.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com"
  },
  {
    name: "David Sterling",
    role: "Senior IT Consultant",
    slug: "david-sterling",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800",
    bio: "Advising Fortune 500 leadership on technology modernization, cloud cost containment, and operational resilience.",
    email: "d.sterling@techfirm.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com"
  },
  {
    name: "Elena Rostova",
    role: "Head of Infrastructure",
    slug: "elena-rostova",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800",
    bio: "Directing 24/7 global datacenter monitoring, automated incident triage, and carrier-grade networking.",
    email: "e.rostova@techfirm.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com"
  },
  {
    name: "Marcus Chen",
    role: "Cyber Security Lead",
    slug: "marcus-chen",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800",
    bio: "Certified ethical hacker and CISSP professional securing multi-tenant clouds and banking transaction ledgers.",
    email: "m.chen@techfirm.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com"
  },
  {
    name: "Olivia Vance",
    role: "Product Engineering Manager",
    slug: "olivia-vance",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800",
    bio: "Spearheading modern agile web apps, full-stack microservices, and design system engineering.",
    email: "o.vance@techfirm.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com"
  },
  {
    name: "Sarah Jenkins",
    role: "DevOps & CI/CD Specialist",
    slug: "sarah-jenkins",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800",
    bio: "Automating cloud infrastructure with Terraform, GitHub Actions, Docker, and Kubernetes.",
    email: "s.jenkins@techfirm.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com"
  },
  {
    name: "Lucas Meyer",
    role: "Senior Database Administrator",
    slug: "lucas-meyer",
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800",
    bio: "Expert in distributed PostgreSQL, MongoDB sharding, caching architectures, and zero-data-loss failover.",
    email: "l.meyer@techfirm.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com"
  }
];

export const faqsData: FaqItem[] = [
  {
    id: "faq-1",
    question: "How do I know if I need a consultant?",
    answer: "If your internal IT team spends more time fighting fires than shipping features, or if you are planning a cloud migration, compliance audit (SOC2/GDPR), or infrastructure scaling, our consultants help save up to 40% in operational costs while preventing catastrophic downtime.",
    category: "General"
  },
  {
    id: "faq-2",
    question: "What is your typical onboarding timeline for Managed IT?",
    answer: "Most organizations are fully onboarded within 5 to 10 business days. This includes network telemetry mapping, credential vaulting, automated monitoring setup, and an initial security vulnerability assessment.",
    category: "Services"
  },
  {
    id: "faq-3",
    question: "What uptime and response time SLAs do you guarantee?",
    answer: "Our Enterprise agreements guarantee a 99.99% infrastructure uptime SLA and a maximum 15-minute response time for critical severity-1 incidents, backed by financially enforceable service credits.",
    category: "Support"
  },
  {
    id: "faq-4",
    question: "Can I customize or upgrade my pricing plan later?",
    answer: "Yes, you can scale resources up or down at any time with prorated billing. You can also switch between monthly and annual billing with a single click from the customer portal.",
    category: "Pricing"
  },
  {
    id: "faq-5",
    question: "How do you protect sensitive company data during migrations?",
    answer: "All data transfers use TLS 1.3 encryption with AES-256 encryption at rest. We utilize dedicated secure point-to-point tunnels and execute zero-data-loss validation checkpoints prior to final cutover.",
    category: "Security"
  }
];

export const testimonialsData: TestimonialItem[] = [
  {
    id: "test-1",
    name: "Jonathan Vance",
    role: "CTO",
    company: "Fintech Global Group",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
    content: "TechFirm migrated our entire core banking ledger to a hybrid cloud setup in less than 3 weeks without a single second of unexpected downtime. Their 24/7 support team is exceptional.",
    rating: 5
  },
  {
    id: "test-2",
    name: "Sophia Martinez",
    role: "VP of Engineering",
    company: "Logistics Pro Europe",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200",
    content: "The zero-trust security architecture TechFirm implemented passed our SOC2 Type II audit with flying colors. We feel completely confident in our compliance posture.",
    rating: 5,
    posterImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800"
  },
  {
    id: "test-3",
    name: "Alexander Becker",
    role: "Head of Operations",
    company: "CloudScale SaaS",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200",
    content: "Our cloud hosting bill was reduced by 35% in month one, while our application throughput doubled. Working with TechFirm has been one of our highest-ROI decisions.",
    rating: 5
  }
];

export const caseStudiesData: CaseStudyItem[] = [
  {
    slug: "maximizing-efficiency-coffee-success",
    title: "Maximizing Efficiency with Proper Technology Implementation – Coffee Success Story",
    category: "Banks & Insurance",
    client: "Coffee Bean Global Retail",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=800",
    excerpt: "Consolidating 450+ retail point-of-sale systems into a unified real-time cloud data pipeline with zero network dropouts.",
    metrics: [
      { label: "Infrastructure Cost Savings", value: "38%" },
      { label: "System Uptime Achieved", value: "99.99%" }
    ],
    variant: "dark"
  },
  {
    slug: "zero-trust-fintech-migration",
    title: "Enterprise Multi-Region Cloud Migration for Digital Banking Platform",
    category: "Cloud Migration",
    client: "Apex Digital Capital",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800",
    excerpt: "Deploying automated geo-distributed Kubernetes clusters with real-time replication across Frankfurt and Amsterdam.",
    metrics: [
      { label: "Latency Reduction", value: "62ms" },
      { label: "SOC2 Compliance", value: "100%" }
    ],
    variant: "light"
  },
  {
    slug: "automated-iot-logistics-pipeline",
    title: "Real-Time Fleet Telemetry & Automated Incident Dispatch for Logistics Leader",
    category: "IoT & Managed IT",
    client: "TransEuro Logistics",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800",
    excerpt: "Processing over 2 million telemetry events per minute with predictive maintenance alerts that eliminated roadside breakdowns.",
    metrics: [
      { label: "Maintenance Downtime", value: "-45%" },
      { label: "Daily Data Ingest", value: "14 TB" }
    ],
    variant: "phones"
  }
];

export const domainTldsData = [
  { tld: ".com", price: "$9.99/yr", renewal: "$13.99/yr", popular: true },
  { tld: ".net", price: "$11.99/yr", renewal: "$15.99/yr", popular: false },
  { tld: ".org", price: "$12.99/yr", renewal: "$14.99/yr", popular: false },
  { tld: ".io", price: "$34.99/yr", renewal: "$39.99/yr", popular: true },
  { tld: ".cloud", price: "$4.99/yr", renewal: "$19.99/yr", popular: false }
];
