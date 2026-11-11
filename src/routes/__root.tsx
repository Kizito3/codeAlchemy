import { HeadContent, Scripts, createRootRoute, useRouterState } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";

import appCss from "../styles.css?url";
import Navbar from "#/components/navbar";
import Footer from "#/components/footer";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import NavigationProgress from "#/components/navigation-progress-bar";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#E9F0E3" },
      { title: "codeAlchemy" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.png", sizes: "48x48" },
      { rel: "icon", href: "/favicon.png", type: "image/svg+xml" },
      { rel: "apple-touch-icon", href: "/images/Brand.svg" },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isAppRoute = pathname.startsWith("/dashboard") || pathname === "/login";
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <NavigationProgress />
         {!isAppRoute && <Navbar />}
        <ReactLenis root options={{ lerp: 0.1 }}>
          {children}
        </ReactLenis>
         {!isAppRoute && <Footer />}
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
