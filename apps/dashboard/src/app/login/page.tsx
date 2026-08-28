"use client";

import { useState } from "react";
import Image from "next/image";

import { useMutation } from "@tanstack/react-query";
import { AlertCircle, ArrowRight, CheckCircle2, Lock, Mail } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { LoginInput, loginSchema } from "@repo/validators";

import logoImg from "@/assets/logo-short.png";
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
      return await post<{ data?: { accessToken?: string } }>("/auth/login", data);
    },
    onSuccess: (response) => {
      const accessToken = response?.data?.accessToken;
      if (accessToken && typeof document !== "undefined") {
        const isSecure = window.location.protocol === "https:";
        document.cookie = `accessToken=${accessToken}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax${isSecure ? "; Secure" : ""}`;
      }
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
    <div className="bg-background text-foreground flex min-h-screen items-center justify-center p-4">
      <div className="bg-card border-border w-full max-w-md rounded-3xl border p-8 shadow-xl sm:p-10">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center">
            <Image
              src={logoImg}
              alt="TechFirm Logo"
              width={48}
              height={48}
              priority
              className="h-12 w-12 object-contain"
            />
          </div>
          <h1 className="text-foreground text-2xl font-bold tracking-tight">TechFirm Console</h1>
          <p className="text-muted-foreground mt-1 text-xs font-normal">
            Sign in with your administrator credentials
          </p>
        </div>

        {error && (
          <div className="bg-destructive/10 border-destructive/30 text-destructive mb-6 flex items-center gap-2.5 rounded-xl border p-3.5 text-xs font-normal">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-muted-foreground mb-1.5 block text-xs font-medium tracking-wider uppercase">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="text-muted-foreground absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2" />
              <input
                type="email"
                {...register("email")}
                className="bg-muted/50 border-border text-foreground focus:border-primary focus:ring-ring w-full rounded-xl border py-3 pr-4 pl-10 text-sm font-normal transition-colors outline-none"
              />
            </div>
            {errors.email && (
              <p className="text-destructive mt-1 text-xs font-normal">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="text-muted-foreground mb-1.5 block text-xs font-medium tracking-wider uppercase">
              Password
            </label>
            <div className="relative">
              <Lock className="text-muted-foreground absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2" />
              <input
                type="password"
                {...register("password")}
                className="bg-muted/50 border-border text-foreground focus:border-primary focus:ring-ring w-full rounded-xl border py-3 pr-4 pl-10 text-sm font-normal transition-colors outline-none"
              />
            </div>
            {errors.password && (
              <p className="text-destructive mt-1 text-xs font-normal">{errors.password.message}</p>
            )}
          </div>

          <div className="bg-primary/10 border-primary/20 text-primary flex items-center gap-2 rounded-xl border p-3 text-[11px] font-normal">
            <CheckCircle2 className="text-primary h-3.5 w-3.5 shrink-0" />
            <span>Default Seed: admin@techfirm.com / Admin123!</span>
          </div>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="bg-primary text-primary-foreground hover:bg-primary/90 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-medium shadow-md transition-all disabled:opacity-60"
          >
            <span>{mutation.isPending ? "Authenticating..." : "Sign In to Admin Panel"}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
