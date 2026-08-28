"use client";

import Image from "next/image";

import { Star } from "lucide-react";

import wpEnvironmentImg from "@/assets/cloud-server-control-panel/multicloud-server-support2-2.png";
import serverClusterImg from "@/assets/cloud-server-control-panel/multicloud-server-support2-3.png";
import cloudConnectImg from "@/assets/cloud-server-control-panel/multicloud-server-support2-768x548 1.png";

import { SectionHeader } from "@/components/widgets";

export function CloudControlPanelSection() {
  return (
    <section className="bg-background relative w-full overflow-hidden py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        {/* 1. Reusable Section Header */}
        <SectionHeader
          badge="CLOUD SERVER CONTROL PANEL"
          title={
            <>
              A Cloud Server Control Panel <br />
              Tailored for WordPress
            </>
          }
          align="center"
          className="mb-12 sm:mb-16"
          titleClassName="lg:text-[46px]"
        />

        {/* 2. Top Half: Two Major Multi-Cloud Feature Cards */}
        <div className="mb-16 grid grid-cols-1 gap-8 lg:mb-20 lg:grid-cols-2 lg:gap-8">
          {/* Left Card - Connect to Techfirm with any Cloud Hosting Provider */}
          <div className="flex flex-col justify-between overflow-hidden rounded-xl border border-[#FBE6D6] bg-[#FFF8F3] p-8 shadow-xs transition-shadow hover:shadow-md sm:p-10">
            <div className="mb-6 space-y-3">
              <span className="text-xs font-bold tracking-wide text-[#E05A47] uppercase">
                MultiCloud Server Support
              </span>
              <h3 className="max-w-md text-2xl leading-snug font-semibold text-[#141432] sm:text-3xl">
                Connect to Techfirm with any Cloud Hosting Provider
              </h3>
            </div>

            <div className="relative flex w-full items-center justify-center pt-4">
              <Image
                src={cloudConnectImg}
                alt="Connect with any cloud hosting provider diagram"
                className="h-auto w-full max-w-[440px] object-contain"
              />
            </div>
          </div>

          {/* Right Card - Choose Highly Optimized WordPress Environments */}
          <div className="flex flex-col justify-between overflow-hidden rounded-xl border border-[#E0F2FE] bg-[#F0F9FF] p-8 shadow-xs transition-shadow hover:shadow-md sm:p-10">
            <div className="mb-6 space-y-3">
              <span className="text-xs font-bold tracking-wide text-[#0284C7] uppercase">
                MultiCloud Server Support
              </span>
              <h3 className="max-w-lg text-2xl leading-snug font-semibold text-[#141432] sm:text-3xl">
                Choose Highly Optimized WordPress Environments for Speed &amp; Security – Nginx or
                LiteSpeed
              </h3>
            </div>

            <div className="relative flex w-full items-center justify-center pt-4">
              <Image
                src={wpEnvironmentImg}
                alt="WordPress Nginx and LiteSpeed environment control panel"
                className="h-auto w-full max-w-[460px] object-contain"
              />
            </div>
          </div>
        </div>

        {/* 3. Middle Half: 4 Feature Mini Cards with Center 3D Cluster Node Visual */}
        <div className="mx-auto mb-16 grid max-w-6xl grid-cols-1 items-center gap-8 lg:mb-20 lg:grid-cols-12">
          {/* Left Column Features (2 items) */}
          <div className="space-y-5 lg:col-span-4">
            {/* Lightning-Fast Performance */}
            <div className="rounded-sm border border-[#EDE9FE] bg-[#F5F3FF] p-6 shadow-2xs transition-shadow hover:shadow-xs">
              <h4 className="text-base font-bold text-[#141432]">Lightning-Fast Performance</h4>
              <p className="text-muted-foreground mt-1.5 text-xs leading-relaxed font-medium">
                Optimized for WordPress with SSD storage and CDN integration.
              </p>
            </div>

            {/* Scalability & Flexibility */}
            <div className="rounded-sm border border-[#FBE6D6] bg-[#FFF8F3] p-6 shadow-2xs transition-shadow hover:shadow-xs">
              <h4 className="text-base font-bold text-[#141432]">Scalability &amp; Flexibility</h4>
              <p className="text-muted-foreground mt-1.5 text-xs leading-relaxed font-medium">
                Grow your site effortlessly with our scalable hosting plans.
              </p>
            </div>
          </div>

          {/* Center 3D Server Node Cluster Visual */}
          <div className="flex items-center justify-center bg-transparent py-4 lg:col-span-4">
            <div className="animate-in fade-in zoom-in-95 relative w-full max-w-[340px] bg-transparent duration-500">
              <Image
                src={serverClusterImg}
                alt="3D multi-node connected server cluster"
                className="h-auto w-full object-contain"
              />
            </div>
          </div>

          {/* Right Column Features (2 items) */}
          <div className="space-y-5 lg:col-span-4">
            {/* Advanced Security */}
            <div className="rounded-sm border border-[#FFE4E6] bg-[#FFF1F2] p-6 shadow-2xs transition-shadow hover:shadow-xs">
              <h4 className="text-base font-bold text-[#141432]">Advanced Security</h4>
              <p className="text-muted-foreground mt-1.5 text-xs leading-relaxed font-medium">
                Free SSL, daily backups, and enterprise-grade protection.
              </p>
            </div>

            {/* One-Click WordPress Install */}
            <div className="rounded-sm border border-[#E0F2FE] bg-[#F0F9FF] p-6 shadow-2xs transition-shadow hover:shadow-xs">
              <h4 className="text-base font-bold text-[#141432]">One-Click WordPress Install</h4>
              <p className="text-muted-foreground mt-1.5 text-xs leading-relaxed font-medium">
                Set up your website in seconds with our easy installer.
              </p>
            </div>
          </div>
        </div>

        {/* 4. Bottom Half: Trustpilot & Social Proof Bar */}
        <div className="flex flex-col items-center space-y-3 pt-4 text-center">
          <p className="text-sm font-bold tracking-tight text-[#141432] sm:text-base">
            Reliable hosting services chosen by over 2.8 million domain owners.
          </p>

          <div className="text-muted-foreground flex flex-wrap items-center justify-center gap-2.5 text-xs font-medium">
            <span className="text-foreground font-semibold">Excellent</span>
            {/* 5 Green Trustpilot Stars */}
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="flex h-4 w-4 items-center justify-center bg-[#00B67B] text-white"
                >
                  <Star className="h-2.5 w-2.5 fill-white text-white" />
                </div>
              ))}
            </div>
            <span>436 reviews on</span>
            {/* Trustpilot Logo */}
            <div className="text-foreground flex items-center gap-1 font-bold">
              <div className="flex h-4 w-4 items-center justify-center text-[#00B67B]">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <span className="text-xs font-extrabold tracking-tight text-[#141432]">
                Trustpilot
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
