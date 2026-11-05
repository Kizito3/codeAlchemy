import { db } from "#/db";
import { posts } from "#/db/schema";
import { authMiddleware } from "#/server/middleware";
import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { and, desc, eq, ne } from "drizzle-orm";
import z from "zod";

const postInput = z.object({
  title: z.string().min(1).max(200),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
  excerpt: z.string().min(1).max(300),
  content: z.string().min(1),
  category: z.string().min(1),
  coverImage: z.string().nullable(),
  readTime: z.number().int().min(1),
  published: z.boolean(),
});


export const getPublishedPosts = createServerFn({method: "GET"}).handler(() => {
    db.select().from(posts).where(eq(posts.published, true)).orderBy(desc(posts.createdAt));
})

export const getPostBySlug = createServerFn({method: "GET"}).validator(z.string()).handler(async ({data: slug}) => {
    // fetch the post by slug and return it, or throw a 404 if not found or not published
    const [post] = await db.select().from(posts).where(eq(posts.slug, slug));
    if(!post || !post.published) throw notFound();
    return post;
})

export const getAllPosts = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(() => db.select().from(posts).orderBy(desc(posts.createdAt)));


export const getPostById = createServerFn({method:"GET"}).middleware([authMiddleware]).validator(z.number()).handler(async ({data: id}) => {
    const [post] = await db.select().from(posts).where(eq(posts.id, id));
    if(!post) throw notFound();
    return post;
})

export const createPost = createServerFn({method: "POST"}).middleware([authMiddleware]).validator(postInput).handler(async ({data}) => {
    const [row] = await db.insert(posts).values(data).returning({id: posts.id});
    return row;
})

export const updatePost = createServerFn({method: "POST"}).middleware([authMiddleware]).validator(z.object({id: z.number(), values: postInput})).handler(async ({data}) => {
    await db.update(posts).set(data.values).where(eq(posts.id, data.id));
    return { ok: true };
})
export const deletePost = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.number())
  .handler(async ({ data: id }) => {
    await db.delete(posts).where(eq(posts.id, id));
    return { ok: true };
  });

  export const getLatestPosts = createServerFn({ method: "GET" }).handler(() =>
  db
    .select({
      id: posts.id,
      slug: posts.slug,
      title: posts.title,
      excerpt: posts.excerpt,
      category: posts.category,
      coverImage: posts.coverImage,
      readTime: posts.readTime,
    })
    .from(posts)
    .where(eq(posts.published, true))
    .orderBy(desc(posts.createdAt))
    .limit(2),
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
      .select({
        id: posts.id,
        slug: posts.slug,
        title: posts.title,
        excerpt: posts.excerpt,
        category: posts.category,
        coverImage: posts.coverImage,
        readTime: posts.readTime,
      })
      .from(posts)
      .where(and(eq(posts.published, true), ne(posts.id, post.id)))
      .orderBy(desc(posts.createdAt))
      .limit(2);

    return { post, related };
  });