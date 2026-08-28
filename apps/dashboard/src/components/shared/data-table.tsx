"use client";

import * as React from "react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  PaginationState,
  useReactTable
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, FolderOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageCount?: number;
  pageIndex?: number;
  pageSize?: number;
  onPaginationChange?: (pagination: { pageIndex: number; pageSize: number }) => void;
  isLoading?: boolean;
  emptyState?: React.ReactNode;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageCount = 1,
  pageIndex = 0,
  pageSize = 10,
  onPaginationChange,
  isLoading = false,
  emptyState
}: DataTableProps<TData, TValue>) {
  const pagination = React.useMemo<PaginationState>(
    () => ({
      pageIndex,
      pageSize
    }),
    [pageIndex, pageSize]
  );

  const table = useReactTable({
    data,
    columns,
    pageCount: pageCount ?? -1,
    state: {
      pagination
    },
    onPaginationChange: (updater) => {
      const next = typeof updater === "function" ? updater(pagination) : updater;
      onPaginationChange?.(next);
    },
    manualPagination: true,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <div className="space-y-4">
      {/* Table Container with guaranteed horizontal scroll wrapper */}
      <div className="bg-card border-border overflow-hidden rounded-2xl border shadow-xs">
        <div className="overflow-x-auto">
          <Table className="min-w-max">
            <TableHeader className="bg-muted/40">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="text-xs font-bold whitespace-nowrap">
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: Math.min(pageSize, 5) }).map((_, rIdx) => (
                  <TableRow key={`skeleton-row-${rIdx}`}>
                    {columns.map((_, cIdx) => (
                      <TableCell key={`skeleton-cell-${rIdx}-${cIdx}`} className="p-4">
                        <Skeleton className="h-4 w-full min-w-[60px]" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="px-4 py-3 align-middle text-xs">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-48 text-center">
                    {emptyState ?? (
                      <div className="text-muted-foreground flex flex-col items-center justify-center p-8 text-center">
                        <FolderOpen className="text-muted-foreground/30 mb-3 h-10 w-10" />
                        <p className="text-foreground text-sm font-bold">No records found</p>
                        <p className="mt-1 text-xs">There is no data to display currently.</p>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Responsive Server Pagination Toolbar */}
      {pageCount > 1 && (
        <div className="flex flex-col items-center justify-between gap-4 px-2 sm:flex-row">
          <div className="text-muted-foreground text-xs font-medium">
            Page <span className="text-foreground font-bold">{pageIndex + 1}</span> of{" "}
            <span className="text-foreground font-bold">{Math.max(1, pageCount)}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => onPaginationChange?.({ pageIndex: 0, pageSize })}
              disabled={pageIndex <= 0 || isLoading}
              title="First Page"
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => onPaginationChange?.({ pageIndex: pageIndex - 1, pageSize })}
              disabled={pageIndex <= 0 || isLoading}
              title="Previous Page"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <span className="bg-muted text-foreground mx-1 flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-xs font-bold">
              {pageIndex + 1}
            </span>

            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => onPaginationChange?.({ pageIndex: pageIndex + 1, pageSize })}
              disabled={pageIndex + 1 >= pageCount || isLoading}
              title="Next Page"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => onPaginationChange?.({ pageIndex: pageCount - 1, pageSize })}
              disabled={pageIndex + 1 >= pageCount || isLoading}
              title="Last Page"
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
