"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Mail, MailOpen, Trash2, RefreshCw, X } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { get, patch, del } from "@/lib/api";
import { IContactMessage, ApiResponse } from "@repo/types";

export default function MessagesManagementPage() {
  const queryClient = useQueryClient();
  const [selectedMessage, setSelectedMessage] = useState<IContactMessage | null>(null);

  const { data: messages = [], isLoading, refetch } = useQuery({
    queryKey: ["dashboard-messages"],
    queryFn: async () => {
      try {
        const res = await get<ApiResponse<IContactMessage[]>>("/contact-messages");
        return res.data || [];
      } catch {
        return [];
      }
    }
  });

  const toggleReadMutation = useMutation({
    mutationFn: async ({ id, isRead }: { id: string; isRead: boolean }) => {
      return await patch(`/contact-messages/${id}`, { isRead });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard-messages"] });
      queryClient.invalidateQueries({ queryKey: ["admin-messages"] });
      queryClient.invalidateQueries({ queryKey: ["admin-unread"] });
      queryClient.invalidateQueries({ queryKey: ["unread-count"] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await del(`/contact-messages/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard-messages"] });
      queryClient.invalidateQueries({ queryKey: ["admin-messages"] });
      queryClient.invalidateQueries({ queryKey: ["admin-unread"] });
      queryClient.invalidateQueries({ queryKey: ["unread-count"] });
      setSelectedMessage(null);
    },
    onError: () => {
      alert("Failed to delete message");
    }
  });

  const toggleReadStatus = (msg: IContactMessage) => {
    const updatedStatus = !msg.isRead;
    toggleReadMutation.mutate({ id: msg.id, isRead: updatedStatus });
    if (selectedMessage && selectedMessage.id === msg.id) {
      setSelectedMessage({ ...selectedMessage, isRead: updatedStatus });
    }
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    deleteMutation.mutate(id);
  };

  const openMessageModal = (msg: IContactMessage) => {
    setSelectedMessage(msg);
    if (!msg.isRead) {
      toggleReadStatus(msg);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground">
            Contact Messages &amp; Inquiries
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Review customer consultations, support inquiries, and project requests.
          </p>
        </div>

        <button
          onClick={() => refetch()}
          className="p-2.5 rounded-xl border border-border bg-card hover:bg-muted text-foreground transition-colors shadow-2xs cursor-pointer"
          title="Refresh Messages"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* Messages Table */}
      <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-foreground">
            <thead className="bg-muted/60 border-b border-border text-xs font-extrabold uppercase text-muted-foreground">
              <tr>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Sender</th>
                <th className="px-6 py-4">Subject</th>
                <th className="px-6 py-4">Received Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {messages.map((msg) => (
                <tr
                  key={msg.id}
                  className={`hover:bg-muted/40 transition-colors cursor-pointer ${
                    !msg.isRead ? "bg-accent/30 font-bold" : ""
                  }`}
                  onClick={() => openMessageModal(msg)}
                >
                  <td className="px-6 py-4">
                    {msg.isRead ? (
                      <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground font-semibold">
                        <MailOpen className="w-4 h-4 text-muted-foreground" />
                        Read
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs text-accent-foreground font-bold bg-accent px-2.5 py-1 rounded-full border border-accent-foreground/20">
                        <Mail className="w-4 h-4 text-primary-deep" />
                        New
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-foreground">{msg.name}</p>
                    <p className="text-xs text-muted-foreground font-normal">{msg.email}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-foreground line-clamp-1">{msg.subject || "General Consultation Inquiry"}</p>
                    <p className="text-xs text-muted-foreground font-normal line-clamp-1 mt-0.5">{msg.message}</p>
                  </td>
                  <td className="px-6 py-4 text-xs text-muted-foreground whitespace-nowrap">
                    {msg.createdAt
                      ? format(new Date(msg.createdAt), "dd MMM yyyy, HH:mm")
                      : "Recently"}
                  </td>
                  <td
                    className="px-6 py-4 text-right space-x-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => toggleReadStatus(msg)}
                      className="p-2 rounded-lg text-muted-foreground hover:text-primary-deep hover:bg-accent transition-colors cursor-pointer"
                      title={msg.isRead ? "Mark as unread" : "Mark as read"}
                    >
                      {msg.isRead ? <Mail className="w-4 h-4" /> : <MailOpen className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => handleDelete(msg.id)}
                      className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
                      title="Delete message"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}

              {messages.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                    No contact messages yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-card rounded-3xl p-8 max-w-xl w-full shadow-2xl border border-border animate-in fade-in-50 zoom-in-95">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-border">
              <div>
                <h3 className="text-xl font-bold text-foreground">
                  {selectedMessage.subject || "Customer Inquiry"}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  From: {selectedMessage.name} ({selectedMessage.email})
                </p>
              </div>
              <button
                onClick={() => setSelectedMessage(null)}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-muted/40 border border-border text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                {selectedMessage.message}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject || "Your TechFirm Inquiry")}`}
                  className="px-6 py-2.5 rounded-xl bg-dark-bg text-white text-sm font-bold hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                >
                  Reply via Email
                </a>

                <button
                  type="button"
                  onClick={() => setSelectedMessage(null)}
                  className="px-4 py-2.5 rounded-xl border border-border text-sm font-semibold text-foreground hover:bg-muted cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
