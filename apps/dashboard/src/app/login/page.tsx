"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Zap, Lock, Mail, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import { loginSchema, LoginInput } from "@repo/validators";
import { post } from "@/lib/api";

export default function AdminLoginPage() {
  const router = useRouter();
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
      router.push("/overview");
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "Invalid admin credentials.";
      setError(msg);
    }
  });

  const onSubmit = (data: LoginInput) => {
    setError(null);
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-dark-card border border-dark-border rounded-3xl p-8 sm:p-10 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/20">
            <Zap className="w-6 h-6 fill-current" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white">
            TechFirm Console
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Sign in with your administrator credentials
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-destructive/10 border border-destructive/30 flex items-center gap-2.5 text-xs text-destructive">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                {...register("email")}
                className="w-full bg-dark-bg border border-dark-border rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-hidden focus:border-primary"
              />
            </div>
            {errors.email && (
              <p className="text-xs text-destructive mt-1 font-semibold">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                {...register("password")}
                className="w-full bg-dark-bg border border-dark-border rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-hidden focus:border-primary"
              />
            </div>
            {errors.password && (
              <p className="text-xs text-destructive mt-1 font-semibold">{errors.password.message}</p>
            )}
          </div>

          <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 text-[11px] text-primary flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>Default Seed: admin@techfirm.com / Admin123!</span>
          </div>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-extrabold text-sm hover:bg-primary-deep hover:text-white disabled:opacity-60 transition-colors flex items-center justify-center gap-2 shadow-lg cursor-pointer"
          >
            <span>{mutation.isPending ? "Authenticating..." : "Sign In to Admin Panel"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
