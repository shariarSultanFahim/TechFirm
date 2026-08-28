"use client";

import * as React from "react";

import { Briefcase, Plus } from "lucide-react";

import { IPortfolioItem } from "@repo/types";

import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";

import { PortfolioTable } from "./components/portfolio-table";
import { PortfolioFormDialog } from "./forms/portfolio-form-dialog";

export default function PortfolioPage() {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editingItem, setEditingItem] = React.useState<IPortfolioItem | null>(null);

  const handleOpenCreate = () => {
    setEditingItem(null);
    setDialogOpen(true);
  };

  const handleOpenEdit = (item: IPortfolioItem) => {
    setEditingItem(item);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Portfolio & Case Studies"
        description="Manage showcase client projects, industry case studies, deliverables, and metric outcomes."
        icon={Briefcase}
      >
        <Button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 text-xs font-medium shadow-xs"
        >
          <Plus className="h-4 w-4" />
          <span>Add Case Study</span>
        </Button>
      </PageHeader>

      <PortfolioTable onEdit={handleOpenEdit} onOpenCreate={handleOpenCreate} />

      <PortfolioFormDialog open={dialogOpen} onOpenChange={setDialogOpen} item={editingItem} />
    </div>
  );
}
