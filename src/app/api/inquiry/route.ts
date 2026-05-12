// =========================================================================
// PHASE 2 — Wiring this up for production:
//
// 1. Persist the inquiry to a database (Supabase or Neon recommended).
//    - Columns: id, created_at, payload jsonb, source, status (new|read|won|lost).
//
// 2. Send email notification via Resend:
//      import { Resend } from "resend";
//      const resend = new Resend(process.env.RESEND_API_KEY);
//      await resend.emails.send({
//        from: "inquiries@tajosafarisandtours.com",
//        to: process.env.OWNER_NOTIFICATION_EMAIL,
//        subject: `New inquiry — ${payload.fullName}`,
//        text: JSON.stringify(payload, null, 2),
//      });
//
// 3. Send WhatsApp notification via the WhatsApp Cloud API to
//    WHATSAPP_BUSINESS_NUMBER. Use a pre-approved template message.
//
// 4. (Optional) Confirmation email to the inquirer with a copy of what they
//    sent plus the team's expected response time.
//
// 5. Rate-limit by IP (e.g. upstash/ratelimit) to avoid spam.
// =========================================================================

import { NextResponse } from "next/server";
import { z } from "zod";

const Schema = z.object({
  // Multi-step form (contact page) payload
  primaryMonth: z.string().optional(),
  alternateMonth: z.string().optional(),
  duration: z.string().optional(),
  adults: z.coerce.number().optional(),
  children: z.coerce.number().optional(),
  interests: z.array(z.string()).optional(),
  style: z.string().optional(),
  budgetUsd: z.coerce.number().optional(),
  fullName: z.string().optional(),
  email: z.string().email().optional(),
  country: z.string().optional(),
  phone: z.string().optional(),
  notes: z.string().optional(),

  // Tour sidebar inquiry payload
  name: z.string().optional(),
  month: z.string().optional(),
  group: z.string().optional(),
  tourSlug: z.string().optional(),

  source: z.string().optional(),
});

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON" },
      { status: 400 }
    );
  }

  const parsed = Schema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  // v1 stub: log to server console; production will persist + notify.
  console.log("[inquiry]", new Date().toISOString(), parsed.data);

  return NextResponse.json({ ok: true });
}
