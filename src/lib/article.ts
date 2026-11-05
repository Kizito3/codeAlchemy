import { isValidElement, type ReactNode } from "react";

export type Heading = { id: string; text: string };

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

// Reads the plain text out of React children
export function getText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getText).join("");
  if (isValidElement(node)) {
    return getText((node.props as { children?: ReactNode }).children);
  }
  return "";
}

// Finds the "## " headings (skipping fenced code blocks)
export function extractHeadings(markdown: string): Heading[] {
  const headings: Heading[] = [];
  let inFence = false;

  for (const line of markdown.split("\n")) {
    if (line.trim().startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const match = /^##\s+(.+?)\s*$/.exec(line);
    if (match) {
      const text = match[1].trim();
      headings.push({ id: slugify(text), text });
    }
  }
  return headings;
}