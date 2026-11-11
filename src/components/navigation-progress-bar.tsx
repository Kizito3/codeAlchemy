import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";

export default function NavigationProgress() {
  const isLoading = useRouterState({ select: (s) => s.isLoading });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // wait 100ms before showing, so instant navigations don't flicker
    const timer = setTimeout(() => setVisible(isLoading), isLoading ? 100 : 250);
    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-x-0 top-0 z-60 h-0.5 overflow-hidden bg-[#DCE6D2] transition-opacity duration-200 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="h-full w-1/3 animate-[nav-progress_1s_ease-in-out_infinite] bg-[#197044]" />
    </div>
  );
}