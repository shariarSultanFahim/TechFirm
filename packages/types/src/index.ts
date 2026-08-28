/**
 * User Role Definition
 */
export const UserRole = {
  ADMIN: "admin",
  USER: "user"
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];
export type Role = UserRole;

/**
 * Standard API response structure
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T;
  meta?: PaginationMeta;
}

/**
 * Standard API error response structure
 */
export interface ApiErrorResponse {
  success: false;
  statusCode: number;
  message: string;
  errorMessages?: Array<{
    path: string | number;
    message: string;
  }>;
  stack?: string;
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPage?: number;
}

/**
 * Sanitized User interface (safe for client / responses)
 */
export interface IUser {
  id: string;
  email: string;
  name: string;
  role: UserRole | string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

/**
 * Auth Response Payload
 */
export interface AuthUserResponse {
  user: IUser;
}

/**
 * Pricing Plan Interface
 */
export type BillingPeriod = "monthly" | "annual";

export interface IPlan {
  id: string;
  name: string;
  price: number;
  billingPeriod: BillingPeriod;
  features: string[];
  isPopular: boolean;
  isActive: boolean;
  order: number;
  description?: string;
  buttonText?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

/**
 * Blog Post Interface
 */
export interface IPostAuthor {
  name: string;
  avatar?: string;
  role?: string;
}

export interface IPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  coverImage: string;
  category: string;
  author: IPostAuthor;
  publishedAt: string | Date;
  isPublished: boolean;
  readTime?: string;
  tags?: string[];
  commentsCount?: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

/**
 * Contact Message Interface
 */
export interface IContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  isRead: boolean;
  createdAt: string | Date;
  updatedAt?: string | Date;
}
