# Whole Body Earth

The Whole Body Earth portal and its five pillar journeys, built with Next.js App Router and designed to deploy on Vercel.

## Engineering baseline

- Next.js 16 App Router with a single `src/proxy.ts` entry for Supabase session refresh.
- Shared navigation, tokens, and pillar-aware components. Individual pillar content is organized under `src/app/pillars/*`.
- Supabase is the application data source of truth. Partnership applications are validated server-side and inserted only with a server-only Supabase service-role key.
- No payment, scheduling, reader, or ephemeris flow is represented as live until its backend contract exists.

## Local development

```bash
npm install
npm run dev
```

Use `.env.example` as the environment contract. Never commit `.env.local` or production keys.

## Deployment contract

Set these in Vercel for each environment:

| Service | Required variables | Notes |
| --- | --- | --- |
| Supabase | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SERVICE_ROLE_KEY` | The service-role key is server-only. Apply all files in `supabase/migrations/` before enabling application intake. |
| Resend | `RESEND_API_KEY`, `ADMIN_EMAIL` | Replace the default Resend sender with a verified Whole Body domain before production email. |
| Stripe | `STRIPE_RESTRICTED_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET` | Checkout is not implemented yet. Use Checkout Sessions, a least-privilege restricted key, dynamic payment methods, and verified webhooks when it is. |
| Calendly | `CALENDLY_URL` | The `/calendar` booking CTA opens this HTTPS URL. Set it to the appropriate hosted event, routing, or scheduling page. |

## Planned integration boundaries

- **Stripe:** There is no checkout route yet. Product/price IDs, fulfillment rules, tax settings, and webhook event handling must be defined before introducing one.
- **Calendly:** The public calendar uses one configurable external scheduling handoff. Keep booking ownership, event types, confirmation, and webhooks in the hosted scheduling system until a server-owned intake contract is introduced.
- **Swiss Ephemeris:** It is not part of this repository yet. Add it as a Node.js server-side calculation service with pinned ephemeris data/versioning; do not run it in Proxy or client code.
- **Press reader:** Secure reader accounts and watermarked editions are intentionally marked as forthcoming until authentication, purchase entitlements, and storage access policies are designed together.

## Verification

```bash
npx tsc --noEmit
npm run lint
npm run build
```

The production build is the source-of-truth release check.
