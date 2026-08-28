import * as bcrypt from "bcryptjs";
import * as dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: ".env" });
dotenv.config({ path: ".env.local" });

if (!process.env.MONGODB_URI) {
  throw new Error("❌ MONGODB_URI environment variable is required to run seed script.");
}

const MONGODB_URI: string = process.env.MONGODB_URI;

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
    buttonText: { type: String, default: "Get Started →" }
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
    phone: { type: String, default: "" },
    subject: { type: String, default: "" },
    service: { type: String, default: "" },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["unread", "read", "replied", "archived"],
      default: "unread"
    },
    replyNotes: { type: String, default: "" }
  },
  { timestamps: true }
);

const SiteConfigSchema = new mongoose.Schema(
  {
    siteName: { type: String, default: "TechFirm" },
    siteLogo: {
      type: String,
      default: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200"
    },
    tagline: { type: String, default: "IT SOLUTION COMPANY" },
    contactEmail: { type: String, default: "contact@techfirm.com" },
    contactPhone: { type: String, default: "+1 (555) 234-5678" },
    workingHours: { type: String, default: "Mon - Fri: 9:00 AM - 6:00 PM" },
    address: { type: String, default: "1200 Tech Blvd, Suite 400, San Francisco, CA 94107" },
    socialLinks: {
      facebook: { type: String, default: "https://facebook.com" },
      twitter: { type: String, default: "https://twitter.com" },
      linkedin: { type: String, default: "https://linkedin.com" },
      instagram: { type: String, default: "https://instagram.com" },
      github: { type: String, default: "https://github.com" }
    },
    topBar: {
      announcement: {
        type: String,
        default: "24/7 Managed Cloud Support & Zero-Trust IT Services"
      },
      isVisible: { type: Boolean, default: true }
    },
    ctaBand: {
      title: { type: String, default: "Ready to Launch with Techfirm?" },
      subtitle: {
        type: String,
        default:
          "Start hosting with lightning speed, built-in security, and real support — in just a few clicks."
      },
      buttonText: { type: String, default: "7-Day Free Trial" },
      buttonHref: { type: String, default: "#pricing" },
      badges: [{ type: String }]
    },
    footer: {
      copyrightText: { type: String, default: "Copyright @2026 BizanTheme All Rights Reserved" },
      collaborateLinks: [{ label: String, href: String }],
      myAccountLinks: [{ label: String, href: String }],
      serviceLinks: [{ label: String, href: String }],
      bottomLinks: [{ label: String, href: String }]
    }
  },
  { timestamps: true }
);

const TestimonialSchema = new mongoose.Schema(
  {
    quote: { type: String, required: true },
    authorName: { type: String, required: true },
    authorRole: { type: String, required: true },
    company: { type: String, default: "" },
    avatar: { type: String, required: true },
    rating: { type: Number, default: 5 },
    tags: [{ type: String }],
    hasVideo: { type: Boolean, default: false },
    videoUrl: { type: String, default: "" },
    posterImage: { type: String, default: "" },
    iconBg: { type: String, default: "bg-linear-to-br from-[#00C0FA] to-[#007BFE]" },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const FaqSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    category: { type: String, default: "General" },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const TeamMemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    bio: { type: String, default: "" },
    photo: { type: String, required: true },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    socialLinks: {
      facebook: { type: String, default: "" },
      twitter: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      instagram: { type: String, default: "" },
      github: { type: String, default: "" }
    },
    skills: [{ type: String }],
    experience: { type: String, default: "" },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const PortfolioItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    subtitle: { type: String, default: "" },
    category: { type: String, default: "Technology" },
    industry: { type: String, default: "" },
    overview: { type: String, default: "" },
    image: { type: String, required: true },
    bgImage: { type: String, default: "" },
    isDark: { type: Boolean, default: false },
    actionText: { type: String, default: "Lounge Project" },
    challengeText: [{ type: String }],
    solutionText: [{ type: String }],
    results: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true }
      }
    ],
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);
const PlanModel = mongoose.models.Plan || mongoose.model("Plan", PlanSchema);
const PostModel = mongoose.models.Post || mongoose.model("Post", PostSchema);
const MessageModel =
  mongoose.models.ContactMessage || mongoose.model("ContactMessage", ContactMessageSchema);
