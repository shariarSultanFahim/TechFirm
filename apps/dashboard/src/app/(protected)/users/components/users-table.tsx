"use client";

import * as React from "react";

import { Plus, Users } from "lucide-react";

import { IUser, UserRole } from "@repo/types";

import { useUpdateUser } from "@/hooks/use-user-mutations";
import { useUsers } from "@/hooks/use-users";

import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { getUserColumns } from "../functions/user-columns";

interface UsersTableProps {
  onEdit: (user: IUser) => void;
  onOpenCreate: () => void;
}

export function UsersTable({ onEdit, onOpenCreate }: UsersTableProps) {
  const [search, setSearch] = React.useState("");
  const [selectedRole, setSelectedRole] = React.useState("All");
  const [pageIndex, setPageIndex] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);

  const { data, isLoading } = useUsers({
    page: pageIndex + 1,
    limit: pageSize,
    role: selectedRole,
    search: search || undefined
  });

  const updateUser = useUpdateUser();

  const handleToggleRole = (u: IUser) => {
    const id = u.id || u._id;
    if (!id) return;
    const newRole =
      u.role === UserRole.ADMIN || u.role === "admin" ? UserRole.USER : UserRole.ADMIN;
    updateUser.mutate({
      id,
      data: { role: newRole }
    });
  };

  const columns = React.useMemo(
    () => getUserColumns(onEdit, handleToggleRole),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onEdit]
  );

  const users = data?.items || [];
  const meta = data?.meta || { page: 1, limit: 10, total: 0, totalPages: 1 };
  const pageCount = meta.totalPages || meta.totalPage || 1;

  return (
    <div className="space-y-4">
      {/* Role Filters & Search */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-1.5">
          {["All", "admin", "user"].map((r) => {
            const isSelected = selectedRole === r;
            const label = r === "All" ? "All Users" : r === "admin" ? "Admins" : "Standard Users";
            return (
              <button
                key={r}
                type="button"
                onClick={() => {
                  setSelectedRole(r);
                  setPageIndex(0);
                }}
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
          <Input
            placeholder="Search name, email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPageIndex(0);
            }}
            className="text-xs"
          />
        </div>
      </div>

      {/* Main DataTable */}
      <DataTable
        columns={columns}
        data={users}
        pageCount={pageCount}
        pageIndex={pageIndex}
        pageSize={pageSize}
        onPaginationChange={({ pageIndex: nextPageIndex, pageSize: nextPageSize }) => {
          setPageIndex(nextPageIndex);
          setPageSize(nextPageSize);
        }}
        isLoading={isLoading}
        emptyState={
          <div className="text-muted-foreground flex flex-col items-center justify-center p-12 text-center">
            <Users className="text-muted-foreground/30 mb-3 h-10 w-10" />
            <p className="text-foreground font-bold">No user accounts found</p>
            <p className="mt-1 text-xs">Add administrators or team accounts to collaborate.</p>
            <Button onClick={onOpenCreate} size="sm" className="mt-4 text-xs font-bold">
              <Plus className="mr-1.5 h-3.5 w-3.5" /> Add User Account
            </Button>
          </div>
        }
      />
    </div>
  );
}
