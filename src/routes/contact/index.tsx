import { createFileRoute, Link } from "@tanstack/react-router";
import { ORG } from "#/content/about";
import ContactSection from "#/components/home/contact";
import { contactJsonLd, seoHead } from "#/lib/seo";

const TITLE = "Contact codeAlchemy | Start a Web Design Project";
const DESCRIPTION =
  "Tell us about your website project. codeAlchemy is a web design and development studio in Owerri, Nigeria. We reply within 2 working days.";

export const Route = createFileRoute("/contact/")({
  head: () =>
    seoHead({
      title: TITLE,
      description: DESCRIPTION,
      path: "/contact",
      jsonLd: contactJsonLd({
        title: TITLE,
        description: DESCRIPTION,
        path: "/contact",
        email: ORG.email,
      }),
    }),
  component: ContactPage,
});

function ContactPage() {
  const details = [
    { label: "Email", value: ORG.email, href: `mailto:${ORG.email}` },
    {
      label: "Based in",
      value: `${ORG.location.locality}, ${ORG.location.region}, ${ORG.location.country}`,
    },
    { label: "We reply", value: ORG.replyTime },
  ];

  return (
    <>
      <div className="bg-[#0A2B20] pt-8 lg:pt-12">
        <nav aria-label="Breadcrumb" className="mx-auto max-w-360 px-6 lg:px-20">
          <ol className="flex items-center gap-2 font-montserrat text-[13px] text-[#B8C4BB]">
            <li>
              <Link to="/" className="transition-colors hover:text-[#F5F7EF]">Home</Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-[#F5F7EF]">Contact</li>
          </ol>
        </nav>
      </div>

      <ContactSection as="h1" eyebrow="Contact" />

      <section className="bg-[#E9F0E3] py-12 lg:py-16">
        <div className="mx-auto max-w-360 px-6 lg:px-20">
          <dl className="grid gap-6 font-montserrat sm:grid-cols-3">
            {details.map((item) => (
              <div key={item.label}>
                <dt className="text-[11px] uppercase tracking-[1px] text-[#647466]">
                  {item.label}
                </dt>
                <dd className="mt-1.5 text-sm leading-5 text-[#123D2B]">
                  {item.href ? (
                    <a href={item.href} className="underline underline-offset-4">
                      {item.value}
                    </a>
                  ) : (
                    item.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}