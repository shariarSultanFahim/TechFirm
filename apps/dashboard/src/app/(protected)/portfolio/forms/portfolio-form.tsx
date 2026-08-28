"use client";

import * as React from "react";

import { Briefcase, Plus, Trash2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { CreatePortfolioItemInput, createPortfolioItemSchema } from "@repo/validators";

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

const PORTFOLIO_IMAGE_PRESETS = [
  {
    name: "EdTech Dashboard",
    url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200"
  },
  {
    name: "FinTech Analytics",
    url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200"
  },
  {
    name: "Trading Platform",
    url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200"
  },
  {
    name: "AI Smart Grid",
    url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200"
  },
  {
    name: "Enterprise SaaS",
    url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200"
  },
  {
    name: "Cloud Server Mesh",
    url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200"
  }
];

const CATEGORY_PRESETS = [
  "Technology",
  "Cloud Solutions",
  "Cyber Security",
  "DevOps & CI/CD",
  "AI & Machine Learning",
  "Enterprise Software"
];

interface PortfolioFormProps {
  defaultValues?: Partial<CreatePortfolioItemInput>;
  categories?: string[];
  onSubmit: (values: CreatePortfolioItemInput) => void | Promise<void>;
  isLoading?: boolean;
  onCancel?: () => void;
  submitLabel?: string;
}

export function PortfolioForm({
  defaultValues,
  categories = CATEGORY_PRESETS,
  onSubmit,
  isLoading = false,
  onCancel,
  submitLabel = "Save Project"
}: PortfolioFormProps) {
  const form = useForm<z.infer<typeof createPortfolioItemSchema>>({
    resolver: zodResolver(createPortfolioItemSchema),
    mode: "onBlur",
    defaultValues: {
      title: defaultValues?.title || "",
      subtitle: defaultValues?.subtitle || "",
      category: defaultValues?.category || "Technology",
      industry: defaultValues?.industry || "",
      overview: defaultValues?.overview || "",
      image: defaultValues?.image || PORTFOLIO_IMAGE_PRESETS[0]?.url || "",
      bgImage: defaultValues?.bgImage || "",
      isDark: defaultValues?.isDark ?? false,
      actionText: defaultValues?.actionText || "View Project",
      challengeText: defaultValues?.challengeText || [],
      solutionText: defaultValues?.solutionText || [],
      results: defaultValues?.results || [],
      order: defaultValues?.order ?? 0,
      isActive: defaultValues?.isActive ?? true
    }
  });

  const [challengesText, setChallengesText] = React.useState(
    (defaultValues?.challengeText || []).join("\n\n")
  );
  const [solutionsText, setSolutionsText] = React.useState(
    (defaultValues?.solutionText || []).join("\n\n")
  );

  const [results, setResults] = React.useState<{ title: string; description: string }[]>(
    defaultValues?.results || []
  );
  const [newResultTitle, setNewResultTitle] = React.useState("");
  const [newResultDesc, setNewResultDesc] = React.useState("");

  const selectedCategory = form.watch("category");
  const currentImage = form.watch("image");

  const handleAddResult = () => {
    if (!newResultTitle.trim()) return;
    const updated = [
      ...results,
      { title: newResultTitle.trim(), description: newResultDesc.trim() }
    ];
    setResults(updated);
    setNewResultTitle("");
    setNewResultDesc("");
  };

  const handleRemoveResult = (idx: number) => {
    setResults(results.filter((_, i) => i !== idx));
  };

  const handleFormSubmit = (data: CreatePortfolioItemInput) => {
    const parsedChallenges = challengesText
      .split("\n\n")
      .map((p) => p.trim())
      .filter(Boolean);

    const parsedSolutions = solutionsText
      .split("\n\n")
      .map((p) => p.trim())
      .filter(Boolean);

    onSubmit({
      ...data,
      challengeText: parsedChallenges,
      solutionText: parsedSolutions,
      results: results
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
        {/* Project Overview */}
        <div className="bg-muted/30 border-border/50 space-y-3 rounded-xl border p-3.5">
          <p className="text-muted-foreground text-[10px] font-medium tracking-wider uppercase">
            Basic Project Info
          </p>

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Title *</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Cloud Banking Modernization" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="subtitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subtitle / One-line Result</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Scaled core throughput 10x" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Industry Vertical</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Banking &amp; Financial Services" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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
                  <Input placeholder="Or type custom category..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="overview"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Overview &amp; Summary *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="High-level narrative describing the engagement..."
                    rows={3}
                    className="text-xs font-normal"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Project Visuals & Screenshots */}
        <div className="bg-muted/30 border-border/50 space-y-3 rounded-xl border p-3.5">
          <p className="text-muted-foreground text-[10px] font-medium tracking-wider uppercase">
            Visual Assets
          </p>

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hero / Cover Image URL *</FormLabel>
                <FormControl>
                  <Input placeholder="https://images.unsplash.com/..." {...field} />
                </FormControl>
                <div className="mt-2 flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-muted-foreground text-[10px] font-medium">Presets:</span>
                  {PORTFOLIO_IMAGE_PRESETS.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => form.setValue("image", preset.url)}
                      className={`cursor-pointer rounded-md border px-2 py-0.5 text-[10px] font-medium transition-all ${
                        currentImage === preset.url
                          ? "border-primary bg-primary/10 text-primary shadow-2xs"
                          : "border-border hover:bg-muted text-muted-foreground"
                      }`}
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Deep Dive Case Study Content */}
        <div className="bg-muted/30 border-border/50 space-y-3 rounded-xl border p-3.5">
          <p className="text-muted-foreground text-[10px] font-medium tracking-wider uppercase">
            Case Study Narrative (Paragraphs separated by blank line)
          </p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="text-muted-foreground mb-1.5 block text-xs font-medium uppercase">
                The Challenges &amp; Bottlenecks
              </label>
              <Textarea
                value={challengesText}
                onChange={(e) => setChallengesText(e.target.value)}
                placeholder="High latency bottlenecks...&#10;&#10;Legacy monolith fragility..."
                rows={4}
                className="text-xs font-normal"
              />
            </div>

            <div>
              <label className="text-muted-foreground mb-1.5 block text-xs font-medium uppercase">
                The Architecture &amp; Solution
              </label>
              <Textarea
                value={solutionsText}
                onChange={(e) => setSolutionsText(e.target.value)}
                placeholder="Deployed auto-scaling microservices...&#10;&#10;Implemented distributed caching..."
                rows={4}
                className="text-xs font-normal"
              />
            </div>
          </div>
        </div>

        {/* Quantified Results Metrics */}
        <div className="bg-muted/30 border-border/50 space-y-3 rounded-xl border p-3.5">
          <FormLabel>Quantified Metrics &amp; Results</FormLabel>
          <div className="space-y-2">
            {results.map((r, idx) => (
              <div
                key={idx}
                className="bg-background border-border flex items-center justify-between gap-2 rounded-lg border p-2 text-xs"
              >
                <div>
                  <p className="text-foreground font-medium">{r.title}</p>
                  <p className="text-muted-foreground text-[11px] font-normal">{r.description}</p>
                </div>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={() => handleRemoveResult(idx)}
                  className="text-muted-foreground hover:text-destructive h-7 w-7"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            ))}

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <Input
                placeholder="Metric Headline (e.g. 99.99% SLA)"
                value={newResultTitle}
                onChange={(e) => setNewResultTitle(e.target.value)}
                className="text-xs font-normal"
              />
              <div className="flex gap-2">
                <Input
                  placeholder="Metric Summary (e.g. Zero downtime)"
                  value={newResultDesc}
                  onChange={(e) => setNewResultDesc(e.target.value)}
                  className="text-xs font-normal"
                />
                <Button
                  type="button"
                  size="sm"
                  onClick={handleAddResult}
                  className="shrink-0 text-xs font-medium"
                >
                  <Plus className="mr-1 h-3.5 w-3.5" /> Add
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Order, Dark Mode & Active */}
        <div className="bg-muted/30 border-border/50 space-y-3 rounded-xl border p-3.5">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
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
              name="isDark"
              render={({ field }) => (
                <FormItem className="border-border/40 flex items-center justify-between rounded-xl border p-3">
                  <FormLabel className="cursor-pointer">Dark Card Style</FormLabel>
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
                <FormItem className="border-border/40 flex items-center justify-between rounded-xl border p-3">
                  <FormLabel className="cursor-pointer">Published &amp; Active</FormLabel>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
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
