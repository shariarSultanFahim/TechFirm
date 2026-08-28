"use client";

import * as React from "react";
import Image from "next/image";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  FolderTree,
  Layers,
  Pencil,
  Plus,
  Search,
  Sparkles,
  Trash2
} from "lucide-react";
import { toast } from "sonner";

import { ApiResponse, IPost } from "@repo/types";
import { CreatePostInput } from "@repo/validators";

import { del, get, patch, post } from "@/lib/api";

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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

const CATEGORY_PRESETS = [
  "Cloud Solutions",
  "Cyber Security",
  "DevOps & CI/CD",
  "Managed Services",
  "Technology"
];

const COVER_PRESETS = [
  {
    label: "Cloud & Network",
    url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200"
  },
  {
    label: "Security & Shield",
    url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200"
  },
  {
    label: "Code & Dev",
    url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200"
  },
  {
    label: "Server Rack",
    url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200"
  }
];

const DEFAULT_FORM: CreatePostInput = {
  title: "",
  slug: "",
  excerpt: "",
  body: "",
  coverImage: COVER_PRESETS[0]?.url || "",
  category: "Cloud Solutions",
  author: {
    name: "Michael Carter",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400",
    role: "Chief Solutions Architect"
  },
  isPublished: true,
  readTime: "5 min read",
  tags: ["Cloud", "Security", "DevOps"]
};

