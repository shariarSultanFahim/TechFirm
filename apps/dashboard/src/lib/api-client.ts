import { ApiResponse } from "@repo/types";

import { env } from "@/env";

const API_BASE_URL = env.NEXT_PUBLIC_API_URL;

export interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

export class ApiError extends Error {
  statusCode: number;
  errorMessages?: Array<{ path: string | number; message: string }>;

  constructor(
    message: string,
    statusCode: number,
    errorMessages?: Array<{ path: string | number; message: string }>
  ) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.errorMessages = errorMessages;
  }
}

export async function apiClient<T = unknown>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const { params, headers, ...customConfig } = options;

  let url = endpoint.startsWith("http")
    ? endpoint
    : `${API_BASE_URL.replace(/\/$/, "")}/${endpoint.replace(/^\//, "")}`;

  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      url += (url.includes("?") ? "&" : "?") + queryString;
    }
  }

  let authHeaders: Record<string, string> = {};
  if (typeof document !== "undefined") {
    const match = document.cookie.match(/(?:^|;\s*)accessToken=([^;]+)/);
    const token = match ? match[1] : null;
    if (token) {
      authHeaders = { Authorization: `Bearer ${token}` };
    }
  }

  const config: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...authHeaders,
      ...headers
    },
    credentials: "include",
    ...customConfig
  };

  try {
    const res = await fetch(url, config);
    const data: ApiResponse<T> = await res.json().catch(() => ({
      success: res.ok,
      statusCode: res.status,
      message: res.statusText,
      data: undefined
    }));

    if (!res.ok || data.success === false) {
      const err = data as ApiResponse<unknown> & {
        errorMessages?: Array<{ path: string | number; message: string }>;
      };
      throw new ApiError(
        err.message || "An error occurred while processing the request",
        res.status,
        err.errorMessages
      );
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(error instanceof Error ? error.message : "Network error occurred", 500);
  }
}
