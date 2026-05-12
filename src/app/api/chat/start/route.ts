// =========================================================================
// PHASE 2 — Building this into a real chat backend:
//
// 1. Persist the session in a database (Supabase/Neon recommended):
//    - chat_sessions(id uuid pk, created_at, name, email, phone, message)
//    - chat_messages(id, session_id, direction, body, created_at)
//
// 2. Send email via Resend to OWNER_NOTIFICATION_EMAIL:
//      await resend.emails.send({
//        from: "chat@tajosafarisandtours.com",
//        to: process.env.OWNER_NOTIFICATION_EMAIL,
//        subject: `New chat — ${name}`,
//        text: `${name} <${email}>\n\n${message}\n\nReply link:
//          https://tajosafarisandtours.com/admin/chat/${sessionId}`,
//      });
//
// 3. Send a WhatsApp template message to WHATSAPP_BUSINESS_NUMBER via the
//    Cloud API, prefixed with `[#sessionId]` so the reply webhook can route
//    inbound messages back to the right widget session:
//      await fetch(`https://graph.facebook.com/v18.0/${PHONE_NUMBER_ID}/messages`, {
//        method: "POST",
//        headers: {
//          "Authorization": `Bearer ${process.env.WHATSAPP_CLOUD_API_TOKEN}`,
//          "Content-Type": "application/json",
//        },
//        body: JSON.stringify({
//          messaging_product: "whatsapp",
//          to: process.env.WHATSAPP_BUSINESS_NUMBER,
//          type: "template",
//          template: { name: "new_chat", language: { code: "en" },
//            components: [/* fields */] },
//        }),
//      });
//
// 4. For full bidirectional chat, also add:
//    - GET /api/chat/[sessionId]/messages  — list messages for a session
//    - POST /api/chat/[sessionId]/messages — guest sends a follow-up
//    - GET /api/chat/[sessionId]/stream    — SSE; pushes new messages live
//    - POST /api/whatsapp/webhook          — receive WhatsApp replies,
//      parse `[#sessionId]` prefix, persist + broadcast to SSE.
// =========================================================================

import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { z } from "zod";

const Schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
});

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = Schema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const sessionId = randomUUID();
  console.log(
    "[chat:start]",
    new Date().toISOString(),
    "session",
    sessionId,
    parsed.data
  );

  return NextResponse.json({ ok: true, sessionId });
}
