"use client";

import * as React from "react";

import { Pencil, Trash2 } from "lucide-react";

import { ITeamMember } from "@repo/types";

import { useDeleteTeamMember } from "@/hooks/use-team-mutations";

import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { Button } from "@/components/ui/button";

interface TeamRowActionsProps {
  member: ITeamMember;
  onEdit: (member: ITeamMember) => void;
}

export function TeamRowActions({ member, onEdit }: TeamRowActionsProps) {
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const deleteMember = useDeleteTeamMember();

  const handleDelete = async () => {
    const id = member.id || member._id;
    if (!id) return;
    await deleteMember.mutateAsync(id);
    setDeleteOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-end gap-1.5">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => onEdit(member)}
          className="text-foreground hover:text-primary h-8 w-8"
          title="Edit Team Member"
        >
          <Pencil className="h-3.5 w-3.5" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setDeleteOpen(true)}
          className="text-muted-foreground hover:text-destructive h-8 w-8"
          title="Delete Team Member"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>

      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Team Member?"
        description={
          <span>
            Are you sure you want to delete <strong>&quot;{member.name}&quot;</strong>? This action
            cannot be undone.
          </span>
        }
        isLoading={deleteMember.isPending}
        onConfirm={handleDelete}
      />
    </>
  );
}
