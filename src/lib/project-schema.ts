import { z } from "zod";

export const projectInput = z.object({
  title: z.string().trim().min(1, "Title is required").max(120),
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and single hyphens"),
  category: z.string().trim().min(1, "Category is required").max(160),
  description: z.string().trim().max(500, "Keep it under 500 characters").nullable(),
  image: z.string().trim().min(1, "Add a desktop preview image").max(500),
  mobileImage: z.string().trim().max(500).nullable(),
  url: z
    .string()
    .trim()
    .max(500)
    .nullable()
    .refine((v) => !v || /^https?:\/\//i.test(v), "Must start with http:// or https://"),
  bgColor: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Use a 6-digit hex colour like #D8DDD0"),
  featured: z.boolean(),
  published: z.boolean(),
  sortOrder: z.number().int("Use a whole number").min(0).max(999),
});

export type ProjectInput = z.infer<typeof projectInput>;