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

  const handleRemoveSkill = (index: number) => {
    form.setValue(
      "skills",
      skills.filter((_, i) => i !== index)
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Photo selection */}
        <div className="bg-muted/30 border-border/50 space-y-3 rounded-xl border p-3.5">
          <FormField
            control={form.control}
            name="photo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Photo URL *</FormLabel>
                <div className="flex items-center gap-3">
                  <Avatar className="border-border h-12 w-12 shrink-0 border">
                    <AvatarImage src={photoUrl} alt={name} />
                    <AvatarFallback className="text-xs font-bold">
                      {name ? name.slice(0, 2).toUpperCase() : <Users className="h-5 w-5" />}
                    </AvatarFallback>
                  </Avatar>
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
            {PHOTO_PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => form.setValue("photo", p.url)}
                className="bg-muted hover:bg-muted/80 text-foreground border-border cursor-pointer rounded border px-2 py-0.5 text-[10px] font-semibold transition-colors"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Name and Role */}
        <div className="bg-muted/30 border-border/50 space-y-3 rounded-xl border p-3.5">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Michael Carter" {...field} />
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
                  <FormLabel>Job Role / Title *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Chief Solutions Architect" {...field} />
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
                <FormLabel>Biography</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Summary of experience and leadership background..."
                    rows={3}
                    className="text-xs"
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
                  <FormLabel>Work Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="m.carter@techfirm.com" {...field} />
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
                  <FormLabel>Phone Number</FormLabel>
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
                  <FormLabel>Experience Badge</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 15+ Years" {...field} />
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

        {/* Skills Tag Management */}
        <div className="bg-muted/30 border-border/50 space-y-2.5 rounded-xl border p-3.5">
          <FormItem>
            <FormLabel>Core Expertise &amp; Skills</FormLabel>
            <div className="mb-2 flex flex-wrap gap-1">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-primary/10 text-primary inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-bold"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(idx)}
                    className="hover:text-destructive ml-1 cursor-pointer font-bold"
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
                placeholder="e.g. Cloud Architecture, DevOps"
                className="text-xs"
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
                className="shrink-0 text-xs font-bold"
              >
                Add
              </Button>
            </div>
          </FormItem>
        </div>

        {/* Social Links */}
        <div className="bg-muted/30 border-border/50 space-y-3 rounded-xl border p-3.5">
          <p className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
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
                    <Input placeholder="https://..." className="text-xs" {...field} />
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
                    <Input placeholder="https://..." className="text-xs" {...field} />
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
                    <Input placeholder="https://..." className="text-xs" {...field} />
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
