"use client";

import { UserPlus, Users } from "lucide-react";

import { IUser } from "@repo/types";

import { useCreateUser, useUpdateUser } from "@/hooks/use-user-mutations";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

import { UserForm } from "./user-form";

interface UserFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: IUser | null;
}

export function UserFormDialog({ open, onOpenChange, user }: UserFormDialogProps) {
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();

  const isEditing = !!user;
  const isLoading = createUser.isPending || updateUser.isPending;

  const handleSubmit = async (values: {
    name: string;
    email: string;
    role: "admin" | "user";
    isActive: boolean;
    password?: string;
  }) => {
    if (user) {
      const id = user.id || user._id;
      if (!id) return;

      const payload: {
        name?: string;
        email?: string;
        role?: "admin" | "user";
        isActive?: boolean;
        password?: string;
      } = {
        name: values.name,
        email: values.email,
        role: values.role,
        isActive: values.isActive
      };

      if (values.password && values.password.trim().length >= 8) {
        payload.password = values.password.trim();
      }

      await updateUser.mutateAsync({ id, data: payload });
    } else {
      if (!values.password) return;
      await createUser.mutateAsync({
        name: values.name,
        email: values.email,
        password: values.password,
        role: values.role,
        isActive: values.isActive
      });
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isEditing ? (
              <Users className="text-primary h-5 w-5" />
            ) : (
              <UserPlus className="text-primary h-5 w-5" />
            )}
            <span>{isEditing ? "Edit User Account" : "Create User Account"}</span>
          </DialogTitle>
          <DialogDescription>
            Configure user credentials, display name, and role-based permissions.
          </DialogDescription>
        </DialogHeader>

        <UserForm
          key={user ? user.id || user._id : "create"}
          defaultValues={
            user
              ? {
                  name: user.name,
                  email: user.email,
                  password: "",
                  role: (user.role as "admin" | "user") || "user",
                  isActive: user.isActive ?? true
                }
              : undefined
          }
          isEditing={isEditing}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          onCancel={() => onOpenChange(false)}
          submitLabel={isEditing ? "Update Account" : "Create Account"}
        />
      </DialogContent>
    </Dialog>
  );
}
