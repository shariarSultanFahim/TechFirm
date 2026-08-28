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
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters")
});

/**
 * User management schemas
 */
export const updateUserSchema = z.object({
  name: z.string().min(2).max(50).optional(),
  role: userRoleEnum.optional()
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
 * Contact Message validation schemas
 */
export const createContactMessageSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().optional(),
  message: z.string().min(5, "Message must be at least 5 characters")
});

export const updateContactMessageSchema = z.object({
  isRead: z.boolean().optional()
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type PaginationQueryInput = z.infer<typeof paginationQuerySchema>;
export type CreatePlanInput = z.infer<typeof createPlanSchema>;
export type UpdatePlanInput = z.infer<typeof updatePlanSchema>;
export type CreatePostInput = z.infer<typeof createPostSchema>;
export type UpdatePostInput = z.infer<typeof updatePostSchema>;
export type CreateContactMessageInput = z.infer<typeof createContactMessageSchema>;
export type UpdateContactMessageInput = z.infer<typeof updateContactMessageSchema>;
