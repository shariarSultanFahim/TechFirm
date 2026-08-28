"use client";

import { useState } from "react";
import Image from "next/image";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Briefcase,
  CheckCircle2,
  ExternalLink,
  Layers,
  Pencil,
  Plus,
  PlusCircle,
  Search,
  Sparkles,
  Trash2,
  X
} from "lucide-react";
import { toast } from "sonner";

import { ApiResponse, IPortfolioItem, IPortfolioResult } from "@repo/types";
import { CreatePortfolioItemInput } from "@repo/validators";

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
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
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

const DEFAULT_PORTFOLIO: IPortfolioItem[] = [
  {
    id: "arc",
    title: "Maximizing Efficiency with Proper Technology Implementation – Coffee Success Story",
    slug: "arc-intuitive-education-app",
    subtitle: "An elegant and intuitive education app that helps learners",
    category: "Technology",
    industry: "Education & E-Learning",
    overview:
      "Paysafe provides payment solutions that power the everyday. The multinational organisation operates multiple brands across the e-cash, payments processing and digital wallets spectrum, serving over 145 million customers of varying size and scale.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200",
    isDark: true,
    actionText: "Lounge Project",
    challengeText: [
      "Are you busy putting out IT fires instead of focusing on your core business? If your technology is draining resources rather than optimizing them, Netsurit can get you back on track.",
      "Your experts come with proven track records to make your working relationship of data-driven insights."
    ],
    solutionText: [
      "TechFirm deployed microservices with distributed message queues.",
      "Configured automatic horizontally auto-scaling server groups with automated failover."
    ],
    results: [
      {
        title: "IT Service for You",
        description: "Tailored infrastructure for unique business models."
      },
      { title: "99.99% SLA", description: "Zero downtime during peak traffic." }
    ],
    order: 1,
    isActive: true
  },
  {
    id: "aarex",
    title: "Convenience, savings and rewards at your fingertips",
    slug: "aarex-convenience-savings-rewards",
    subtitle: "Frictionless mobile point-of-sale integrations and automated cashback",
    category: "Technology",
    industry: "Retail & FinTech",
    overview:
      "Aarex transforms consumer loyalty through frictionless mobile point-of-sale integrations and automated cashback rewards processing.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200",
    isDark: false,
    actionText: "Lounge Project",
    challengeText: ["High volume consumer cashback processing with low latency requirements."],
    solutionText: ["Event-driven distributed ledger architecture."],
    results: [
      { title: "99.999% SLA", description: "Zero downtime during seasonal retail surges." },
      { title: "10x Throughput", description: "2.4M transactions daily." }
    ],
    order: 2,
    isActive: true
  },
  {
    id: "acce",
    title: "Private trust management and trading platform",
    slug: "acce-private-trust-trading-platform",
    subtitle: "Institutional wealth management and multi-tenant asset custody",
    category: "Technology",
    industry: "Banks & Insurance",
    overview:
      "Acce powers institutional wealth management, asset custody, and multi-tenant portfolio trading platforms.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200",
    isDark: false,
    actionText: "Lounge Project",
    results: [{ title: "$4.2B+ Managed", description: "Zero security breaches recorded." }],
    order: 3,
    isActive: true
  },
  {
    id: "abc",
    title: "Strategic Move to an AI-supported application for Public",
    slug: "abc-strategic-ai-application-public",
    subtitle: "Automated load predictions and continuous anomaly detection",
    category: "Technology",
    industry: "Public Sector & AI",
    overview:
      "ABC modernizes public utility infrastructure using automated AI-driven load predictions.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200",
    isDark: false,
    actionText: "Lounge Project",
    results: [
      { title: "92% Faster Detection", description: "Grid anomalies resolved in 3 seconds." }
    ],
    order: 4,
    isActive: true
  },
  {
    id: "frea",
    title: "Building, optimising, and future-proofing existing",
    slug: "frea-optimising-future-proofing",
    subtitle: "Multi-tenant cloud infrastructure scaling to 5M+ daily active users",
    category: "Technology",
    industry: "Cloud Engineering",
    overview:
      "Frea re-engineers legacy server workflows into modern serverless architectures with robust CI/CD pipelines.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200",
    isDark: false,
    actionText: "Lounge Project",
    results: [{ title: "50% Savings", description: "Halved compute overhead." }],
    order: 5,
    isActive: true
  },
  {
    id: "raze",
    title: "Major Insurance Provider Saves $750k per Month With Big Data",
    slug: "raze-insurance-big-data-savings",
    subtitle: "Seamless enterprise workload transition across hybrid cloud environments",
    category: "Technology",
    industry: "Enterprise Insurance",
    overview:
      "Raze unlocks predictive risk models and real-time claim verification pipelines for top-tier insurance underwriters.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200",
    isDark: true,
    actionText: "Lounge Project",
    results: [{ title: "Zero Downtime", description: "Zero seconds interrupted service." }],
    order: 6,
    isActive: true
  }
];

