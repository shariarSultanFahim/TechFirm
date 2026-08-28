import mongoose from "mongoose";
import * as bcrypt from "bcryptjs";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });
dotenv.config({ path: ".env.local" });

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/fullstack_assessment_db";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    refreshToken: { type: String }
  },
  { timestamps: true }
);

const PlanSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    billingPeriod: { type: String, enum: ["monthly", "annual"], default: "monthly" },
    features: [{ type: String }],
    isPopular: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    description: { type: String },
    buttonText: { type: String, default: "Get Started" }
  },
  { timestamps: true }
);

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    body: { type: String, required: true },
    coverImage: { type: String, required: true },
    category: { type: String, required: true },
    author: {
      name: { type: String, required: true },
      avatar: { type: String },
      role: { type: String }
    },
    publishedAt: { type: Date, default: Date.now },
    isPublished: { type: Boolean, default: true },
    readTime: { type: String, default: "5 min read" },
    tags: [{ type: String }],
    commentsCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const ContactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);
const PlanModel = mongoose.models.Plan || mongoose.model("Plan", PlanSchema);
const PostModel = mongoose.models.Post || mongoose.model("Post", PostSchema);
const MessageModel =
  mongoose.models.ContactMessage ||
  mongoose.model("ContactMessage", ContactMessageSchema);

