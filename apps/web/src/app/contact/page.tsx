"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import {
  MapPin,
  Phone,
  Mail,
  Zap,
  Send,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { DarkCtaBand } from "@/components/widgets";
import { siteConfig } from "@/config/site";
import { post } from "@/lib/api";
import { createContactMessageSchema, CreateContactMessageInput } from "@repo/validators";

export default function ContactPage() {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CreateContactMessageInput>({
    resolver: zodResolver(createContactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: CreateContactMessageInput) => {
      return await post("/contact-messages", data);
    },
    onSuccess: () => {
      setSubmitSuccess(true);
      setSubmitError(null);
      reset();
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setSubmitError(msg);
    }
  });

  const onSubmit = (data: CreateContactMessageInput) => {
    setSubmitError(null);
    mutation.mutate(data);
  };

  return (
    <div className="w-full flex flex-col bg-background">
      {/* 1. HERO HEADER */}
      <section className="relative bg-dark-bg text-white py-20 lg:py-24 border-b border-dark-border overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-4 border border-primary/30">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>24/7 Global Response</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4 text-white">
            Contact TechFirm
          </h1>

          <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6">
            Get in touch with our enterprise technology consultants. We typically respond within 15 minutes during standard operational hours.
          </p>

          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-gray-400">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-primary">Contact Us</span>
          </div>
        </div>
      </section>

      {/* 2. CONTACT FORM & INFO CARDS */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs uppercase font-extrabold text-primary-deep tracking-wider">
                Direct Channels
              </span>
              <h2 className="text-3xl font-extrabold text-foreground">
                We&apos;re Here To Support Your Infrastructure
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Whether you need urgent incident triage, a comprehensive cloud migration roadmap, or a dedicated SOC audit, our senior architects are available.
              </p>

              <div className="space-y-4 pt-4">
                {/* Phone Card */}
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-muted border border-border">
                  <div className="w-12 h-12 rounded-xl bg-dark-bg text-primary flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase text-muted-foreground">Call Us 24/7</h4>
                    <a
                      href={`tel:${siteConfig.contact.phone}`}
                      className="text-base font-extrabold text-foreground hover:text-primary-deep transition-colors"
                    >
                      {siteConfig.contact.phone}
                    </a>
                    <p className="text-xs text-muted-foreground mt-0.5">Toll-free enterprise hotline</p>
                  </div>
                </div>

                {/* Email Card */}
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-muted border border-border">
                  <div className="w-12 h-12 rounded-xl bg-dark-bg text-primary flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase text-muted-foreground">Email Inquiries</h4>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="text-base font-extrabold text-foreground hover:text-primary-deep transition-colors"
                    >
                      {siteConfig.contact.email}
                    </a>
                    <p className="text-xs text-muted-foreground mt-0.5">Guaranteed same-day response</p>
                  </div>
                </div>

                {/* Location Card */}
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-muted border border-border">
                  <div className="w-12 h-12 rounded-xl bg-dark-bg text-primary flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase text-muted-foreground">Headquarters</h4>
                    <p className="text-sm font-bold text-foreground">
                      {siteConfig.contact.address}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">Global Datacenter Operations</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Interactive Form */}
            <div className="lg:col-span-7 bg-card rounded-3xl border border-border p-8 sm:p-10 shadow-xl">
              <h3 className="text-2xl font-black text-foreground mb-2">
                Send Us A Message
              </h3>
              <p className="text-xs text-muted-foreground mb-8">
                Fill out the form below and an engineer will review your project requirements.
              </p>

              {submitSuccess ? (
                <div className="p-8 rounded-2xl bg-accent border border-accent-foreground/20 text-center space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-primary-deep mx-auto" />
                  <h4 className="text-xl font-bold text-foreground">Thank You! Message Delivered</h4>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    Your inquiry has been stored directly into our secure support queue. A solutions architect will reach out shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitSuccess(false)}
                    className="px-6 py-2.5 rounded-full bg-dark-bg text-white text-xs font-bold hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {submitError && (
                    <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 flex items-center gap-3 text-xs text-destructive">
                      <AlertCircle className="w-4 h-4 shrink-0 text-destructive" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        {...register("name")}
                        placeholder="John Doe"
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-foreground focus:outline-hidden transition-colors ${
                          errors.name
                            ? "border-destructive focus:border-destructive bg-destructive/5"
                            : "border-border focus:border-primary bg-background"
                        }`}
                      />
                      {errors.name && (
                        <p className="text-xs text-destructive font-semibold mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                        Business Email *
                      </label>
                      <input
                        type="email"
                        {...register("email")}
                        placeholder="john@company.com"
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-foreground focus:outline-hidden transition-colors ${
                          errors.email
                            ? "border-destructive focus:border-destructive bg-destructive/5"
                            : "border-border focus:border-primary bg-background"
                        }`}
                      />
                      {errors.email && (
                        <p className="text-xs text-destructive font-semibold mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      {...register("subject")}
                      placeholder="e.g. Multi-Cloud Migration Consultation"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-hidden focus:border-primary"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                      Project Details / Message *
                    </label>
                    <textarea
                      rows={5}
                      {...register("message")}
                      placeholder="Describe your current infrastructure, challenges, or timeline..."
                      className={`w-full px-4 py-3 rounded-xl border text-sm text-foreground focus:outline-hidden transition-colors resize-none ${
                        errors.message
                          ? "border-destructive focus:border-destructive bg-destructive/5"
                          : "border-border focus:border-primary bg-background"
                      }`}
                    />
                    {errors.message && (
                      <p className="text-xs text-destructive font-semibold mt-1">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="w-full py-4 rounded-xl bg-dark-bg text-white font-extrabold text-sm hover:bg-primary hover:text-primary-foreground disabled:opacity-60 transition-colors flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    {mutation.isPending ? (
                      <span>Transmitting Inquiry...</span>
                    ) : (
                      <>
                        <span>Submit Project Request</span>
                        <Send className="w-4 h-4 text-primary" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. MAP EMBED SECTION */}
      <section className="h-96 w-full bg-muted relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d78788.16345688647!2d4.417387208466601!3d51.92797305988587!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c433102c354423%3A0x400de5a83057210!2sRotterdam%2C%20Netherlands!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="TechFirm Rotterdam Headquarters"
          className="grayscale-50 contrast-125"
        />
      </section>

      {/* 4. GLOBAL DARK CTA BAND */}
      <DarkCtaBand />
    </div>
  );
}
