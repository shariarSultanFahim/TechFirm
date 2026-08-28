"use client";

import * as React from "react";

import { UserPlus, Users } from "lucide-react";

import { IUser } from "@repo/types";

import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";

import { UsersTable } from "./components/users-table";
import { UserFormDialog } from "./forms/user-form-dialog";

export default function UsersManagementPage() {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editingUser, setEditingUser] = React.useState<IUser | null>(null);

  const handleOpenCreate = () => {
    setEditingUser(null);
    setDialogOpen(true);
  };

  const handleOpenEdit = (user: IUser) => {
    setEditingUser(user);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="User Accounts & RBAC"
        description="Manage administrative credentials, platform permissions, role-based access, and user profiles."
        icon={Users}
      >
        <Button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 text-xs font-medium shadow-xs"
        >
          <UserPlus className="h-4 w-4" />
          <span>Add User Account</span>
        </Button>
      </PageHeader>

      <UsersTable onEdit={handleOpenEdit} onOpenCreate={handleOpenCreate} />

      <UserFormDialog open={dialogOpen} onOpenChange={setDialogOpen} user={editingUser} />
    </div>
  );
}
