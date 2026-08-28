import { ITeamMember } from "@repo/types";

export const defaultTeamMembers: ITeamMember[] = [
  {
    id: "default-1",
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
    id: "default-2",
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
    id: "default-3",
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
    id: "default-4",
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
    id: "default-5",
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
    id: "default-6",
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
    id: "default-7",
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
    id: "default-8",
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
