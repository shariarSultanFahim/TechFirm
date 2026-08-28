"use client";

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

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
  const table = useReactTable({
    data,
    columns,
    pageCount: pageCount ?? -1,
    state: {
      pagination: {
        pageIndex,
        pageSize
      }
    },
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        const nextState = updater({ pageIndex, pageSize });
        onPaginationChange?.(nextState);
      } else {
        onPaginationChange?.(updater);
      }
    },
    manualPagination: true,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <div className="space-y-4">
      {/* Table Container */}
      <div className="border-border bg-card overflow-hidden rounded-xl border shadow-xs">
        <div className="w-full overflow-x-auto">
          <Table className="min-w-max">
            <TableHeader className="bg-muted/40">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="hover:bg-transparent">
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="text-muted-foreground text-xs font-medium whitespace-nowrap"
                    >
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
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i} className="hover:bg-transparent">
                    {columns.map((_, colIndex) => (
                      <TableCell key={colIndex} className="p-4">
                        <Skeleton className="h-5 w-full rounded-md" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="hover:bg-muted/30 border-border/60 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="text-foreground text-xs font-normal">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-32 text-center">
                    {emptyState || (
                      <div className="text-muted-foreground flex flex-col items-center justify-center p-8 text-center">
                        <p className="text-foreground text-sm font-medium">No records found</p>
                        <p className="mt-1 text-xs font-normal">
                          There is no data available to display.
                        </p>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col items-center justify-between gap-4 px-2 py-1 sm:flex-row">
        <div className="text-muted-foreground text-xs font-normal">
          Page <span className="text-foreground font-medium">{pageIndex + 1}</span> of{" "}
          <span className="text-foreground font-medium">{Math.max(1, pageCount)}</span>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon-sm"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage() || isLoading}
            title="First page"
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon-sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage() || isLoading}
            title="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <span className="bg-muted text-foreground mx-1 flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-xs font-medium">
            {pageIndex + 1}
          </span>

          <Button
            variant="outline"
            size="icon-sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage() || isLoading}
            title="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon-sm"
            onClick={() => table.setPageIndex(pageCount - 1)}
            disabled={!table.getCanNextPage() || isLoading}
            title="Last page"
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
