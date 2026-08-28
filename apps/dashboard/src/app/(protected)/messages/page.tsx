"use client";

import { useState } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Archive,
  Calendar,
  CheckCircle2,
  Mail,
  MailCheck,
  MailQuestion,
  MessageSquare,
  Phone,
  Search,
  Send,
  Tag,
  Trash2,
  User
} from "lucide-react";
import { toast } from "sonner";

import { ApiResponse, ContactMessageStatus, IContactMessage } from "@repo/types";

import { del, get, patch } from "@/lib/api";

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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

const STATUS_FILTERS: { label: string; value: string }[] = [
  { label: "All Inquiries", value: "All" },
  { label: "Unread", value: "unread" },
  { label: "Read", value: "read" },
  { label: "Replied", value: "replied" },
  { label: "Archived", value: "archived" }
];

export default function ContactMessagesPage() {
  const queryClient = useQueryClient();
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<IContactMessage | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<IContactMessage | null>(null);

  // Sheet Edit buffer
  const [statusBuffer, setStatusBuffer] = useState<ContactMessageStatus>("unread");
  const [replyNotesBuffer, setReplyNotesBuffer] = useState("");

  // 1. Fetch Contact Messages
  const { data: messages = [], isLoading } = useQuery<IContactMessage[]>({
    queryKey: ["admin-messages"],
    queryFn: async () => {
      const res = await get<ApiResponse<IContactMessage[]>>("/contact-messages");
      return res.data || [];
    }
  });

  // 2. Fetch Unread Count
  const { data: unreadCount = 0 } = useQuery<number>({
    queryKey: ["admin-messages-unread-count"],
    queryFn: async () => {
      try {
        const res = await get<ApiResponse<{ count: number }>>("/contact-messages/unread-count");
        return res.data?.count || 0;
      } catch {
        return 0;
      }
    }
  });

  // Update Status / Notes Mutation
  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      data
    }: {
      id: string;
      data: { isRead?: boolean; status?: ContactMessageStatus; replyNotes?: string };
    }) => {
      const res = await patch<ApiResponse<IContactMessage>>(`/contact-messages/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-messages"] });
      queryClient.invalidateQueries({ queryKey: ["admin-messages-unread-count"] });
      toast.success("Message updated successfully!");
      if (selectedMessage) {
        setSelectedMessage((prev) =>
          prev
            ? {
                ...prev,
                status: statusBuffer,
                replyNotes: replyNotesBuffer,
                isRead: statusBuffer !== "unread"
              }
            : null
        );
      }
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "Failed to update message";
      toast.error(msg);
    }
  });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await del(`/contact-messages/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-messages"] });
      queryClient.invalidateQueries({ queryKey: ["admin-messages-unread-count"] });
      toast.success("Message deleted permanently.");
      setDeleteTarget(null);
      if (selectedMessage) setSelectedMessage(null);
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "Failed to delete message";
      toast.error(msg);
    }
  });

  const handleOpenDetail = (msg: IContactMessage) => {
    setSelectedMessage(msg);
    setStatusBuffer(msg.status || (msg.isRead ? "read" : "unread"));
    setReplyNotesBuffer(msg.replyNotes || "");

    // Auto-mark as read if opened unread
    if (!msg.isRead) {
      const id = msg.id || msg._id;
      if (id) {
        updateMutation.mutate({
          id,
          data: { isRead: true, status: "read" }
        });
      }
    }
  };

  const handleToggleRead = (msg: IContactMessage, e: React.MouseEvent) => {
    e.stopPropagation();
    const id = msg.id || msg._id;
    if (!id) return;

    const newIsRead = !msg.isRead;
    const newStatus: ContactMessageStatus = newIsRead ? "read" : "unread";

    updateMutation.mutate({
      id,
      data: { isRead: newIsRead, status: newStatus }
    });
  };

  const handleSaveDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMessage) return;
    const id = selectedMessage.id || selectedMessage._id;
    if (!id) return;

    updateMutation.mutate({
      id,
      data: {
        status: statusBuffer,
        isRead: statusBuffer !== "unread",
        replyNotes: replyNotesBuffer
      }
    });
  };

  // Filter messages
  const filteredMessages = messages.filter((msg) => {
    const currentStatus = msg.status || (msg.isRead ? "read" : "unread");
    const matchesStatus = selectedStatus === "All" || currentStatus === selectedStatus;

    const matchesSearch =
      !searchQuery ||
      msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (msg.subject && msg.subject.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (msg.service && msg.service.toLowerCase().includes(searchQuery.toLowerCase())) ||
      msg.message.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const totalCount = messages.length;
  const repliedCount = messages.filter((m) => m.status === "replied").length;
  const archivedCount = messages.filter((m) => m.status === "archived").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-foreground flex items-center gap-2 text-2xl font-black tracking-tight">
            <Mail className="text-primary h-6 w-6" />
            <span>Contact Messages & Inbound Inquiries</span>
          </h1>
          <p className="text-muted-foreground mt-0.5 text-xs">
            Manage customer requests, consultative inquiries, follow-up statuses, and administrative
            notes.
          </p>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="border-border bg-card space-y-1 rounded-xl border p-4 shadow-2xs">
          <p className="text-muted-foreground text-[11px] font-bold tracking-wider uppercase">
            Total Inquiries
          </p>
          <p className="text-foreground text-2xl font-black">{totalCount}</p>
        </div>

        <div className="border-border bg-card space-y-1 rounded-xl border p-4 shadow-2xs">
          <p className="flex items-center gap-1 text-[11px] font-bold tracking-wider text-rose-600 uppercase">
            <MailQuestion className="h-3 w-3" />
            <span>Unread</span>
          </p>
          <p className="text-2xl font-black text-rose-600">{unreadCount}</p>
        </div>

        <div className="border-border bg-card space-y-1 rounded-xl border p-4 shadow-2xs">
          <p className="flex items-center gap-1 text-[11px] font-bold tracking-wider text-emerald-600 uppercase">
            <CheckCircle2 className="h-3 w-3" />
            <span>Replied</span>
          </p>
          <p className="text-2xl font-black text-emerald-600">{repliedCount}</p>
        </div>

        <div className="border-border bg-card space-y-1 rounded-xl border p-4 shadow-2xs">
          <p className="text-muted-foreground flex items-center gap-1 text-[11px] font-bold tracking-wider uppercase">
            <Archive className="h-3 w-3" />
            <span>Archived</span>
          </p>
          <p className="text-muted-foreground text-2xl font-black">{archivedCount}</p>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col justify-between gap-3 pt-2 sm:flex-row sm:items-center">
        <div className="flex flex-wrap items-center gap-1.5">
          {STATUS_FILTERS.map((tab) => {
            const isSelected = selectedStatus === tab.value;
            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => setSelectedStatus(tab.value)}
                className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "bg-muted/70 hover:bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="relative w-full max-w-xs">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="Search sender, email, inquiry..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 pl-9 text-xs"
          />
        </div>
      </div>

      {/* Messages Table */}
      <div className="border-border bg-card overflow-hidden rounded-xl border shadow-2xs">
        {isLoading ? (
          <div className="text-muted-foreground py-12 text-center text-xs">Loading messages...</div>
        ) : filteredMessages.length === 0 ? (
          <div className="text-muted-foreground py-12 text-center text-xs">
            No contact messages found in this category.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-8"></TableHead>
                <TableHead>Sender</TableHead>
                <TableHead>Inquiry Subject & Message</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Received</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMessages.map((msg) => {
                const isUnread = !msg.isRead;
                const status = msg.status || (msg.isRead ? "read" : "unread");
                const dateFormatted = msg.createdAt
                  ? new Date(msg.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    })
                  : "Recently";

                return (
                  <TableRow
                    key={msg.id || msg._id}
                    onClick={() => handleOpenDetail(msg)}
                    className={`cursor-pointer transition-colors ${
                      isUnread
                        ? "bg-primary/5 hover:bg-primary/10 font-medium"
                        : "hover:bg-muted/50"
                    }`}
                  >
                    <TableCell>
                      {isUnread ? (
                        <span
                          className="bg-primary inline-block h-2.5 w-2.5 rounded-full"
                          title="Unread"
                        />
                      ) : (
                        <span className="inline-block h-2.5 w-2.5 rounded-full bg-transparent" />
                      )}
                    </TableCell>

                    <TableCell>
                      <div>
                        <p className="text-foreground text-xs font-bold">{msg.name}</p>
                        <p className="text-muted-foreground text-[11px]">{msg.email}</p>
                        {msg.phone && (
                          <p className="text-muted-foreground mt-0.5 flex items-center gap-1 text-[10px]">
                            <Phone className="h-2.5 w-2.5" />
                            <span>{msg.phone}</span>
                          </p>
                        )}
                      </div>
                    </TableCell>

                    <TableCell className="max-w-md">
                      <div>
                        <p className="text-foreground line-clamp-1 text-xs font-bold">
                          {msg.subject || "General Consultation Inquiry"}
                        </p>
                        <p className="text-muted-foreground mt-0.5 line-clamp-1 text-[11px]">
                          {msg.message}
                        </p>
                      </div>
                    </TableCell>

                    <TableCell>
                      {msg.service ? (
                        <Badge variant="outline" className="text-[10px] font-semibold">
                          {msg.service}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground text-[11px]">—</span>
                      )}
                    </TableCell>

                    <TableCell>
                      {status === "unread" && (
                        <Badge className="bg-rose-500/10 text-[10px] font-bold text-rose-600 hover:bg-rose-500/20">
                          Unread
                        </Badge>
                      )}
                      {status === "read" && (
                        <Badge variant="secondary" className="text-[10px] font-semibold">
                          Read
                        </Badge>
                      )}
                      {status === "replied" && (
                        <Badge className="bg-emerald-500/10 text-[10px] font-bold text-emerald-600 hover:bg-emerald-500/20">
                          Replied
                        </Badge>
                      )}
                      {status === "archived" && (
                        <Badge variant="outline" className="text-muted-foreground text-[10px]">
                          Archived
                        </Badge>
                      )}
                    </TableCell>

                    <TableCell className="text-muted-foreground text-xs whitespace-nowrap">
                      {dateFormatted}
                    </TableCell>

                    <TableCell className="text-right">
                      <div
                        className="flex items-center justify-end gap-1.5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={(e) => handleToggleRead(msg, e)}
                          title={msg.isRead ? "Mark as Unread" : "Mark as Read"}
                          className="text-foreground hover:text-primary h-8 w-8"
                        >
                          {msg.isRead ? (
                            <MailQuestion className="h-3.5 w-3.5" />
                          ) : (
                            <MailCheck className="text-primary h-3.5 w-3.5" />
                          )}
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => setDeleteTarget(msg)}
                          className="text-muted-foreground hover:text-destructive h-8 w-8"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Message Details & Admin Notes Slide-Over Sheet */}
      <Sheet open={!!selectedMessage} onOpenChange={(open) => !open && setSelectedMessage(null)}>
        <SheetContent side="right" className="w-full space-y-6 overflow-y-auto p-6 sm:max-w-xl">
          <SheetHeader>
            <SheetTitle className="text-foreground flex items-center gap-2 text-lg font-black">
              <MessageSquare className="text-primary h-5 w-5" />
              <span>Inquiry Details</span>
            </SheetTitle>
            <SheetDescription className="text-muted-foreground text-xs">
              Review message contents, contact sender, and record administrative follow-up actions.
            </SheetDescription>
          </SheetHeader>

          {selectedMessage && (
            <div className="space-y-6">
              {/* Sender Metadata Card */}
              <div className="border-border bg-muted/30 space-y-3 rounded-xl border p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="bg-primary/10 text-primary flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold">
                      <User className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-foreground text-sm font-bold">{selectedMessage.name}</p>
                      <a
                        href={`mailto:${selectedMessage.email}`}
                        className="text-primary text-xs font-medium hover:underline"
                      >
                        {selectedMessage.email}
                      </a>
                    </div>
                  </div>

                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(
                      selectedMessage.subject || "TechFirm Consultation"
                    )}`}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold shadow-2xs transition-colors"
                  >
                    <Send className="h-3 w-3" />
                    <span>Reply via Email</span>
                  </a>
                </div>

                <div className="border-border/60 grid grid-cols-2 gap-2 border-t pt-2 text-xs">
                  {selectedMessage.phone && (
                    <div className="text-muted-foreground flex items-center gap-1.5">
                      <Phone className="text-primary h-3.5 w-3.5" />
                      <a href={`tel:${selectedMessage.phone}`} className="hover:text-foreground">
                        {selectedMessage.phone}
                      </a>
                    </div>
                  )}

                  {selectedMessage.service && (
                    <div className="text-muted-foreground flex items-center gap-1.5">
                      <Tag className="text-primary h-3.5 w-3.5" />
                      <span>{selectedMessage.service}</span>
                    </div>
                  )}

                  <div className="text-muted-foreground col-span-2 flex items-center gap-1.5">
                    <Calendar className="text-primary h-3.5 w-3.5" />
                    <span>
                      Received:{" "}
                      {selectedMessage.createdAt
                        ? new Date(selectedMessage.createdAt).toLocaleString("en-US", {
                            dateStyle: "medium",
                            timeStyle: "short"
                          })
                        : "Recently"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Subject & Message Body */}
              <div className="space-y-2">
                <Label className="text-foreground text-xs font-bold">
                  Subject: {selectedMessage.subject || "No Subject"}
                </Label>
                <div className="border-border bg-card text-foreground rounded-xl border p-4 text-xs leading-relaxed whitespace-pre-wrap sm:text-sm">
                  {selectedMessage.message}
                </div>
              </div>

              {/* Follow-up & Admin Notes Form */}
              <form onSubmit={handleSaveDetails} className="border-border space-y-4 border-t pt-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold">Inquiry Follow-up Status</Label>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {(["unread", "read", "replied", "archived"] as ContactMessageStatus[]).map(
                      (status) => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => setStatusBuffer(status)}
                          className={`cursor-pointer rounded-lg p-2 text-center text-xs font-bold tracking-wider uppercase transition-all ${
                            statusBuffer === status
                              ? "bg-primary text-primary-foreground shadow-xs"
                              : "bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {status}
                        </button>
                      )
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold">Admin Follow-Up Notes</Label>
                  <Textarea
                    rows={3}
                    placeholder="Log internal follow-up steps, call notes, or proposal links..."
                    value={replyNotesBuffer}
                    onChange={(e) => setReplyNotesBuffer(e.target.value)}
                    className="text-xs"
                  />
                </div>

                <SheetFooter className="border-border border-t pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setSelectedMessage(null)}
                    className="text-xs font-bold"
                  >
                    Close
                  </Button>
                  <Button
                    type="submit"
                    disabled={updateMutation.isPending}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold"
                  >
                    {updateMutation.isPending ? "Saving..." : "Save Status & Notes"}
                  </Button>
                </SheetFooter>
              </form>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation Alert Dialog */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-bold">Delete Message?</AlertDialogTitle>
            <AlertDialogDescription className="text-xs">
              Are you sure you want to permanently remove this message from{" "}
              <strong>{deleteTarget?.name}</strong>? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-xs font-bold">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                const id = deleteTarget?.id || deleteTarget?._id;
                if (id) deleteMutation.mutate(id);
              }}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground text-xs font-bold"
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete Permanently"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