const DEFAULT_FORM: CreatePortfolioItemInput = {
  title: "",
  subtitle: "",
  category: "Technology",
  industry: "",
  overview: "",
  image: PORTFOLIO_IMAGE_PRESETS[0]!.url,
  bgImage: "",
  isDark: false,
  actionText: "View Project",
  challengeText: [],
  solutionText: [],
  results: [],
  order: 0,
  isActive: true
};

export default function PortfolioPage() {
  const queryClient = useQueryClient();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<IPortfolioItem | null>(null);

  // Form State
  const [formData, setFormData] = useState<CreatePortfolioItemInput>(DEFAULT_FORM);
  const [challengesRaw, setChallengesRaw] = useState("");
  const [solutionsRaw, setSolutionsRaw] = useState("");
  const [resultsList, setResultsList] = useState<IPortfolioResult[]>([]);

  // Result adding buffer
  const [newResultTitle, setNewResultTitle] = useState("");
  const [newResultDesc, setNewResultDesc] = useState("");

  // 1. Fetch Portfolio items
  const { data: portfolio = DEFAULT_PORTFOLIO, isLoading } = useQuery<IPortfolioItem[]>({
    queryKey: ["admin-portfolio"],
    queryFn: async () => {
      try {
        const res = await get<ApiResponse<IPortfolioItem[]>>("/portfolio");
        return res.data && res.data.length > 0 ? res.data : DEFAULT_PORTFOLIO;
      } catch {
        return DEFAULT_PORTFOLIO;
      }
    },
    initialData: DEFAULT_PORTFOLIO
  });

  // 2. Fetch Categories
  const { data: categories = [] } = useQuery<string[]>({
    queryKey: ["portfolio-categories"],
    queryFn: async () => {
      try {
        const res = await get<ApiResponse<string[]>>("/portfolio/categories");
        return res.data && res.data.length > 0 ? res.data : CATEGORY_PRESETS;
      } catch {
        return CATEGORY_PRESETS;
      }
    },
    initialData: CATEGORY_PRESETS
  });

  // Create Mutation
  const createMutation = useMutation({
    mutationFn: async (data: CreatePortfolioItemInput) => {
      const res = await post<ApiResponse<IPortfolioItem>>("/portfolio", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-portfolio"] });
      queryClient.invalidateQueries({ queryKey: ["portfolio-categories"] });
      toast.success("Case study added to portfolio successfully!");
      setSheetOpen(false);
      resetForm();
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "Failed to create portfolio item";
      toast.error(msg);
    }
  });

  // Update Mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<CreatePortfolioItemInput> }) => {
      const res = await patch<ApiResponse<IPortfolioItem>>(`/portfolio/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-portfolio"] });
      queryClient.invalidateQueries({ queryKey: ["portfolio-categories"] });
      toast.success("Portfolio item updated successfully!");
      setSheetOpen(false);
      setEditingId(null);
      resetForm();
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "Failed to update portfolio item";
      toast.error(msg);
    }
  });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await del(`/portfolio/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-portfolio"] });
      queryClient.invalidateQueries({ queryKey: ["portfolio-categories"] });
      toast.success("Portfolio item deleted.");
      setDeleteTarget(null);
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "Failed to delete portfolio item";
      toast.error(msg);
    }
  });

  const resetForm = () => {
    setFormData(DEFAULT_FORM);
    setChallengesRaw("");
    setSolutionsRaw("");
    setResultsList([]);
    setNewResultTitle("");
    setNewResultDesc("");
  };

  const handleToggleActive = (item: IPortfolioItem) => {
    const id = item.id || item._id;
    if (!id) return;
    updateMutation.mutate({
      id,
      data: { isActive: !item.isActive }
    });
  };

  const handleOpenCreate = () => {
    setEditingId(null);
    resetForm();
    setSheetOpen(true);
  };

  const handleOpenEdit = (item: IPortfolioItem) => {
    const id = item.id || item._id;
    if (!id) return;
    setEditingId(id);
    setFormData({
      title: item.title,
      subtitle: item.subtitle || "",
      category: item.category,
      industry: item.industry || "",
      overview: item.overview || "",
      image: item.image,
      bgImage: item.bgImage || "",
      isDark: item.isDark || false,
      actionText: item.actionText || "View Project",
      challengeText: item.challengeText || [],
      solutionText: item.solutionText || [],
      results: item.results || [],
      order: item.order || 0,
      isActive: item.isActive
    });
    setChallengesRaw((item.challengeText || []).join("\n\n"));
    setSolutionsRaw((item.solutionText || []).join("\n\n"));
    setResultsList(item.results || []);
    setSheetOpen(true);
  };

  const handleAddResult = () => {
    if (!newResultTitle.trim() || !newResultDesc.trim()) {
      toast.error("Please enter both a metric title and description");
      return;
    }
    setResultsList((prev) => [
      ...prev,
      { title: newResultTitle.trim(), description: newResultDesc.trim() }
    ]);
    setNewResultTitle("");
    setNewResultDesc("");
  };

  const handleRemoveResult = (index: number) => {
    setResultsList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const challenges = challengesRaw
      .split("\n")
      .map((c) => c.trim())
      .filter((c) => c.length > 0);

    const solutions = solutionsRaw
      .split("\n")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const payload: CreatePortfolioItemInput = {
      ...formData,
      challengeText: challenges,
      solutionText: solutions,
      results: resultsList
    };

    if (editingId) {
      updateMutation.mutate({ id: editingId, data: payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  // Filter items
  const allCategories = Array.from(new Set(["All", ...categories, ...CATEGORY_PRESETS]));

  const filteredItems = portfolio.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.industry && item.industry.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.overview && item.overview.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const totalCount = portfolio.length;
  const activeCount = portfolio.filter((p) => p.isActive).length;
  const techCount = portfolio.filter((p) => p.category === "Technology").length;
  const cloudCount = portfolio.filter((p) => p.category === "Cloud Solutions").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-foreground flex items-center gap-2 text-2xl font-black tracking-tight">
            <Briefcase className="text-primary h-6 w-6" />
            <span>Portfolio & Case Studies</span>
          </h1>
          <p className="text-muted-foreground mt-0.5 text-xs">
            Manage showcase client projects, industry case studies, deliverables, and metric
            outcomes.
          </p>
        </div>

        <Button
          onClick={handleOpenCreate}
          className="bg-primary hover:bg-primary/90 text-primary-foreground self-start text-xs font-bold shadow-sm sm:self-auto"
        >
          <Plus className="mr-1.5 h-4 w-4" />
          Add Case Study
        </Button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="border-border bg-card space-y-1 rounded-xl border p-4 shadow-2xs">
          <p className="text-muted-foreground text-[11px] font-bold tracking-wider uppercase">
            Total Projects
          </p>
          <p className="text-foreground text-2xl font-black">{totalCount}</p>
        </div>

        <div className="border-border bg-card space-y-1 rounded-xl border p-4 shadow-2xs">
          <p className="flex items-center gap-1 text-[11px] font-bold tracking-wider text-emerald-600 uppercase">
            <CheckCircle2 className="h-3 w-3" />
            <span>Active Live</span>
          </p>
          <p className="text-2xl font-black text-emerald-600">{activeCount}</p>
        </div>

        <div className="border-border bg-card space-y-1 rounded-xl border p-4 shadow-2xs">
          <p className="text-primary flex items-center gap-1 text-[11px] font-bold tracking-wider uppercase">
            <Layers className="h-3 w-3" />
            <span>Technology</span>
          </p>
          <p className="text-foreground text-2xl font-black">{techCount}</p>
        </div>

        <div className="border-border bg-card space-y-1 rounded-xl border p-4 shadow-2xs">
          <p className="flex items-center gap-1 text-[11px] font-bold tracking-wider text-blue-500 uppercase">
            <Sparkles className="h-3 w-3" />
            <span>Cloud Solutions</span>
          </p>
          <p className="text-foreground text-2xl font-black">{cloudCount}</p>
        </div>
      </div>

      {/* Category Pills & Search Filter */}
      <div className="flex flex-col justify-between gap-3 pt-2 sm:flex-row sm:items-center">
        <div className="flex flex-wrap items-center gap-1.5">
          {allCategories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "bg-muted/70 hover:bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="relative w-full max-w-xs">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="Search title, industry..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 pl-9 text-xs"
          />
        </div>
      </div>

      {/* Projects Table */}
      <div className="border-border bg-card overflow-hidden rounded-xl border shadow-2xs">
        {isLoading ? (
          <div className="text-muted-foreground py-12 text-center text-xs">
            Loading portfolio case studies...
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-muted-foreground py-12 text-center text-xs">
            No portfolio projects found matching your criteria.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-16">Preview</TableHead>
                <TableHead>Project Title</TableHead>
                <TableHead>Category & Industry</TableHead>
                <TableHead>Results Metrics</TableHead>
                <TableHead className="w-16 text-center">Order</TableHead>
                <TableHead className="w-16 text-center">Live</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.id || item._id}>
                  <TableCell>
                    <div className="border-border bg-muted relative h-10 w-12 shrink-0 overflow-hidden rounded-lg border">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  </TableCell>

                  <TableCell className="max-w-xs">
                    <div>
                      <p className="text-foreground line-clamp-1 text-xs font-bold">{item.title}</p>
                      {item.subtitle && (
                        <p className="text-muted-foreground mt-0.5 line-clamp-1 text-[11px]">
                          {item.subtitle}
                        </p>
                      )}
                      <div className="mt-1 flex items-center gap-1.5">
                        <code className="text-muted-foreground bg-muted rounded-sm px-1 text-[10px]">
                          /portfolio/{item.slug}
                        </code>
                        <a
                          href={`http://localhost:3000/portfolio/${item.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                          title="View on Public Site"
                        >
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="space-y-1">
                      <Badge variant="outline" className="text-[10px] font-semibold">
                        {item.category}
                      </Badge>
                      {item.industry && (
                        <p className="text-muted-foreground text-[10px]">{item.industry}</p>
                      )}
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex max-w-[200px] flex-wrap gap-1">
                      {item.results && item.results.length > 0 ? (
                        item.results.slice(0, 2).map((r, i) => (
                          <Badge
                            key={i}
                            variant="secondary"
                            className="px-1.5 py-0.5 text-[9px] font-bold"
                          >
                            {r.title}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-muted-foreground text-[11px]">—</span>
                      )}
                      {item.results && item.results.length > 2 && (
                        <Badge variant="outline" className="text-[9px]">
                          +{item.results.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </TableCell>

                  <TableCell className="text-muted-foreground text-center font-mono text-xs">
                    {item.order}
                  </TableCell>

                  <TableCell className="text-center">
                    <Switch
                      checked={item.isActive}
                      onCheckedChange={() => handleToggleActive(item)}
                    />
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleOpenEdit(item)}
                        className="text-foreground hover:text-primary h-8 w-8"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setDeleteTarget(item)}
                        className="text-muted-foreground hover:text-destructive h-8 w-8"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Create / Edit Slide-Over Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right" className="w-full space-y-6 overflow-y-auto p-6 sm:max-w-2xl">
          <SheetHeader>
            <SheetTitle className="text-foreground flex items-center gap-2 text-lg font-black">
              <Briefcase className="text-primary h-5 w-5" />
              <span>{editingId ? "Edit Case Study" : "Add Portfolio Case Study"}</span>
            </SheetTitle>
            <SheetDescription className="text-muted-foreground text-xs">
              Configure showcase projects, client problem descriptions, technical solutions, and
              quantified results.
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <div className="space-y-1.5">
              <Label className="text-xs font-bold">
                Project Title <span className="text-destructive">*</span>
              </Label>
              <Input
                required
                placeholder="e.g. Maximizing Efficiency with Multi-Cloud Architecture"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="text-xs"
              />
            </div>

            {/* Subtitle */}
            <div className="space-y-1.5">
              <Label className="text-xs font-bold">Subtitle / Tagline</Label>
              <Input
                placeholder="e.g. An intuitive distributed e-learning platform"
                value={formData.subtitle || ""}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                className="text-xs"
              />
            </div>

            {/* Category & Industry */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold">Category</Label>
                <Input
                  placeholder="e.g. Technology"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="text-xs"
                />
                <div className="flex flex-wrap gap-1 pt-1">
                  {CATEGORY_PRESETS.slice(0, 3).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setFormData({ ...formData, category: cat })}
                      className="bg-muted hover:bg-primary/10 hover:text-primary cursor-pointer rounded px-2 py-0.5 text-[10px] transition-colors"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold">Client Industry</Label>
                <Input
                  placeholder="e.g. Retail & FinTech"
                  value={formData.industry || ""}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="text-xs"
                />
              </div>
            </div>

            {/* Image Preview & URL */}
            <div className="space-y-2">
              <Label className="text-xs font-bold">
                Cover Image URL <span className="text-destructive">*</span>
              </Label>
              <div className="flex items-center gap-3">
                <div className="border-border bg-muted relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border">
                  <Image
                    src={formData.image || PORTFOLIO_IMAGE_PRESETS[0]!.url}
                    alt="Preview"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <Input
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="grow text-xs"
                />
              </div>

              {/* Photo Presets */}
              <div className="space-y-1 pt-1">
                <p className="text-muted-foreground text-[11px] font-semibold">
                  Quick Image Presets:
                </p>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                  {PORTFOLIO_IMAGE_PRESETS.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => setFormData({ ...formData, image: preset.url })}
                      className={`relative aspect-video cursor-pointer overflow-hidden rounded-md border transition-all ${
                        formData.image === preset.url
                          ? "ring-primary border-transparent ring-2"
                          : "border-border hover:border-primary/50 opacity-70 hover:opacity-100"
                      }`}
                      title={preset.name}
                    >
                      <Image
                        src={preset.url}
                        alt={preset.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Overview */}
            <div className="space-y-1.5">
              <Label className="text-xs font-bold">Project Overview</Label>
              <Textarea
                rows={3}
                placeholder="High-level narrative describing the engagement, scope, and strategic goals..."
                value={formData.overview || ""}
                onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                className="text-xs"
              />
            </div>

            {/* Quantified Results Key Metrics */}
            <div className="border-border space-y-2 border-t pt-4">
              <Label className="flex items-center justify-between text-xs font-bold">
                <span>Quantified Results & Metrics</span>
                <span className="text-muted-foreground text-[11px] font-normal">
                  {resultsList.length} metrics configured
                </span>
              </Label>

              {/* Metric Items List */}
              {resultsList.length > 0 && (
                <div className="max-h-36 space-y-1.5 overflow-y-auto pr-1">
                  {resultsList.map((res, idx) => (
                    <div
                      key={idx}
                      className="border-border bg-muted/40 flex items-center justify-between rounded-lg border p-2 text-xs"
                    >
                      <div>
                        <span className="text-foreground font-bold">{res.title}: </span>
                        <span className="text-muted-foreground">{res.description}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveResult(idx)}
                        className="text-muted-foreground hover:text-destructive p-1"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add New Result buffer */}
              <div className="flex flex-col items-end gap-2 pt-1 sm:flex-row">
                <div className="w-full grow space-y-1">
                  <Input
                    placeholder="Metric Title (e.g. 99.999% SLA)"
                    value={newResultTitle}
                    onChange={(e) => setNewResultTitle(e.target.value)}
                    className="h-8 text-xs"
                  />
                </div>
                <div className="w-full grow space-y-1">
                  <Input
                    placeholder="Description (e.g. Zero downtime throughout peak surges)"
                    value={newResultDesc}
                    onChange={(e) => setNewResultDesc(e.target.value)}
                    className="h-8 text-xs"
                  />
                </div>
                <Button
                  type="button"
                  onClick={handleAddResult}
                  variant="outline"
                  size="sm"
                  className="h-8 shrink-0 text-xs"
                >
                  <PlusCircle className="mr-1 h-3.5 w-3.5" />
                  Add Metric
                </Button>
              </div>
            </div>

            {/* Challenges & Solutions */}
            <div className="border-border grid grid-cols-1 gap-3 border-t pt-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold">Client Challenges (1 per line)</Label>
                <Textarea
                  rows={4}
                  placeholder="Legacy monolith bottlenecks...&#10;Sub-optimal query latency..."
                  value={challengesRaw}
                  onChange={(e) => setChallengesRaw(e.target.value)}
                  className="text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold">Architected Solutions (1 per line)</Label>
                <Textarea
                  rows={4}
                  placeholder="Migrated to event-sourced microservices...&#10;Implemented distributed edge caching..."
                  value={solutionsRaw}
                  onChange={(e) => setSolutionsRaw(e.target.value)}
                  className="text-xs"
                />
              </div>
            </div>

            {/* Display Order & Active State */}
            <div className="border-border flex items-center justify-between border-t pt-4">
              <div className="max-w-[140px] space-y-1">
                <Label className="text-xs font-bold">Display Order</Label>
                <Input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) || 0 })}
                  className="h-8 text-xs"
                />
              </div>

              <div className="flex items-center gap-3">
                <Label className="text-xs font-bold">Published Live</Label>
                <Switch
                  checked={formData.isActive}
                  onCheckedChange={(val) => setFormData({ ...formData, isActive: val })}
                />
              </div>
            </div>

            <SheetFooter className="border-border border-t pt-4">
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
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold"
              >
                {createMutation.isPending || updateMutation.isPending
                  ? "Saving..."
                  : editingId
                    ? "Update Case Study"
                    : "Create Case Study"}
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation Alert Dialog */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-bold">Delete Case Study?</AlertDialogTitle>
            <AlertDialogDescription className="text-xs">
              Are you sure you want to remove <strong>&quot;{deleteTarget?.title}&quot;</strong>{" "}
              from your portfolio? This action cannot be undone.
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
