"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Trash2, Edit2, RefreshCw, X } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { get, post, patch, del } from "@/lib/api";
import { IPost, ApiResponse } from "@repo/types";

export default function PostsManagementPage() {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState<IPost | null>(null);

  // Form fields
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("Cloud Solutions");
  const [excerpt, setExcerpt] = useState("");
  const [body, setBody] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [authorName, setAuthorName] = useState("Michael Carter");
  const [authorRole, setAuthorRole] = useState("Chief Solutions Architect");
  const [isPublished, setIsPublished] = useState(true);

  const { data: posts = [], isLoading, refetch } = useQuery({
    queryKey: ["dashboard-posts"],
    queryFn: async () => {
      try {
        const res = await get<ApiResponse<IPost[]>>("/posts");
        return res.data || [];
      } catch {
        return [];
      }
    }
  });

  const saveMutation = useMutation({
    mutationFn: async (payload: Partial<IPost>) => {
      if (editingPost) {
        return await patch(`/posts/${editingPost.id}`, payload);
      } else {
        return await post("/posts", payload);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard-posts"] });
      queryClient.invalidateQueries({ queryKey: ["admin-posts"] });
      setShowModal(false);
    },
    onError: () => {
      alert("Error saving post.");
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await del(`/posts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard-posts"] });
      queryClient.invalidateQueries({ queryKey: ["admin-posts"] });
    },
    onError: () => {
      alert("Failed to delete post");
    }
  });

  const openCreateModal = () => {
    setEditingPost(null);
    setTitle("");
    setSlug("");
    setCategory("Cloud Solutions");
    setExcerpt("");
    setBody("");
    setCoverImage("https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200");
    setAuthorName("Michael Carter");
    setAuthorRole("Chief Solutions Architect");
    setIsPublished(true);
    setShowModal(true);
  };

  const openEditModal = (postItem: IPost) => {
    setEditingPost(postItem);
    setTitle(postItem.title);
    setSlug(postItem.slug);
    setCategory(postItem.category);
    setExcerpt(postItem.excerpt);
    setBody(postItem.body);
    setCoverImage(postItem.coverImage);
    setAuthorName(typeof postItem.author === "string" ? postItem.author : postItem.author.name);
    setAuthorRole(typeof postItem.author === "string" ? "Architect" : postItem.author.role || "Architect");
    setIsPublished(postItem.isPublished !== false);
    setShowModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title,
      slug: slug || title.toLowerCase().replace(/\s+/g, "-"),
      category,
      excerpt,
      body,
      coverImage,
      author: {
        name: authorName,
        role: authorRole
      },
      isPublished
    };

    saveMutation.mutate(payload);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    deleteMutation.mutate(id);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground">
            Blog Posts Management
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Publish, edit, and categorize company news and technical insights.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => refetch()}
            className="p-2.5 rounded-xl border border-border bg-card hover:bg-muted text-foreground transition-colors shadow-2xs cursor-pointer"
            title="Refresh Posts"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          </button>

          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-dark-bg text-white font-bold text-sm hover:bg-primary hover:text-primary-foreground transition-colors shadow-md cursor-pointer"
          >
            <Plus className="w-4 h-4 text-primary" />
            <span>Write New Post</span>
          </button>
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-foreground">
            <thead className="bg-muted/60 border-b border-border text-xs font-extrabold uppercase text-muted-foreground">
              <tr>
                <th className="px-6 py-4">Article</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Author</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {posts.map((postItem) => (
                <tr key={postItem.id || postItem.slug} className="hover:bg-muted/40 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-border bg-muted">
                        <Image
                          src={postItem.coverImage}
                          alt={postItem.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-extrabold text-foreground line-clamp-1">{postItem.title}</p>
                        <p className="text-xs text-muted-foreground font-mono mt-0.5">/{postItem.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-accent text-accent-foreground border border-accent-foreground/20">
                      {postItem.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-xs text-foreground">
                    {typeof postItem.author === "string" ? postItem.author : postItem.author?.name}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                        postItem.isPublished !== false
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {postItem.isPublished !== false ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(postItem)}
                      className="p-2 rounded-lg text-muted-foreground hover:text-primary-deep hover:bg-accent transition-colors cursor-pointer"
                      title="Edit Post"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(postItem.id)}
                      className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
                      title="Delete Post"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}

              {posts.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                    No articles found. Click &ldquo;Write New Post&rdquo; to add one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-card rounded-3xl p-8 max-w-2xl w-full shadow-2xl border border-border max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-border">
              <h3 className="text-xl font-bold text-foreground">
                {editingPost ? "Edit Blog Post" : "Draft New Blog Post"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-foreground uppercase mb-1">
                  Article Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="e.g. Modern Zero-Trust Architectures for 2026"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-hidden focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-foreground uppercase mb-1">
                    Slug
                  </label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="e.g. zero-trust-architectures"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-hidden focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-foreground uppercase mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-hidden focus:border-primary"
                  >
                    <option value="Cloud Solutions">Cloud Solutions</option>
                    <option value="Cyber Security">Cyber Security</option>
                    <option value="IT Consulting">IT Consulting</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Managed IT">Managed IT</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground uppercase mb-1">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-hidden focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground uppercase mb-1">
                  Excerpt (Summary) *
                </label>
                <textarea
                  rows={2}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-hidden focus:border-primary resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground uppercase mb-1">
                  Article Body (Markdown / Text) *
                </label>
                <textarea
                  rows={6}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm font-mono text-xs focus:outline-hidden focus:border-primary resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-foreground uppercase mb-1">
                    Author Name
                  </label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-hidden focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-foreground uppercase mb-1">
                    Author Role
                  </label>
                  <input
                    type="text"
                    value={authorRole}
                    onChange={(e) => setAuthorRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-hidden focus:border-primary"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 text-xs font-bold text-foreground cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                    className="rounded text-primary focus:ring-primary"
                  />
                  <span>Publish live to public blog</span>
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-border text-sm font-semibold text-foreground hover:bg-muted cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saveMutation.isPending}
                  className="px-6 py-2.5 rounded-xl bg-dark-bg text-white text-sm font-bold hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                >
                  {saveMutation.isPending ? "Saving..." : "Save Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
