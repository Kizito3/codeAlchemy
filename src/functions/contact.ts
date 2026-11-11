import { createServerFn } from "@tanstack/react-start";
import { and, count, eq, gt } from "drizzle-orm";
import { db } from "../db";
import { inquiries } from "../db/schema";
import { contactInput, type ContactInput } from "../lib/contact-schema";

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

async function sendNotification(data: ContactInput): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("Contact email not configured: set RESEND_API_KEY and CONTACT_TO_EMAIL");
    return false;
  }
  const from = process.env.CONTACT_FROM_EMAIL || "codeAlchemy <onboarding@resend.dev>";

  const rows: [string, string][] = [
    ["Name", data.name],
    ["Email", data.email],
    ["Company / website", data.company || "-"],
    ["Services", data.services.join(", ")],
    ["Budget", data.budget],
    ["Timeline", data.timeline || "-"],
  ];

  const text = [...rows.map(([k, v]) => `${k}: ${v}`), "", "Message:", data.message].join("\n");

  const html = `<div style="font-family:Arial,sans-serif;max-width:600px;color:#19382B">
<h2 style="margin:0 0 16px">New website inquiry</h2>
<table style="border-collapse:collapse;width:100%">
${rows
  .map(
    ([k, v]) =>
      `<tr><td style="padding:8px 16px 8px 0;color:#647466;vertical-align:top;white-space:nowrap">${esc(k)}</td><td style="padding:8px 0">${esc(v)}</td></tr>`,
  )
  .join("")}
</table>
<h3 style="margin:24px 0 8px">Message</h3>
<p style="white-space:pre-wrap;line-height:1.6;margin:0">${esc(data.message)}</p>
<p style="margin-top:24px;color:#647466;font-size:13px">Hit reply to respond directly to ${esc(data.name)}.</p>
</div>`;

  const company = oneLine(data.company).slice(0, 60);
  const subject = `New inquiry from ${oneLine(data.name)}${company ? ` (${company})` : ""}`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject,
        html,
        text,
      }),
    });

    if (!res.ok) {
      console.error("Resend error:", res.status, await res.text());
      return false;
    }
    return true;
  } catch (e) {
    console.error("Resend request failed:", e);
    return false;
  }
}

export const submitContact = createServerFn({ method: "POST" })
  .validator(contactInput)
  .handler(async ({ data }) => {
    // Bots fill the hidden field. Pretend it worked and drop it.
    if (data.trap) return { ok: true as const };

    const email = data.email.toLowerCase();
    let id: number | null = null;

    try {
      // basic rate limit: 3 inquiries per email address per hour
      const since = new Date(Date.now() - 60 * 60 * 1000);
      const [recent] = await db
        .select({ value: count() })
        .from(inquiries)
        .where(and(eq(inquiries.email, email), gt(inquiries.createdAt, since)));

      if (recent.value >= 3) {
        return {
          ok: false as const,
          error: "You’ve sent a few inquiries already. Please give us a little time to reply.",
        };
      }

      const [row] = await db
        .insert(inquiries)
        .values({
          name: data.name,
          email,
          company: data.company || null,
          services: data.services,
          budget: data.budget,
          timeline: data.timeline || null,
          message: data.message,
        })
        .returning({ id: inquiries.id });
      id = row.id;
    } catch (e) {
      console.error("Saving inquiry failed:", e);
    }

    const emailed = await sendNotification({ ...data, email });

    if (id && emailed) {
      try {
        await db.update(inquiries).set({ emailSent: true }).where(eq(inquiries.id, id));
      } catch {
        /* not critical */
      }
    }

    // if either the database or the email worked, you have the inquiry
    if (!id && !emailed) {
      return {
        ok: false as const,
        error: "We couldn’t send that just now. Please email us directly instead.",
      };
    }

    return { ok: true as const };
  });