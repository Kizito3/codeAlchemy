import { z } from "zod";

export const caseStudyInput = z
  .object({
    caseStudyPublished: z.boolean(),
    summary: z.string().trim().max(300, "Keep it under 300 characters").nullable(),
    client: z.string().trim().max(120).nullable(),
    year: z.number().int("Use a whole number").min(2000).max(2100).nullable(),
    servicesProvided: z.array(z.string().trim().min(1).max(60)).max(12, "Up to 12 services"),
    coverImage: z.string().trim().max(500).nullable(),
    results: z
      .array(
        z.object({
          value: z.string().trim().min(1, "Every result needs a value").max(20),
          label: z.string().trim().min(1, "Every result needs a label").max(80),
        }),
      )
      .max(4, "Up to 4 results"),
    content: z.string().nullable(),
    gallery: z.array(z.string().trim().min(1).max(500)).max(12, "Up to 12 images"),
    metaTitle: z.string().trim().max(70, "Keep it under 70 characters").nullable(),
    metaDescription: z.string().trim().max(170, "Keep it under 170 characters").nullable(),
    ogImage: z.string().trim().max(500).nullable(),
  })
  .superRefine((v, ctx) => {
    if (!v.caseStudyPublished) return;
    if (!v.summary) {
      ctx.addIssue({ code: "custom", path: ["summary"], message: "Add a summary before publishing" });
    }
    if (!v.content || v.content.trim().length < 300) {
      ctx.addIssue({ code: "custom", path: ["content"], message: "Write a few real paragraphs before publishing" });
    }
  });

export type CaseStudyInput = z.infer<typeof caseStudyInput>;