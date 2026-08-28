"use client";

import * as React from "react";

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

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string | React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "destructive" | "default";
  isLoading?: boolean;
  onConfirm: () => void | Promise<void>;
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title = "Are you absolutely sure?",
  description = "This action cannot be undone and will permanently remove this resource.",
  confirmLabel = "Delete Permanently",
  cancelLabel = "Cancel",
  variant = "destructive",
  isLoading = false,
  onConfirm
}: ConfirmDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="w-[calc(100%-2rem)] max-w-md p-6">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-foreground text-base font-black tracking-tight">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground text-xs leading-relaxed">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4 gap-2">
          <AlertDialogCancel
            disabled={isLoading}
            className="text-xs font-bold"
            onClick={() => onOpenChange(false)}
          >
            {cancelLabel}
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isLoading}
            onClick={async (e) => {
              e.preventDefault();
              await onConfirm();
            }}
            className={
              variant === "destructive"
                ? "bg-destructive hover:bg-destructive/90 text-destructive-foreground text-xs font-bold"
                : "bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold"
            }
          >
            {isLoading ? "Processing..." : confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
