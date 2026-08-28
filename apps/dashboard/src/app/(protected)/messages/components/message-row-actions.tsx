"use client";

import * as React from "react";

import { Eye, MailCheck, MailQuestion, Trash2 } from "lucide-react";

import { ContactMessageStatus, IContactMessage } from "@repo/types";

import {
  useDeleteContactMessage,
  useUpdateContactMessage
} from "@/hooks/use-contact-message-mutations";

import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { Button } from "@/components/ui/button";

import { MessageDetailDialog } from "../forms/message-detail-dialog";

interface MessageRowActionsProps {
  message: IContactMessage;
}

export function MessageRowActions({ message }: MessageRowActionsProps) {
  const [detailOpen, setDetailOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const updateMessage = useUpdateContactMessage();
  const deleteMessage = useDeleteContactMessage();

  const handleToggleRead = (e: React.MouseEvent) => {
    e.stopPropagation();
    const id = message.id || message._id;
    if (!id) return;

    const newIsRead = !message.isRead;
    const newStatus: ContactMessageStatus = newIsRead ? "read" : "unread";

    updateMessage.mutate({
      id,
      data: { isRead: newIsRead, status: newStatus }
    });
  };

  const handleDelete = async () => {
    const id = message.id || message._id;
    if (!id) return;
    await deleteMessage.mutateAsync(id);
    setDeleteOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setDetailOpen(true)}
          title="View Inquiry Details & Notes"
          className="text-foreground hover:text-primary h-8 w-8"
        >
          <Eye className="h-3.5 w-3.5" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={handleToggleRead}
          title={message.isRead ? "Mark as Unread" : "Mark as Read"}
          className="text-foreground hover:text-primary h-8 w-8"
        >
          {message.isRead ? (
            <MailQuestion className="h-3.5 w-3.5" />
          ) : (
            <MailCheck className="text-primary h-3.5 w-3.5" />
          )}
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation();
            setDeleteOpen(true);
          }}
          className="text-muted-foreground hover:text-destructive h-8 w-8"
          title="Delete Inquiry"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>

      <MessageDetailDialog open={detailOpen} onOpenChange={setDetailOpen} message={message} />

      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Message?"
        description={
          <span>
            Are you sure you want to permanently remove this message from{" "}
            <strong>{message.name}</strong>? This action cannot be undone.
          </span>
        }
        isLoading={deleteMessage.isPending}
        onConfirm={handleDelete}
      />
    </>
  );
}
