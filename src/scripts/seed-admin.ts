import { db } from "#/db";
import { users } from "#/db/schema";
import bcrypt from "bcryptjs";


const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD!, 12);
await db.insert(users).values({ email: process.env.ADMIN_EMAIL!, passwordHash: hash });
console.log("Admin created");
process.exit(0);