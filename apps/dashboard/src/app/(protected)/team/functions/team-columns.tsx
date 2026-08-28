"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Github, Linkedin, Mail, Phone, Twitter } from "lucide-react";

import { ITeamMember } from "@repo/types";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

import { TeamRowActions } from "../components/team-row-actions";

export function getTeamColumns(
  onEdit: (member: ITeamMember) => void,
  onToggleActive: (member: ITeamMember) => void
): ColumnDef<ITeamMember>[] {
  return [
    {
      accessorKey: "order",
      header: "Order",
      cell: ({ row }) => (
        <span className="text-muted-foreground font-mono text-xs font-normal">
          #{row.original.order}
        </span>
      )
    },
    {
      accessorKey: "name",
      header: "Member",
      cell: ({ row }) => {
        const m = row.original;
        return (
          <div className="flex items-center gap-3">
            <Avatar className="border-border h-10 w-10 shrink-0 border">
              <AvatarImage src={m.photo} alt={m.name} />
              <AvatarFallback className="text-xs font-medium">
                {m.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-foreground text-xs font-medium">{m.name}</p>
              {m.experience && (
                <p className="text-muted-foreground text-[11px] font-normal">{m.experience}</p>
              )}
            </div>
          </div>
        );
      }
    },
    {
      accessorKey: "role",
      header: "Role & Slug",
      cell: ({ row }) => {
        const m = row.original;
        return (
          <div>
            <p className="text-foreground text-xs font-medium">{m.role}</p>
            {m.slug && (
              <code className="text-muted-foreground bg-muted rounded-md px-1.5 py-0.5 font-mono text-[10px]">
                /team/{m.slug}
              </code>
            )}
          </div>
        );
      }
    },
    {
      id: "contact",
      header: "Contact & Social",
      cell: ({ row }) => {
        const m = row.original;
        return (
          <div className="space-y-1">
            {m.email && (
              <div className="text-muted-foreground flex items-center gap-1.5 text-[11px] font-normal">
                <Mail className="text-primary h-3 w-3 shrink-0" />
                <span>{m.email}</span>
              </div>
            )}
            {m.phone && (
              <div className="text-muted-foreground flex items-center gap-1.5 text-[11px] font-normal">
                <Phone className="text-primary h-3 w-3 shrink-0" />
                <span>{m.phone}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5 pt-0.5">
              {m.socialLinks?.linkedin && (
                <a
                  href={m.socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Linkedin className="h-3 w-3" />
                </a>
              )}
              {m.socialLinks?.twitter && (
                <a
                  href={m.socialLinks.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Twitter className="h-3 w-3" />
                </a>
              )}
              {m.socialLinks?.github && (
                <a
                  href={m.socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Github className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>
        );
      }
    },
    {
      accessorKey: "skills",
      header: "Skills",
      cell: ({ row }) => {
        const skills = row.original.skills || [];
        return (
          <div className="flex max-w-xs flex-wrap gap-1">
            {skills.slice(0, 3).map((s) => (
              <Badge key={s} variant="secondary" className="py-0 text-[10px] font-medium">
                {s}
              </Badge>
            ))}
            {skills.length > 3 && (
              <span className="text-muted-foreground text-[10px] font-normal">
                +{skills.length - 3}
              </span>
            )}
          </div>
        );
      }
    },
    {
      accessorKey: "isActive",
      header: "Active",
      cell: ({ row }) => (
        <Switch
          checked={row.original.isActive}
          onCheckedChange={() => onToggleActive(row.original)}
        />
      )
    },
    {
      id: "actions",
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => <TeamRowActions member={row.original} onEdit={onEdit} />
    }
  ];
}
