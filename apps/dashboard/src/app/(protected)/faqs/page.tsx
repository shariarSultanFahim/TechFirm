"use client";

import * as React from "react";

import { HelpCircle, Plus } from "lucide-react";

import { IFaq } from "@repo/types";

import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";

import { FaqsTable } from "./components/faqs-table";
import { FaqFormDialog } from "./forms/faq-form-dialog";

export default function FaqsPage() {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editingFaq, setEditingFaq] = React.useState<IFaq | null>(null);

  const handleOpenCreate = () => {
    setEditingFaq(null);
    setDialogOpen(true);
  };

  const handleOpenEdit = (faq: IFaq) => {
    setEditingFaq(faq);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Frequently Asked Questions"
        description="Manage public accordion Q&As, categorization, and search responses across web and landing pages."
        icon={HelpCircle}
      >
        <Button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 text-xs font-bold shadow-md"
        >
          <Plus className="h-4 w-4" />
          <span>Add FAQ</span>
        </Button>
      </PageHeader>

      <FaqsTable onEdit={handleOpenEdit} onOpenCreate={handleOpenCreate} />

      <FaqFormDialog open={dialogOpen} onOpenChange={setDialogOpen} faq={editingFaq} />
    </div>
  );
}
