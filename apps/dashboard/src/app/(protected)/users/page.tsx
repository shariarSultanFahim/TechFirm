"use client";

import { useState } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Calendar,
  KeyRound,
  Pencil,
  Search,
  ShieldAlert,
  ShieldCheck,
  Trash2,
  User,
  UserPlus,
  Users
} from "lucide-react";
import { toast } from "sonner";

import { ApiResponse, IUser, UserRole } from "@repo/types";
import { CreateUserInput, UpdateUserInput } from "@repo/validators";

import { del, get, patch, post } from "@/lib/api";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

const DEFAULT_FORM: CreateUserInput = {
  name: "",
  email: "",
  password: "",
  role: "user",
  isActive: true
};

export default function UsersManagementPage() {
  const queryClient = useQueryClient();
  const [selectedRole, setSelectedRole] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<IUser | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<IUser | null>(null);

  // Form state
  const [formData, setFormData] = useState<CreateUserInput>(DEFAULT_FORM);

  // 1. Fetch Users
  const { data: users = [], isLoading } = useQuery<IUser[]>({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const res = await get<ApiResponse<IUser[]>>("/users?limit=100");
      return res.data || [];
    }
  });

  // Create User Mutation
  const createMutation = useMutation({
    mutationFn: async (data: CreateUserInput) => {
      const res = await post<ApiResponse<IUser>>("/users", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast.success("User account created successfully!");
      setSheetOpen(false);
      setFormData(DEFAULT_FORM);
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "Failed to create user account";
      toast.error(msg);
    }
  });

  // Update User Mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<UpdateUserInput> }) => {
      const res = await patch<ApiResponse<IUser>>(`/users/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast.success("User account updated successfully!");
      setSheetOpen(false);
      setEditingUser(null);
      setFormData(DEFAULT_FORM);
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "Failed to update user account";
      toast.error(msg);
    }
  });

  // Delete User Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await del(`/users/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast.success("User account deleted permanently.");
      setDeleteTarget(null);
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "Failed to delete user account";
      toast.error(msg);
    }
  });

  const handleOpenCreate = () => {
    setEditingUser(null);
    setFormData(DEFAULT_FORM);
    setSheetOpen(true);
  };

  const handleOpenEdit = (user: IUser) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: "",
      role: (user.role as "admin" | "user") || "user",
      isActive: user.isActive ?? true
    });
    setSheetOpen(true);
  };

  const handleToggleRole = (user: IUser) => {
    const id = user.id || user._id;
    if (!id) return;
    const newRole = user.role === UserRole.ADMIN ? UserRole.USER : UserRole.ADMIN;

    updateMutation.mutate({
      id,
      data: { role: newRole }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingUser) {
      const id = editingUser.id || editingUser._id;
      if (!id) return;

      const payload: Partial<UpdateUserInput> = {
        name: formData.name,
        email: formData.email,
        role: formData.role
      };

      if (formData.password && formData.password.trim().length >= 8) {
        payload.password = formData.password.trim();
      }

      updateMutation.mutate({ id, data: payload });
    } else {
      if (!formData.password || formData.password.length < 8) {
        toast.error("Password must be at least 8 characters");
        return;
      }
      createMutation.mutate(formData);
    }
  };

  // Filter users
  const filteredUsers = users.filter((u) => {
    const matchesRole =
      selectedRole === "All" ||
      (selectedRole === "admin" && u.role === UserRole.ADMIN) ||
      (selectedRole === "user" && u.role === UserRole.USER);

    const matchesSearch =
      !searchQuery ||
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesRole && matchesSearch;
  });

  const totalCount = users.length;
  const adminCount = users.filter((u) => u.role === UserRole.ADMIN).length;
  const userCount = users.filter((u) => u.role === UserRole.USER).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-foreground flex items-center gap-2 text-2xl font-black tracking-tight">
            <Users className="text-primary h-6 w-6" />
            <span>User Accounts & RBAC</span>
          </h1>
          <p className="text-muted-foreground mt-0.5 text-xs">
            Manage administrative credentials, platform permissions, role-based access, and user
            profiles.
          </p>
        </div>

        <Button
          onClick={handleOpenCreate}
          className="bg-primary hover:bg-primary/90 text-primary-foreground self-start text-xs font-bold shadow-sm sm:self-auto"
        >
          <UserPlus className="mr-1.5 h-4 w-4" />
          Add User Account
        </Button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div className="border-border bg-card space-y-1 rounded-xl border p-4 shadow-2xs">
          <p className="text-muted-foreground text-[11px] font-bold tracking-wider uppercase">
            Total Accounts
          </p>
          <p className="text-foreground text-2xl font-black">{totalCount}</p>
        </div>

        <div className="border-border bg-card space-y-1 rounded-xl border p-4 shadow-2xs">
          <p className="text-primary flex items-center gap-1 text-[11px] font-bold tracking-wider uppercase">
            <ShieldCheck className="h-3 w-3" />
            <span>Administrators</span>
          </p>
          <p className="text-primary text-2xl font-black">{adminCount}</p>
        </div>

        <div className="border-border bg-card space-y-1 rounded-xl border p-4 shadow-2xs">
          <p className="text-muted-foreground flex items-center gap-1 text-[11px] font-bold tracking-wider uppercase">
            <User className="h-3 w-3" />
            <span>Standard Users</span>
          </p>
          <p className="text-foreground text-2xl font-black">{userCount}</p>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col justify-between gap-3 pt-2 sm:flex-row sm:items-center">
        <div className="flex items-center gap-1.5">
          {["All", "admin", "user"].map((r) => {
            const isSelected = selectedRole === r;
            const label = r === "All" ? "All Users" : r === "admin" ? "Admins" : "Standard Users";
            return (
              <button
                key={r}
                type="button"
                onClick={() => setSelectedRole(r)}
                className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "bg-muted/70 hover:bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div className="relative w-full max-w-xs">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="Search name, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 pl-9 text-xs"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="border-border bg-card overflow-hidden rounded-xl border shadow-2xs">
        {isLoading ? (
          <div className="text-muted-foreground py-12 text-center text-xs">
            Loading user accounts...
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-muted-foreground py-12 text-center text-xs">
            No user accounts found matching your criteria.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-12"></TableHead>
                <TableHead>User Account</TableHead>
                <TableHead>Role / Permissions</TableHead>
                <TableHead>Joined Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((u) => {
                const isAdmin = u.role === UserRole.ADMIN;
                const initials = u.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2);

                const dateFormatted = u.createdAt
                  ? new Date(u.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    })
                  : "—";

                return (
                  <TableRow key={u.id || u._id}>
                    <TableCell>
                      <div className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold">
                        {initials}
                      </div>
                    </TableCell>

                    <TableCell>
                      <div>
                        <p className="text-foreground text-xs font-bold">{u.name}</p>
                        <p className="text-muted-foreground text-[11px]">{u.email}</p>
                      </div>
                    </TableCell>

                    <TableCell>
                      <button
                        type="button"
                        onClick={() => handleToggleRole(u)}
                        className="cursor-pointer"
                        title="Click to toggle role"
                      >
                        {isAdmin ? (
                          <Badge className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-1 text-[10px] font-bold">
                            <ShieldCheck className="h-3 w-3" />
                            <span>Administrator</span>
                          </Badge>
                        ) : (
                          <Badge
                            variant="secondary"
                            className="hover:bg-muted flex items-center gap-1 text-[10px] font-semibold"
                          >
                            <User className="h-3 w-3" />
                            <span>Standard User</span>
                          </Badge>
                        )}
                      </button>
                    </TableCell>

                    <TableCell>
                      <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
                        <Calendar className="h-3 w-3" />
                        <span>{dateFormatted}</span>
                      </div>
                    </TableCell>

                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleOpenEdit(u)}
                          className="text-foreground hover:text-primary h-8 w-8"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => setDeleteTarget(u)}
                          className="text-muted-foreground hover:text-destructive h-8 w-8"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Create / Edit Slide-Over Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right" className="w-full space-y-6 overflow-y-auto p-6 sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="text-foreground flex items-center gap-2 text-lg font-black">
              <Users className="text-primary h-5 w-5" />
              <span>{editingUser ? "Edit User Account" : "Create User Account"}</span>
            </SheetTitle>
            <SheetDescription className="text-muted-foreground text-xs">
              Configure user authentication credentials, display name, and system role privileges.
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-1.5">
              <Label className="text-xs font-bold">
                Full Name <span className="text-destructive">*</span>
              </Label>
              <Input
                required
                placeholder="e.g. Alex Johnson"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="text-xs"
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <Label className="text-xs font-bold">
                Email Address <span className="text-destructive">*</span>
              </Label>
              <Input
                type="email"
                required
                placeholder="alex@techfirm.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="text-xs"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <Label className="flex items-center justify-between text-xs font-bold">
                <span>
                  Password{" "}
                  {editingUser ? (
                    "(Leave blank to keep unchanged)"
                  ) : (
                    <span className="text-destructive">*</span>
                  )}
                </span>
                <KeyRound className="text-muted-foreground h-3.5 w-3.5" />
              </Label>
              <Input
                type="password"
                required={!editingUser}
                placeholder={editingUser ? "••••••••" : "At least 8 characters"}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="text-xs"
              />
            </div>

            {/* Role Radio Group / Selector */}
            <div className="space-y-2 pt-2">
              <Label className="text-xs font-bold">Role & Permissions</Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: "user" })}
                  className={`cursor-pointer rounded-xl border p-3 text-left transition-all ${
                    formData.role === "user"
                      ? "border-primary bg-primary/5 ring-primary ring-1"
                      : "border-border hover:border-primary/40 bg-card"
                  }`}
                >
                  <div className="mb-1 flex items-center gap-2">
                    <User className="text-muted-foreground h-4 w-4" />
                    <span className="text-foreground text-xs font-bold">Standard User</span>
                  </div>
                  <p className="text-muted-foreground text-[10px] leading-snug">
                    Standard access without admin panel management.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: "admin" })}
                  className={`cursor-pointer rounded-xl border p-3 text-left transition-all ${
                    formData.role === "admin"
                      ? "border-primary bg-primary/5 ring-primary ring-1"
                      : "border-border hover:border-primary/40 bg-card"
                  }`}
                >
                  <div className="mb-1 flex items-center gap-2">
                    <ShieldAlert className="text-primary h-4 w-4" />
                    <span className="text-primary text-xs font-bold">Administrator</span>
                  </div>
                  <p className="text-muted-foreground text-[10px] leading-snug">
                    Full CRUD privileges across all dashboard features.
                  </p>
                </button>
              </div>
            </div>

            <SheetFooter className="border-border border-t pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setSheetOpen(false)}
                className="text-xs font-bold"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold"
              >
                {createMutation.isPending || updateMutation.isPending
                  ? "Saving..."
                  : editingUser
                    ? "Update Account"
                    : "Create Account"}
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation Alert Dialog */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-bold">Delete User Account?</AlertDialogTitle>
            <AlertDialogDescription className="text-xs">
              Are you sure you want to permanently delete the account for{" "}
              <strong>{deleteTarget?.name}</strong> ({deleteTarget?.email})? This user will
              immediately lose access.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-xs font-bold">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                const id = deleteTarget?.id || deleteTarget?._id;
                if (id) deleteMutation.mutate(id);
              }}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground text-xs font-bold"
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete Account"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
