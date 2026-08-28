import { z } from "zod";

export const userRoleEnum = z.enum(["admin", "user"]);

/**
 * Authentication validation schemas
 */
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters")
});

/**
 * User management schemas
 */
export const createUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: userRoleEnum.default("user"),
  isActive: z.boolean().default(true)
});

export const updateUserSchema = z.object({
  name: z.string().min(2).max(50).optional(),
  email: z.string().email("Invalid email address").optional(),
  role: userRoleEnum.optional(),
  password: z.string().min(8).optional(),
  isActive: z.boolean().optional()
});

export const updateUserRoleSchema = z.object({
  role: userRoleEnum
});

export const queryUsersSchema = z.object({
  role: z.enum(["admin", "user"]).optional(),
  isActive: z.enum(["true", "false"]).optional(),
  search: z.string().optional(),
  limit: z.coerce.number().min(1).max(100).optional(),
  page: z.coerce.number().min(1).optional()
});

/**
 * Pagination query schema
 */
export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
  search: z.string().optional(),
  category: z.string().optional(),
  billingPeriod: z.enum(["monthly", "annual"]).optional()
});

/**
 * Plans validation schemas
 */
export const billingPeriodEnum = z.enum(["monthly", "annual"]);

export const createPlanSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  price: z.number().min(0, "Price must be non-negative"),
  billingPeriod: billingPeriodEnum.default("monthly"),
  features: z.array(z.string()).min(1, "At least one feature is required"),
  isPopular: z.boolean().default(false),
  isActive: z.boolean().default(true),
  order: z.number().int().default(0),
  description: z.string().optional(),
  buttonText: z.string().optional().default("Get Started")
});

export const updatePlanSchema = createPlanSchema.partial();

/**
 * Posts validation schemas
 */
export const createPostSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters").optional(),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters"),
  body: z.string().min(20, "Body must be at least 20 characters"),
  coverImage: z.string().min(1, "Cover image is required"),
  category: z.string().min(2, "Category is required"),
  author: z.object({
    name: z.string().min(2, "Author name is required"),
    avatar: z.string().optional(),
    role: z.string().optional()
  }),
  publishedAt: z.union([z.string(), z.date()]).optional(),
  isPublished: z.boolean().default(true),
  readTime: z.string().optional().default("5 min read"),
  tags: z.array(z.string()).optional().default([])
});

export const updatePostSchema = createPostSchema.partial();

/**
 * Contact Message validation schemas (Collection, Inbound)
 */
export const createContactMessageSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please provide a valid email address"),
  phone: z.string().optional().default(""),
  subject: z.string().optional().default(""),
  service: z.string().optional().default(""),
  message: z.string().min(5, "Message must be at least 5 characters")
});

export const updateContactMessageSchema = z.object({
  isRead: z.boolean().optional(),
  status: z.enum(["unread", "read", "replied", "archived"]).optional(),
  replyNotes: z.string().optional()
});

export const queryContactMessagesSchema = z.object({
  isRead: z.enum(["true", "false"]).optional(),
  status: z.enum(["unread", "read", "replied", "archived"]).optional(),
  search: z.string().optional(),
  limit: z.coerce.number().min(1).max(100).optional(),
  page: z.coerce.number().min(1).optional()
});

/**
 * Site Configuration validation schemas (Singleton)
 */
export const footerLinkSchema = z.object({
  label: z.string().min(1, "Label is required"),
  href: z.string().min(1, "Link URL is required")
});

export const socialLinksSchema = z.object({
  facebook: z.string().optional(),
  twitter: z.string().optional(),
  linkedin: z.string().optional(),
  instagram: z.string().optional(),
  github: z.string().optional()
});

export const topBarConfigSchema = z.object({
  announcement: z.string().optional().default(""),
  isVisible: z.boolean().default(true)
});

export const ctaBandConfigSchema = z.object({
  title: z.string().min(2, "Title is required"),
  subtitle: z.string().min(2, "Subtitle is required"),
  buttonText: z.string().min(1, "Button text is required"),
  buttonHref: z.string().min(1, "Button href is required"),
  badges: z.array(z.string()).default([])
});

export const footerConfigSchema = z.object({
  copyrightText: z.string().min(2, "Copyright text is required"),
  collaborateLinks: z.array(footerLinkSchema).default([]),
  myAccountLinks: z.array(footerLinkSchema).default([]),
  serviceLinks: z.array(footerLinkSchema).default([]),
  bottomLinks: z.array(footerLinkSchema).default([])
});

export const updateSiteConfigSchema = z.object({
  siteName: z.string().min(2, "Site name is required").optional(),
  siteLogo: z.string().min(1, "Site logo URL is required").optional(),
  tagline: z.string().optional(),
  contactEmail: z.string().email("Invalid contact email").optional(),
  contactPhone: z.string().min(3, "Contact phone is required").optional(),
  workingHours: z.string().optional(),
  address: z.string().optional(),
  socialLinks: socialLinksSchema.optional(),
  topBar: topBarConfigSchema.optional(),
  ctaBand: ctaBandConfigSchema.optional(),
  footer: footerConfigSchema.optional()
});

/**
 * Testimonial validation schemas (Collection)
 */
