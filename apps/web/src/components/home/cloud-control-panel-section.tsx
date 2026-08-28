"use client";

import wpEnvironmentImg from "@/assets/cloud-server-control-panel/multicloud-server-support2-2.png";
import serverClusterImg from "@/assets/cloud-server-control-panel/multicloud-server-support2-3.png";
import cloudConnectImg from "@/assets/cloud-server-control-panel/multicloud-server-support2-768x548 1.png";
import { SectionHeader } from "@/components/widgets";
import { Star } from "lucide-react";
import Image from "next/image";

export function CloudControlPanelSection() {
  return (
    <section className="relative w-full bg-background py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8 mb-16 lg:mb-20">
          {/* Left Card - Connect to Techfirm with any Cloud Hosting Provider */}
          <div className="rounded-xl bg-[#FFF8F3] border border-[#FBE6D6] p-8 sm:p-10 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md transition-shadow">
            <div className="space-y-3 mb-6">
              <span className="text-xs font-bold text-[#E05A47] uppercase tracking-wide">
                MultiCloud Server Support
              </span>
              <h3 className="text-2xl sm:text-3xl font-semibold text-[#141432] leading-snug max-w-md">
                Connect to Techfirm with any Cloud Hosting Provider
              </h3>
            </div>

            <div className="relative w-full flex items-center justify-center pt-4">
              <Image
                src={cloudConnectImg}
                alt="Connect with any cloud hosting provider diagram"
                className="w-full max-w-[440px] h-auto object-contain"
              />
            </div>
          </div>

          {/* Right Card - Choose Highly Optimized WordPress Environments */}
          <div className="rounded-xl bg-[#F0F9FF] border border-[#E0F2FE] p-8 sm:p-10 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md transition-shadow">
            <div className="space-y-3 mb-6">
              <span className="text-xs font-bold text-[#0284C7] uppercase tracking-wide">
                MultiCloud Server Support
              </span>
              <h3 className="text-2xl sm:text-3xl font-semibold text-[#141432] leading-snug max-w-lg">
                Choose Highly Optimized WordPress Environments for Speed &amp; Security – Nginx or LiteSpeed
              </h3>
            </div>

            <div className="relative w-full flex items-center justify-center pt-4">
              <Image
                src={wpEnvironmentImg}
                alt="WordPress Nginx and LiteSpeed environment control panel"
                className="w-full max-w-[460px] h-auto object-contain"
              />
            </div>
          </div>
        </div>

        {/* 3. Middle Half: 4 Feature Mini Cards with Center 3D Cluster Node Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto mb-16 lg:mb-20">
          {/* Left Column Features (2 items) */}
          <div className="lg:col-span-4 space-y-5">
            {/* Lightning-Fast Performance */}
            <div className="rounded-sm bg-[#F5F3FF] border border-[#EDE9FE] p-6 shadow-2xs hover:shadow-xs transition-shadow">
              <h4 className="text-base font-bold text-[#141432]">
                Lightning-Fast Performance
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed mt-1.5 font-medium">
                Optimized for WordPress with SSD storage and CDN integration.
              </p>
            </div>

            {/* Scalability & Flexibility */}
            <div className="rounded-sm bg-[#FFF8F3] border border-[#FBE6D6] p-6 shadow-2xs hover:shadow-xs transition-shadow">
              <h4 className="text-base font-bold text-[#141432]">
                Scalability &amp; Flexibility
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed mt-1.5 font-medium">
                Grow your site effortlessly with our scalable hosting plans.
              </p>
            </div>
          </div>

          {/* Center 3D Server Node Cluster Visual */}
          <div className="lg:col-span-4 flex items-center justify-center py-4 bg-transparent">
            <div className="relative w-full max-w-[340px] animate-in fade-in zoom-in-95 duration-500 bg-transparent">
              <Image
                src={serverClusterImg}
                alt="3D multi-node connected server cluster"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Right Column Features (2 items) */}
          <div className="lg:col-span-4 space-y-5">
            {/* Advanced Security */}
            <div className="rounded-sm bg-[#FFF1F2] border border-[#FFE4E6] p-6 shadow-2xs hover:shadow-xs transition-shadow">
              <h4 className="text-base font-bold text-[#141432]">
                Advanced Security
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed mt-1.5 font-medium">
                Free SSL, daily backups, and enterprise-grade protection.
              </p>
            </div>

            {/* One-Click WordPress Install */}
            <div className="rounded-sm bg-[#F0F9FF] border border-[#E0F2FE] p-6 shadow-2xs hover:shadow-xs transition-shadow">
              <h4 className="text-base font-bold text-[#141432]">
                One-Click WordPress Install
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed mt-1.5 font-medium">
                Set up your website in seconds with our easy installer.
              </p>
            </div>
          </div>
        </div>

        {/* 4. Bottom Half: Trustpilot & Social Proof Bar */}
        <div className="flex flex-col items-center text-center space-y-3 pt-4">
          <p className="text-sm sm:text-base font-bold text-[#141432] tracking-tight">
            Reliable hosting services chosen by over 2.8 million domain owners.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs text-muted-foreground font-medium">
            <span className="font-semibold text-foreground">Excellent</span>
            {/* 5 Green Trustpilot Stars */}
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="w-4 h-4 bg-[#00B67B] flex items-center justify-center text-white"
                >
                  <Star className="w-2.5 h-2.5 fill-white text-white" />
                </div>
              ))}
            </div>
            <span>436 reviews on</span>
            {/* Trustpilot Logo */}
            <div className="flex items-center gap-1 font-bold text-foreground">
              <div className="w-4 h-4 text-[#00B67B] flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <span className="tracking-tight font-extrabold text-[#141432] text-xs">
                Trustpilot
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
