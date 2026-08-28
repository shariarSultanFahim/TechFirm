"use client";

import * as React from "react";

import { MessageSquareQuote, Plus } from "lucide-react";

import { ITestimonial } from "@repo/types";

import { useUpdateTestimonial } from "@/hooks/use-testimonial-mutations";
import { useTestimonials } from "@/hooks/use-testimonials";

import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { getTestimonialColumns } from "../functions/testimonial-columns";

interface TestimonialsTableProps {
  onEdit: (testimonial: ITestimonial) => void;
  onOpenCreate: () => void;
}

export function TestimonialsTable({ onEdit, onOpenCreate }: TestimonialsTableProps) {
  const [search, setSearch] = React.useState("");
  const [pageIndex, setPageIndex] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);

  const { data, isLoading } = useTestimonials({
    page: pageIndex + 1,
    limit: pageSize
  });

  const updateTestimonial = useUpdateTestimonial();

  const handleToggleActive = (t: ITestimonial) => {
    const id = t.id || t._id;
    if (!id) return;
    updateTestimonial.mutate({
      id,
      data: { isActive: !t.isActive }
    });
  };

  const columns = React.useMemo(
    () => getTestimonialColumns(onEdit, handleToggleActive),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onEdit]
  );

  const allItems = data?.items || [];
  const filteredItems = React.useMemo(() => {
    if (!search.trim()) return allItems;
    const q = search.toLowerCase();
    return allItems.filter(
      (t) =>
        t.authorName.toLowerCase().includes(q) ||
        (t.company && t.company.toLowerCase().includes(q)) ||
        t.quote.toLowerCase().includes(q)
    );
  }, [allItems, search]);

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
            placeholder="Search reviews by name or text..."
            className="text-xs"
          />
        </div>
      </div>

      {/* Main DataTable */}
      <DataTable
        columns={columns}
        data={filteredItems}
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
            <MessageSquareQuote className="text-muted-foreground/30 mb-3 h-10 w-10" />
            <p className="text-foreground font-bold">No testimonials found</p>
            <p className="mt-1 text-xs">Start collecting and showcasing client reviews.</p>
            <Button onClick={onOpenCreate} size="sm" className="mt-4 text-xs font-bold">
              <Plus className="mr-1.5 h-3.5 w-3.5" /> Add Testimonial
            </Button>
          </div>
        }
      />
    </div>
  );
}
