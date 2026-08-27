import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import { AdminShell } from "@/components/admin-shell";
import "@/styles/tailwind.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap"
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "Admin Dashboard | Management Console",
  description: "Administrative control panel with role-based access control."
};

export default async function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  const headersList = await headers();
  const userRole = headersList.get("x-user-role") || "admin";
  const userName = headersList.get("x-user-name") || "Admin";
  const userEmail = headersList.get("x-user-email") || "admin@example.com";

  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased font-sans bg-background text-foreground`}
      >
        <AdminShell
          userRole={userRole}
          userName={userName}
          userEmail={userEmail}
        >
          {children}
        </AdminShell>
      </body>
    </html>
  );
}
