"use client";

import { Mail } from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";

import { MessagesTable } from "./components/messages-table";

export default function ContactMessagesPage() {
  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Contact Messages & Inquiries"
        description="Manage customer requests, consultative inquiries, follow-up statuses, and administrative notes."
        icon={Mail}
      />

      <MessagesTable />
    </div>
  );
}
