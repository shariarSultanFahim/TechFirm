"use client";

import { useState } from "react";

import { useMutation } from "@tanstack/react-query";
import { AlertCircle, ArrowRight, CheckCircle2, Lock, Mail, Zap } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { LoginInput, loginSchema } from "@repo/validators";

import { post } from "@/lib/api";

export default function AdminLoginPage() {
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "admin@techfirm.com",
      password: "Admin123!"
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: LoginInput) => {
      return await post("/auth/login", data);
    },
    onSuccess: () => {
      toast.success("Welcome back! Signed in successfully.");
      window.location.href = "/overview";
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "Invalid admin credentials.";
      setError(msg);
      toast.error(msg);
    }
  });

  const onSubmit = (data: LoginInput) => {
    setError(null);
    mutation.mutate(data);
  };

  return (
    <div className="bg-dark-bg flex min-h-screen items-center justify-center p-4 text-white">
      <div className="bg-dark-card border-dark-border w-full max-w-md rounded-3xl border p-8 shadow-2xl sm:p-10">
        <div className="mb-8 text-center">
          <div className="bg-primary text-primary-foreground shadow-primary/20 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl shadow-lg">
            <Zap className="h-6 w-6 fill-current" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white">TechFirm Console</h1>
          <p className="mt-1 text-xs text-gray-400">Sign in with your administrator credentials</p>
        </div>

        {error && (
          <div className="bg-destructive/10 border-destructive/30 text-destructive mb-6 flex items-center gap-2.5 rounded-xl border p-3.5 text-xs">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-bold tracking-wider text-gray-300 uppercase">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <input
                type="email"
                {...register("email")}
                className="bg-dark-bg border-dark-border focus:border-primary w-full rounded-xl border py-3 pr-4 pl-10 text-sm text-white focus:outline-hidden"
              />
            </div>
            {errors.email && (
              <p className="text-destructive mt-1 text-xs font-semibold">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold tracking-wider text-gray-300 uppercase">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <input
                type="password"
                {...register("password")}
                className="bg-dark-bg border-dark-border focus:border-primary w-full rounded-xl border py-3 pr-4 pl-10 text-sm text-white focus:outline-hidden"
              />
            </div>
            {errors.password && (
              <p className="text-destructive mt-1 text-xs font-semibold">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="bg-primary/10 border-primary/20 text-primary flex items-center gap-2 rounded-xl border p-3 text-[11px]">
            <CheckCircle2 className="text-primary h-3.5 w-3.5 shrink-0" />
            <span>Default Seed: admin@techfirm.com / Admin123!</span>
          </div>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="bg-primary text-primary-foreground hover:bg-primary-deep flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-extrabold shadow-lg transition-colors hover:text-white disabled:opacity-60"
          >
            <span>{mutation.isPending ? "Authenticating..." : "Sign In to Admin Panel"}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
