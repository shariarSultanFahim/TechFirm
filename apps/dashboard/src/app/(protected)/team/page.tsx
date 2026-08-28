"use client";

import * as React from "react";

import { Plus, Users } from "lucide-react";

import { ITeamMember } from "@repo/types";

import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";

import { TeamTable } from "./components/team-table";
import { TeamMemberFormDialog } from "./forms/team-form-dialog";

export default function TeamPage() {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editingMember, setEditingMember] = React.useState<ITeamMember | null>(null);

  const handleOpenCreate = () => {
    setEditingMember(null);
    setDialogOpen(true);
  };

  const handleOpenEdit = (member: ITeamMember) => {
    setEditingMember(member);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Team Members"
        description="Manage company leadership, engineers, consultants, and public team profiles."
        icon={Users}
      >
        <Button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 text-xs font-bold shadow-md"
        >
          <Plus className="h-4 w-4" />
          <span>Add Member</span>
        </Button>
      </PageHeader>

      <TeamTable onEdit={handleOpenEdit} onOpenCreate={handleOpenCreate} />

      <TeamMemberFormDialog open={dialogOpen} onOpenChange={setDialogOpen} member={editingMember} />
    </div>
  );
}
