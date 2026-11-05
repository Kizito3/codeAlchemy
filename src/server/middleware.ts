import { createMiddleware } from "@tanstack/react-start";
import { getAppSession } from "./session";

export const authMiddleware = createMiddleware({ type: "function" }).server(
  async ({ next }) => {
    const session = await getAppSession();
    if (!session.userId) throw new Error("Unauthorized");
    return next({ context: { userId: session.userId } });
  },
);