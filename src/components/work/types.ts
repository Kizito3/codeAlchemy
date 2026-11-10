import type { projects } from "@/db/schema";

export type CaseStudy = typeof projects.$inferSelect;

export type CaseStudyCardData = {
  id: number;
  slug: string;
  title: string;
  category: string;
  image: string | null;
  coverImage: string | null;
  bgColor: string;
  summary: string | null;
};