import { z } from "zod";

export const postInput = z.object({
  title: z.string().trim().min(1, "Title is required").max(200, "Keep the title under 200 characters"),
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and single hyphens"),
  excerpt: z.string().trim().min(1, "Excerpt is required").max(300, "Keep the excerpt under 300 characters"),
  content: z.string().min(1, "Write something first"),
  category: z.string().trim().min(1, "Category is required").max(60),
  sectionLabel: z.string().trim().max(60).nullable(),
  coverImage: z.string().trim().max(500).nullable(),
  coverCaption: z.string().trim().max(200).nullable(),
  readTime: z.number().int("Use a whole number").min(1, "At least 1 minute").max(120),
  published: z.boolean(),
});

export type PostInput = z.infer<typeof postInput>;