"use client";

import * as React from "react";

import { Plus, Users } from "lucide-react";

import { ITeamMember } from "@repo/types";

import { useTeamMembers } from "@/hooks/use-team-members";
import { useUpdateTeamMember } from "@/hooks/use-team-mutations";

import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { getTeamColumns } from "../functions/team-columns";

interface TeamTableProps {
  onEdit: (member: ITeamMember) => void;
  onOpenCreate: () => void;
}

export function TeamTable({ onEdit, onOpenCreate }: TeamTableProps) {
  const [search, setSearch] = React.useState("");
  const [pageIndex, setPageIndex] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);

  const { data, isLoading } = useTeamMembers({
    page: pageIndex + 1,
    limit: pageSize,
    search: search || undefined
  });

  const updateMember = useUpdateTeamMember();

  const handleToggleActive = (m: ITeamMember) => {
    const id = m.id || m._id;
    if (!id) return;
    updateMember.mutate({
      id,
      data: { isActive: !m.isActive }
    });
  };

  const columns = React.useMemo(
    () => getTeamColumns(onEdit, handleToggleActive),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onEdit]
  );

  const members = data?.items || [];
  const meta = data?.meta || { page: 1, limit: 10, total: 0, totalPages: 1 };
  const pageCount = meta.totalPages || meta.totalPage || 1;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="w-full sm:w-80">
          <Input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPageIndex(0);
            }}
            placeholder="Search by name, role, skill, email..."
            className="text-xs"
          />
        </div>
      </div>

      {/* Main DataTable */}
      <DataTable
        columns={columns}
        data={members}
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
            <p className="text-foreground font-bold">No team members found</p>
            <p className="mt-1 text-xs">
              Showcase the leaders, engineers, and staff behind your company.
            </p>
            <Button onClick={onOpenCreate} size="sm" className="mt-4 text-xs font-bold">
              <Plus className="mr-1.5 h-3.5 w-3.5" /> Add Team Member
            </Button>
          </div>
        }
      />
    </div>
  );
}
