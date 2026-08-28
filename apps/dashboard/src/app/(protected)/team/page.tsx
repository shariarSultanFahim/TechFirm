"use client";

import * as React from "react";
import Image from "next/image";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Award,
  CheckCircle2,
  Github,
  Linkedin,
  Mail,
  Pencil,
  Phone,
  Plus,
  Search,
  Sparkles,
  Trash2,
  Twitter,
  Users
} from "lucide-react";
import { toast } from "sonner";

import { ApiResponse, ITeamMember } from "@repo/types";
import { CreateTeamMemberInput } from "@repo/validators";

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

const PHOTO_PRESETS = [
  {
    label: "Michael",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800"
  },
  {
    label: "Megan",
    url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800"
  },
  {
    label: "David",
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800"
  },
  {
    label: "Elena",
    url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800"
  },
  {
    label: "Marcus",
    url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800"
  },
  { label: "Olivia", url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800" }
];

const DEFAULT_FORM: CreateTeamMemberInput = {
  name: "",
  role: "",
  bio: "",
  photo: PHOTO_PRESETS[0]?.url || "",
  email: "",
  phone: "",
  socialLinks: {
    linkedin: "",
    twitter: "",
    github: ""
  },
  skills: [],
  experience: "",
  order: 0,
  isActive: true
};

export default function TeamPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = React.useState("");
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = React.useState<ITeamMember | null>(null);
  const [formData, setFormData] = React.useState<CreateTeamMemberInput>(DEFAULT_FORM);
  const [skillsRaw, setSkillsRaw] = React.useState("");

  // Fetch Team Members
  const {
    data: members = [],
    isLoading,
    isError
  } = useQuery<ITeamMember[]>({
    queryKey: ["team-members"],
    queryFn: async () => {
      const res = await get<ApiResponse<ITeamMember[]>>("/team");
      return res.data || [];
    }
  });

  // Create Mutation
  const createMutation = useMutation({
    mutationFn: async (payload: CreateTeamMemberInput) => {
      const res = await post<ApiResponse<ITeamMember>>("/team", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team-members"] });
      toast.success("Team member added successfully!");
      setSheetOpen(false);
      setFormData(DEFAULT_FORM);
      setSkillsRaw("");
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "Failed to add team member";
      toast.error(msg);
    }
  });

  // Update Mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<CreateTeamMemberInput> }) => {
      const res = await patch<ApiResponse<ITeamMember>>(`/team/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team-members"] });
      toast.success("Team member updated successfully!");
      setSheetOpen(false);
      setEditingId(null);
      setFormData(DEFAULT_FORM);
      setSkillsRaw("");
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "Failed to update team member";
      toast.error(msg);
    }
  });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await del(`/team/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team-members"] });
      toast.success("Team member deleted permanently.");
      setDeleteTarget(null);
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "Failed to delete team member";
      toast.error(msg);
    }
  });

  const handleToggleActive = (m: ITeamMember) => {
    const id = m.id || m._id;
    if (!id) return;
    updateMutation.mutate({
      id,
      data: { isActive: !m.isActive }
    });
  };

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({
      ...DEFAULT_FORM,
      order: members.length + 1
    });
    setSkillsRaw("");
    setSheetOpen(true);
  };

  const handleOpenEdit = (m: ITeamMember) => {
    const id = m.id || m._id;
    if (!id) return;
    setEditingId(id);
    setFormData({
      name: m.name,
      role: m.role,
      bio: m.bio || "",
      photo: m.photo,
      email: m.email || "",
      phone: m.phone || "",
      socialLinks: {
        linkedin: m.socialLinks?.linkedin || "",
        twitter: m.socialLinks?.twitter || "",
        github: m.socialLinks?.github || ""
      },
      skills: m.skills || [],
      experience: m.experience || "",
      order: m.order ?? 0,
      isActive: m.isActive ?? true
    });
    setSkillsRaw((m.skills || []).join(", "));
    setSheetOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.role.trim() || !formData.photo.trim()) {
      toast.error("Name, role, and photo URL are required.");
      return;
    }

    const parsedSkills = skillsRaw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const payload: CreateTeamMemberInput = {
      ...formData,
      skills: parsedSkills
    };

    if (editingId) {
      updateMutation.mutate({ id: editingId, data: payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const filteredMembers = members.filter((m) => {
    const match =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.role.toLowerCase().includes(search.toLowerCase()) ||
      (m.email && m.email.toLowerCase().includes(search.toLowerCase())) ||
      (m.skills && m.skills.some((s) => s.toLowerCase().includes(search.toLowerCase())));
    return match;
  });

  const totalMembers = members.length;
  const activeMembers = members.filter((m) => m.isActive).length;
  const architectsCount = members.filter(
    (m) => m.role.toLowerCase().includes("architect") || m.role.toLowerCase().includes("lead")
  ).length;

  return (
    <div className="space-y-8 pb-12">
      {/* Top Header Bar */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-foreground flex items-center gap-2.5 text-2xl font-black tracking-tight">
            <Users className="text-primary h-6 w-6" />
            <span>Team Members</span>
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Manage company leadership, engineers, consultants, and public team profiles.
          </p>
        </div>

        <Button onClick={handleOpenCreate} className="flex items-center gap-2 font-bold shadow-md">
          <Plus className="h-4 w-4" />
          <span>Add Member</span>
        </Button>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="bg-card border-border flex items-center gap-4 rounded-2xl border p-5 shadow-xs">
          <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-xl font-bold">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <p className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
              Total Members
            </p>
            <p className="text-foreground text-xl font-black">{totalMembers}</p>
          </div>
        </div>

        <div className="bg-card border-border flex items-center gap-4 rounded-2xl border p-5 shadow-xs">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 font-bold text-emerald-500">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <p className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
              Active & Published
            </p>
            <p className="text-foreground text-xl font-black">{activeMembers}</p>
          </div>
        </div>

        <div className="bg-card border-border flex items-center gap-4 rounded-2xl border p-5 shadow-xs">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 font-bold text-amber-500">
            <Award className="h-5 w-5" />
          </div>
          <div>
            <p className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
              Leadership & Leads
            </p>
            <p className="text-foreground text-xl font-black">{architectsCount}</p>
          </div>
        </div>
      </div>

      {/* Search Filter */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, role, skill, email..."
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
            <p className="font-bold">Failed to load team members.</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => queryClient.invalidateQueries({ queryKey: ["team-members"] })}
              className="mt-3"
            >
              Retry
            </Button>
          </div>
        ) : filteredMembers.length === 0 ? (
          <div className="text-muted-foreground p-12 text-center">
            <Users className="text-muted-foreground/40 mx-auto mb-3 h-10 w-10" />
            <p className="text-foreground font-bold">No team members found.</p>
            <p className="mt-1 text-xs">Add leaders and engineers to showcase your organization.</p>
            <Button onClick={handleOpenCreate} size="sm" className="mt-4 font-bold">
              <Plus className="mr-1.5 h-3.5 w-3.5" /> Add Team Member
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead className="w-16">Order</TableHead>
                <TableHead>Member</TableHead>
                <TableHead>Role & Slug</TableHead>
                <TableHead>Contact & Social</TableHead>
                <TableHead>Skills</TableHead>
                <TableHead>Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map((m) => (
                <TableRow key={m.id || m._id}>
                  <TableCell className="text-muted-foreground text-xs font-bold">
                    #{m.order}
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="border-border bg-muted relative h-10 w-10 shrink-0 overflow-hidden rounded-full border">
                        <Image
                          src={m.photo}
                          alt={m.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <div>
                        <p className="text-foreground text-xs font-bold">{m.name}</p>
                        {m.experience && (
                          <p className="text-muted-foreground text-[11px]">{m.experience}</p>
                        )}
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div>
                      <p className="text-foreground text-xs font-semibold">{m.role}</p>
                      <code className="text-muted-foreground bg-muted rounded-md px-1.5 py-0.5 text-[10px]">
                        /team/{m.slug}
                      </code>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="space-y-1">
                      {m.email && (
                        <div className="text-muted-foreground flex items-center gap-1.5 text-[11px]">
                          <Mail className="text-primary h-3 w-3 shrink-0" />
                          <span>{m.email}</span>
                        </div>
                      )}
                      {m.phone && (
                        <div className="text-muted-foreground flex items-center gap-1.5 text-[11px]">
                          <Phone className="text-primary h-3 w-3 shrink-0" />
                          <span>{m.phone}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1.5 pt-0.5">
                        {m.socialLinks?.linkedin && (
                          <Linkedin className="text-muted-foreground hover:text-primary h-3 w-3" />
                        )}
                        {m.socialLinks?.twitter && (
                          <Twitter className="text-muted-foreground hover:text-primary h-3 w-3" />
                        )}
                        {m.socialLinks?.github && (
                          <Github className="text-muted-foreground hover:text-primary h-3 w-3" />
                        )}
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="max-w-xs">
                    <div className="flex flex-wrap gap-1">
                      {(m.skills || []).slice(0, 3).map((s) => (
                        <Badge key={s} variant="secondary" className="py-0 text-[10px]">
                          {s}
                        </Badge>
                      ))}
                      {(m.skills || []).length > 3 && (
                        <span className="text-muted-foreground text-[10px]">
                          +{(m.skills || []).length - 3}
                        </span>
                      )}
                    </div>
                  </TableCell>

                  <TableCell>
                    <Switch checked={m.isActive} onCheckedChange={() => handleToggleActive(m)} />
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleOpenEdit(m)}
                        className="text-foreground hover:text-primary h-8 w-8"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setDeleteTarget(m)}
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
        <SheetContent side="right" className="w-full space-y-6 overflow-y-auto p-6 sm:max-w-xl">
          <SheetHeader>
            <SheetTitle className="text-foreground flex items-center gap-2 text-lg font-black">
              <Users className="text-primary h-5 w-5" />
              <span>{editingId ? "Edit Team Member" : "Create Team Member"}</span>
            </SheetTitle>
            <SheetDescription className="text-muted-foreground text-xs">
              Configure member profile details, photo URL, skills, bio, and social channels.
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="bg-muted/30 border-border/50 space-y-4 rounded-xl border p-4">
              {/* Photo Preview & Presets */}
              <div className="space-y-2">
                <label className="text-foreground text-xs font-semibold">Profile Photo *</label>
                <div className="flex items-center gap-4">
                  <div className="border-primary/20 bg-muted relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 shadow-sm">
                    {formData.photo ? (
                      <Image
                        src={formData.photo}
                        alt="Preview"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="text-muted-foreground flex h-full w-full items-center justify-center">
                        <Users className="h-6 w-6" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <Input
                      value={formData.photo}
                      onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                      className="text-xs"
                      required
                    />
                  </div>
                </div>

                {/* Photo Presets */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-muted-foreground flex items-center gap-1 text-[11px]">
                    <Sparkles className="text-primary h-3 w-3" /> Presets:
                  </span>
                  {PHOTO_PRESETS.map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => setFormData({ ...formData, photo: p.url })}
                      className="bg-muted hover:bg-muted/80 text-foreground border-border cursor-pointer rounded border px-2 py-0.5 text-[10px] font-semibold transition-colors"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Role */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-foreground text-xs font-semibold">Full Name *</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Michael Carter"
                    className="text-xs"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-foreground text-xs font-semibold">Job Role *</label>
                  <Input
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g. Chief Solutions Architect"
                    className="text-xs"
                    required
                  />
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-1.5">
                <label className="text-foreground text-xs font-semibold">Bio / Overview</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Summary of experience and background..."
                  rows={3}
                  className="border-input text-foreground placeholder:text-muted-foreground focus:ring-ring w-full rounded-lg border bg-transparent px-3 py-2 text-xs focus:ring-2 focus:outline-hidden"
                />
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-foreground text-xs font-semibold">Email</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="m.carter@techfirm.com"
                    className="text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-foreground text-xs font-semibold">Phone</label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 019-2834"
                    className="text-xs"
                  />
                </div>
              </div>

              {/* Experience & Skills */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-foreground text-xs font-semibold">Experience</label>
                  <Input
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    placeholder="e.g. 15+ Years"
                    className="text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-foreground text-xs font-semibold">Display Order</label>
                  <Input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                    className="text-xs"
                  />
                </div>
              </div>

              {/* Skills Tag Input */}
              <div className="space-y-1.5">
                <label className="text-foreground text-xs font-semibold">
                  Skills (comma-separated)
                </label>
                <Input
                  value={skillsRaw}
                  onChange={(e) => setSkillsRaw(e.target.value)}
                  placeholder="Cloud Architecture, Kubernetes, DevOps, Terraform"
                  className="text-xs"
                />
              </div>

              {/* Social Links */}
              <div className="border-border/50 space-y-3 border-t pt-2">
                <p className="text-foreground text-xs font-bold">Social Links</p>
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                  <div className="space-y-1">
                    <span className="text-muted-foreground flex items-center gap-1 text-[11px]">
                      <Linkedin className="text-primary h-3 w-3" /> LinkedIn
                    </span>
                    <Input
                      value={formData.socialLinks?.linkedin || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          socialLinks: { ...formData.socialLinks, linkedin: e.target.value }
                        })
                      }
                      placeholder="https://..."
                      className="text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <span className="text-muted-foreground flex items-center gap-1 text-[11px]">
                      <Twitter className="text-primary h-3 w-3" /> Twitter
                    </span>
                    <Input
                      value={formData.socialLinks?.twitter || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          socialLinks: { ...formData.socialLinks, twitter: e.target.value }
                        })
                      }
                      placeholder="https://..."
                      className="text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <span className="text-muted-foreground flex items-center gap-1 text-[11px]">
                      <Github className="text-primary h-3 w-3" /> GitHub
                    </span>
                    <Input
                      value={formData.socialLinks?.github || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          socialLinks: { ...formData.socialLinks, github: e.target.value }
                        })
                      }
                      placeholder="https://..."
                      className="text-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="border-border/40 flex items-center justify-between border-t pt-2">
                <div>
                  <p className="text-foreground text-xs font-bold">Published & Active</p>
                  <p className="text-muted-foreground text-[11px]">
                    Visible on public team grid & member pages
                  </p>
                </div>
                <Switch
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
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
                    ? "Update Member"
                    : "Create Member"}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation Alert Dialog */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-bold">Delete Team Member?</AlertDialogTitle>
            <AlertDialogDescription className="text-xs">
              Are you sure you want to delete <strong>&quot;{deleteTarget?.name}&quot;</strong>?
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