async function seed() {
  console.log("🌱 Starting Full TechFirm Database Seed...");
  console.log(`Connecting to MongoDB at: ${MONGODB_URI}`);

  await mongoose.connect(MONGODB_URI);

  const salt = await bcrypt.genSalt(10);
  const adminPassword = "Admin123!";
  const hashedAdminPassword = await bcrypt.hash(adminPassword, salt);

  // 1. Seed Admin Users
  await UserModel.findOneAndUpdate(
    { email: "admin@techfirm.com" },
    {
      name: "TechFirm Admin",
      email: "admin@techfirm.com",
      password: hashedAdminPassword,
      role: "admin"
    },
    { upsert: true, new: true }
  );

  await UserModel.findOneAndUpdate(
    { email: "admin@example.com" },
    {
      name: "Default Admin",
      email: "admin@example.com",
      password: hashedAdminPassword,
      role: "admin"
    },
    { upsert: true, new: true }
  );

  console.log("✅ Admin users seeded (admin@techfirm.com / admin@example.com)");

  // 2. Seed Plans
  const samplePlans = [
    {
      name: "Starter Solution",
      price: 29,
      billingPeriod: "monthly",
      features: [
        "1 Cloud Instance & 50GB SSD",
        "Weekly Automated Backups",
        "Standard SSL Certificate",
        "24/7 Email & Ticket Support",
        "Basic Threat Mitigation"
      ],
      isPopular: false,
      isActive: true,
      order: 1,
      description: "Ideal for startups and growing regional businesses.",
      buttonText: "Choose Starter"
    },
    {
      name: "Business Pro",
      price: 49,
      billingPeriod: "monthly",
      features: [
        "4 High-Performance vCPUs & 200GB SSD",
        "Daily Automated Backups & Snapshots",
        "Enterprise DDoS Protection",
        "Priority 24/7 Phone & Slack Support",
        "Multi-Cloud Integration & CDN",
        "Custom Domain & Free Migration"
      ],
      isPopular: true,
      isActive: true,
      order: 2,
      description: "Our most popular package for scaling companies and agencies.",
      buttonText: "Start Free Trial"
    },
    {
      name: "Enterprise Dedicated",
      price: 89,
      billingPeriod: "monthly",
      features: [
        "Dedicated Kubernetes Cluster",
        "Zero-Trust Security & SOC2 Compliance",
        "Custom SLA & 99.99% Uptime Guarantee",
        "Dedicated Solutions Architect",
        "Real-Time Incident Response Under 15m",
        "Unlimited API Traffic & Bandwidth"
      ],
      isPopular: false,
      isActive: true,
      order: 3,
      description: "Custom architecture designed for enterprise-grade workloads.",
      buttonText: "Contact Sales"
    },
    {
      name: "Starter Solution (Annual)",
      price: 290,
      billingPeriod: "annual",
      features: [
        "1 Cloud Instance & 50GB SSD",
        "Weekly Automated Backups",
        "Standard SSL Certificate",
        "24/7 Email & Ticket Support",
        "2 Months Free Included"
      ],
      isPopular: false,
      isActive: true,
      order: 1,
      description: "Annual commitment with 2 months free savings.",
      buttonText: "Choose Starter"
    },
    {
      name: "Business Pro (Annual)",
      price: 490,
      billingPeriod: "annual",
      features: [
        "4 High-Performance vCPUs & 200GB SSD",
        "Daily Automated Backups & Snapshots",
        "Enterprise DDoS Protection",
        "Priority 24/7 Phone & Slack Support",
        "Multi-Cloud Integration & CDN",
        "2 Months Free Included"
      ],
      isPopular: true,
      isActive: true,
      order: 2,
      description: "Maximum efficiency and cost savings for established businesses.",
      buttonText: "Start Free Trial"
    },
    {
      name: "Enterprise Dedicated (Annual)",
      price: 890,
      billingPeriod: "annual",
      features: [
        "Dedicated Kubernetes Cluster",
        "Zero-Trust Security & SOC2 Compliance",
        "Custom SLA & 99.99% Uptime Guarantee",
        "Dedicated Solutions Architect",
        "2 Months Free Included"
      ],
      isPopular: false,
      isActive: true,
      order: 3,
      description: "Dedicated infrastructure built for mission-critical operations.",
      buttonText: "Contact Sales"
    }
  ];

  await PlanModel.deleteMany({});
  await PlanModel.insertMany(samplePlans);
  console.log(`✅ Seeded ${samplePlans.length} Pricing Plans`);

  // 3. Seed Posts
  const samplePosts = [
    {
      title: "Optimizing Multi-Cloud Infrastructure for Resilient Microservices",
      slug: "optimizing-multi-cloud-infrastructure",
      excerpt: "Learn how modern IT teams achieve 99.99% availability by distributing workloads across hybrid cloud environments.",
      body: `## The Modern Multi-Cloud Landscape

Enterprises today are increasingly moving away from single-vendor lock-in. By adopting a multi-cloud approach with AWS, Azure, and Google Cloud, organizations can optimize costs and build fault-tolerant systems.

### Key Strategies for Seamless Hybrid Workloads
1. **Container Orchestration with Kubernetes**: Standardize your deployments across all cloud vendors using portable container pods.
2. **Unified Observability**: Ingest logs, metrics, and traces into centralized observability tooling.
3. **Automated CI/CD Pipelines**: Deploy seamlessly with automated rollback safeguards.

> "A well-architected cloud strategy does not just prevent downtime; it fundamentally accelerates your product development velocity."

### Conclusion
Deploying a multi-cloud setup requires thorough planning, but the security and availability dividends make it essential for forward-thinking engineering organizations.`,
      coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200",
      category: "Cloud Solutions",
      author: {
        name: "Michael Carter",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400",
        role: "Chief Solutions Architect"
      },
      publishedAt: new Date("2026-01-15"),
      isPublished: true,
      readTime: "6 min read",
      tags: ["Cloud", "DevOps", "Kubernetes", "Architecture"],
      commentsCount: 4
    },
    {
      title: "Zero-Trust Cybersecurity Architecture: Safeguarding Enterprise Data",
      slug: "zero-trust-cybersecurity-architecture",
      excerpt: "Why perimeter defense is obsolete and how continuous identity verification protects high-value corporate assets.",
      body: `## Why Zero-Trust Is No Longer Optional

Traditional castle-and-moat security assumptions are invalid in today's remote and cloud-first operating environments. Zero-Trust operates on a simple principle: *Never trust, always verify*.

### Core Principles of Zero-Trust
- **Least Privilege Access**: Employees and microservices only have access to the exact resources required for their immediate tasks.
- **Continuous Multi-Factor Authentication**: Dynamic risk assessments verify tokens before every critical request.
- **End-to-End Encryption**: Data in transit and at rest is secured with state-of-the-art cryptographic standards.

Implementing these practices shields your business from credential compromise and lateral network attacks.`,
      coverImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200",
      category: "Cyber Security",
      author: {
        name: "Megan Palms",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400",
        role: "Online Director"
      },
      publishedAt: new Date("2026-02-02"),
      isPublished: true,
      readTime: "5 min read",
      tags: ["Security", "Zero-Trust", "Compliance"],
      commentsCount: 2
    },
    {
      title: "Maximizing ROI Through Intelligent Business IT Consulting",
      slug: "maximizing-roi-through-it-consulting",
      excerpt: "How aligning technology initiatives with core business goals reduces operational overhead by up to 40%.",
      body: `## Transforming IT from Cost Center to Growth Engine

Technology investments should never happen in isolation. Strategic IT consulting empowers leadership to identify bottlenecks and automate repetitive workflows.

### Measurable Impacts of Strategic IT Integration
- **Reduced Infrastructure Overhead**: Eliminate zombie servers and optimize cloud reservations.
- **Accelerated Team Onboarding**: Centralize internal documentation and standardize developer tooling.
- **Proactive Disaster Recovery**: Reduce Mean Time To Recovery (MTTR) from hours to minutes.`,
      coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200",
      category: "IT Consulting",
      author: {
        name: "David Sterling",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400",
        role: "Senior Consultant"
      },
      publishedAt: new Date("2026-02-18"),
      isPublished: true,
      readTime: "4 min read",
      tags: ["Consulting", "Strategy", "Management"],
      commentsCount: 6
    },
    {
      title: "Building High-Throughput Web Applications with Next.js & Turborepo",
      slug: "building-high-throughput-web-apps",
      excerpt: "A deep dive into monorepo structure, server-side caching, and modern web application performance.",
      body: `## High-Performance Frontend Architecture

Modern web experiences demand instantaneous page loads and seamless real-time interactions. By coupling Next.js with monorepo orchestration like Turborepo, engineering teams can share design systems and contracts seamlessly.

### Performance Highlights
- Incremental Static Regeneration (ISR)
- Edge API routes for low latency
- Reusable type-safe package distribution`,
      coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200",
      category: "Web Development",
      author: {
        name: "Michael Carter",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400",
        role: "Chief Solutions Architect"
      },
      publishedAt: new Date("2026-02-22"),
      isPublished: true,
      readTime: "7 min read",
      tags: ["NextJS", "TypeScript", "Frontend"],
      commentsCount: 3
    },
    {
      title: "Demystifying Managed IT Services: What Every CTO Should Know",
      slug: "demystifying-managed-it-services",
      excerpt: "Discover the tangible benefits of 24/7 outsourced IT operations, SLAs, and dedicated incident management.",
      body: `## Scalable IT Operations for Global Enterprises

When scaling a company, internal IT teams often get overwhelmed by tier-1 tickets and hardware maintenance. Managed IT services provide round-the-clock monitoring so your engineers can focus on product innovation.`,
      coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200",
      category: "Managed IT",
      author: {
        name: "Elena Rostova",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400",
        role: "Head of Infrastructure"
      },
      publishedAt: new Date("2026-02-25"),
      isPublished: true,
      readTime: "5 min read",
      tags: ["Managed Services", "Operations", "SLA"],
      commentsCount: 1
    },
    {
      title: "Data Protection and Disaster Recovery Strategies for 2026",
      slug: "data-protection-disaster-recovery-2026",
      excerpt: "Building resilient data backup pipelines and zero-downtime failover systems across geographically distributed regions.",
      body: `## Preparing for the Unexpected

System outages and data loss incidents can permanently damage customer trust. Establishing automated, immutable backups and testing recovery plans regularly ensures business continuity.`,
      coverImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200",
      category: "Data Security",
      author: {
        name: "David Sterling",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400",
        role: "Senior Consultant"
      },
      publishedAt: new Date("2026-02-27"),
      isPublished: true,
      readTime: "6 min read",
      tags: ["Data", "Disaster Recovery", "Backups"],
      commentsCount: 5
    }
  ];

  await PostModel.deleteMany({});
  await PostModel.insertMany(samplePosts);
  console.log(`✅ Seeded ${samplePosts.length} Blog Posts`);

  // 4. Seed Contact Messages
  const sampleMessages = [
    {
      name: "Jonathan Vance",
      email: "jvance@fintechglobal.com",
      subject: "Inquiry on Cloud Migration & Dedicated SLA",
      message: "We are looking to migrate our core transactional ledger to a hybrid cloud environment. Could you provide a timeline and estimated architecture overview?",
      isRead: false
    },
    {
      name: "Sophia Martinez",
      email: "smartinez@logisticspro.eu",
      subject: "SOC2 Compliance & Managed IT Partnership",
      message: "Our European logistics network requires 24/7 incident response and SOC2 compliance monitoring. We would like to schedule a discovery meeting.",
      isRead: true
    },
    {
      name: "Liam O'Connor",
      email: "liam@techstartup.io",
      subject: "Pricing Inquiry for Business Pro Tier",
      message: "Hi TechFirm team, we want to know if custom annual billing with invoice support is available for the Business Pro plan.",
      isRead: false
    }
  ];

  await MessageModel.deleteMany({});
  await MessageModel.insertMany(sampleMessages);
  console.log(`✅ Seeded ${sampleMessages.length} Contact Messages`);

  console.log("\n🎉 Full database seed completed successfully!");
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  mongoose.disconnect();
  process.exit(1);
});
