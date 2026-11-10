import { useState } from "react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowUpRight } from "lucide-react";
import { getCurrentUserFn, loginFn } from "@/functions/auth";

export const Route = createFileRoute("/login")({
  beforeLoad: async () => {
    const user = await getCurrentUserFn();
    if (user) throw redirect({ to: "/dashboard" });
  },
  head: () => ({
    meta: [
      { title: "Sign in | codeAlchemy" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: LoginPage,
});

const fieldClass =
  "h-13 w-full border border-[#CCD7C6] bg-white px-4 font-montserrat text-sm text-[#19382B] placeholder:text-[#7E9A8B] transition-colors focus:border-[#197044] focus:outline-none";

function LoginPage() {
  const login = useServerFn(loginFn);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setPending(true);
    try {
      const res = await login({ data: { email, password } });
      if (res?.error) setError(res.error);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setPending(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#E9F0E3] px-6">
      <div className="w-full max-w-100">
        <div className="flex items-center gap-2.5 font-montserrat">
          <span className="size-1.5 bg-[#197044]"></span>
          <p className="text-[11px] uppercase tracking-[1px] text-[#197044]">
            Studio dashboard
          </p>
        </div>
        <h1 className="mt-5 text-[44px] leading-12 text-[#123D2B]">Welcome back.</h1>

        <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-5">
          <div>
            <label htmlFor="email" className="mb-2.5 block font-montserrat text-[13px] text-[#19382B]">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-2.5 block font-montserrat text-[13px] text-[#19382B]">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={fieldClass}
            />
          </div>

          {error && (
            <p role="alert" className="font-montserrat text-sm text-[#B3261E]">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="mt-2 inline-flex h-13 w-fit cursor-pointer items-center gap-8 rounded-[3px] bg-[#123D2B] pl-5.75 pr-6 font-montserrat text-sm text-[#F5F7EF] transition-colors hover:bg-[#19382B] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? "Signing in…" : "Sign in"}
            <ArrowUpRight className="size-4" strokeWidth={1.5} />
          </button>
        </form>
      </div>
    </main>
  );
}