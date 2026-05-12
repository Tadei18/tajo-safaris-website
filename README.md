# Tajo Safaris and Tours — Website

Marketing site for **Tajo Safaris and Tours**, a Kenya-based safari operator.
Tagline: _See, Encounter, Feel the Wild._

Built with Next.js 16 (App Router), TypeScript, Tailwind v4, Framer Motion,
react-hook-form + zod. v1 ships marketing pages and inquiry capture only — no
payments, no auth, no CMS yet.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in env values as needed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

All env vars are optional in v1 — the inquiry API routes log to the console and
return 200 OK. Wire these up before promoting the production deployment.

| Variable                          | Purpose                                                                |
| --------------------------------- | ---------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`            | Canonical site URL, used in metadata + sitemap.                        |
| `WHATSAPP_BUSINESS_NUMBER`        | E.164 number (no `+`) used as the WhatsApp business endpoint.          |
| `WHATSAPP_CLOUD_API_TOKEN`        | Token for sending outbound WhatsApp Cloud API messages.                |
| `WHATSAPP_PHONE_NUMBER_ID`        | Phone-number ID from your Meta Business app.                           |
| `OWNER_NOTIFICATION_EMAIL`        | Where new inquiries are emailed.                                       |
| `RESEND_API_KEY`                  | API key for [Resend](https://resend.com) outbound email.               |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`    | Set to enable [Plausible](https://plausible.io) analytics (off by default). |

See `.env.example` for the full list.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm start` — run production build
- `npm run lint` — run ESLint

## Project structure

```
src/
  app/            App Router routes + API stubs
  components/     UI components grouped by domain
  data/           Static content: tours, destinations, testimonials, guides
  lib/            Helpers, constants, JSON-LD schema
  types/          Shared TypeScript types
```

## Deploy

Vercel-ready. Set the env vars above in the Vercel project settings.
