"use client";

import * as React from "react";

import { Pencil, Trash2 } from "lucide-react";

import { IUser } from "@repo/types";

import { useDeleteUser } from "@/hooks/use-user-mutations";

import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { Button } from "@/components/ui/button";

interface UserRowActionsProps {
  user: IUser;
  onEdit: (user: IUser) => void;
}

export function UserRowActions({ user, onEdit }: UserRowActionsProps) {
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const deleteUser = useDeleteUser();

  const handleDelete = async () => {
    const id = user.id || user._id;
    if (!id) return;
    await deleteUser.mutateAsync(id);
    setDeleteOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-end gap-1.5">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => onEdit(user)}
          className="text-foreground hover:text-primary h-8 w-8"
          title="Edit User"
        >
          <Pencil className="h-3.5 w-3.5" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setDeleteOpen(true)}
          className="text-muted-foreground hover:text-destructive h-8 w-8"
          title="Delete User"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>

      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete User Account?"
        description={
          <span>
            Are you sure you want to permanently delete the account for{" "}
            <strong>&quot;{user.name}&quot;</strong> ({user.email})? This user will immediately lose
            access.
          </span>
        }
        isLoading={deleteUser.isPending}
        onConfirm={handleDelete}
      />
    </>
  );
}
