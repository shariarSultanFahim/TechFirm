"use client";

import * as React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { CreateTestimonialInput, createTestimonialSchema } from "@repo/validators";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

const GRADIENT_PRESETS = [
  { label: "Cyan to Blue", value: "bg-linear-to-br from-cyan-500 to-blue-600" },
  { label: "Emerald Green", value: "bg-linear-to-br from-emerald-400 to-emerald-600" },
  { label: "Vibrant Purple", value: "bg-linear-to-br from-purple-500 to-purple-700" },
  { label: "Amber Orange", value: "bg-linear-to-br from-amber-500 to-amber-600" },
  { label: "Rose Pink", value: "bg-linear-to-br from-rose-500 to-rose-700" }
];

interface TestimonialFormProps {
  defaultValues?: Partial<CreateTestimonialInput>;
  onSubmit: (values: CreateTestimonialInput) => void | Promise<void>;
  isLoading?: boolean;
  onCancel?: () => void;
  submitLabel?: string;
}

export function TestimonialForm({
  defaultValues,
  onSubmit,
  isLoading = false,
  onCancel,
  submitLabel = "Save Testimonial"
}: TestimonialFormProps) {
  const form = useForm<z.infer<typeof createTestimonialSchema>>({
    resolver: zodResolver(createTestimonialSchema),
    mode: "onBlur",
    defaultValues: {
      authorName: defaultValues?.authorName || "",
      authorRole: defaultValues?.authorRole || "",
      company: defaultValues?.company || "",
      avatar:
        defaultValues?.avatar ||
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      quote: defaultValues?.quote || "",
      rating: defaultValues?.rating ?? 5,
      tags: defaultValues?.tags || ["Techfirm Horizons", "Best Quality"],
      iconBg: defaultValues?.iconBg || "bg-linear-to-br from-cyan-500 to-blue-600",
      order: defaultValues?.order ?? 0,
      isActive: defaultValues?.isActive ?? true,
      hasVideo: defaultValues?.hasVideo ?? false,
      videoUrl: defaultValues?.videoUrl || "",
      posterImage: defaultValues?.posterImage || ""
    }
  });

  const [tagInput, setTagInput] = React.useState("");
  const tags = form.watch("tags") || [];
  const selectedBg = form.watch("iconBg");
  const hasVideo = form.watch("hasVideo");
  const avatarUrl = form.watch("avatar");
  const authorName = form.watch("authorName") || "AV";

  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    if (!tags.includes(tagInput.trim())) {
      form.setValue("tags", [...tags, tagInput.trim()]);
    }
    setTagInput("");
  };

  const handleRemoveTag = (index: number) => {
    const updated = tags.filter((_, i) => i !== index);
    form.setValue("tags", updated);
  };

  const handleFormSubmit = (data: CreateTestimonialInput) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
        {/* Reviewer Details */}
        <div className="bg-muted/30 border-border/50 space-y-3 rounded-xl border p-3.5">
          <h4 className="text-muted-foreground text-[10px] font-medium tracking-wider uppercase">
            Reviewer Information
          </h4>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="authorName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client / Author Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Sarah Jenkins" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="authorRole"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title / Role *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. CTO & Co-Founder" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company / Organization Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Acme Cloud Corp" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Avatar Image URL</FormLabel>
                <div className="flex items-center gap-2">
                  <Avatar className="border-border h-9 w-9 shrink-0 border">
                    <AvatarImage src={avatarUrl} alt={authorName} />
                    <AvatarFallback className="text-xs font-medium">AV</AvatarFallback>
                  </Avatar>
                  <FormControl>
                    <Input placeholder="https://images.unsplash.com/..." {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Review Quote & Star Rating */}
        <div className="bg-muted/30 border-border/50 space-y-3 rounded-xl border p-3.5">
          <h4 className="text-muted-foreground text-[10px] font-medium tracking-wider uppercase">
            Feedback &amp; Rating
          </h4>

          <FormField
            control={form.control}
            name="quote"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Review Quote *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write the customer's quote here..."
                    rows={3}
                    className="text-xs font-normal"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Star Rating (1-5)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      max={5}
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="order"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Order</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Tags */}
          <FormItem>
            <FormLabel>Badges &amp; Tags</FormLabel>
            <div className="mb-2 flex flex-wrap gap-1">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-primary/10 text-primary inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium"
                >
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(idx)}
                    className="hover:text-destructive ml-1 cursor-pointer font-medium"
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
                placeholder="e.g. Verified Client"
                className="text-xs font-normal"
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
                className="shrink-0 text-xs font-medium"
              >
                Add
              </Button>
            </div>
          </FormItem>
        </div>

        {/* Video Option */}
        <div className="bg-muted/30 border-border/50 space-y-3 rounded-xl border p-3.5">
          <FormField
            control={form.control}
            name="hasVideo"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between">
                <FormLabel className="cursor-pointer">Video Review Embed</FormLabel>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          {hasVideo && (
            <div className="space-y-2.5 pt-1">
              <FormField
                control={form.control}
                name="videoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Video Stream URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://youtube.com/watch?v=..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="posterImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Video Poster Thumbnail URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://images.unsplash.com/..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </div>

        {/* Color Gradient & Active Toggle */}
        <div className="bg-muted/30 border-border/50 space-y-3 rounded-xl border p-3.5">
          <FormItem>
            <FormLabel>Accent Color Theme</FormLabel>
            <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
              {GRADIENT_PRESETS.map((g) => (
                <button
                  key={g.label}
                  type="button"
                  onClick={() => form.setValue("iconBg", g.value)}
                  className={`flex items-center gap-1.5 rounded-lg border p-1.5 text-left text-xs transition-all ${
                    selectedBg === g.value
                      ? "border-primary bg-primary/10 text-primary font-medium shadow-2xs"
                      : "border-border hover:bg-muted"
                  }`}
                >
                  <div className={`h-3.5 w-3.5 shrink-0 rounded-full ${g.value}`} />
                  <span className="truncate text-[10px]">{g.label}</span>
                </button>
              ))}
            </div>
          </FormItem>

          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="border-border/40 flex items-center justify-between border-t pt-2">
                <FormLabel className="cursor-pointer">Published &amp; Active</FormLabel>
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
              className="text-xs font-medium"
            >
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={isLoading} className="text-xs font-medium">
            {isLoading ? "Saving..." : submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
}
