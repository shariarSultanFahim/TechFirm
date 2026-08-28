"use client";

import * as React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { CreatePlanInput, createPlanSchema } from "@repo/validators";

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

interface PlanFormProps {
  defaultValues?: Partial<CreatePlanInput>;
  onSubmit: (values: CreatePlanInput) => void | Promise<void>;
  isLoading?: boolean;
  onCancel?: () => void;
  submitLabel?: string;
}

export function PlanForm({
  defaultValues,
  onSubmit,
  isLoading = false,
  onCancel,
  submitLabel = "Save Plan"
}: PlanFormProps) {
  const form = useForm<z.infer<typeof createPlanSchema>>({
    resolver: zodResolver(createPlanSchema),
    mode: "onBlur",
    defaultValues: {
      name: defaultValues?.name || "",
      price: defaultValues?.price ?? 29,
      billingPeriod: defaultValues?.billingPeriod || "monthly",
      features: defaultValues?.features || ["24/7 Dedicated Support", "High Availability Cloud"],
      isPopular: defaultValues?.isPopular ?? false,
      isActive: defaultValues?.isActive ?? true,
      order: defaultValues?.order ?? 0,
      description: defaultValues?.description || "",
      buttonText: defaultValues?.buttonText || "Get Started"
    }
  });

  const [featuresRaw, setFeaturesRaw] = React.useState(
    (defaultValues?.features || ["24/7 Dedicated Support", "High Availability Cloud"]).join("\n")
  );

  const handleFormSubmit = (data: CreatePlanInput) => {
    const parsedFeatures = featuresRaw
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean);

    onSubmit({
      ...data,
      features: parsedFeatures.length > 0 ? parsedFeatures : ["Standard Feature"]
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Plan Name *</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Business Pro" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price ($ USD) *</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    step="any"
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
            name="billingPeriod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Billing Period *</FormLabel>
                <div className="grid grid-cols-2 gap-1.5 pt-0.5">
                  <button
                    type="button"
                    onClick={() => field.onChange("monthly")}
                    className={`rounded-lg py-1.5 text-xs font-medium transition-all ${
                      field.value === "monthly"
                        ? "bg-primary text-primary-foreground shadow-2xs"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    type="button"
                    onClick={() => field.onChange("annual")}
                    className={`rounded-lg py-1.5 text-xs font-medium transition-all ${
                      field.value === "annual"
                        ? "bg-primary text-primary-foreground shadow-2xs"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Annual
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Description</FormLabel>
              <FormControl>
                <Input placeholder="e.g. For growing startups and fast-moving teams" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="buttonText"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Button CTA Text</FormLabel>
                <FormControl>
                  <Input placeholder="Get Started" {...field} />
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

        <FormItem>
          <FormLabel>Features (1 per line) *</FormLabel>
          <FormControl>
            <Textarea
              value={featuresRaw}
              onChange={(e) => setFeaturesRaw(e.target.value)}
              rows={4}
              placeholder={"24/7 Dedicated Support\nHigh Availability Cloud\nAutomated Backups"}
              className="text-xs font-normal"
            />
          </FormControl>
        </FormItem>

        <div className="border-border/40 space-y-3 border-t pt-3">
          <FormField
            control={form.control}
            name="isPopular"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between">
                <FormLabel className="cursor-pointer">Featured / Popular Badge</FormLabel>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

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
