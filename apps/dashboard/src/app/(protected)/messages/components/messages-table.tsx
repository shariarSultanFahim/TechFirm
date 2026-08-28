"use client";

import * as React from "react";

import { Mail } from "lucide-react";

import { useContactMessages } from "@/hooks/use-contact-messages";

import { DataTable } from "@/components/shared/data-table";
import { Input } from "@/components/ui/input";

import { getMessageColumns } from "../functions/message-columns";

const STATUS_FILTERS: { label: string; value: string }[] = [
  { label: "All Inquiries", value: "All" },
  { label: "Unread", value: "unread" },
  { label: "Read", value: "read" },
  { label: "Replied", value: "replied" },
  { label: "Archived", value: "archived" }
];

export function MessagesTable() {
  const [search, setSearch] = React.useState("");
  const [selectedStatus, setSelectedStatus] = React.useState("All");
  const [pageIndex, setPageIndex] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);

  const { data, isLoading } = useContactMessages({
    page: pageIndex + 1,
    limit: pageSize,
    status: selectedStatus,
    search: search || undefined
  });

  const columns = React.useMemo(() => getMessageColumns(), []);

  const messages = data?.items || [];
  const meta = data?.meta || { page: 1, limit: 10, total: 0, totalPages: 1 };
  const pageCount = meta.totalPages || meta.totalPage || 1;

  return (
    <div className="space-y-4">
      {/* Filter Tabs & Search */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-wrap items-center gap-1.5">
          {STATUS_FILTERS.map((tab) => {
            const isSelected = selectedStatus === tab.value;
            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => {
                  setSelectedStatus(tab.value);
                  setPageIndex(0);
                }}
                className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-2xs"
                    : "bg-muted/70 hover:bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="relative w-full max-w-xs">
          <Input
            placeholder="Search sender, email, inquiry..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPageIndex(0);
            }}
            className="text-xs font-normal"
          />
        </div>
      </div>

      {/* Main DataTable */}
      <DataTable
        columns={columns}
        data={messages}
        pageCount={pageCount}
        pageIndex={pageIndex}
        pageSize={pageSize}
        onPaginationChange={({ pageIndex: nextPageIndex, pageSize: nextPageSize }) => {
          setPageIndex(nextPageIndex);
          setPageSize(nextPageSize);
        }}
        isLoading={isLoading}
        emptyState={
          <div className="text-muted-foreground flex flex-col items-center justify-center p-12 text-center">
            <Mail className="text-muted-foreground/30 mb-3 h-10 w-10" />
            <p className="text-foreground text-sm font-medium">No contact messages found</p>
            <p className="mt-1 text-xs font-normal">
              Customer inquiries and leads will appear here.
            </p>
          </div>
        }
      />
    </div>
  );
}
