"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { CreateFaqInput, createFaqSchema } from "@repo/validators";

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

const CATEGORY_PRESETS = ["General", "Services", "Support", "Pricing", "Security"];

interface FaqFormProps {
  defaultValues?: Partial<CreateFaqInput>;
  categories?: string[];
  onSubmit: (values: CreateFaqInput) => void | Promise<void>;
  isLoading?: boolean;
  onCancel?: () => void;
  submitLabel?: string;
}

export function FaqForm({
  defaultValues,
  categories = CATEGORY_PRESETS,
  onSubmit,
  isLoading = false,
  onCancel,
  submitLabel = "Save FAQ"
}: FaqFormProps) {
  const form = useForm<z.infer<typeof createFaqSchema>>({
    resolver: zodResolver(createFaqSchema),
    mode: "onBlur",
    defaultValues: {
      question: defaultValues?.question || "",
      answer: defaultValues?.answer || "",
      category: defaultValues?.category || "General",
      order: defaultValues?.order ?? 0,
      isActive: defaultValues?.isActive ?? true
    }
  });

  const selectedCategory = form.watch("category");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question Headline *</FormLabel>
              <FormControl>
                <Input placeholder="e.g. How do I know if I need a consultant?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="answer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Detailed Answer *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write the comprehensive answer here..."
                  rows={4}
                  className="text-xs font-normal"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category presets + Custom text input */}
        <div className="bg-muted/30 border-border/50 space-y-3 rounded-xl border p-3.5">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <div className="mb-2 flex flex-wrap gap-1.5">
                  {Array.from(new Set([...categories, ...CATEGORY_PRESETS])).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => field.onChange(cat)}
                      className={`cursor-pointer rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
                        selectedCategory === cat
                          ? "bg-primary text-primary-foreground shadow-2xs"
                          : "bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <FormControl>
                  <Input placeholder="Or type a custom category..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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

          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="border-border/40 flex items-center justify-between rounded-xl border p-3">
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
