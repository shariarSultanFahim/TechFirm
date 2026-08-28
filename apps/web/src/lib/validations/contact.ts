import { z } from "zod";

export const contactFormSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .max(50, "First name must be under 50 characters"),
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .max(50, "Last name must be under 50 characters"),
  email: z
    .string()
    .trim()
    .min(1, "Work email is required")
    .email("Please provide a valid work email address"),
  phone: z.string().trim().optional(),
  service: z.string().min(1, "Please select a service"),
  message: z
    .string()
    .trim()
    .min(10, "Please provide at least 10 characters detailing your project overview or inquiry")
    .max(2000, "Message cannot exceed 2000 characters")
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
