import type { Faq } from "#/content/about";

export type Solution = {
  slug: string;
  label: string; // short name for cards, breadcrumbs and links
  audience: string;
  title: string; // "<service name> | codeAlchemy"
  description: string;
  h1: string;
  lede: string; // the direct answer to "what is this and who is it for?"
  scope: string;
  needsHeading: string;
  needs: { title: string; text: string }[];
  features: string[];
  why: { title: string; text: string }[];
  discovery: string[];
  relatedCaseSlug?: string; // slug of a published case study in your database
  faqs: Faq[];
  updated: string; // update when you edit the page
};

const UPDATED = "2026-11-08";

export const SOLUTIONS: Solution[] = [
  // ───────────────────────── Real estate ─────────────────────────
  {
    slug: "real-estate-website-design",
    label: "Real estate",
    audience: "Real estate companies, agents and developers",
    title: "Real Estate Website Design in Nigeria | codeAlchemy",
    description:
      "Website design and development for real estate companies in Nigeria: searchable listings, property pages and viewing requests, built to be found on Google.",
    h1: "Real estate websites that turn searches into viewings.",
    lede: "codeAlchemy designs and builds official websites for real estate companies, agents and developers in Nigeria. We focus on what actually produces enquiries: clear listings, fast property pages, trustworthy details and an easy way to request a viewing.",
    scope: "Design, development, listings system, SEO foundations and launch support",
    needsHeading: "What a real estate website has to do.",
    needs: [
      {
        title: "Make listings easy to search",
        text: "Buyers and renters think in locations, budgets and bedrooms. Filters and clear listing cards help them find a match in seconds instead of scrolling.",
      },
      {
        title: "Build trust before the first call",
        text: "Property is a high-stakes decision. Clear company details, real photography and transparent listing information help people feel safe reaching out.",
      },
      {
        title: "Work well on a phone",
        text: "A large share of browsing in Nigeria happens on phones, often on variable connections. Property pages need to load quickly even with many images.",
      },
      {
        title: "Make the next step obvious",
        text: "Call, WhatsApp, request a viewing or send an enquiry. Every property page should offer one clear way to take the next step.",
      },
    ],
    features: [
      "Searchable listings with filters for location, price, property type and bedrooms",
      "Property pages with galleries, key facts, a map and a clear enquiry form",
      "Call, WhatsApp and viewing-request buttons on every listing",
      "A dashboard where your team adds, edits and unpublishes listings without a developer",
      "A page for every listing and location, structured so search engines can index them",
      "Image optimisation so galleries stay fast on mobile",
    ],
    why: [
      {
        title: "Built around enquiries, not decoration",
        text: "We design every page around the action you want: a call, a WhatsApp message or a viewing request.",
      },
      {
        title: "Listings you can manage yourself",
        text: "We build the admin tools so your team can publish and update properties without waiting on us.",
      },
      {
        title: "SEO built into the structure",
        text: "Clean URLs, structured data and fast pages for every listing and location, so your properties can be found by the people searching for them.",
      },
      {
        title: "One team from strategy to support",
        text: "The people who plan, design and build your site also look after it once it’s live.",
      },
    ],
    discovery: [
      "What kinds of property do you sell, rent or manage, and who buys or rents them?",
      "How do enquiries reach your team today, and what slows them down?",
      "Which locations and price ranges matter most to the business?",
      "Who will keep the listings up to date once the site is live?",
    ],
    relatedCaseSlug: "forma-studio",
    faqs: [
      {
        question: "How much does a real estate website cost?",
        answer:
          "It depends on the number of listings, the features you need (such as search filters, maps or an admin dashboard) and the content you already have. After a first conversation about your goals, we share a clear range before any work begins.",
      },
      {
        question: "Can we add and edit property listings ourselves?",
        answer:
          "Yes. We build a dashboard so your team can add, edit, publish and unpublish listings, including photos and key details, without a developer.",
      },
      {
        question: "Can the website connect to WhatsApp?",
        answer:
          "Yes. We can add WhatsApp buttons that open a chat with a pre-filled message about the property, alongside call and form options.",
      },
      {
        question: "Will our listings show up on Google?",
        answer:
          "We build the technical foundations that help: clean URLs, fast pages, structured data and a page for each listing. Rankings also depend on competition and content, so nobody can honestly guarantee a position.",
      },
    ],
    updated: UPDATED,
  },

  // ───────────────────────── Interior decor ─────────────────────────
  {
    slug: "interior-decor-website-design",
    label: "Interior decor",
    audience: "Interior decor and design companies",
    title: "Interior Decor Website Design in Nigeria | codeAlchemy",
    description:
      "Website design for interior decor and design companies in Nigeria: image-led portfolios, project stories and enquiry forms that bring in the right clients.",
    h1: "Websites as considered as the interiors you create.",
    lede: "codeAlchemy designs official websites for interior decor and design businesses in Nigeria. We build image-led, fast-loading sites that show your style clearly, present projects as stories and make it easy for the right clients to start a conversation.",
    scope: "Design, development, project gallery, enquiry flow, SEO foundations and launch support",
    needsHeading: "What an interior decor website has to do.",
    needs: [
      {
        title: "Show your taste, quickly",
        text: "Visitors decide within seconds whether your style matches theirs. Strong imagery, generous space and a restrained layout let the work speak.",
      },
      {
        title: "Present projects as stories",
        text: "The brief, the materials, the before and after, the result. Context turns a gallery of pretty pictures into a portfolio that persuades.",
      },
      {
        title: "Stay fast with heavy imagery",
        text: "Photography is the product here, and it’s also the main reason sites feel slow. Images need careful optimisation so the page stays light.",
      },
      {
        title: "Qualify enquiries",
        text: "A short brief form (type of space, budget range, timeline) saves time on both sides and helps you reply with something useful.",
      },
    ],
    features: [
      "A project gallery with full-width imagery and individual project pages",
      "Before-and-after and process sections for selected work",
      "Service pages for residential, commercial and styling work",
      "A consultation or quote request form that captures the essentials",
      "Links to your Instagram and Pinterest that sit alongside your own site",
      "A dashboard to add new projects and photos as you finish them",
    ],
    why: [
      {
        title: "We design with images first",
        text: "Our own work is built around strong visuals, and we know how to let photography lead without slowing the page down.",
      },
      {
        title: "Projects structured to be found",
        text: "Each project can have its own page with descriptive text and image alt text, so your work can be discovered through search, not only on social media.",
      },
      {
        title: "A home you control",
        text: "Social platforms change their rules. A site you own gives your best work a permanent home and a direct route to enquiries.",
      },
      {
        title: "Easy to update",
        text: "Finish a project, add it yourself. We build the tools so your portfolio can keep growing without a developer.",
      },
    ],
    discovery: [
      "What style or kind of client do you want more of?",
      "Which finished projects best represent where you want the business to go?",
      "Do you have professional photography, or should we plan for it?",
      "How do clients usually first reach you, and what do you need to know before a consultation?",
    ],
    relatedCaseSlug: "forma-studio",
    faqs: [
      {
        question: "Do we need professional photos before the website?",
        answer:
          "Professional photography makes the biggest difference to an interior decor site. We can design with what you have and structure the pages so new images drop in easily, and we recommend starting with your strongest eight to twelve projects.",
      },
      {
        question: "Can we show our Instagram work on the site?",
        answer:
          "We can link and highlight your social profiles. We recommend keeping your best projects on the site itself, so they’re permanent, fast and indexed by search engines.",
      },
      {
        question: "Can clients request a quote online?",
        answer:
          "Yes. A short enquiry form can collect the type of space, budget range and timeline, and send it straight to your inbox.",
      },
      {
        question: "Will the site stay fast with so many images?",
        answer:
          "We optimise and size images for every screen, load them as people scroll and keep the pages lean, so the site stays quick without losing visual quality.",
      },
    ],
    updated: UPDATED,
  },

  // ───────────────────────── E-commerce ─────────────────────────
  {
    slug: "ecommerce-website-development",
    label: "E-commerce",
    audience: "Online stores and retail brands",
    title: "E-commerce Website Development in Nigeria | codeAlchemy",
    description:
      "E-commerce website development in Nigeria: fast product pages, simple checkout, payment integration and an admin you can run, built for mobile shoppers.",
    h1: "Online stores built to sell on every screen.",
    lede: "codeAlchemy designs and develops e-commerce websites for businesses in Nigeria: clear product pages, a simple checkout, payment integration and an admin you can run day to day. We build for the way customers here actually shop and pay.",
    scope: "Design, development, catalogue and checkout, payment integration, SEO foundations and launch support",
    needsHeading: "What an online store has to do.",
    needs: [
      {
        title: "Make products easy to trust",
        text: "Clear photos, honest descriptions, delivery details and a visible returns policy give first-time buyers the confidence to order.",
      },
      {
        title: "Keep checkout short",
        text: "Every extra step or field loses customers. A short checkout with clear totals and no surprises converts better.",
      },
      {
        title: "Accept the payments people use",
        text: "Cards, bank transfers and other local options through providers such as Paystack or Flutterwave, so customers can pay the way they prefer.",
      },
      {
        title: "Load fast on mobile",
        text: "Most shoppers are on phones. Product pages need optimised images and lean code so they open quickly on variable connections.",
      },
    ],
    features: [
      "A product catalogue with categories, variants, stock levels and search",
      "A cart and checkout with payment integration (for example Paystack or Flutterwave)",
      "Delivery options and fees by location, with optional WhatsApp ordering for chat-led sales",
      "An admin dashboard for products, orders and customers",
      "Order confirmation emails and order status tracking",
      "Product structured data and clean URLs so products can appear in search results",
    ],
    why: [
      {
        title: "Built for how people pay here",
        text: "We plan the checkout around local payment habits and delivery realities, not a template designed for another market.",
      },
      {
        title: "Speed treated as a feature",
        text: "Fast pages mean fewer abandoned carts. We optimise images, keep code lean and test on phones.",
      },
      {
        title: "Search-ready product pages",
        text: "Clean structure, descriptive content and structured data give your products a fair chance of being found.",
      },
      {
        title: "A store you can run yourself",
        text: "We build the admin around your daily routine: adding products, updating stock and handling orders.",
      },
    ],
    discovery: [
      "What do you sell today, and how many products will be on the store at launch?",
      "How do customers currently order and pay, and where do they drop off?",
      "How will you handle delivery, returns and stock?",
      "Who will manage products and orders day to day?",
    ],
    relatedCaseSlug: "verdant-rituals",
    faqs: [
      {
        question: "Which payment providers can you integrate?",
        answer:
          "We can integrate providers such as Paystack and Flutterwave, which support cards, bank transfers and other local options. The right choice depends on your business and the fees you prefer.",
      },
      {
        question: "Do you build on a platform like Shopify, or custom?",
        answer:
          "It depends on the business. For some, an existing platform is the quickest, most cost-effective route. For others, a custom build gives more control over the experience and running costs. We’ll recommend what fits after hearing your goals.",
      },
      {
        question: "Can we manage products and orders ourselves?",
        answer:
          "Yes. The admin lets your team add and edit products, update stock, manage orders and handle customers without a developer.",
      },
      {
        question: "Will the store be fast on mobile?",
        answer:
          "We optimise images, keep pages lean and test on phones throughout the build, because that’s where most customers browse.",
      },
    ],
    updated: UPDATED,
  },

  // ───────────────────────── Hotel website ─────────────────────────
  {
    slug: "hotel-website-design",
    label: "Hotels",
    audience: "Hotels, guesthouses and short-stay properties",
    title: "Hotel Website Design in Nigeria | codeAlchemy",
    description:
      "Hotel website design in Nigeria: room pages, direct booking or enquiry flows and local SEO, built to turn visitors into guests.",
    h1: "Hotel websites that win direct bookings.",
    lede: "codeAlchemy designs and builds official websites for hotels, guesthouses and short-stay properties in Nigeria. We create a calm, image-led site that presents your rooms well, answers guests’ questions and makes it easy to book or enquire directly.",
    scope: "Design, development, room pages, booking or enquiry flow, SEO foundations and launch support",
    needsHeading: "What a hotel website has to do.",
    needs: [
      {
        title: "Sell the stay, not just the rooms",
        text: "Photography, atmosphere, location and what’s nearby help a guest imagine themselves there before they book.",
      },
      {
        title: "Make booking effortless",
        text: "A direct booking or a simple enquiry, with as few steps as possible. Every extra click loses a guest.",
      },
      {
        title: "Answer questions before guests ask",
        text: "Rates, check-in times, amenities, policies and how to get there. Clear answers reduce calls and build confidence.",
      },
      {
        title: "Reduce reliance on third-party platforms",
        text: "Direct bookings can reduce the commission you pay to booking platforms, and they put the guest relationship in your hands.",
      },
    ],
    features: [
      "Room and suite pages with galleries, amenities and rates",
      "Online booking with availability, or a streamlined enquiry form to begin with",
      "Online deposit or payment integration (for example Paystack or Flutterwave)",
      "Location, nearby attractions and directions with an embedded map",
      "Pages for dining, events and facilities",
      "Structured data for hotels and local search, plus guidance on your Google Business Profile",
    ],
    why: [
      {
        title: "Designed around the guest journey",
        text: "From discovering the property to confirming a stay, we shape every page around what a guest needs to decide.",
      },
      {
        title: "Start simple, grow into a booking engine",
        text: "We can begin with a clean enquiry flow and add live availability and payments when you’re ready, so you don’t pay for complexity you don’t need yet.",
      },
      {
        title: "Built to be found locally",
        text: "Fast pages, clear structure and local search foundations help guests searching for a stay in your area find you.",
      },
      {
        title: "One team for the site and the systems behind it",
        text: "If you later need a system to manage reservations, rooms and staff, we can build that too and connect it to your website.",
      },
    ],
    discovery: [
      "How do guests currently find and book you, and which channels cost you the most?",
      "What makes a stay with you different from the competition nearby?",
      "Do you need live availability now, or is an enquiry flow enough to begin?",
      "Who handles bookings and replies, and how quickly?",
    ],
    relatedCaseSlug: "still-house",
    faqs: [
      {
        question: "Can guests book directly on the website?",
        answer:
          "Yes. Depending on your needs and budget, we build either live booking with availability or an enquiry-based flow that your team confirms. Many properties start with enquiries and add live booking later.",
      },
      {
        question: "Can the site take online payments or deposits?",
        answer:
          "Yes. We can integrate a payment provider such as Paystack or Flutterwave so guests can pay a deposit or the full amount online.",
      },
      {
        question: "Do you also build hotel management systems?",
        answer:
          "Yes. We build custom hotel management systems for reservations, rooms, billing and staff, and can connect them to your website.",
      },
      {
        question: "Will the website help us rank on Google?",
        answer:
          "We build fast, well-structured pages with local search foundations, and guide you on your Google Business Profile. Rankings also depend on competition and content, so no one can honestly guarantee a position.",
      },
    ],
    updated: UPDATED,
  },

  // ───────────────────────── Hotel management system ─────────────────────────
  {
    slug: "hotel-management-system-development",
    label: "Hotel management systems",
    audience: "Hotels, guesthouses and resorts",
    title: "Hotel Management System Development in Nigeria | codeAlchemy",
    description:
      "Custom hotel management system development in Nigeria: reservations, rooms, check-in, billing and reports in one web-based system your staff can use.",
    h1: "Hotel management software built around how your hotel runs.",
    lede: "codeAlchemy designs and develops custom hotel management systems for hotels and guesthouses in Nigeria: reservations, room inventory, check-in and check-out, billing and reporting in one web-based system your staff can learn quickly.",
    scope: "Discovery, system design, development, staff training and launch support",
    needsHeading: "What a hotel management system has to do.",
    needs: [
      {
        title: "Keep reservations and rooms accurate",
        text: "One clear view of who is booked where, so double bookings and missed arrivals stop being a daily risk.",
      },
      {
        title: "Make the front desk faster",
        text: "Guest details, check-in and check-out, and the status of every room at a glance, so staff spend less time searching and more time with guests.",
      },
      {
        title: "Track money clearly",
        text: "Invoices, receipts, payments and outstanding balances recorded in one place, so the books match what happened at the desk.",
      },
      {
        title: "Show how the business is doing",
        text: "Occupancy and revenue reports that help you make decisions with real numbers, not guesses.",
      },
    ],
    features: [
      "A reservations calendar with room availability and rate management",
      "Guest records with a simple check-in and check-out workflow",
      "Room status tracking for housekeeping and maintenance",
      "Invoices, receipts and payment recording",
      "Staff accounts with roles and permissions",
      "Reports for occupancy and revenue, with an optional link to your website’s booking form",
    ],
    why: [
      {
        title: "We start by asking whether you need custom software at all",
        text: "Off-the-shelf systems suit many hotels. We’ll tell you plainly if one fits better than a custom build, and we build only when it clearly serves you.",
      },
      {
        title: "Built around your workflow",
        text: "We study how your team actually works before designing a single screen, so the system fits your routine instead of forcing a new one.",
      },
      {
        title: "Delivered in phases",
        text: "We can launch the essentials first, such as reservations and check-in, then add billing, reports and other modules once your team is comfortable.",
      },
      {
        title: "Web-based, with support after launch",
        text: "It runs in a browser with staff accounts and permissions, so there’s nothing to install, and we stay on hand to fix, improve and extend it.",
      },
    ],
    discovery: [
      "How do you manage reservations and room status today, and what goes wrong?",
      "How many rooms and staff will use the system, and in what roles?",
      "Which processes matter most first: reservations, billing, housekeeping or reporting?",
      "Do you need it connected to a website, a payment provider or other tools, and how should guest data be protected and backed up?",
    ],
    relatedCaseSlug: "still-house",
    faqs: [
      {
        question: "Why build a custom system instead of buying one?",
        answer:
          "Existing systems work well for many hotels, and we’ll say so if one fits. A custom system makes sense when your workflow, billing or reporting doesn’t fit standard software, or when you want one system connected to your own website.",
      },
      {
        question: "How long does it take to build?",
        answer:
          "It depends on scope. A focused first version covering reservations and check-in is much quicker than a complete system, which is why we recommend launching in phases and adding modules over time.",
      },
      {
        question: "Can the system connect to our website?",
        answer:
          "Yes. We can connect the system to your public website so enquiries or bookings reach your reservations calendar, depending on the scope we agree.",
      },
      {
        question: "Can staff use it on tablets and phones?",
        answer:
          "It’s web-based, so it works in a modern browser on desktops and tablets, and we design the main screens to work well on phones too.",
      },
    ],
    updated: UPDATED,
  },

  // ───────────────────────── Portfolio ─────────────────────────
  {
    slug: "portfolio-website-design",
    label: "Portfolios",
    audience: "Creatives, architects, photographers and independent professionals",
    title: "Portfolio Website Design in Nigeria | codeAlchemy",
    description:
      "Portfolio website design in Nigeria for creatives and professionals: fast, distinctive sites with case study pages that help the right people find and hire you.",
    h1: "A portfolio that does your best work justice.",
    lede: "codeAlchemy designs and builds portfolio websites for creatives, architects, photographers, developers and independent professionals in Nigeria. We build fast, distinctive sites that present your work clearly, tell the story behind it and make it easy for the right people to hire you.",
    scope: "Design, development, case study pages, SEO foundations and launch support",
    needsHeading: "What a portfolio website has to do.",
    needs: [
      {
        title: "Show your best work first",
        text: "Visitors skim. A handful of strong projects presented well beats a long list of everything you’ve ever done.",
      },
      {
        title: "Explain the thinking, not just the result",
        text: "Context, process and outcome are what make a portfolio persuasive. A case study shows how you work, not only what you made.",
      },
      {
        title: "Be found by your name and your craft",
        text: "Someone searching for you, or for your service in your city, should land on your site and find clear, descriptive pages.",
      },
      {
        title: "Make contact effortless",
        text: "A clear description of what you do, who you do it for and one simple way to get in touch.",
      },
    ],
    features: [
      "A project grid with individual case study pages for selected work",
      "An about page that builds credibility with your story and background",
      "Fast image handling so large work samples don’t slow the page",
      "A contact or booking form, plus links to your profiles",
      "Clean structure and metadata so your name and services can be found in search",
      "A dashboard to add new projects yourself as your career grows",
    ],
    why: [
      {
        title: "We build case study pages ourselves",
        text: "Our own site is structured around case studies, so we know how to present work in a way that builds trust and can be found.",
      },
      {
        title: "A design that’s yours, not a template",
        text: "A portfolio should feel like you. We design a distinct identity rather than dropping your work into a stock layout.",
      },
      {
        title: "Built for search, not just for looks",
        text: "Structured pages, descriptive text and fast loading give your work a fair chance of being found.",
      },
      {
        title: "Grows with you",
        text: "Add new projects yourself whenever you finish something, without needing a developer for every update.",
      },
    ],
    discovery: [
      "Who do you most want to hire you, and what do they need to see?",
      "Which five or six projects best show where you want your work to go?",
      "What should someone searching for you, or for your service, find?",
      "How do you want people to contact or book you?",
    ],
    relatedCaseSlug: "forma-studio",
    faqs: [
      {
        question: "How many projects should a portfolio include?",
        answer:
          "Fewer, better. The strongest six to twelve projects, each with context, usually do more than a long archive. We’ll help you choose and structure them.",
      },
      {
        question: "Do I need a custom website, or is a template enough?",
        answer:
          "A template is fine to start with. A custom site helps when you want a distinct identity, better speed and more control over how your work is found.",
      },
      {
        question: "Can I update the portfolio myself?",
        answer:
          "Yes. We build a simple dashboard so you can add and edit projects, text and images without a developer.",
      },
      {
        question: "Can you help write the project descriptions?",
        answer:
          "We can help structure your write-ups and guide what to say. The strongest case studies come from your own account of the work, so we’ll shape it with you.",
      },
    ],
    updated: UPDATED,
  },
];

export const getSolution = (slug: string) => SOLUTIONS.find((s) => s.slug === slug);