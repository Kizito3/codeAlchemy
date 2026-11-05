import { db } from "#/db";
import { posts } from "#/db/schema";


const newPosts = [
  {
    slug: "before-the-pixels",
    title: "Before the pixels: asking better questions.",
    excerpt:
      "The conversations that turn a website brief into a clear creative direction.",
    category: "Strategy",
    coverImage: null,
    readTime: 6,
    published: true,
    content: `
## Start with the why

Every good website begins long before the first pixel. Before we open a design tool, we ask a few simple questions.

### What are we really building?

- Who is this for?
- What should they do when they arrive?
- What does success look like in six months?

## Listen first

The best answers rarely come from the first conversation. They come from the third, once the obvious ideas have been said out loud and set aside.

> Good design starts with good questions.

That's the whole idea. Everything else follows from it.
`.trim(),
  },
  {
    slug: "a-quieter-web",
    title: "A quieter web can make a louder impression.",
    excerpt:
      "Why restraint, rhythm and a little breathing room help a brand stand apart.",
    category: "Design",
    coverImage: null,
    readTime: 4,
    published: true,
    content: `
## Less, but better

Restraint is a design decision. White space, a calm type scale and a few well-chosen colours say more than a crowded page ever could.
`.trim(),
  },
];

await db.insert(posts).values(newPosts).onConflictDoNothing({ target: posts.slug });

console.log(`Seeded ${newPosts.length} post(s)`);
process.exit(0);