"use client";

import * as React from "react";

import { Github, Linkedin, Sparkles, Twitter, Users } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { CreateTeamMemberInput, createTeamMemberSchema } from "@repo/validators";

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
  {
    label: "Olivia",
    url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800"
  }
];

interface TeamMemberFormProps {
  defaultValues?: Partial<CreateTeamMemberInput>;
  onSubmit: (values: CreateTeamMemberInput) => void | Promise<void>;
  isLoading?: boolean;
  onCancel?: () => void;
  submitLabel?: string;
}

export function TeamMemberForm({
  defaultValues,
  onSubmit,
  isLoading = false,
  onCancel,
  submitLabel = "Save Team Member"
}: TeamMemberFormProps) {
  const form = useForm<z.infer<typeof createTeamMemberSchema>>({
    resolver: zodResolver(createTeamMemberSchema),
    mode: "onBlur",
    defaultValues: {
      name: defaultValues?.name || "",
      role: defaultValues?.role || "",
      bio: defaultValues?.bio || "",
      photo: defaultValues?.photo || PHOTO_PRESETS[0]?.url || "",
      email: defaultValues?.email || "",
      phone: defaultValues?.phone || "",
      socialLinks: {
        linkedin: defaultValues?.socialLinks?.linkedin || "",
        twitter: defaultValues?.socialLinks?.twitter || "",
        github: defaultValues?.socialLinks?.github || ""
      },
      skills: defaultValues?.skills || [],
      experience: defaultValues?.experience || "",
      order: defaultValues?.order ?? 0,
      isActive: defaultValues?.isActive ?? true
    }
  });

  const [skillInput, setSkillInput] = React.useState("");
  const skills = form.watch("skills") || [];
  const photoUrl = form.watch("photo");
  const name = form.watch("name");

  const handleAddSkill = () => {
    if (!skillInput.trim()) return;
    form.setValue("skills", [...skills, skillInput.trim()]);
    setSkillInput("");
  };

  const handleRemoveSkill = (idx: number) => {
    form.setValue(
      "skills",
      skills.filter((_, i) => i !== idx)
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Core Member Information */}
        <div className="bg-muted/30 border-border/50 space-y-3 rounded-xl border p-3.5">
          <p className="text-muted-foreground text-[10px] font-medium tracking-wider uppercase">
            Basic Information
          </p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Elena Rostova" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role / Job Title *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Lead Systems Architect" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio &amp; Summary</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Brief background, specialization, and achievements..."
                    rows={3}
                    className="text-xs font-normal"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="elena@techfirm.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="+1 (555) 019-2834" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Years Experience / Subtitle</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 10+ Years Cloud Infrastructure" {...field} />
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
        </div>

        {/* Photo Selection */}
        <div className="bg-muted/30 border-border/50 space-y-3 rounded-xl border p-3.5">
          <p className="text-muted-foreground text-[10px] font-medium tracking-wider uppercase">
            Profile Photo
          </p>

          <FormField
            control={form.control}
            name="photo"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-3">
                  <Avatar className="border-border h-12 w-12 shrink-0 border shadow-xs">
                    <AvatarImage src={photoUrl} alt={name || "Member"} />
                    <AvatarFallback className="text-xs font-medium">
                      {name ? name.slice(0, 2).toUpperCase() : <Users className="h-4 w-4" />}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <FormControl>
                      <Input placeholder="https://images.unsplash.com/..." {...field} />
                    </FormControl>
                  </div>
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-muted-foreground text-[10px] font-medium">Presets:</span>
                  {PHOTO_PRESETS.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => form.setValue("photo", preset.url)}
                      className={`cursor-pointer rounded-md border px-2 py-0.5 text-[10px] font-medium transition-all ${
                        photoUrl === preset.url
                          ? "border-primary bg-primary/10 text-primary shadow-2xs"
                          : "border-border hover:bg-muted text-muted-foreground"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Skills Tagging */}
        <div className="bg-muted/30 border-border/50 space-y-3 rounded-xl border p-3.5">
          <FormItem>
            <FormLabel>Technical Skills &amp; Proficiencies</FormLabel>
            <div className="mb-2 flex flex-wrap gap-1">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-primary/10 text-primary inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(idx)}
                    className="hover:text-destructive ml-1 cursor-pointer font-medium"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Input
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                placeholder="e.g. Kubernetes, Rust, Terraform"
                className="text-xs font-normal"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddSkill();
                  }
                }}
              />
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={handleAddSkill}
                className="shrink-0 text-xs font-medium"
              >
                Add
              </Button>
            </div>
          </FormItem>
        </div>

        {/* Social Links */}
        <div className="bg-muted/30 border-border/50 space-y-3 rounded-xl border p-3.5">
          <p className="text-muted-foreground text-[10px] font-medium tracking-wider uppercase">
            Social Profiles
          </p>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
            <FormField
              control={form.control}
              name="socialLinks.linkedin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1 text-[11px]">
                    <Linkedin className="text-primary h-3 w-3" /> LinkedIn
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." className="text-xs font-normal" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="socialLinks.twitter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1 text-[11px]">
                    <Twitter className="text-primary h-3 w-3" /> Twitter
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." className="text-xs font-normal" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="socialLinks.github"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1 text-[11px]">
                    <Github className="text-primary h-3 w-3" /> GitHub
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." className="text-xs font-normal" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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
