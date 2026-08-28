"use client";

import * as React from "react";

import { Calendar, MessageSquare, Phone, Send, Tag, User } from "lucide-react";

import { ContactMessageStatus, IContactMessage } from "@repo/types";

import { useUpdateContactMessage } from "@/hooks/use-contact-message-mutations";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const STATUS_OPTIONS: ContactMessageStatus[] = ["unread", "read", "replied", "archived"];

interface MessageDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  message: IContactMessage | null;
}

function MessageDetailContent({
  message,
  onClose
}: {
  message: IContactMessage;
  onClose: () => void;
}) {
  const updateMessage = useUpdateContactMessage();
  const [status, setStatus] = React.useState<ContactMessageStatus>(
    message.status || (message.isRead ? "read" : "unread")
  );
  const [replyNotes, setReplyNotes] = React.useState(message.replyNotes || "");

  // Auto-mark as read on open if currently unread
  React.useEffect(() => {
    if (!message.isRead) {
      const id = message.id || message._id;
      if (id) {
        updateMessage.mutate({
          id,
          data: { isRead: true, status: "read" }
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = message.id || message._id;
    if (!id) return;

    await updateMessage.mutateAsync({
      id,
      data: {
        status,
        isRead: status !== "unread",
        replyNotes
      }
    });
    onClose();
  };

  return (
    <div className="space-y-4 pt-1">
      {/* Sender card */}
      <div className="border-border bg-muted/30 space-y-3 rounded-xl border p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className="bg-primary/10 text-primary flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium">
              <User className="h-4 w-4" />
            </div>
            <div>
              <p className="text-foreground text-sm font-medium">{message.name}</p>
              <a
                href={`mailto:${message.email}`}
                className="text-primary text-xs font-normal hover:underline"
              >
                {message.email}
              </a>
            </div>
          </div>

          <a
            href={`mailto:${message.email}?subject=Re: ${encodeURIComponent(
              message.subject || "TechFirm Consultation"
            )}`}
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium shadow-2xs transition-colors"
          >
            <Send className="h-3 w-3" />
            <span>Reply Email</span>
          </a>
        </div>

        <div className="border-border/60 grid grid-cols-2 gap-2 border-t pt-2 text-xs font-normal">
          {message.phone && (
            <div className="text-muted-foreground flex items-center gap-1.5">
              <Phone className="text-primary h-3.5 w-3.5" />
              <a href={`tel:${message.phone}`} className="hover:text-foreground">
                {message.phone}
              </a>
            </div>
          )}

          {message.service && (
            <div className="text-muted-foreground flex items-center gap-1.5">
              <Tag className="text-primary h-3.5 w-3.5" />
              <span>{message.service}</span>
            </div>
          )}

          <div className="text-muted-foreground col-span-2 flex items-center gap-1.5">
            <Calendar className="text-primary h-3.5 w-3.5" />
            <span>
              Received:{" "}
              {message.createdAt
                ? new Date(message.createdAt).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short"
                  })
                : "Recently"}
            </span>
          </div>
        </div>
      </div>

      {/* Subject & message text */}
      <div className="space-y-1.5">
        <Label className="text-foreground text-xs font-medium">
          Subject: {message.subject || "General Consultation Inquiry"}
        </Label>
        <div className="border-border bg-card text-foreground rounded-xl border p-3.5 text-xs leading-relaxed font-normal whitespace-pre-wrap sm:text-sm">
          {message.message}
        </div>
      </div>

      {/* Follow-up notes */}
      <form onSubmit={handleSave} className="border-border space-y-3.5 border-t pt-3.5">
        <div className="space-y-1.5">
          <Label className="text-xs font-medium">Follow-Up Status</Label>
          <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
            {STATUS_OPTIONS.map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatus(st)}
                className={`cursor-pointer rounded-lg p-2 text-center text-xs font-medium tracking-wider uppercase transition-all ${
                  status === st
                    ? "bg-primary text-primary-foreground shadow-2xs"
                    : "bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs font-medium">Internal Follow-Up Notes</Label>
          <Textarea
            rows={3}
            placeholder="Log internal follow-up steps, call notes, or next actions..."
            value={replyNotes}
            onChange={(e) => setReplyNotes(e.target.value)}
            className="text-xs font-normal"
          />
        </div>

        <DialogFooter className="border-border border-t pt-3.5">
          <Button type="button" variant="outline" onClick={onClose} className="text-xs font-medium">
            Close
          </Button>
          <Button type="submit" disabled={updateMessage.isPending} className="text-xs font-medium">
            {updateMessage.isPending ? "Saving..." : "Save Status & Notes"}
          </Button>
        </DialogFooter>
      </form>
    </div>
  );
}

export function MessageDetailDialog({ open, onOpenChange, message }: MessageDetailDialogProps) {
  if (!message) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base font-semibold">
            <MessageSquare className="text-primary h-5 w-5" />
            <span>Inquiry Details</span>
          </DialogTitle>
          <DialogDescription className="text-xs font-normal">
            Review customer message details, reply by email, and record internal follow-up notes.
          </DialogDescription>
        </DialogHeader>

        <MessageDetailContent
          key={message.id || message._id || "msg"}
          message={message}
          onClose={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
