"use client";

import { Users } from "lucide-react";

import { ITeamMember } from "@repo/types";
import { CreateTeamMemberInput } from "@repo/validators";

import { useCreateTeamMember, useUpdateTeamMember } from "@/hooks/use-team-mutations";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

import { TeamMemberForm } from "./team-form";

interface TeamMemberFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  member?: ITeamMember | null;
}

export function TeamMemberFormDialog({ open, onOpenChange, member }: TeamMemberFormDialogProps) {
  const createMember = useCreateTeamMember();
  const updateMember = useUpdateTeamMember();

  const isEditing = !!member;
  const isLoading = createMember.isPending || updateMember.isPending;

  const handleSubmit = async (values: CreateTeamMemberInput) => {
    if (member) {
      const id = member.id || member._id;
      if (!id) return;
      await updateMember.mutateAsync({ id, data: values });
    } else {
      await createMember.mutateAsync(values);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="text-primary h-5 w-5" />
            <span>{isEditing ? "Edit Team Member" : "Create Team Member"}</span>
          </DialogTitle>
          <DialogDescription>
            Configure member profile details, photo URL, skills, bio, and social channels.
          </DialogDescription>
        </DialogHeader>

        <TeamMemberForm
          key={member ? member.id || member._id : "create"}
          defaultValues={
            member
              ? {
                  name: member.name,
                  role: member.role,
                  bio: member.bio,
                  photo: member.photo,
                  email: member.email,
                  phone: member.phone,
                  socialLinks: member.socialLinks,
                  skills: member.skills,
                  experience: member.experience,
                  order: member.order,
                  isActive: member.isActive
                }
              : undefined
          }
          onSubmit={handleSubmit}
          isLoading={isLoading}
          onCancel={() => onOpenChange(false)}
          submitLabel={isEditing ? "Update Member" : "Create Member"}
        />
      </DialogContent>
    </Dialog>
  );
}
