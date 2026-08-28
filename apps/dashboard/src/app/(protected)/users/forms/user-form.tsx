"use client";

import { KeyRound, ShieldAlert, User } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { CreateUserInput, userRoleEnum } from "@repo/validators";

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

const userFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  email: z.string().email("Invalid email address"),
  password: z.string().optional(),
  role: userRoleEnum,
  isActive: z.boolean()
});

type UserFormValues = z.infer<typeof userFormSchema>;

interface UserFormProps {
  defaultValues?: Partial<CreateUserInput>;
  isEditing?: boolean;
  onSubmit: (values: UserFormValues) => void | Promise<void>;
  isLoading?: boolean;
  onCancel?: () => void;
  submitLabel?: string;
}

export function UserForm({
  defaultValues,
  isEditing = false,
  onSubmit,
  isLoading = false,
  onCancel,
  submitLabel = "Save Account"
}: UserFormProps) {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(
      userFormSchema.refine(
        (data) => {
          if (!isEditing && (!data.password || data.password.length < 8)) {
            return false;
          }
          if (isEditing && data.password && data.password.length > 0 && data.password.length < 8) {
            return false;
          }
          return true;
        },
        {
          message: "Password must be at least 8 characters",
          path: ["password"]
        }
      )
    ),
    mode: "onBlur",
    defaultValues: {
      name: defaultValues?.name || "",
      email: defaultValues?.email || "",
      password: defaultValues?.password || "",
      role: (defaultValues?.role as "admin" | "user") || "user",
      isActive: defaultValues?.isActive ?? true
    }
  });

  const role = form.watch("role");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name *</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Alex Johnson" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address *</FormLabel>
              <FormControl>
                <Input type="email" placeholder="alex@techfirm.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>
                  Password {isEditing ? "(Leave blank to keep unchanged)" : "*"}
                </FormLabel>
                <KeyRound className="text-muted-foreground h-3.5 w-3.5" />
              </div>
              <FormControl>
                <Input
                  type="password"
                  placeholder={isEditing ? "••••••••" : "At least 8 characters"}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Role Selector */}
        <div className="space-y-2 pt-1">
          <FormLabel>Role &amp; Permissions</FormLabel>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => form.setValue("role", "user")}
              className={`cursor-pointer rounded-xl border p-3 text-left transition-all ${
                role === "user"
                  ? "border-primary bg-primary/5 ring-primary ring-1"
                  : "border-border hover:border-primary/40 bg-card"
              }`}
            >
              <div className="mb-1 flex items-center gap-2">
                <User className="text-muted-foreground h-4 w-4" />
                <span className="text-foreground text-xs font-medium">Standard User</span>
              </div>
              <p className="text-muted-foreground text-[10px] leading-snug font-normal">
                Standard access without admin panel management privileges.
              </p>
            </button>

            <button
              type="button"
              onClick={() => form.setValue("role", "admin")}
              className={`cursor-pointer rounded-xl border p-3 text-left transition-all ${
                role === "admin"
                  ? "border-primary bg-primary/5 ring-primary ring-1"
                  : "border-border hover:border-primary/40 bg-card"
              }`}
            >
              <div className="mb-1 flex items-center gap-2">
                <ShieldAlert className="text-primary h-4 w-4" />
                <span className="text-primary text-xs font-medium">Administrator</span>
              </div>
              <p className="text-muted-foreground text-[10px] leading-snug font-normal">
                Full CRUD privileges across all dashboard settings and content.
              </p>
            </button>
          </div>
        </div>

        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="border-border/40 flex items-center justify-between rounded-xl border p-3">
              <FormLabel className="cursor-pointer">Active Account Status</FormLabel>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

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
