import axios, { AxiosError, AxiosRequestConfig } from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1",
  timeout: 15_000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
});

api.interceptors.response.use(
  (res) => res,
  (err: AxiosError<{ message?: string; errorMessages?: Array<{ message: string }> }>) => {
    if (axios.isAxiosError(err)) {
      const serverMessage =
        err.response?.data?.message ||
        err.response?.data?.errorMessages?.[0]?.message ||
        err.message ||
        "An unexpected network error occurred";
      return Promise.reject(new Error(serverMessage));
    }
    return Promise.reject(err);
  }
);

type Cfg = AxiosRequestConfig & { signal?: AbortSignal };

export const get = async <T>(url: string, config?: Cfg): Promise<T> =>
  (await api.get<T>(url, config)).data;

export const post = async <T, B = unknown>(url: string, body?: B, config?: Cfg): Promise<T> =>
  (await api.post<T>(url, body, config)).data;

export const patch = async <T, B = unknown>(url: string, body?: B, config?: Cfg): Promise<T> =>
  (await api.patch<T>(url, body, config)).data;

export const put = async <T, B = unknown>(url: string, body?: B, config?: Cfg): Promise<T> =>
  (await api.put<T>(url, body, config)).data;

export const del = async <T>(url: string, config?: Cfg): Promise<T> =>
  (await api.delete<T>(url, config)).data;
