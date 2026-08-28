"use client";

import { format } from "date-fns";
import { Trash2, RefreshCw } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { get, patch, del } from "@/lib/api";
import { IUser, UserRole, ApiResponse } from "@repo/types";

const fallbackUsers: IUser[] = [
  {
    id: "u-1",
    name: "TechFirm Admin",
    email: "admin@techfirm.com",
    role: "admin",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z"
  },
  {
    id: "u-2",
    name: "Default Admin",
    email: "admin@example.com",
    role: "admin",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z"
  },
  {
    id: "u-3",
    name: "Alex Support",
    email: "alex@techfirm.com",
    role: "user",
    createdAt: "2026-02-15T00:00:00.000Z",
    updatedAt: "2026-02-15T00:00:00.000Z"
  }
];

export default function UsersManagementPage() {
  const queryClient = useQueryClient();

  const { data: users = fallbackUsers, isLoading, refetch } = useQuery({
    queryKey: ["dashboard-users"],
    queryFn: async () => {
      try {
        const res = await get<ApiResponse<IUser[]>>("/users");
        return res.data && res.data.length > 0 ? res.data : fallbackUsers;
      } catch {
        return fallbackUsers;
      }
    },
    initialData: fallbackUsers
  });

  const toggleRoleMutation = useMutation({
    mutationFn: async ({ id, newRole }: { id: string; newRole: UserRole | string }) => {
      return await patch(`/users/${id}`, { role: newRole });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard-users"] });
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
    onError: () => {
      alert("Failed to update user role.");
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await del(`/users/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard-users"] });
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
    onError: () => {
      alert("Failed to delete user");
    }
  });

  const toggleRole = (user: IUser) => {
    const newRole = user.role === UserRole.ADMIN ? UserRole.USER : UserRole.ADMIN;
    toggleRoleMutation.mutate({ id: user.id, newRole });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    deleteMutation.mutate(id);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground">
            Users &amp; RBAC Administration
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage authenticated users, roles, and administrative access privileges.
          </p>
        </div>

        <button
          onClick={() => refetch()}
          className="p-2.5 rounded-xl border border-border bg-card hover:bg-muted text-foreground transition-colors shadow-2xs cursor-pointer"
          title="Refresh Users"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-foreground">
            <thead className="bg-muted/60 border-b border-border text-xs font-extrabold uppercase text-muted-foreground">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Joined Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-muted/40 transition-colors">
                  <td className="px-6 py-4 font-bold text-foreground">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground font-black text-xs flex items-center justify-center">
                        {user.name.charAt(0)}
                      </div>
                      <span>{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground font-mono text-xs">
                    {user.email}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                        user.role === UserRole.ADMIN
                          ? "bg-purple-100 text-purple-800 border border-purple-200"
                          : "bg-muted text-muted-foreground border border-border"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-muted-foreground whitespace-nowrap">
                    {user.createdAt
                      ? format(new Date(user.createdAt), "dd MMM yyyy")
                      : "Recently"}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => toggleRole(user)}
                      className="px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-muted text-xs font-bold text-foreground transition-colors shadow-2xs cursor-pointer"
                    >
                      {user.role === UserRole.ADMIN ? "Demote to User" : "Promote to Admin"}
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
                      title="Delete User"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
