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
  id?: string;
  _id?: string;
  email: string;
  name: string;
  role: UserRole | string;
  avatar?: string;
  isActive?: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
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
  id?: string;
  _id?: string;
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
  id?: string;
  _id?: string;
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
 * Contact Message Interface (Collection, Inbound)
 */
export type ContactMessageStatus = "unread" | "read" | "replied" | "archived";

export interface IContactMessage {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  service?: string;
  message: string;
  isRead: boolean;
  status?: ContactMessageStatus;
  replyNotes?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

/**
 * Site Configuration Interfaces (Singleton)
 */
export interface ISocialLinks {
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  github?: string;
}

export interface ITopBarConfig {
  announcement?: string;
  isVisible: boolean;
}

export interface ICtaBandConfig {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonHref: string;
  badges: string[];
}

export interface IFooterLink {
  label: string;
  href: string;
}

export interface IFooterConfig {
  copyrightText: string;
  collaborateLinks: IFooterLink[];
  myAccountLinks: IFooterLink[];
  serviceLinks: IFooterLink[];
  bottomLinks: IFooterLink[];
}

export interface ISiteConfig {
  id?: string;
  siteName: string;
  siteLogo: string;
  tagline?: string;
  contactEmail: string;
  contactPhone: string;
  workingHours?: string;
  address?: string;
  socialLinks: ISocialLinks;
  topBar?: ITopBarConfig;
  ctaBand: ICtaBandConfig;
  footer: IFooterConfig;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

/**
 * Testimonial interface (Collection)
 */
export interface ITestimonial {
  id?: string;
  _id?: string;
  quote: string;
  authorName: string;
  authorRole: string;
  company?: string;
  avatar: string;
  rating: number;
  tags?: string[];
  hasVideo?: boolean;
  videoUrl?: string;
  posterImage?: string;
  iconBg?: string;
  order: number;
  isActive: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

/**
 * FAQ interface (Collection)
 */
export type FaqCategory = "General" | "Services" | "Support" | "Pricing" | "Security" | string;

export interface IFaq {
  id?: string;
  _id?: string;
  question: string;
  answer: string;
  category: FaqCategory;
  order: number;
  isActive: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

/**
 * Team Member interface (Collection)
 */
export interface ITeamMember {
  id?: string;
  _id?: string;
  name: string;
  slug: string;
  role: string;
  bio?: string;
  photo: string;
  email?: string;
  phone?: string;
  socialLinks?: ISocialLinks;
  skills?: string[];
  experience?: string;
  order: number;
  isActive: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

/**
 * Portfolio & Case Studies interface (Collection)
 */
export interface IPortfolioResult {
  title: string;
  description: string;
}

export interface IPortfolioItem {
  id?: string;
  _id?: string;
  title: string;
  slug: string;
  subtitle?: string;
  category: string;
  industry?: string;
  overview?: string;
  image: string;
  bgImage?: string;
  isDark?: boolean;
  actionText?: string;
  challengeText?: string[];
  solutionText?: string[];
  results?: IPortfolioResult[];
  order: number;
  isActive: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
