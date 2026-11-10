import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import {
  ExternalLink,
  FileText,
  FolderKanban,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { logoutFn } from "@/functions/auth";

const nav = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/dashboard/posts", label: "Posts", icon: FileText, exact: false },
  { to: "/dashboard/projects", label: "Projects", icon: FolderKanban, exact: false },
] as const;

export default function DashboardSidebar({
  email,
  onNavigate,
}: {
  email: string;
  onNavigate?: () => void;
}) {
  const logout = useServerFn(logoutFn);

  return (
    <div className="flex h-full flex-col bg-[#0A2B20] text-[#B8C4BB]">
      <div className="flex h-20 shrink-0 flex-col justify-center border-b border-[#25453A] px-6">
        <p className="font-serif text-2xl leading-7 text-[#F5F7EF]">codeAlchemy</p>
        <p className="font-montserrat text-[10px] uppercase tracking-[1px] text-[#D5E6B8]">
          Dashboard
        </p>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-6">
        <ul className="flex flex-col gap-1 font-montserrat text-sm">
          {nav.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                activeOptions={{ exact: item.exact }}
                onClick={onNavigate}
                className="flex items-center gap-3 rounded-[3px] px-3 py-2.5 transition-colors hover:bg-[#12372A] hover:text-[#F5F7EF] data-[status=active]:bg-[#1A3A2E] data-[status=active]:text-[#F5F7EF]"
              >
                <item.icon className="size-4.5" strokeWidth={1.5} />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="shrink-0 border-t border-[#25453A] px-3 py-4 font-montserrat text-sm">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-[3px] px-3 py-2.5 transition-colors hover:bg-[#12372A] hover:text-[#F5F7EF]"
        >
          <ExternalLink className="size-4.5" strokeWidth={1.5} />
          View site
        </a>
        <button
          type="button"
          onClick={() => logout()}
          className="flex w-full cursor-pointer items-center gap-3 rounded-[3px] px-3 py-2.5 text-left transition-colors hover:bg-[#12372A] hover:text-[#F5F7EF]"
        >
          <LogOut className="size-4.5" strokeWidth={1.5} />
          Log out
        </button>
        <p className="mt-3 truncate px-3 text-xs text-[#7E9A8B]">{email}</p>
      </div>
    </div>
  );
}