export default function PostsPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = React.useState<IPost | null>(null);
  const [formData, setFormData] = React.useState<CreatePostInput>(DEFAULT_FORM);
  const [tagsRaw, setTagsRaw] = React.useState("");

  // Fetch Posts
  const {
    data: postsData,
    isLoading,
    isError
  } = useQuery<{ items: IPost[]; data?: IPost[] }>({
    queryKey: ["admin-posts"],
    queryFn: async () => {
      const res = await get<ApiResponse<IPost[]>>("/posts");
      return { items: res.data || [] };
    }
  });

  const posts = postsData?.items || [];

  // Fetch Categories
  const { data: categories = CATEGORY_PRESETS } = useQuery<string[]>({
    queryKey: ["post-categories"],
    queryFn: async () => {
      try {
        const res = await get<ApiResponse<string[]>>("/posts/categories");
        return res.data && res.data.length > 0 ? res.data : CATEGORY_PRESETS;
      } catch {
        return CATEGORY_PRESETS;
      }
    }
  });

  // Create Mutation
  const createMutation = useMutation({
    mutationFn: async (payload: CreatePostInput) => {
      const res = await post<ApiResponse<IPost>>("/posts", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-posts"] });
      queryClient.invalidateQueries({ queryKey: ["post-categories"] });
      toast.success("Blog article published successfully!");
      setSheetOpen(false);
      setFormData(DEFAULT_FORM);
      setTagsRaw("");
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "Failed to create article";
      toast.error(msg);
    }
  });

  // Update Mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<CreatePostInput> }) => {
      const res = await patch<ApiResponse<IPost>>(`/posts/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-posts"] });
      queryClient.invalidateQueries({ queryKey: ["post-categories"] });
      toast.success("Blog article updated successfully!");
      setSheetOpen(false);
      setEditingId(null);
      setFormData(DEFAULT_FORM);
      setTagsRaw("");
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "Failed to update article";
      toast.error(msg);
    }
  });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await del(`/posts/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-posts"] });
      queryClient.invalidateQueries({ queryKey: ["post-categories"] });
      toast.success("Article deleted permanently.");
      setDeleteTarget(null);
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "Failed to delete article";
      toast.error(msg);
    }
  });

  const handleTogglePublished = (p: IPost) => {
    const id = p.id || p._id;
    if (!id) return;
    updateMutation.mutate({
      id,
      data: { isPublished: !p.isPublished }
    });
  };

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData(DEFAULT_FORM);
    setTagsRaw(DEFAULT_FORM.tags?.join(", ") || "");
    setSheetOpen(true);
  };

  const handleOpenEdit = (p: IPost) => {
    const id = p.id || p._id;
    if (!id) return;
    setEditingId(id);
    setFormData({
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt,
      body: p.body,
      coverImage: p.coverImage,
      category: p.category,
      author: {
        name: p.author?.name || "Author",
        avatar: p.author?.avatar || "",
        role: p.author?.role || ""
      },
      isPublished: p.isPublished ?? true,
      readTime: p.readTime || "5 min read",
      tags: p.tags || []
    });
    setTagsRaw((p.tags || []).join(", "));
    setSheetOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.excerpt.trim() || !formData.body.trim()) {
      toast.error("Title, excerpt, and body content are required.");
      return;
    }

    const parsedTags = tagsRaw
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const payload: CreatePostInput = {
      ...formData,
      tags: parsedTags
    };

    if (editingId) {
      updateMutation.mutate({ id: editingId, data: payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const filteredPosts = posts.filter((p) => {
    const matchCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      (p.tags && p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())));
    return matchCategory && matchSearch;
  });

  const totalPosts = posts.length;
  const publishedPosts = posts.filter((p) => p.isPublished).length;
  const totalCategories = new Set(posts.map((p) => p.category)).size;

  return (
    <div className="space-y-8 pb-12">
      {/* Top Header Bar */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-foreground flex items-center gap-2.5 text-2xl font-black tracking-tight">
            <BookOpen className="text-primary h-6 w-6" />
            <span>Blog Articles &amp; Insights</span>
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Manage company knowledge base, technical thought leadership, categories, and published
            guides.
          </p>
        </div>

        <Button onClick={handleOpenCreate} className="flex items-center gap-2 font-bold shadow-md">
          <Plus className="h-4 w-4" />
          <span>Add New Article</span>
        </Button>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="bg-card border-border flex items-center gap-4 rounded-2xl border p-5 shadow-xs">
          <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-xl font-bold">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <p className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
              Total Articles
            </p>
            <p className="text-foreground text-xl font-black">{totalPosts}</p>
          </div>
        </div>

        <div className="bg-card border-border flex items-center gap-4 rounded-2xl border p-5 shadow-xs">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 font-bold text-emerald-500">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <p className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
              Published &amp; Live
            </p>
            <p className="text-foreground text-xl font-black">{publishedPosts}</p>
          </div>
        </div>

        <div className="bg-card border-border flex items-center gap-4 rounded-2xl border p-5 shadow-xs">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 font-bold text-purple-500">
            <FolderTree className="h-5 w-5" />
          </div>
          <div>
            <p className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
              Active Topics
            </p>
            <p className="text-foreground text-xl font-black">{totalCategories}</p>
          </div>
        </div>
      </div>

      {/* Category Pills & Search */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        {/* Category Pills */}
        <div className="bg-muted/40 border-border/50 flex flex-wrap items-center gap-1.5 rounded-xl border p-1">
          <button
            type="button"
            onClick={() => setSelectedCategory("All")}
            className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
              selectedCategory === "All"
                ? "bg-background text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            All ({totalPosts})
          </button>
          {Array.from(new Set([...categories, ...CATEGORY_PRESETS])).map((cat) => {
            const count = posts.filter((p) => p.category === cat).length;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
                  selectedCategory === cat
                    ? "bg-background text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat} {count > 0 ? `(${count})` : ""}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles..."
            className="pl-9 text-xs"
          />
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-card border-border overflow-hidden rounded-2xl border shadow-xs">
        {isLoading ? (
          <div className="space-y-4 p-8">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        ) : isError ? (
          <div className="text-destructive p-8 text-center">
            <p className="font-bold">Failed to load articles.</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => queryClient.invalidateQueries({ queryKey: ["admin-posts"] })}
              className="mt-3"
            >
              Retry
            </Button>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-muted-foreground p-12 text-center">
            <BookOpen className="text-muted-foreground/40 mx-auto mb-3 h-10 w-10" />
            <p className="text-foreground font-bold">No articles found.</p>
            <p className="mt-1 text-xs">
              Write insightful articles to drive organic search traffic.
            </p>
            <Button onClick={handleOpenCreate} size="sm" className="mt-4 font-bold">
              <Plus className="mr-1.5 h-3.5 w-3.5" /> Write Article
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead className="w-16">Cover</TableHead>
                <TableHead>Article Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Published</TableHead>
                <TableHead>Live</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPosts.map((p) => {
                const postDate = p.publishedAt || p.createdAt;
                const formattedDate = postDate
                  ? new Date(postDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    })
                  : "Draft";

                return (
                  <TableRow key={p.id || p._id}>
                    <TableCell>
                      <div className="border-border bg-muted relative h-10 w-12 shrink-0 overflow-hidden rounded-lg border">
                        <Image
                          src={p.coverImage}
                          alt={p.title}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    </TableCell>

                    <TableCell className="max-w-xs">
                      <div>
                        <p className="text-foreground line-clamp-1 text-xs font-bold">{p.title}</p>
                        <p className="text-muted-foreground mt-0.5 line-clamp-1 text-[11px]">
                          {p.excerpt}
                        </p>
                        <code className="text-muted-foreground bg-muted mt-0.5 inline-block rounded-sm px-1 text-[10px]">
                          /blog/{p.slug}
                        </code>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge variant="outline" className="text-[10px] font-semibold">
                        {p.category}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        {p.author?.avatar && (
                          <div className="relative h-6 w-6 shrink-0 overflow-hidden rounded-full">
                            <Image
                              src={p.author.avatar}
                              alt={p.author.name}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                        )}
                        <p className="text-foreground text-xs font-semibold">
                          {p.author?.name || "Author"}
                        </p>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="text-muted-foreground flex items-center gap-1 text-[11px]">
                        <Calendar className="text-muted-foreground h-3 w-3" />
                        <span>{formattedDate}</span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Switch
                        checked={p.isPublished}
                        onCheckedChange={() => handleTogglePublished(p)}
                      />
                    </TableCell>

                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleOpenEdit(p)}
                          className="text-foreground hover:text-primary h-8 w-8"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => setDeleteTarget(p)}
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

      {/* Create / Edit Slide-Over Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right" className="w-full space-y-6 overflow-y-auto p-6 sm:max-w-2xl">
          <SheetHeader>
            <SheetTitle className="text-foreground flex items-center gap-2 text-lg font-black">
              <BookOpen className="text-primary h-5 w-5" />
              <span>{editingId ? "Edit Blog Article" : "Compose Blog Article"}</span>
            </SheetTitle>
            <SheetDescription className="text-muted-foreground text-xs">
              Write rich editorial content, configure author credits, and select hero banner images.
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="bg-muted/30 border-border/50 space-y-4 rounded-xl border p-4">
              {/* Title & Slug */}
              <div className="space-y-1.5">
                <label className="text-foreground text-xs font-semibold">Article Title *</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Optimizing Multi-Cloud Infrastructure for Resilient Microservices"
                  className="text-xs"
                  required
                />
              </div>

              {/* Excerpt */}
              <div className="space-y-1.5">
                <label className="text-foreground text-xs font-semibold">Summary Excerpt *</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Short introductory summary for cards and search snippets..."
                  rows={2}
                  className="border-input text-foreground placeholder:text-muted-foreground focus:ring-ring w-full rounded-lg border bg-transparent px-3 py-2 text-xs focus:ring-2 focus:outline-hidden"
                  required
                />
              </div>

              {/* Cover Image & Presets */}
              <div className="space-y-2">
                <label className="text-foreground text-xs font-semibold">
                  Cover Banner Image *
                </label>
                <div className="flex items-center gap-3">
                  <div className="border-border bg-muted relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border">
                    {formData.coverImage ? (
                      <Image
                        src={formData.coverImage}
                        alt="Banner Preview"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="text-muted-foreground flex h-full w-full items-center justify-center">
                        <BookOpen className="h-5 w-5" />
                      </div>
                    )}
                  </div>
                  <Input
                    value={formData.coverImage}
                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 text-xs"
                    required
                  />
                </div>

                {/* Presets */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-muted-foreground flex items-center gap-1 text-[11px]">
                    <Sparkles className="text-primary h-3 w-3" /> Presets:
                  </span>
                  {COVER_PRESETS.map((cp) => (
                    <button
                      key={cp.label}
                      type="button"
                      onClick={() => setFormData({ ...formData, coverImage: cp.url })}
                      className="bg-muted hover:bg-muted/80 text-foreground border-border cursor-pointer rounded border px-2 py-0.5 text-[10px] font-semibold transition-colors"
                    >
                      {cp.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category & Read Time */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-foreground text-xs font-semibold">Category *</label>
                  <Input
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g. Cloud Solutions"
                    className="text-xs"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-foreground text-xs font-semibold">
                    Estimated Read Time
                  </label>
                  <Input
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    placeholder="e.g. 5 min read"
                    className="text-xs"
                  />
                </div>
              </div>

              {/* Author Details */}
              <div className="border-border/40 grid grid-cols-1 gap-3 border-t pt-2 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-foreground text-xs font-semibold">Author Name *</label>
                  <Input
                    value={formData.author?.name || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        author: { ...(formData.author || { name: "" }), name: e.target.value }
                      })
                    }
                    placeholder="Michael Carter"
                    className="text-xs"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-foreground text-xs font-semibold">Author Role</label>
                  <Input
                    value={formData.author?.role || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        author: { ...(formData.author || { name: "" }), role: e.target.value }
                      })
                    }
                    placeholder="Chief Solutions Architect"
                    className="text-xs"
                  />
                </div>
              </div>

              {/* Body Content */}
              <div className="border-border/40 space-y-1.5 border-t pt-2">
                <label className="text-foreground text-xs font-semibold">
                  Article Body (Markdown Supported) *
                </label>
                <textarea
                  value={formData.body}
                  onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                  placeholder="## Heading\n\nWrite your complete article content here..."
                  rows={8}
                  className="border-input text-foreground placeholder:text-muted-foreground focus:ring-ring w-full rounded-lg border bg-transparent px-3 py-2 font-mono text-xs focus:ring-2 focus:outline-hidden"
                  required
                />
              </div>

              {/* Tags */}
              <div className="space-y-1.5">
                <label className="text-foreground text-xs font-semibold">
                  Tags (comma-separated)
                </label>
                <Input
                  value={tagsRaw}
                  onChange={(e) => setTagsRaw(e.target.value)}
                  placeholder="Cloud, DevOps, Kubernetes, Security"
                  className="text-xs"
                />
              </div>

              {/* Published Switch */}
              <div className="border-border/40 flex items-center justify-between border-t pt-2">
                <div>
                  <p className="text-foreground text-xs font-bold">Publish Live</p>
                  <p className="text-muted-foreground text-[11px]">
                    Make article immediately visible on public blog
                  </p>
                </div>
                <Switch
                  checked={formData.isPublished}
                  onCheckedChange={(checked) => setFormData({ ...formData, isPublished: checked })}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="border-border flex items-center justify-end gap-3 border-t pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setSheetOpen(false)}
                className="text-xs font-bold"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
                className="text-xs font-bold shadow-sm"
              >
                {createMutation.isPending || updateMutation.isPending
                  ? "Saving..."
                  : editingId
                    ? "Update Article"
                    : "Publish Article"}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation Alert Dialog */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-bold">Delete Article?</AlertDialogTitle>
            <AlertDialogDescription className="text-xs">
              Are you sure you want to delete <strong>&quot;{deleteTarget?.title}&quot;</strong>?
              This action cannot be undone.
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
