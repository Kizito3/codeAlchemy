import { createServerFn } from "@tanstack/react-start";
import { redirect } from "@tanstack/react-router";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "../db";
import { users } from "../db/schema";
import { getAppSession } from "../server/session";

export const loginFn = createServerFn({ method: "POST" })
// validate the input data using zod
  .validator(
    z.object({ email: z.string().email(), password: z.string().min(1) }),
  ).handler(async ({ data }: { data: { email: string; password: string } }) => {
    // check if the user exists and the password is correct
    const [user] = await db.select().from(users).where(eq(users.email, data.email));
    // if the user doesn't exist or the password is incorrect, return an error
    const valid = user && (await bcrypt.compare(data.password, user.passwordHash));
    if (!valid) return { error: "Invalid email or password" };
    // create session after successful login and redirect to the home page
    const session = await getAppSession();
    session.userId = user.id;
    await session.save(); // must save before redirecting
    throw redirect({ to: "/" });
})
export const logoutFn = createServerFn({method: "POST"}).handler(async () => {
    const session = await getAppSession();
    if (!session.userId) throw new Error("Unauthorized");
    session.destroy();
    return redirect({to: "/"});
})

export const getCurrentUserFn = createServerFn({method: "GET"}).handler(async () => {
    const session = await getAppSession();
    if(!session.userId) return null;
    const [user] = await db.select({ id: users.id, email: users.email }).from(users).where(eq(users.id, session.userId));
    return user ?? null;
})