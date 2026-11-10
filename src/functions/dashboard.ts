import { createServerFn } from "@tanstack/react-start";
import { count, desc, eq } from "drizzle-orm";
import { db } from "../db";
import { posts, projects } from "../db/schema";
import { authMiddleware } from "../server/middleware";

export const getDashboardStats = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async () => {
    const [[total], [published], [projectTotal]] = await Promise.all([
      db.select({ value: count() }).from(posts),
      db.select({ value: count() }).from(posts).where(eq(posts.published, true)),
      db.select({ value: count() }).from(projects),
    ]);

    const recent = await db
      .select({
        id: posts.id,
        title: posts.title,
        published: posts.published,
        createdAt: posts.createdAt,
      })
      .from(posts)
      .orderBy(desc(posts.createdAt))
      .limit(5);

    return {
      totalPosts: total.value,
      publishedPosts: published.value,
      draftPosts: total.value - published.value,
      projectCount: projectTotal.value,
      recent,
    };
  });