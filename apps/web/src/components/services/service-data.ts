export interface ServiceDetail {
  id: string;
  slug: string;
  title: string;
  heroSubtitle: string;
  productivityTitle: string;
  productivityDescription: string;
  bullets1: string[];
  financesTitle: string;
  financesParagraphs: string[];
  metrics: {
    stat1: string;
    label1: string;
    stat2: string;
    label2: string;
  };
  summaryText: string;
  bullets2: string[];
  results: {
    title: string;
    description: string;
  }[];
}

export const servicesData: ServiceDetail[] = [
  {
    id: "smart-integration",
    slug: "smart-integration",
    title: "Smart Integration",
    heroSubtitle:
      "Are you busy putting out IT fires instead of focusing on your core business? If your technology is draining resources rather than optimizing them",
    productivityTitle: "Boost productivity & track performance across every industry.",
    productivityDescription:
      "Superior Space offers a seamless design experience that accelerates website development.",
    bullets1: [
      "Comprehensive Documentation for Easy Setup",
      "End-to-End Data Encryption for Security",
      "Multi-channel management"
    ],
    financesTitle: "All Your Business Finances",
    financesParagraphs: [
      "Are you busy putting out IT fires instead of focusing on your core business? If your technology is draining resources rather than optimizing them, Netsurit can get you back on track. A professionally managed services provider can give you the decisive edge to: If your technology is draining resources rather than optimizing them.",
      "Your experts come with proven track records to make your working relationship of data-driven insights. If your technology is draining resources rather than optimizing them, we can get you back on track. A professionally managed services provider."
    ],
    metrics: {
      stat1: "36%",
      label1: "Many shoppers prioritize finding quicker.",
      stat2: "34K",
      label2: "Your shoppers prioritize finding sports."
    },
    summaryText:
      "Are you busy putting out IT fires instead of focusing on your core business? If your technology is draining resources rather than optimizing them, Netsurit can get you back on track. A professionally managed services provider can give you the decisive edge to: If your technology is draining resources rather than optimizing them.",
    bullets2: [
      "Grow your business while our experts handle your technology.",
      "Get more done with information technology that increases productivity",
      "Eliminate budgeting surprises with a flat monthly rate.",
      "Protect your business and your data from unexpected problems"
    ],
    results: [
      {
        title: "IT Service for You",
        description: "We know that every businesses' needs are completely different from the next."
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
    ]
  },
  {
    id: "problem-resolutions",
    slug: "problem-resolutions",
    title: "Problem Resolutions",
    heroSubtitle:
      "Rapidly diagnose root cause performance bottlenecks and implement resilient automated healing across all cloud clusters.",
    productivityTitle: "Automated Incident Remediation & Zero-Downtime Resilience",
    productivityDescription:
      "Proactive automated diagnostics that remediate infrastructure faults before users experience disruptions.",
    bullets1: [
      "Real-time cluster telemetry and log aggregation",
      "Automated failover and self-healing worker pools",
      "Zero-latency anomaly notification dispatch"
    ],
    financesTitle: "Minimize Outage Costs & Maximize Uptime",
    financesParagraphs: [
      "Unplanned outages cost modern digital enterprises thousands of dollars per minute. Our automated resolution platform detects micro-spikes and heals deadlocks in real-time.",
      "With 24/7 autonomous monitoring and continuous health-checking, your systems stay resilient even under heavy unpredictable traffic surges."
    ],
    metrics: {
      stat1: "99.99%",
      label1: "Continuous automated uptime SLA.",
      stat2: "15ms",
      label2: "Average automated healing response time."
    },
    summaryText:
      "Transition from reactive firefighting to deterministic, automated platform reliability with TechFirm's problem resolution frameworks.",
    bullets2: [
      "Automate 90% of routine maintenance and patching workflows.",
      "Eliminate cascading outages with circuit-breaker architectures.",
      "Predict capacity limits 30 days before hardware bottlenecks occur.",
      "Receive round-the-clock proactive SLA defense from certified architects."
    ],
    results: [
      {
        title: "IT Service for You",
        description: "We know that every businesses' needs are completely different from the next."
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
    ]
  },
  {
    id: "data-analytics",
    slug: "data-analytics",
    title: "Data Analytics",
    heroSubtitle:
      "Unleash actionable business intelligence through real-time telemetry streams, predictive pipeline modeling, and automated reporting.",
    productivityTitle: "Accelerate Data-Driven Decisions Across Your Enterprise",
    productivityDescription:
      "Turn fragmented database silos into unified real-time analytics pipelines with sub-second query latency.",
    bullets1: [
      "High-throughput real-time stream ingestion",
      "Interactive executive dashboards & BI integration",
      "Automated compliance and data integrity validation"
    ],
    financesTitle: "Actionable Operational Financial Metrics",
    financesParagraphs: [
      "Gain complete granular transparency into revenue streams, unit economics, and user retention metrics with custom automated reporting.",
      "Our pipelines empower cross-functional teams to make high-conviction decisions backed by clean, validated data."
    ],
    metrics: {
      stat1: "4.8x",
      label1: "Faster query execution on multi-terabyte datasets.",
      stat2: "100%",
      label2: "Data consistency guaranteed across regions."
    },
    summaryText:
      "Leverage modern enterprise data warehouse architectures that scale dynamically without exponential licensing overhead.",
    bullets2: [
      "Consolidate multiple legacy ERPs and CRMs into a single source of truth.",
      "Leverage ML-assisted forecasts for inventory and capacity planning.",
      "Ensure SOC2 and GDPR compliance with end-to-end data governance.",
      "Empower your analysts with self-serve query dashboards."
    ],
    results: [
      {
        title: "IT Service for You",
        description: "We know that every businesses' needs are completely different from the next."
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
    ]
  },
  {
    id: "increase-income",
    slug: "increase-income",
    title: "Increase Income",
    heroSubtitle:
      "Maximize digital customer lifetime value and conversion rates with high-speed server infrastructure and streamlined checkout funnels.",
    productivityTitle: "Convert Traffic Into High-Yield Recurring Revenue",
    productivityDescription:
      "Faster pages lead directly to higher conversion rates and lower checkout abandonment across global markets.",
    bullets1: [
      "Sub-100ms global Edge CDN caching",
      "Seamless multi-currency payment gateway integrations",
      "Dynamic A/B testing and checkout optimization"
    ],
    financesTitle: "Revenue Optimization & Growth Engineering",
    financesParagraphs: [
      "Every millisecond of latency reduction translates to measurable conversion uplift. We optimize full-stack request lifecycles from DNS to database.",
      "Our architects configure payment gateways with intelligent retries to eliminate false transaction declines."
    ],
    metrics: {
      stat1: "28%",
      label1: "Average increase in global checkout completion.",
      stat2: "$1.2M",
      label2: "Recovered annual revenue through smart retries."
    },
    summaryText:
      "Build a scalable commercial engine supported by battle-tested cloud hosting infrastructure that never slows down on peak sales days.",
    bullets2: [
      "Accelerate shopping cart checkout performance on mobile devices.",
      "Prevent cart abandonment with zero-friction checkout flows.",
      "Automate dynamic currency conversion and local tax compliance.",
      "Scale automatically during flash sales without server crashes."
    ],
    results: [
      {
        title: "IT Service for You",
        description: "We know that every businesses' needs are completely different from the next."
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
    ]
  },
  {
    id: "analytics-options",
    slug: "analytics-options",
    title: "Analytics options",
    heroSubtitle:
      "Customizable telemetry configurations, custom KPI tracking, and automated anomaly alerts tailored to your organization.",
    productivityTitle: "Flexible Analytics Tailored to Your Architecture",
    productivityDescription:
      "Choose from modular cloud telemetry options that integrate effortlessly with your existing monitoring stack.",
    bullets1: [
      "Granular log retention and query filtering",
      "Custom Prometheus & Grafana dashboard connectors",
      "Real-time alerting via Slack, PagerDuty, and Webhooks"
    ],
    financesTitle: "Transparent Resource Usage & Cost Allocation",
    financesParagraphs: [
      "Track cloud computing expenditure by department, microservice, or environment to eliminate wasted idle resources.",
      "Our granular attribution models allow leadership to forecast hosting budgets with precision."
    ],
    metrics: {
      stat1: "42%",
      label1: "Reduction in untracked cloud compute waste.",
      stat2: "24/7",
      label2: "Continuous metric sampling and alerts."
    },
    summaryText:
      "Gain full visibility into your server clusters, database queries, and network bottlenecks with customizable metric dashboards.",
    bullets2: [
      "Identify slow database queries before they impact end-users.",
      "Monitor API error rates with automated threshold alerts.",
      "Audit cloud security groups and IAM permissions automatically.",
      "Receive weekly executive summary reports with actionable recommendations."
    ],
    results: [
      {
        title: "IT Service for You",
        description: "We know that every businesses' needs are completely different from the next."
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
    ]
  },
  {
    id: "generated-income",
    slug: "generated-income",
    title: "Generated Income",
    heroSubtitle:
      "Unlock new digital revenue streams and automated monetization workflows with high-availability enterprise cloud platforms.",
    productivityTitle: "Scale Enterprise Revenue Streams with Unmatched Reliability",
    productivityDescription:
      "Build subscription billing, marketplace transactions, and API monetization platforms on fault-tolerant hosting.",
    bullets1: [
      "Automated subscription lifecycle and webhook processing",
      "Multi-tenant data isolation and metering",
      "Global tax and compliance automation"
    ],
    financesTitle: "End-to-End Monetization Infrastructure",
    financesParagraphs: [
      "Modern SaaS and digital products require resilient billing workflows that prevent involuntary churn from expired cards and failed webhooks.",
      "Our platforms ensure 100% webhook delivery guarantees and automated dunning management."
    ],
    metrics: {
      stat1: "99.99%",
      label1: "Payment webhook delivery success rate.",
      stat2: "3.2x",
      label2: "Increase in customer lifetime value."
    },
    summaryText:
      "Accelerate product monetization with enterprise-grade cloud servers engineered for continuous uptime and frictionless transactions.",
    bullets2: [
      "Automate recurring invoicing and revenue recognition.",
      "Integrate Stripe, PayPal, and regional payment methods seamlessly.",
      "Eliminate revenue leakage from unmonitored API usage.",
      "Scale from thousands to millions of paying subscribers effortlessly."
    ],
    results: [
      {
        title: "IT Service for You",
        description: "We know that every businesses' needs are completely different from the next."
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
    ]
  }
];

export function getServiceBySlug(slug: string): ServiceDetail {
  const match = servicesData.find((s) => s.slug === slug || s.id === slug);
  if (match) return match;

  // Fallback to default smart-integration service
  return {
    ...servicesData[0]!,
    slug: slug
  };
}