const SiteConfigModel =
  mongoose.models.SiteConfig || mongoose.model("SiteConfig", SiteConfigSchema);
const TestimonialModel =
  mongoose.models.Testimonial || mongoose.model("Testimonial", TestimonialSchema);
const FaqModel = mongoose.models.Faq || mongoose.model("Faq", FaqSchema);
const TeamMemberModel =
  mongoose.models.TeamMember || mongoose.model("TeamMember", TeamMemberSchema);
const PortfolioItemModel =
  mongoose.models.PortfolioItem || mongoose.model("PortfolioItem", PortfolioItemSchema);

async function seed() {
  console.log("🌱 Starting Full TechFirm Database Seed...");
  console.log(`Connecting to MongoDB at: ${MONGODB_URI}`);

  await mongoose.connect(MONGODB_URI);

  const salt = await bcrypt.genSalt(10);
  const adminPassword = "Admin123!";
  const hashedAdminPassword = await bcrypt.hash(adminPassword, salt);
  const userPassword = "User1234!";
  const hashedUserPassword = await bcrypt.hash(userPassword, salt);

  // 1. Seed Users
  await UserModel.deleteMany({});
  await UserModel.insertMany([
    {
      name: "TechFirm Admin",
      email: "admin@techfirm.com",
      password: hashedAdminPassword,
      role: "admin"
    },
    {
      name: "Default Admin",
      email: "admin@example.com",
      password: hashedAdminPassword,
      role: "admin"
    },
    {
      name: "Alex Johnson",
      email: "engineer@techfirm.com",
      password: hashedUserPassword,
      role: "user"
    },
    {
      name: "Diana Ross",
      email: "client@techfirm.com",
      password: hashedUserPassword,
      role: "user"
    }
  ]);
  console.log("✅ Seeded Admin & Demo Users");

  // 2. Seed Plans (1:1 with frontend hooks/use-plans.ts)
  const plans = [
    {
      name: "Free",
      price: 0,
      billingPeriod: "monthly",
      features: ["Single Payment", "Custom design & develop", "Selling your own items"],
      isPopular: false,
      isActive: true,
      order: 1,
      description: "For individuals and small teams with unlimited trial access.",
      buttonText: "Get Started →"
    },
    {
      name: "Advanced",
      price: 19,
      billingPeriod: "monthly",
      features: [
        "Single Payment",
        "Custom design & develop",
        "Selling your own items",
        "Custom design & develop",
        "Selling your own items"
      ],
      isPopular: true,
      isActive: true,
      order: 2,
      description: "For individuals and small teams with unlimited trial access.",
      buttonText: "Get Started →"
    },
    {
      name: "Enterprise",
      price: 99,
      billingPeriod: "monthly",
      features: [
        "Single Payment",
        "Custom design & develop",
        "Selling your own items",
        "Custom design & develop",
        "Selling your own items"
      ],
      isPopular: false,
      isActive: true,
      order: 3,
      description: "For individuals and small teams with unlimited trial access.",
      buttonText: "Get Started →"
    },
    {
      name: "Free",
      price: 0,
      billingPeriod: "annual",
      features: ["Single Payment", "Custom design & develop", "Selling your own items"],
      isPopular: false,
      isActive: true,
      order: 1,
      description: "For individuals and small teams with unlimited trial access.",
      buttonText: "Get Started →"
    },
    {
      name: "Advanced",
      price: 12,
      billingPeriod: "annual",
      features: [
        "Single Payment",
        "Custom design & develop",
        "Selling your own items",
        "Custom design & develop",
        "Selling your own items"
      ],
      isPopular: true,
      isActive: true,
      order: 2,
      description: "For individuals and small teams with unlimited trial access.",
      buttonText: "Get Started →"
    },
    {
      name: "Enterprise",
      price: 69,
      billingPeriod: "annual",
      features: [
        "Single Payment",
        "Custom design & develop",
        "Selling your own items",
        "Custom design & develop",
        "Selling your own items"
      ],
      isPopular: false,
      isActive: true,
      order: 3,
      description: "For individuals and small teams with unlimited trial access.",
      buttonText: "Get Started →"
    }
  ];

  await PlanModel.deleteMany({});
  await PlanModel.insertMany(plans);
  console.log(`✅ Seeded ${plans.length} Pricing Plans`);

  // 3. Seed Posts (1:1 with frontend components/blog/blog-data.ts)
  const posts = [
    {
      id: "1",
      slug: "future-of-technology-next-decade",
      title: "The Future of Technology: What to Expect in the Next Decade",
      excerpt:
        "It is a long established fact that a reader will be distracted by the readable content",
      body: `## The Next Decade in Enterprise Innovation\n\nTechnology is evolving at an unprecedented pace. From AI integration to decentralized cloud computing, organizations must modernize their architectural blueprints to maintain competitive advantage.\n\n### Key Transformation Themes\n- High-speed distributed edge computing\n- Autonomous agentic workflows\n- Zero-trust security by design\n\nInvesting in scalable, reliable infrastructure today sets the foundation for tomorrow's breakthroughs.`,
      coverImage:
        "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=1000&auto=format&fit=crop",
      category: "Technology",
      author: {
        name: "John Smith",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        role: "Author"
      },
      publishedAt: new Date("2026-01-05"),
      isPublished: true,
      readTime: "5 min read",
      tags: ["Technology", "Innovation", "Future"],
      commentsCount: 2
    },
    {
      id: "2",
      slug: "10-simple-habits-change-life",
      title: "10 Simple Habits That Will Change Your Life Forever",
      excerpt:
        "It is a long established fact that a reader will be distracted by the readable content",
      body: `## Building Sustainable Growth Habits\n\nSmall daily actions compound into monumental outcomes. Implementing structured routines, uninterrupted deep-work blocks, and proactive health boundaries allows leaders to operate at peak sustained performance.\n\n1. Prioritize deep work first thing in the morning.\n2. Automate repetitive digital tasks.\n3. Maintain continuous learning schedules.`,
      coverImage:
        "https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=1000&auto=format&fit=crop",
      category: "Technology",
      author: {
        name: "John Smith",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        role: "Author"
      },
      publishedAt: new Date("2026-01-05"),
      isPublished: true,
      readTime: "4 min read",
      tags: ["Productivity", "Habits", "Growth"],
      commentsCount: 2
    },
    {
      id: "3",
      slug: "beginners-guide-passive-income",
      title: "A Beginner's Guide to Building Passive Income Online",
      excerpt:
        "It is a long established fact that a reader will be distracted by the readable content",
      body: `## Unlocking Digital Revenue Streams\n\nBuilding automated online revenue requires creating systems that deliver continuous value. By leveraging cloud platforms, modern digital product storefronts, and automated subscription billing, technical creators can establish resilient businesses.`,
      coverImage:
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop",
      category: "Technology",
      author: {
        name: "John Smith",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        role: "Author"
      },
      publishedAt: new Date("2026-01-05"),
      isPublished: true,
      readTime: "6 min read",
      tags: ["Business", "Revenue", "Digital"],
      commentsCount: 2
    },
    {
      id: "4",
      slug: "why-minimalism-key-stress-free-life",
      title: "Why Minimalism is the Key to a Stress-Free Life",
      excerpt:
        "It is a long established fact that a reader will be distracted by the readable content",
      body: `## Simplicity in Code and Life\n\nMinimalism is not about having less; it's about making room for what truly matters. In software architecture, choosing clean, focused primitives reduces technical debt and maintenance friction significantly.`,
      coverImage:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop",
      category: "Technology",
      author: {
        name: "John Smith",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        role: "Author"
      },
      publishedAt: new Date("2026-01-05"),
      isPublished: true,
      readTime: "5 min read",
      tags: ["Minimalism", "Focus", "Engineering"],
      commentsCount: 2
    },
    {
      id: "5",
      slug: "top-15-travel-destinations",
      title: "Top 15 Travel Destinations You Must Visit Once",
      excerpt:
        "It is a long established fact that a reader will be distracted by the readable content",
      body: `## Remote Work & Global Exploration\n\nModern cloud-native tooling has unlocked the freedom for tech professionals to work securely from anywhere in the world. Explore our top curated destinations offering exceptional digital infrastructure.`,
      coverImage:
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000&auto=format&fit=crop",
      category: "Technology",
      author: {
        name: "John Smith",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        role: "Author"
      },
      publishedAt: new Date("2026-01-05"),
      isPublished: true,
      readTime: "7 min read",
      tags: ["Travel", "Remote Work", "Lifestyle"],
      commentsCount: 2
    },
    {
      id: "6",
      slug: "start-successful-online-business",
      title: "How to Start a Successful Online Business from Scratch",
      excerpt:
        "It is a long established fact that a reader will be distracted by the readable content",
      body: `## Zero to One: Launching Your Venture\n\nLaunching an online enterprise starts with validating user demand before writing extensive code. Discover how to build an MVP, establish customer feedback loops, and iterate rapidly toward product-market fit.`,
      coverImage:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop",
      category: "Technology",
      author: {
        name: "John Smith",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        role: "Author"
      },
      publishedAt: new Date("2026-01-05"),
      isPublished: true,
      readTime: "6 min read",
      tags: ["Startup", "Entrepreneurship", "Strategy"],
      commentsCount: 2
    },
    {
      id: "7",
      slug: "psychology-behind-productivity-focus",
      title: "The Psychology Behind Productivity and Focus",
      excerpt:
        "It is a long established fact that a reader will be distracted by the readable content",
      body: `## Cognitive Clarity for High-Stress Problem Solving\n\nUnderstanding cognitive load theory helps developers and managers structure sprints without triggering burnout. Learn how context switching impacts velocity and how to protect uninterrupted focus time.`,
      coverImage:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop",
      category: "Technology",
      author: {
        name: "John Smith",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        role: "Author"
      },
      publishedAt: new Date("2026-01-05"),
      isPublished: true,
      readTime: "5 min read",
      tags: ["Psychology", "Focus", "Efficiency"],
      commentsCount: 2
    },
    {
      id: "8",
      slug: "7-daily-routines-successful-people",
      title: "7 Daily Routines of Highly Successful People",
      excerpt:
        "It is a long established fact that a reader will be distracted by the readable content",
      body: `## Discipline and Consistent Execution\n\nHigh achievers across engineering, business, and design cultivate daily rituals that keep them aligned with strategic priorities. Discover how to incorporate structured reflection and wellness into your workweek.`,
      coverImage:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop",
      category: "Technology",
      author: {
        name: "John Smith",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        role: "Author"
      },
      publishedAt: new Date("2026-01-05"),
      isPublished: true,
      readTime: "4 min read",
      tags: ["Routines", "Leadership", "Success"],
      commentsCount: 2
    },
    {
      id: "9",
      slug: "ultimate-guide-personal-branding-2026",
      title: "The Ultimate Guide to Personal Branding in 2026",
      excerpt:
        "It is a long established fact that a reader will be distracted by the readable content",
      body: `## Establishing Authority in the Tech Industry\n\nYour online presence is your public portfolio. By consistently publishing technical insights, contributing to open source, and demonstrating architectural mastery, you unlock extraordinary career opportunities.`,
      coverImage:
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000&auto=format&fit=crop",
      category: "Technology",
      author: {
        name: "John Smith",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        role: "Author"
      },
      publishedAt: new Date("2026-01-05"),
      isPublished: true,
      readTime: "6 min read",
      tags: ["Branding", "Career", "Influence"],
      commentsCount: 2
    }
  ];

  await PostModel.deleteMany({});
  await PostModel.insertMany(posts);
  console.log(`✅ Seeded ${posts.length} Blog Posts`);

  // 4. Seed Testimonials (1:1 with frontend data/techfirm-data.ts)
  const testimonials = [
    {
      quote:
        "TechFirm migrated our entire core banking ledger to a hybrid cloud setup in less than 3 weeks without a single second of unexpected downtime. Their 24/7 support team is exceptional.",
      authorName: "Jonathan Vance",
      authorRole: "CTO",
      company: "Fintech Global Group",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
      rating: 5,
      tags: ["FinTech", "Cloud Migration"],
      hasVideo: false,
      videoUrl: "",
      posterImage: "",
      iconBg: "bg-linear-to-br from-[#00C0FA] to-[#007BFE]",
      order: 1,
      isActive: true
    },
    {
      quote:
        "The zero-trust security architecture TechFirm implemented passed our SOC2 Type II audit with flying colors. We feel completely confident in our compliance posture.",
      authorName: "Sophia Martinez",
      authorRole: "VP of Engineering",
      company: "Logistics Pro Europe",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200",
      rating: 5,
      tags: ["Security", "SOC2 Compliance"],
      hasVideo: true,
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      posterImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800",
      iconBg: "bg-linear-to-br from-[#34D399] to-[#059669]",
      order: 2,
      isActive: true
    },
    {
      quote:
        "Our cloud hosting bill was reduced by 35% in month one, while our application throughput doubled. Working with TechFirm has been one of our highest-ROI decisions.",
      authorName: "Alexander Becker",
      authorRole: "Head of Operations",
      company: "CloudScale SaaS",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200",
      rating: 5,
      tags: ["Cost Optimization", "Performance"],
      hasVideo: false,
      videoUrl: "",
      posterImage: "",
      iconBg: "bg-linear-to-br from-[#8B5CF6] to-[#6D28D9]",
      order: 3,
      isActive: true
    }
  ];

  await TestimonialModel.deleteMany({});
  await TestimonialModel.insertMany(testimonials);
  console.log(`✅ Seeded ${testimonials.length} Testimonials`);

  // 5. Seed FAQs (1:1 with frontend data/techfirm-data.ts)
  const faqs = [
    {
      question: "How do I know if I need a consultant?",
      answer:
        "If your internal IT team spends more time fighting fires than shipping features, or if you are planning a cloud migration, compliance audit (SOC2/GDPR), or infrastructure scaling, our consultants help save up to 40% in operational costs while preventing catastrophic downtime.",
      category: "General",
      order: 1,
      isActive: true
    },
    {
      question: "What is your typical onboarding timeline for Managed IT?",
      answer:
        "Most organizations are fully onboarded within 5 to 10 business days. This includes network telemetry mapping, credential vaulting, automated monitoring setup, and an initial security vulnerability assessment.",
      category: "Services",
      order: 2,
      isActive: true
    },
    {
      question: "What uptime and response time SLAs do you guarantee?",
      answer:
        "Our Enterprise agreements guarantee a 99.99% infrastructure uptime SLA and a maximum 15-minute response time for critical severity-1 incidents, backed by financially enforceable service credits.",
      category: "Support",
      order: 3,
      isActive: true
    },
    {
      question: "Can I customize or upgrade my pricing plan later?",
      answer:
        "Yes, you can scale resources up or down at any time with prorated billing. You can also switch between monthly and annual billing with a single click from the customer portal.",
      category: "Pricing",
      order: 4,
      isActive: true
    },
    {
      question: "How do you protect sensitive company data during migrations?",
      answer:
        "All data transfers use TLS 1.3 encryption with AES-256 encryption at rest. We utilize dedicated secure point-to-point tunnels and execute zero-data-loss validation checkpoints prior to final cutover.",
      category: "Security",
      order: 5,
      isActive: true
    }
  ];

  await FaqModel.deleteMany({});
  await FaqModel.insertMany(faqs);
  console.log(`✅ Seeded ${faqs.length} FAQ Items`);

  // 6. Seed Team Members (1:1 with frontend data/techfirm-data.ts & components/team/team-data.ts)
  const teamMembers = [
    {
      name: "Michael Carter",
      slug: "michael-carter",
      role: "Chief Solutions Architect",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800",
      bio: "Over 15 years leading enterprise cloud transformations, Kubernetes cluster deployments, and hybrid cloud migrations across North America and Europe.",
      email: "m.carter@techfirm.com",
      phone: "+1 (555) 019-2834",
      socialLinks: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        github: "https://github.com"
      },
      skills: ["Cloud Architecture", "Kubernetes", "DevOps", "Terraform"],
      experience: "15+ Years",
      order: 1,
      isActive: true
    },
    {
      name: "Megan Palms",
      slug: "megan-palms",
      role: "Online Director",
      photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800",
      bio: "Specialist in digital product direction, enterprise UX strategy, and global customer success operations.",
      email: "m.palms@techfirm.com",
      phone: "+1 (555) 019-2835",
      socialLinks: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com"
      },
      skills: ["Product Strategy", "UX Architecture", "Agile Operations"],
      experience: "12+ Years",
      order: 2,
      isActive: true
    },
    {
      name: "David Sterling",
      slug: "david-sterling",
      role: "Senior IT Consultant",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800",
      bio: "Advising Fortune 500 leadership on technology modernization, cloud cost containment, and operational resilience.",
      email: "d.sterling@techfirm.com",
      phone: "+1 (555) 019-2836",
      socialLinks: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com"
      },
      skills: ["IT Consulting", "Cost Optimization", "FinOps"],
      experience: "14+ Years",
      order: 3,
      isActive: true
    },
    {
      name: "Elena Rostova",
      slug: "elena-rostova",
      role: "Head of Infrastructure",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800",
      bio: "Directing 24/7 global datacenter monitoring, automated incident triage, and carrier-grade networking.",
      email: "e.rostova@techfirm.com",
      phone: "+1 (555) 019-2837",
      socialLinks: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        github: "https://github.com"
      },
      skills: ["Datacenter Ops", "High Availability", "SDN Networking"],
      experience: "11+ Years",
      order: 4,
      isActive: true
    },
    {
      name: "Marcus Chen",
      slug: "marcus-chen",
      role: "Cyber Security Lead",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800",
      bio: "Certified ethical hacker and CISSP professional securing multi-tenant clouds and banking transaction ledgers.",
      email: "m.chen@techfirm.com",
      phone: "+1 (555) 019-2838",
      socialLinks: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        github: "https://github.com"
      },
      skills: ["Zero Trust", "Penetration Testing", "SOC 2 & GDPR"],
      experience: "10+ Years",
      order: 5,
      isActive: true
    },
    {
      name: "Olivia Vance",
      slug: "olivia-vance",
      role: "Product Engineering Manager",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800",
      bio: "Spearheading modern agile web apps, full-stack microservices, and design system engineering.",
      email: "o.vance@techfirm.com",
      phone: "+1 (555) 019-2839",
      socialLinks: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        github: "https://github.com"
      },
      skills: ["Next.js", "NestJS", "Microservices", "Design Systems"],
      experience: "9+ Years",
      order: 6,
      isActive: true
    },
    {
      name: "Sarah Jenkins",
      slug: "sarah-jenkins",
      role: "DevOps & CI/CD Specialist",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800",
      bio: "Automating cloud infrastructure with Terraform, GitHub Actions, Docker, and Kubernetes.",
      email: "s.jenkins@techfirm.com",
      phone: "+1 (555) 019-2840",
      socialLinks: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        github: "https://github.com"
      },
      skills: ["CI/CD Pipelines", "Docker", "Ansible", "Kubernetes"],
      experience: "8+ Years",
      order: 7,
      isActive: true
    },
    {
      name: "Lucas Meyer",
      slug: "lucas-meyer",
      role: "Senior Database Administrator",
      photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800",
      bio: "Expert in distributed PostgreSQL, MongoDB sharding, caching architectures, and zero-data-loss failover.",
      email: "l.meyer@techfirm.com",
      phone: "+1 (555) 019-2841",
      socialLinks: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        github: "https://github.com"
      },
      skills: ["PostgreSQL", "MongoDB", "Redis Caching", "DB Clustering"],
      experience: "13+ Years",
      order: 8,
      isActive: true
    }
  ];

  await TeamMemberModel.deleteMany({});
  await TeamMemberModel.insertMany(teamMembers);
  console.log(`✅ Seeded ${teamMembers.length} Team Members`);

  // 7. Seed Portfolio & Case Studies (1:1 with frontend components/portfolio/portfolio-data.ts)
  const portfolioItems = [
    {
      id: "arc",
      slug: "arc-intuitive-education-app",
      category: "Technology",
      industry: "Education & E-Learning",
      title: "Maximizing Efficiency with Proper Technology Implementation – Coffee Success Story",
      subtitle: "An elegant and intuitive education app that helps learners",
      overview:
        "Paysafe provides payment solutions that power the everyday. The multinational organisation operates multiple brands across the e-cash, payments processing and digital wallets spectrum, serving over 145 million customers of varying size and scale.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200",
      bgImage: "",
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
          description:
            "We know that every businesses' needs are completely different from the next."
        },
        {
          title: "Your Team Productive",
          description:
            "Our managed services include round-the-clock monitoring of your key infrastructure, computer."
        },
        {
          title: "Predictable Costs 24/7",
          description:
            "We doesn't charge you more when your network is down or a server fails. Our flat-rate fee programs."
        },
        {
          title: "Our Team is Ready to Help",
          description:
            "Part of what makes our managed services so exceptional is that we are always available."
        }
      ],
      order: 1,
      isActive: true
    },
    {
      id: "aarex",
      slug: "aarex-convenience-savings-rewards",
      category: "Technology",
      industry: "Retail & FinTech",
      title: "Convenience, savings and rewards at your fingertips",
      overview:
        "Aarex transforms consumer loyalty through frictionless mobile point-of-sale integrations and automated cashback rewards processing.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200",
      bgImage: "",
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
          description:
            "Zero downtime achieved throughout Black Friday and Cyber Week peak load surges."
        },
        {
          title: "10x Throughput",
          description: "Processed over 2.4 million transactions per day seamlessly."
        },
        {
          title: "Reduced Hosting Costs",
          description:
            "Optimized cloud server utilization saving 38% in monthly compute expenditure."
        },
        {
          title: "24/7 Monitoring",
          description: "Automated telemetry with instantaneous anomaly detection."
        }
      ],
      order: 2,
      isActive: true
    },
    {
      id: "acce",
      slug: "acce-private-trust-trading-platform",
      category: "Technology",
      industry: "Banks & Insurance",
      title: "Private trust management and trading platform",
      overview:
        "Acce powers institutional wealth management, asset custody, and multi-tenant portfolio trading platforms.",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200",
      bgImage: "",
      isDark: false,
      actionText: "Lounge Project",
      order: 3,
      isActive: true
    },
    {
      id: "abc",
      slug: "abc-strategic-ai-application-public",
      category: "Technology",
      industry: "Public Sector & AI",
      title: "Strategic Move to an AI-supported application for Public",
      overview:
        "ABC modernizes public utility infrastructure using automated AI-driven load predictions and automated anomaly resolution.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200",
      bgImage: "",
      isDark: false,
      actionText: "Lounge Project",
      order: 4,
      isActive: true
    },
    {
      id: "frea",
      slug: "frea-optimising-future-proofing",
      category: "Technology",
      industry: "Cloud Engineering",
      title: "Building, optimising, and future-proofing existing",
      overview:
        "Frea re-engineers legacy server workflows into modern serverless architectures with robust CI/CD pipelines.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200",
      bgImage: "",
      isDark: false,
      actionText: "Lounge Project",
      order: 5,
      isActive: true
    },
    {
      id: "raze",
      slug: "raze-insurance-big-data-savings",
      category: "Technology",
      industry: "Enterprise Insurance",
      title: "Major Insurance Provider Saves $750k per Month With Big Data",
      overview:
        "Raze unlocks predictive risk models and real-time claim verification pipelines for top-tier insurance underwriters.",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200",
      bgImage: "",
      isDark: true,
      actionText: "Lounge Project",
      order: 6,
      isActive: true
    }
  ];

  await PortfolioItemModel.deleteMany({});
  await PortfolioItemModel.insertMany(portfolioItems);
  console.log(`✅ Seeded ${portfolioItems.length} Portfolio & Case Studies`);

  // 8. Seed Site Configuration Singleton
  await SiteConfigModel.findOneAndUpdate(
    {},
    {
      $set: {
        siteName: "TechFirm",
        siteLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200",
        tagline: "IT SOLUTION COMPANY",
        contactEmail: "contact@techfirm.com",
        contactPhone: "+1 (555) 234-5678",
        workingHours: "Mon - Fri: 9:00 AM - 6:00 PM",
        address: "1200 Tech Blvd, Suite 400, San Francisco, CA 94107",
        socialLinks: {
          facebook: "https://facebook.com",
          twitter: "https://twitter.com",
          linkedin: "https://linkedin.com",
          instagram: "https://instagram.com",
          github: "https://github.com"
        },
        topBar: {
          announcement: "24/7 Managed Cloud Support & Zero-Trust IT Services",
          isVisible: true
        },
        ctaBand: {
          title: "Ready to Launch with Techfirm?",
          subtitle:
            "Start hosting with lightning speed, built-in security, and real support — in just a few clicks.",
          buttonText: "7-Day Free Trial",
          buttonHref: "#pricing",
          badges: ["Lightning Speed", "Ironclad Security", "Scalable Hosting"]
        },
        footer: {
          copyrightText: "Copyright @2026 BizanTheme All Rights Reserved",
          collaborateLinks: [
            { label: "Partners", href: "#" },
            { label: "Partners Program", href: "#" },
            { label: "Affiliate Program", href: "#" },
            { label: "Community", href: "#" },
            { label: "HR Partner Program", href: "#" }
          ],
          myAccountLinks: [
            { label: "Company", href: "/about" },
            { label: "Customer Success", href: "/portfolio" },
            { label: "Resources", href: "/blog" },
            { label: "Talk an Expert", href: "/contact" }
          ],
          serviceLinks: [
            { label: "Software Development", href: "/services" },
            { label: "Cloud Services", href: "/services" },
            { label: "AI Machine Learning", href: "/services" },
            { label: "Data Security", href: "/services" },
            { label: "Managed IT Support", href: "/services" }
          ],
          bottomLinks: [
            { label: "Faqs", href: "/faqs" },
            { label: "Setting", href: "#" },
            { label: "Privacy", href: "/privacy" },
            { label: "Contact", href: "/contact" }
          ]
        }
      }
    },
    { upsert: true, new: true }
  );
  console.log("✅ Seeded Site Configuration Singleton");

  // 9. Seed Contact Messages
  const contactMessages = [
    {
      name: "David Sterling",
      email: "d.sterling@fintechcorp.io",
      phone: "+1 (555) 234-8901",
      subject: "Multi-Cloud Migration Consultation",
      service: "cloud-hosting",
      message:
        "We are currently evaluating solutions to migrate our core payment clearing systems to a multi-region cloud cluster. We need 99.999% SLA guarantees and compliance guidance.",
      isRead: false,
      status: "unread",
      replyNotes: ""
    },
    {
      name: "Elena Rostova",
      email: "elena@healthdata.org",
      phone: "+1 (555) 789-0123",
      subject: "Zero-Trust Security Infrastructure Audit",
      service: "cyber-security",
      message:
        "Hello TechFirm team, our healthcare analytics network needs a comprehensive zero-trust penetration audit before our upcoming ISO 27001 renewal. Please send pricing tiers.",
      isRead: false,
      status: "unread",
      replyNotes: ""
    },
    {
      name: "James Wilson",
      email: "j.wilson@retailscale.com",
      phone: "+1 (555) 456-7890",
      subject: "DevOps Pipeline Automation for Black Friday",
      service: "devops",
      message:
        "Our e-commerce store experiences intense traffic surges every Q4. We need help setting up automated Kubernetes autoscaling and Canary deployments.",
      isRead: true,
      status: "replied",
      replyNotes: "Shared our cloud architect consultation booking calendar on Jan 24."
    },
    {
      name: "Sophia Martinez",
      email: "sophia@venturecap.ai",
      phone: "+1 (555) 678-9012",
      subject: "24/7 Managed IT Support Contract",
      service: "managed-it",
      message:
        "Inquiring about your 24/7 dedicated managed support SLA for 50 remote engineering workstations across North America and Europe.",
      isRead: true,
      status: "read",
      replyNotes: "Awaiting client response to preliminary quote."
    }
  ];

  await MessageModel.deleteMany({});
  await MessageModel.insertMany(contactMessages);
  console.log(`✅ Seeded ${contactMessages.length} Contact Messages`);

  console.log("\n🎉 Full database seed completed successfully with 1:1 frontend parity!");
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  mongoose.disconnect();
  process.exit(1);
});
