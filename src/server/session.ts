import { getIronSession, type SessionOptions } from "iron-session";
import { getCookie, setCookie } from "@tanstack/react-start/server";

export type SessionData = { userId?: number };

const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET!, // 32+ characters
  cookieName: "app-session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
  },
};

// Adapter: lets iron-session read and write cookies through Start's helpers
export function getAppSession() {
  return getIronSession<SessionData>(
    {
      get: (name: string) => {
        const value = getCookie(name);
        return value === undefined ? undefined : { name, value };
      },
      set: (nameOrOptions: any, value?: string, options?: any) => {
        if (typeof nameOrOptions === "string") {
          setCookie(nameOrOptions, value ?? "", options);
        } else {
          setCookie(nameOrOptions.name, nameOrOptions.value, nameOrOptions);
        }
      },
    } as any,
    sessionOptions,
  );
}