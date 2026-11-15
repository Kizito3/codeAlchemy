import { useEffect } from "react";
import {
  HeadContent,
  Scripts,
  createRootRoute,
  useRouter,
  useRouterState,
} from "@tanstack/react-router";
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
    scripts: [
      {
        children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TFJQ3BPQ');`,
      },
    ],
  }),
  shellComponent: RootDocument,
});

function pushPageView(pathname: string) {
  const w = window as any;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({
    event: "page_view",
    page_path: pathname,
    page_location: window.location.href,
    page_title: document.title,
  });
}

function RootDocument({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isAppRoute = pathname.startsWith("/dashboard") || pathname === "/login";

  useEffect(() => {
    // first page load
    pushPageView(window.location.pathname);

    // every client-side navigation after that
    const unsubscribe = router.subscribe("onResolved", ({ pathChanged, toLocation }) => {
      if (!pathChanged) return;
      pushPageView(toLocation.pathname);
    });

    return unsubscribe;
  }, [router]);

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TFJQ3BPQ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
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