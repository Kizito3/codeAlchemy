import {
  Accessibility,
  Compass,
  MessageCircle,
  PenTool,
  Sprout,
  Zap,
  type LucideIcon,
} from "lucide-react";

export const ORG = {
  name: "codeAlchemy",
  email: "chigokizzy@gmail.com",
  location: {
    locality: "Owerri",
    region: "Imo State", // TODO: confirm this is your base
    country: "Nigeria",
    countryCode: "NG",
  },
  founded: null as number | null, // TODO: the year you started, e.g. 2023
  services: [
    "Web design",
    "Web development",
    "Brand identity",
    "Ongoing website care",
  ],
  audience: "Founders and growing businesses across Nigeria and worldwide",
  replyTime: "Within 2 working days",
  sameAs: [] as string[], // TODO: Instagram, LinkedIn, Behance profile URLs
};

export const ABOUT_META = {
  title: "About codeAlchemy | Web Design Studio in Owerri, Nigeria",
  description:
    "Meet codeAlchemy, an independent web design and development studio in Owerri, Imo State, Nigeria. Learn who we are, what we believe and how we build websites that work.",
  updated: "2026-11-08",
};

// The one-sentence answer to "what is codeAlchemy?"
export const DEFINITION =
  "codeAlchemy is an independent web design and development studio in Owerri, Imo State, Nigeria. We help founders and growing businesses across Nigeria and beyond turn ambitious ideas into fast, distinctive websites that are built to be found, trusted and maintained.";

export const INTRO = [
  "We’re a small, hands-on studio. The people you talk to at the start are the people who design, build and look after your website, so nothing gets lost in a hand-off.",
  "We work with founders, owner-led businesses and teams who believe their website should be as considered as the business behind it. Some arrive with a clear brief. Many arrive with a half-formed idea and a lot of questions. Either way, we begin with a conversation before we open a design tool.",
  "From strategy and design to development and ongoing care, everything happens under one roof, so your brand, your content and your code pull in the same direction.",
];

export const MISSION = {
  mission:
    "To help businesses build websites that work as hard as they do: clear enough to understand quickly, fast enough to keep people there and flexible enough to grow.",
  vision:
    "A web where good design is the standard rather than the exception, and where businesses of every size can have a website that is considered, accessible and built to last.",
  image: {
    src: "/images/about.jpg", // TODO: use a real photo of your workspace or team
    alt: "A bright studio workspace with a wooden table, laptops and design books",
  },
};

export type Principle = { icon: LucideIcon; title: string; text: string };

export const PRINCIPLES: Principle[] = [
  {
    icon: Compass,
    title: "Clarity first",
    text: "Every project starts with the change you want, not a list of pages. A clear direction makes every later decision easier.",
  },
  {
    icon: PenTool,
    title: "Craft in the details",
    text: "No cookie-cutter templates. We care about spacing, type, motion and the small moments that make a site feel considered.",
  },
  {
    icon: Accessibility,
    title: "Built for real people",
    text: "Readable type, clear navigation and inclusive interactions. Accessibility is part of the craft, not an afterthought.",
  },
  {
    icon: Zap,
    title: "Fast by default",
    text: "Lean builds, optimised images and restrained motion. We design for phones and variable connections, because that’s how many people browse.",
  },
  {
    icon: MessageCircle,
    title: "Honest communication",
    text: "Plain language, clear timelines and straight advice. You always know where the project stands and what comes next.",
  },
  {
    icon: Sprout,
    title: "Made to grow",
    text: "Flexible systems and a CMS that feels natural, so your website can evolve with your business instead of holding it back.",
  },
];

export const WHY = [
  {
    title: "One accountable team.",
    text: "Strategy, design, development and care sit with the same people, so decisions stay consistent from the first call to launch day.",
  },
  {
    title: "Built to be found.",
    text: "Semantic structure, structured data and fast pages are part of the build, not an add-on at the end.",
  },
  {
    title: "Evidence over adjectives.",
    text: "We help you show what makes you different through real stories, details and proof, instead of leaning on words like “premium” or “innovative”.",
  },
  {
    title: "A partner after launch.",
    text: "Ongoing care, performance reviews and updates keep your website healthy and improving long after it goes live.",
  },
];

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  image?: string;
  links: { label: string; url: string }[];
};

// TODO: add real people only. Leave empty and the section hides itself.
// Example:
// { name: "Full Name", role: "Founder & Lead Developer",
//   bio: "Two or three honest sentences about their background and what they do here.",
//   image: "/images/team/full-name.jpg",
//   links: [{ label: "LinkedIn", url: "https://www.linkedin.com/in/..." }] }
export const TEAM: TeamMember[] = [];

export type Faq = { question: string; answer: string };

export const ABOUT_FAQS: Faq[] = [
  {
    question: "Who is codeAlchemy?",
    answer:
      "codeAlchemy is an independent web design and development studio based in Owerri, Imo State, Nigeria. We design, build and look after websites for founders and growing businesses across Nigeria and worldwide.",
  },
  {
    question: "Where is codeAlchemy based, and do you work with clients elsewhere?",
    answer:
      "We’re based in Owerri, Imo State, and work with clients across Nigeria and internationally. Projects run remotely, so your location is rarely a barrier to working together.",
  },
  {
    question: "What services does codeAlchemy offer?",
    answer:
      "We offer strategy and direction, web design and identity, development and launch, and ongoing website care. That covers everything from a first discovery conversation to the long-term health of your site.",
  },
  {
    question: "How does a project with codeAlchemy start?",
    answer:
      "It starts with a conversation. Send an inquiry through the contact form or email hello@codealchemy.studio. We reply within 2 working days and then arrange a relaxed, no-pressure introduction.",
  },
  {
    question: "What makes codeAlchemy different?",
    answer:
      "We’re small by design. The people you speak to at the start are the people who design, build and support your website, so strategy, design and code stay consistent and nothing gets lost in a hand-off.",
  },
  {
    question: "Do you support websites after launch?",
    answer:
      "Yes. Our care and evolution service covers website care, performance reviews and continuous improvement, so your site stays healthy and keeps growing alongside your business.",
  },
];