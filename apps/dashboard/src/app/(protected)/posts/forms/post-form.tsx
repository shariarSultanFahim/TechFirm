"use client";

import * as React from "react";

import { BookOpen, Sparkles } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { CreatePostInput, createPostSchema } from "@repo/validators";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

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

interface PostFormProps {
  defaultValues?: Partial<CreatePostInput>;
  categories?: string[];
  onSubmit: (values: CreatePostInput) => void | Promise<void>;
  isLoading?: boolean;
  onCancel?: () => void;
  submitLabel?: string;
}

export function PostForm({
  defaultValues,
  categories = CATEGORY_PRESETS,
  onSubmit,
  isLoading = false,
  onCancel,
  submitLabel = "Save Article"
}: PostFormProps) {
  const form = useForm<z.infer<typeof createPostSchema>>({
    resolver: zodResolver(createPostSchema),
    mode: "onBlur",
    defaultValues: {
      title: defaultValues?.title || "",
      slug: defaultValues?.slug || "",
      excerpt: defaultValues?.excerpt || "",
      body: defaultValues?.body || "",
      coverImage: defaultValues?.coverImage || COVER_PRESETS[0]?.url || "",
      category: defaultValues?.category || "Cloud Solutions",
      author: {
        name: defaultValues?.author?.name || "Michael Carter",
        avatar:
          defaultValues?.author?.avatar ||
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400",
        role: defaultValues?.author?.role || "Chief Solutions Architect"
      },
      isPublished: defaultValues?.isPublished ?? true,
      readTime: defaultValues?.readTime || "5 min read",
      tags: defaultValues?.tags || ["Cloud", "Security", "DevOps"]
    }
  });

  const [tagInput, setTagInput] = React.useState("");
  const tags = form.watch("tags") || [];
  const coverImage = form.watch("coverImage");
  const selectedCategory = form.watch("category");

  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    form.setValue("tags", [...tags, tagInput.trim()]);
    setTagInput("");
  };

  const handleRemoveTag = (index: number) => {
    form.setValue(
      "tags",
      tags.filter((_, i) => i !== index)
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Title & Slug */}
        <div className="bg-muted/30 border-border/50 space-y-3 rounded-xl border p-3.5">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Article Title *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Optimizing Multi-Cloud Infrastructure for Resilient Microservices"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Custom URL Slug (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. optimizing-multi-cloud-infrastructure" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="excerpt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Summary Excerpt *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Short introductory summary for search cards..."
                    rows={2}
                    className="text-xs"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Banner Cover Image */}
        <div className="bg-muted/30 border-border/50 space-y-3 rounded-xl border p-3.5">
          <FormField
            control={form.control}
            name="coverImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cover Banner Image URL *</FormLabel>
                <div className="flex items-center gap-3">
                  <div className="border-border bg-muted relative h-12 w-16 shrink-0 overflow-hidden rounded-lg border">
                    {coverImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={coverImage} alt="Cover" className="h-full w-full object-cover" />
                    ) : (
                      <div className="text-muted-foreground flex h-full w-full items-center justify-center">
                        <BookOpen className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                  <FormControl>
                    <Input placeholder="https://images.unsplash.com/..." {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-muted-foreground flex items-center gap-1 text-[11px]">
              <Sparkles className="text-primary h-3 w-3" /> Presets:
            </span>
            {COVER_PRESETS.map((cp) => (
              <button
                key={cp.label}
                type="button"
                onClick={() => form.setValue("coverImage", cp.url)}
                className="bg-muted hover:bg-muted/80 text-foreground border-border cursor-pointer rounded border px-2 py-0.5 text-[10px] font-semibold transition-colors"
              >
                {cp.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category & Read Time */}
        <div className="bg-muted/30 border-border/50 space-y-3 rounded-xl border p-3.5">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Topic Category</FormLabel>
                <div className="mb-2 flex flex-wrap gap-1.5">
                  {Array.from(new Set([...categories, ...CATEGORY_PRESETS])).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => field.onChange(cat)}
                      className={`cursor-pointer rounded-md px-2.5 py-1 text-xs font-bold transition-all ${
                        selectedCategory === cat
                          ? "bg-primary text-primary-foreground shadow-xs"
                          : "bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <FormControl>
                  <Input placeholder="Or enter custom category..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="readTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estimated Read Time</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. 5 min read" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Author Credit */}
        <div className="bg-muted/30 border-border/50 space-y-3 rounded-xl border p-3.5">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="author.name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Michael Carter" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="author.role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author Role</FormLabel>
                  <FormControl>
                    <Input placeholder="Chief Solutions Architect" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Article Body (Markdown) */}
        <div className="bg-muted/30 border-border/50 space-y-3 rounded-xl border p-3.5">
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Article Content (Markdown Supported) *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="## Introduction&#10;&#10;Write comprehensive article body here..."
                    rows={8}
                    className="font-mono text-xs"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Tags and Live Status */}
        <div className="bg-muted/30 border-border/50 space-y-3 rounded-xl border p-3.5">
          <FormItem>
            <FormLabel>Article Tags</FormLabel>
            <div className="mb-2 flex flex-wrap gap-1">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-primary/10 text-primary inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-bold"
                >
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(idx)}
                    className="hover:text-destructive ml-1 cursor-pointer font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="e.g. DevOps, Cloud"
                className="text-xs"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
              />
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={handleAddTag}
                className="shrink-0 text-xs font-bold"
              >
                Add
              </Button>
            </div>
          </FormItem>

          <FormField
            control={form.control}
            name="isPublished"
            render={({ field }) => (
              <FormItem className="border-border/40 flex items-center justify-between border-t pt-2">
                <FormLabel className="cursor-pointer">Publish Live</FormLabel>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="border-border flex items-center justify-end gap-2.5 border-t pt-4">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="text-xs font-bold"
            >
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={isLoading} className="text-xs font-bold">
            {isLoading ? "Saving..." : submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
}
