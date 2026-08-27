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