export const createTestimonialSchema = z.object({
  quote: z.string().min(5, "Quote must be at least 5 characters"),
  authorName: z.string().min(2, "Author name is required"),
  authorRole: z.string().min(2, "Author role is required"),
  company: z.string().optional().default(""),
  avatar: z.string().min(1, "Avatar URL is required"),
  rating: z.number().min(1).max(5).default(5),
  tags: z.array(z.string()).default([]),
  hasVideo: z.boolean().default(false),
  videoUrl: z.string().optional().default(""),
  posterImage: z.string().optional().default(""),
  iconBg: z.string().optional().default("bg-linear-to-br from-[#00C0FA] to-[#007BFE]"),
  order: z.number().default(0),
  isActive: z.boolean().default(true)
});

export const updateTestimonialSchema = createTestimonialSchema.partial();

export const queryTestimonialsSchema = z.object({
  isActive: z.enum(["true", "false"]).optional(),
  limit: z.coerce.number().min(1).max(100).optional(),
  page: z.coerce.number().min(1).optional()
});

/**
 * FAQ validation schemas (Collection)
 */
export const createFaqSchema = z.object({
  question: z.string().min(5, "Question must be at least 5 characters"),
  answer: z.string().min(10, "Answer must be at least 10 characters"),
  category: z.string().min(2, "Category is required").default("General"),
  order: z.number().default(0),
  isActive: z.boolean().default(true)
});

export const updateFaqSchema = createFaqSchema.partial();

export const queryFaqsSchema = z.object({
  category: z.string().optional(),
  isActive: z.enum(["true", "false"]).optional(),
  search: z.string().optional(),
  limit: z.coerce.number().min(1).max(100).optional(),
  page: z.coerce.number().min(1).optional()
});

/**
 * Team Member validation schemas (Collection)
 */
export const createTeamMemberSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  role: z.string().min(2, "Role is required"),
  bio: z.string().optional().default(""),
  photo: z.string().min(1, "Photo URL is required"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  phone: z.string().optional().default(""),
  socialLinks: socialLinksSchema.optional(),
  skills: z.array(z.string()).default([]),
  experience: z.string().optional().default(""),
  order: z.number().default(0),
  isActive: z.boolean().default(true)
});

export const updateTeamMemberSchema = createTeamMemberSchema.partial();

export const queryTeamMembersSchema = z.object({
  isActive: z.enum(["true", "false"]).optional(),
  search: z.string().optional(),
  limit: z.coerce.number().min(1).max(100).optional(),
  page: z.coerce.number().min(1).optional()
});

/**
 * Portfolio validation schemas (Collection)
 */
export const portfolioResultSchema = z.object({
  title: z.string().min(1, "Result title is required"),
  description: z.string().min(1, "Result description is required")
});

export const createPortfolioItemSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  subtitle: z.string().optional().default(""),
  category: z.string().min(2, "Category is required"),
  industry: z.string().optional().default(""),
  overview: z.string().optional().default(""),
  image: z.string().min(1, "Image URL is required"),
  bgImage: z.string().optional().default(""),
  isDark: z.boolean().default(false),
  actionText: z.string().optional().default("View Project"),
  challengeText: z.array(z.string()).default([]),
  solutionText: z.array(z.string()).default([]),
  results: z.array(portfolioResultSchema).default([]),
  order: z.number().default(0),
  isActive: z.boolean().default(true)
});

export const updatePortfolioItemSchema = createPortfolioItemSchema.partial();

export const queryPortfolioItemsSchema = z.object({
  category: z.string().optional(),
  isActive: z.enum(["true", "false"]).optional(),
  search: z.string().optional(),
  limit: z.coerce.number().min(1).max(100).optional(),
  page: z.coerce.number().min(1).optional()
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type UpdateUserRoleInput = z.infer<typeof updateUserRoleSchema>;
export type QueryUsersInput = z.infer<typeof queryUsersSchema>;
export type PaginationQueryInput = z.infer<typeof paginationQuerySchema>;
export type CreatePlanInput = z.infer<typeof createPlanSchema>;
export type UpdatePlanInput = z.infer<typeof updatePlanSchema>;
export type CreatePostInput = z.infer<typeof createPostSchema>;
export type UpdatePostInput = z.infer<typeof updatePostSchema>;
export type CreateContactMessageInput = z.infer<typeof createContactMessageSchema>;
export type UpdateContactMessageInput = z.infer<typeof updateContactMessageSchema>;
export type QueryContactMessagesInput = z.infer<typeof queryContactMessagesSchema>;
export type UpdateSiteConfigInput = z.infer<typeof updateSiteConfigSchema>;
export type CreateTestimonialInput = z.infer<typeof createTestimonialSchema>;
export type UpdateTestimonialInput = z.infer<typeof updateTestimonialSchema>;
export type QueryTestimonialsInput = z.infer<typeof queryTestimonialsSchema>;
export type CreateFaqInput = z.infer<typeof createFaqSchema>;
export type UpdateFaqInput = z.infer<typeof updateFaqSchema>;
export type QueryFaqsInput = z.infer<typeof queryFaqsSchema>;
export type CreateTeamMemberInput = z.infer<typeof createTeamMemberSchema>;
export type UpdateTeamMemberInput = z.infer<typeof updateTeamMemberSchema>;
export type QueryTeamMembersInput = z.infer<typeof queryTeamMembersSchema>;
export type CreatePortfolioItemInput = z.infer<typeof createPortfolioItemSchema>;
export type UpdatePortfolioItemInput = z.infer<typeof updatePortfolioItemSchema>;
export type QueryPortfolioItemsInput = z.infer<typeof queryPortfolioItemsSchema>;
