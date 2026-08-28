"use client";

import { useState } from "react";

import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { contactFormSchema, type ContactFormData } from "@/lib/validations/contact";

import { useSubmitContactMessage } from "@/hooks/use-contact";

import { PillButton } from "@/components/ui/pill-button";

const SERVICE_OPTIONS = [
  { value: "cloud-hosting", label: "Cloud Server & Managed Hosting" },
  { value: "cyber-security", label: "Zero-Trust Cybersecurity Audit" },
  { value: "managed-it", label: "24/7 Managed IT & Infrastructure" },
  { value: "devops", label: "DevOps & Cloud Architecture" },
  { value: "custom", label: "Enterprise Custom Project" }
] as const;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      service: "cloud-hosting",
      message: ""
    }
  });

  const submitMutation = useSubmitContactMessage();

  const onSubmit = async (data: ContactFormData) => {
    setSubmissionError(null);
    const fullName = `${data.firstName.trim()} ${data.lastName.trim()}`.trim();
    const serviceLabel =
      SERVICE_OPTIONS.find((s) => s.value === data.service)?.label || data.service;
    const subject = `Consultation Request: ${serviceLabel}`;

    try {
      await submitMutation.mutateAsync({
        name: fullName,
        email: data.email.trim(),
        phone: data.phone?.trim() || undefined,
        service: data.service,
        subject,
        message: data.message.trim()
      });
      setSubmitted(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to send inquiry. Please try again.";
      setSubmissionError(msg);
    }
  };

  const handleReset = () => {
    reset();
    setSubmitted(false);
    setSubmissionError(null);
  };

  if (submitted) {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center rounded-3xl border border-[#EDE8F5] bg-white p-8 text-center shadow-xs sm:p-12">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 shadow-xs">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="mb-3 text-2xl font-bold tracking-tight text-[#141432] sm:text-3xl">
          Message Received!
        </h3>
        <p className="mb-8 max-w-md text-xs leading-relaxed font-medium text-[#5C5C6E] sm:text-sm">
          Thank you for reaching out. One of our dedicated cloud architects will review your request
          and get back to you within 15 minutes.
        </p>
        <button
          type="button"
          onClick={handleReset}
          className="border-primary text-primary hover:bg-primary/5 cursor-pointer rounded-full border px-6 py-2.5 text-xs font-bold transition-all"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  const isLoading = isSubmitting || submitMutation.isPending;

  return (
    <div className="rounded-3xl border border-[#EDE8F5] bg-white p-7 shadow-xs sm:p-10">
      <div className="mb-8 text-left">
        <h3 className="mb-2 text-2xl font-bold tracking-tight text-[#141432] sm:text-3xl">
          Send Us a Message
        </h3>
        <p className="text-xs leading-relaxed font-medium text-[#5C5C6E] sm:text-sm">
          Fill in the details below and our team will get back to you promptly.
        </p>
      </div>

      {submissionError && (
        <div className="border-destructive/20 bg-destructive/5 text-destructive mb-4 flex items-center gap-2 rounded-xl border p-3.5 text-xs">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{submissionError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
        {/* Name Fields */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#141432]">
              First Name *
            </label>
            <input
              type="text"
              placeholder="e.g. John"
              disabled={isLoading}
              {...register("firstName")}
              className={`w-full rounded-2xl border bg-[#F9FAFB] px-4 py-3.5 text-xs text-[#141432] placeholder-gray-400 shadow-2xs transition-all focus:bg-white focus:outline-hidden sm:text-sm ${
                errors.firstName
                  ? "border-destructive focus:border-destructive"
                  : "focus:border-primary border-[#EDE8F5]"
              }`}
            />
            {errors.firstName && (
              <p className="text-destructive mt-1 text-[11px] font-medium">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#141432]">Last Name *</label>
            <input
              type="text"
              placeholder="e.g. Smith"
              disabled={isLoading}
              {...register("lastName")}
              className={`w-full rounded-2xl border bg-[#F9FAFB] px-4 py-3.5 text-xs text-[#141432] placeholder-gray-400 shadow-2xs transition-all focus:bg-white focus:outline-hidden sm:text-sm ${
                errors.lastName
                  ? "border-destructive focus:border-destructive"
                  : "focus:border-primary border-[#EDE8F5]"
              }`}
            />
            {errors.lastName && (
              <p className="text-destructive mt-1 text-[11px] font-medium">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        {/* Contact Fields */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#141432]">
              Work Email *
            </label>
            <input
              type="email"
              placeholder="john@company.com"
              disabled={isLoading}
              {...register("email")}
              className={`w-full rounded-2xl border bg-[#F9FAFB] px-4 py-3.5 text-xs text-[#141432] placeholder-gray-400 shadow-2xs transition-all focus:bg-white focus:outline-hidden sm:text-sm ${
                errors.email
                  ? "border-destructive focus:border-destructive"
                  : "focus:border-primary border-[#EDE8F5]"
              }`}
            />
            {errors.email && (
              <p className="text-destructive mt-1 text-[11px] font-medium">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#141432]">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="+1 (555) 000-0000"
              disabled={isLoading}
              {...register("phone")}
              className="focus:border-primary w-full rounded-2xl border border-[#EDE8F5] bg-[#F9FAFB] px-4 py-3.5 text-xs text-[#141432] placeholder-gray-400 shadow-2xs transition-all focus:bg-white focus:outline-hidden sm:text-sm"
            />
            {errors.phone && (
              <p className="text-destructive mt-1 text-[11px] font-medium">
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>

        {/* Service Select */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-[#141432]">
            Service Required *
          </label>
          <select
            disabled={isLoading}
            {...register("service")}
            className="focus:border-primary w-full cursor-pointer rounded-2xl border border-[#EDE8F5] bg-[#F9FAFB] px-4 py-3.5 text-xs text-[#141432] shadow-2xs transition-all focus:bg-white focus:outline-hidden sm:text-sm"
          >
            {SERVICE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.service && (
            <p className="text-destructive mt-1 text-[11px] font-medium">
              {errors.service.message}
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-[#141432]">
            Project Overview & Goals *
          </label>
          <textarea
            rows={4}
            disabled={isLoading}
            placeholder="Tell us about your current infrastructure, challenges, and timeline..."
            {...register("message")}
            className={`w-full resize-none rounded-2xl border bg-[#F9FAFB] px-4 py-3.5 text-xs text-[#141432] placeholder-gray-400 shadow-2xs transition-all focus:bg-white focus:outline-hidden sm:text-sm ${
              errors.message
                ? "border-destructive focus:border-destructive"
                : "focus:border-primary border-[#EDE8F5]"
            }`}
          />
          {errors.message && (
            <p className="text-destructive mt-1 text-[11px] font-medium">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-3">
          <PillButton
            type="submit"
            variant="primary"
            size="lg"
            disabled={isLoading}
            icon={
              isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )
            }
          >
            {isLoading ? "Transmitting Request..." : "Submit Inquiry"}
          </PillButton>
        </div>
      </form>
    </div>
  );
}
