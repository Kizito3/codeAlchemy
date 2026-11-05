import {
  boolean, integer, pgTable, serial, text, timestamp,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
});

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(), // markdown
  category: text("category").notNull(),
  coverImage: text("cover_image"),
  coverCaption: text("cover_caption"),
sectionLabel: text("section_label"),
  readTime: integer("read_time").notNull().default(5),
  published: boolean("published").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  description: text("description"),
  challenge: text("challenge"),
  solution: text("solution"),
  image: text("image"),
  url: text("url"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  tags: text("tags").array().notNull().default([]),
  sortOrder: integer("sort_order").notNull().default(0),
});