import { createServerFn } from "@tanstack/react-start";
import { notFound } from "@tanstack/react-router";
import { and, desc, eq, ne } from "drizzle-orm";
import { z } from "zod";
import { db } from "../db";
import { posts } from "../db/schema";
import { postInput } from "../lib/post-schema";
import { authMiddleware } from "../server/middleware";

const cardColumns = {
  id: posts.id,
  slug: posts.slug,
  title: posts.title,
  excerpt: posts.excerpt,
  category: posts.category,
  coverImage: posts.coverImage,
  readTime: posts.readTime,
  createdAt: posts.createdAt,
};

const duplicateSlug = {
  ok: false as const,
  field: "slug",
  error: "That slug is already used by another post.",
};

// ---------- Public ----------
export const getPublishedPosts = createServerFn({ method: "GET" }).handler(() =>
  db
    .select(cardColumns)
    .from(posts)
    .where(eq(posts.published, true))
    .orderBy(desc(posts.createdAt)),
);

export const getLatestPosts = createServerFn({ method: "GET" }).handler(() =>
  db
    .select(cardColumns)
    .from(posts)
    .where(eq(posts.published, true))
    .orderBy(desc(posts.createdAt))
    .limit(3),
);

export const getPostPage = createServerFn({ method: "GET" })
  .validator(z.string())
  .handler(async ({ data: slug }) => {
    const [post] = await db
      .select()
      .from(posts)
      .where(and(eq(posts.slug, slug), eq(posts.published, true)));
    if (!post) throw notFound();

    const related = await db
      .select(cardColumns)
      .from(posts)
      .where(and(eq(posts.published, true), ne(posts.id, post.id)))
      .orderBy(desc(posts.createdAt))
      .limit(2);

    return { post, related };
  });

// ---------- Admin (auth required) ----------
export const getAllPosts = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(() =>
    db
      .select({
        id: posts.id,
        slug: posts.slug,
        title: posts.title,
        category: posts.category,
        readTime: posts.readTime,
        published: posts.published,
        createdAt: posts.createdAt,
      })
      .from(posts)
      .orderBy(desc(posts.createdAt)),
  );

export const getPostById = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator(z.number().int())
  .handler(async ({ data: id }) => {
    const [post] = await db.select().from(posts).where(eq(posts.id, id));
    if (!post) throw notFound();
    return post;
  });

export const createPost = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(postInput)
  .handler(async ({ data }) => {
    try {
      const [row] = await db.insert(posts).values(data).returning({ id: posts.id });
      return { ok: true as const, id: row.id };
    } catch (e: any) {
      if (e?.cause?.code === "23505") return duplicateSlug;
      throw e;
    }
  });

export const updatePost = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ id: z.number().int(), values: postInput }))
  .handler(async ({ data }) => {
    try {
      await db.update(posts).set(data.values).where(eq(posts.id, data.id));
      return { ok: true as const };
    } catch (e: any) {
      if (e?.cause?.code === "23505") return duplicateSlug;
      throw e;
    }
  });

export const setPublished = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ id: z.number().int(), published: z.boolean() }))
  .handler(async ({ data }) => {
    await db.update(posts).set({ published: data.published }).where(eq(posts.id, data.id));
    return { ok: true as const };
  });

export const deletePost = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.number().int())
  .handler(async ({ data: id }) => {
    await db.delete(posts).where(eq(posts.id, id));
    return { ok: true as const };
  });