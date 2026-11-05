import type { posts } from "@/db/schema";

export type Post = typeof posts.$inferSelect;
export type RelatedPost = Pick<
  Post,
  "id" | "slug" | "title" | "excerpt" | "category" | "coverImage" | "readTime"
>;