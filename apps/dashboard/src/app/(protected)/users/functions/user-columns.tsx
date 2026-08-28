"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Calendar, ShieldCheck, User } from "lucide-react";

import { IUser, UserRole } from "@repo/types";

import { Badge } from "@/components/ui/badge";

import { UserRowActions } from "../components/user-row-actions";

export function getUserColumns(
  onEdit: (user: IUser) => void,
  onToggleRole: (user: IUser) => void
): ColumnDef<IUser>[] {
  return [
    {
      id: "avatar",
      header: "",
      cell: ({ row }) => {
        const name = row.original.name || "User";
        const initials = name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2);

        return (
          <div className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium">
            {initials}
          </div>
        );
      }
    },
    {
      accessorKey: "name",
      header: "User Account",
      cell: ({ row }) => {
        const u = row.original;
        return (
          <div>
            <p className="text-foreground text-xs font-medium">{u.name}</p>
            <p className="text-muted-foreground text-[11px] font-normal">{u.email}</p>
          </div>
        );
      }
    },
    {
      accessorKey: "role",
      header: "Role / Permissions",
      cell: ({ row }) => {
        const u = row.original;
        const isAdmin = u.role === UserRole.ADMIN || u.role === "admin";

        return (
          <button
            type="button"
            onClick={() => onToggleRole(u)}
            className="cursor-pointer"
            title="Click to toggle role"
          >
            {isAdmin ? (
              <Badge className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-1 text-[10px] font-medium">
                <ShieldCheck className="h-3 w-3" />
                <span>Administrator</span>
              </Badge>
            ) : (
              <Badge
                variant="secondary"
                className="hover:bg-muted flex items-center gap-1 text-[10px] font-medium"
              >
                <User className="h-3 w-3" />
                <span>Standard User</span>
              </Badge>
            )}
          </button>
        );
      }
    },
    {
      accessorKey: "createdAt",
      header: "Joined Date",
      cell: ({ row }) => {
        const date = row.original.createdAt;
        return (
          <div className="text-muted-foreground flex items-center gap-1.5 text-xs font-normal">
            <Calendar className="h-3 w-3" />
            <span>
              {date
                ? new Date(date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric"
                  })
                : "—"}
            </span>
          </div>
        );
      }
    },
    {
      id: "actions",
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => <UserRowActions user={row.original} onEdit={onEdit} />
    }
  ];
}
