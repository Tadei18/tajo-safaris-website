// =========================================================================
// PHASE 2 — Wiring newsletter signups:
//
// 1. Add the subscriber to a mailing list (Resend Audiences, Buttondown,
//    ConvertKit, etc.). Example with Resend Audiences:
//      await resend.contacts.create({
//        email: parsed.data.email,
//        audienceId: process.env.RESEND_AUDIENCE_ID,
//        unsubscribed: false,
//      });
//
// 2. Send a double-opt-in confirmation email with a verification link.
//
// 3. Rate-limit by IP to avoid abuse.
// =========================================================================

import { NextResponse } from "next/server";
import { z } from "zod";

const Schema = z.object({
  email: z.string().email(),
});

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const parsed = Schema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Invalid email" },
      { status: 400 }
    );
  }

  console.log("[newsletter]", new Date().toISOString(), parsed.data.email);

  return NextResponse.json({ ok: true });
}
