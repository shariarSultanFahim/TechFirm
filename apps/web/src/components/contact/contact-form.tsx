"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { PillButton } from "@/components/ui/pill-button";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  if (submitted) {
    return (
      <div className="rounded-3xl border border-[#EDE8F5] bg-white p-8 sm:p-12 shadow-xs text-center flex flex-col items-center justify-center min-h-[420px]">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 shadow-xs">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold text-[#141432] mb-3 tracking-tight">
          Message Received!
        </h3>
        <p className="text-xs sm:text-sm text-[#5C5C6E] leading-relaxed max-w-md mb-8 font-medium">
          Thank you for reaching out. One of our dedicated cloud architects will review your request and get back to you within 15 minutes.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="px-6 py-2.5 rounded-full border border-primary text-primary hover:bg-primary/5 text-xs font-bold transition-all cursor-pointer"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-[#EDE8F5] bg-white p-7 sm:p-10 shadow-xs">
      <div className="mb-8 text-left">
        <h3 className="text-2xl sm:text-3xl font-bold text-[#141432] tracking-tight mb-2">
          Send Us a Message
        </h3>
        <p className="text-xs sm:text-sm text-[#5C5C6E] leading-relaxed font-medium">
          Fill in the details below and our team will get back to you promptly.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        {/* Name Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#141432] mb-1.5">
              First Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. John"
              className="w-full px-4 py-3.5 rounded-2xl border border-[#EDE8F5] bg-[#F9FAFB] text-xs sm:text-sm text-[#141432] placeholder-gray-400 focus:outline-hidden focus:border-primary focus:bg-white transition-all shadow-2xs"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#141432] mb-1.5">
              Last Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Smith"
              className="w-full px-4 py-3.5 rounded-2xl border border-[#EDE8F5] bg-[#F9FAFB] text-xs sm:text-sm text-[#141432] placeholder-gray-400 focus:outline-hidden focus:border-primary focus:bg-white transition-all shadow-2xs"
            />
          </div>
        </div>

        {/* Contact Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#141432] mb-1.5">
              Work Email *
            </label>
            <input
              type="email"
              required
              placeholder="john@company.com"
              className="w-full px-4 py-3.5 rounded-2xl border border-[#EDE8F5] bg-[#F9FAFB] text-xs sm:text-sm text-[#141432] placeholder-gray-400 focus:outline-hidden focus:border-primary focus:bg-white transition-all shadow-2xs"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#141432] mb-1.5">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="+1 (555) 000-0000"
              className="w-full px-4 py-3.5 rounded-2xl border border-[#EDE8F5] bg-[#F9FAFB] text-xs sm:text-sm text-[#141432] placeholder-gray-400 focus:outline-hidden focus:border-primary focus:bg-white transition-all shadow-2xs"
            />
          </div>
        </div>

        {/* Service Select */}
        <div>
          <label className="block text-xs font-semibold text-[#141432] mb-1.5">
            Service Required *
          </label>
          <select
            required
            defaultValue="cloud-hosting"
            className="w-full px-4 py-3.5 rounded-2xl border border-[#EDE8F5] bg-[#F9FAFB] text-xs sm:text-sm text-[#141432] focus:outline-hidden focus:border-primary focus:bg-white transition-all shadow-2xs cursor-pointer"
          >
            <option value="cloud-hosting">Cloud Server & Managed Hosting</option>
            <option value="cyber-security">Zero-Trust Cybersecurity Audit</option>
            <option value="managed-it">24/7 Managed IT & Infrastructure</option>
            <option value="devops">DevOps & Cloud Architecture</option>
            <option value="custom">Enterprise Custom Project</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label className="block text-xs font-semibold text-[#141432] mb-1.5">
            Project Overview & Goals *
          </label>
          <textarea
            required
            rows={4}
            placeholder="Tell us about your current infrastructure, challenges, and timeline..."
            className="w-full px-4 py-3.5 rounded-2xl border border-[#EDE8F5] bg-[#F9FAFB] text-xs sm:text-sm text-[#141432] placeholder-gray-400 focus:outline-hidden focus:border-primary focus:bg-white transition-all shadow-2xs resize-none"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-3">
          <PillButton
            variant="primary"
            size="lg"
            disabled={loading}
            icon={<Send className="w-4 h-4" />}
          >
            {loading ? "Transmitting Request..." : "Submit Inquiry"}
          </PillButton>
        </div>
      </form>
    </div>
  );
}
