import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { posts, projects } from "../db/schema";

export const getSitemapData = createServerFn({ method: "GET" }).handler(async () => {
  const [postRows, projectRows] = await Promise.all([
    db
      .select({ slug: posts.slug, updatedAt: posts.createdAt })
      .from(posts)
      .where(eq(posts.published, true)),
    db
      .select({ slug: projects.slug, updatedAt: projects.updatedAt })
      .from(projects)
      .where(eq(projects.caseStudyPublished, true)),
  ]);
  return { posts: postRows, projects: projectRows };
});