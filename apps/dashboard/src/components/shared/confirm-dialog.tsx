"use client";

import { Loader2 } from "lucide-react";

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
  confirmText?: string;
  cancelText?: string;
  variant?: "destructive" | "default";
  isLoading?: boolean;
  onConfirm: () => void | Promise<void>;
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Delete",
  cancelText = "Cancel",
  variant = "destructive",
  isLoading = false,
  onConfirm
}: ConfirmDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-foreground text-base font-semibold">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground text-xs leading-relaxed font-normal">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="border-border border-t pt-4">
          <AlertDialogCancel
            disabled={isLoading}
            onClick={() => onOpenChange(false)}
            className="text-xs font-medium"
          >
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isLoading}
            onClick={async (e) => {
              e.preventDefault();
              await onConfirm();
            }}
            className={`cursor-pointer ${
              variant === "destructive"
                ? "bg-destructive hover:bg-destructive/90 text-destructive-foreground text-xs font-medium"
                : "bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-medium"
            }`}
          >
            {isLoading && <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />}
            <span>{isLoading ? "Processing..." : confirmText}</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
