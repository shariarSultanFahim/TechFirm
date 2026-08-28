"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Phone } from "lucide-react";

import { IContactMessage } from "@repo/types";

import { Badge } from "@/components/ui/badge";

import { MessageRowActions } from "../components/message-row-actions";

export function getMessageColumns(): ColumnDef<IContactMessage>[] {
  return [
    {
      id: "indicator",
      header: "",
      cell: ({ row }) => {
        const isUnread = !row.original.isRead;
        return isUnread ? (
          <span className="bg-primary inline-block h-2 w-2 rounded-full" title="Unread" />
        ) : (
          <span className="inline-block h-2 w-2 rounded-full bg-transparent" />
        );
      }
    },
    {
      accessorKey: "name",
      header: "Sender",
      cell: ({ row }) => {
        const msg = row.original;
        return (
          <div>
            <p className="text-foreground text-xs font-medium">{msg.name}</p>
            <p className="text-muted-foreground text-[11px] font-normal">{msg.email}</p>
            {msg.phone && (
              <p className="text-muted-foreground mt-0.5 flex items-center gap-1 text-[10px] font-normal">
                <Phone className="h-2.5 w-2.5" />
                <span>{msg.phone}</span>
              </p>
            )}
          </div>
        );
      }
    },
    {
      accessorKey: "subject",
      header: "Inquiry Subject & Message",
      cell: ({ row }) => {
        const msg = row.original;
        return (
          <div className="max-w-md">
            <p className="text-foreground line-clamp-1 text-xs font-medium">
              {msg.subject || "General Consultation Inquiry"}
            </p>
            <p className="text-muted-foreground mt-0.5 line-clamp-1 text-[11px] font-normal">
              {msg.message}
            </p>
          </div>
        );
      }
    },
    {
      accessorKey: "service",
      header: "Service",
      cell: ({ row }) =>
        row.original.service ? (
          <Badge variant="outline" className="text-[10px] font-medium">
            {row.original.service}
          </Badge>
        ) : (
          <span className="text-muted-foreground text-[11px] font-normal">—</span>
        )
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const msg = row.original;
        const status = msg.status || (msg.isRead ? "read" : "unread");
        return (
          <>
            {status === "unread" && (
              <Badge className="bg-destructive/10 text-destructive hover:bg-destructive/20 text-[10px] font-medium">
                Unread
              </Badge>
            )}
            {status === "read" && (
              <Badge variant="secondary" className="text-[10px] font-medium">
                Read
              </Badge>
            )}
            {status === "replied" && (
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20 text-[10px] font-medium">
                Replied
              </Badge>
            )}
            {status === "archived" && (
              <Badge variant="outline" className="text-muted-foreground text-[10px] font-medium">
                Archived
              </Badge>
            )}
          </>
        );
      }
    },
    {
      accessorKey: "createdAt",
      header: "Received",
      cell: ({ row }) => {
        const date = row.original.createdAt;
        return (
          <span className="text-muted-foreground text-xs font-normal whitespace-nowrap">
            {date
              ? new Date(date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric"
                })
              : "Recently"}
          </span>
        );
      }
    },
    {
      id: "actions",
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => <MessageRowActions message={row.original} />
    }
  ];
}
