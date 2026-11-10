import { db } from "#/db";
import { projects } from "#/db/schema";


const rows = [
  {
    slug: "vote-naija",
    title: "VoteNaija",
    category: "Brand direction, website design & development",
    image: "/images/vn2.png",
    mobileImage: "/images/vn2.png",
    bgColor: "#D8DDD0",
    featured: true,
    published: true,
    sortOrder: 0,
  },
  {
   slug: "stella-sync",
    title: "StellaSync",
    category: "ERM / HMS ",
    image: "/images/stellasync.png",
    mobileImage: "/images/stellasync.png",
    bgColor: "#D6DCC8",
    featured: false,
    published: true,
    sortOrder: 1,
  },
  {
     slug: "klinsheet-consulting",
    title: "Klinsheet Consulting",
    category: "Dependable Background check company",
    image: "/images/klinsheet.png",
    mobileImage: "/images/klinsheet.png",
    bgColor: "#D6CCBA",
    featured: false,
    published: true,
    sortOrder: 2,
  },
];

await db.insert(projects).values(rows).onConflictDoNothing({ target: projects.slug });
console.log(`Seeded ${rows.length} project(s)`);
process.exit(0);