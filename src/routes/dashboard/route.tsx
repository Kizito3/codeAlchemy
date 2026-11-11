import { useEffect, useState } from "react";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { getCurrentUserFn } from "@/functions/auth";
import DashboardSidebar from "#/components/dashboard/dashboard-sidebar";
// import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: async () => {
    const user = await getCurrentUserFn();
    if (!user) throw redirect({ to: "/login" });
    return { user };
  },
  head: () => ({
    meta: [
      { title: "Dashboard | codeAlchemy" },
      { name: "robots", content: "noindex, nofollow" },
    ],
    links: [
      { rel: "icon", href: "/favicon.png", sizes: "48x48" },
      { rel: "icon", href: "/favicon.png", type: "image/svg+xml" },
      { rel: "apple-touch-icon", href: "/images/Brand.svg" },
    ],
  }),
  component: DashboardLayout,
});

function DashboardLayout() {
  const { user } = Route.useRouteContext();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="min-h-dvh bg-[#F5F7EF] lg:pl-65">
        {/* <NavigationProgress /> */}
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-65 lg:block">
        <DashboardSidebar email={user.email} />
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#CFDAC8] bg-[#F5F7EF] px-5 lg:hidden">
        <p className="font-serif text-xl text-[#123D2B]">codeAlchemy</p>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="flex size-10 cursor-pointer items-center justify-center text-[#19382B]"
        >
          <Menu className="size-6" strokeWidth={1.5} />
        </button>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 transition-[visibility] duration-300 lg:hidden ${
          open ? "visible" : "invisible"
        }`}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <aside
          className={`absolute inset-y-0 left-0 w-72 max-w-[85%] transition-transform duration-300 ease-out ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <DashboardSidebar email={user.email} onNavigate={() => setOpen(false)} />
        </aside>
      </div>

      <main className="mx-auto max-w-6xl px-5 py-8 lg:px-10 lg:py-12">
        <Outlet />
      </main>
    </div>
  );
}