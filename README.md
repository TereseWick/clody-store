# Veskebutikken – Next.js Starter

En enkel, produksjonsvennlig MVP for nettbutikk (håndlagde vesker). Inneholder:
- Next.js App Router + TypeScript + Tailwind
- Prisma ORM (SQLite lokalt — lett å bytte til Supabase/Postgres)
- Stripe Checkout (betalingsflyt)
- Enkel admin (passord via `ADMIN_KEY` + CRUD for produkter)
- Handlekurv på klienten (localStorage)

## 0) Forutsetninger
- Node.js 18+
- En Stripe-konto (for testnøkler)
- (Valgfritt) Git, Vercel konto

## 1) Kom i gang lokalt
```bash
pnpm i   # eller npm i / yarn
cp .env.example .env.local
# Rediger .env.local – sett STRIPE-nøkler og ADMIN_KEY
npx prisma migrate dev --name init
pnpm dev
```
Åpne http://localhost:3000

## 2) Legg inn produkter
1. Gå til `/admin/login` og skriv inn `ADMIN_KEY` fra `.env.local`.
2. Gå til `/admin/products` → "Nytt produkt" og fyll feltene.
3. Du kan bruke eksterne bildeadresser i feltet `images` senere (TODO: opplasting).

> **Tips:** Bildelagring: start med å lime inn eksterne bildelenker (f.eks. fra et offentlig Google Drive-bilde eller Cloudinary). Senere kan du koble på UploadThing/Supabase Storage.

## 3) Test betaling (Stripe)
- Checkout er satt opp med en "handlekurv" placeholder-linje. For ekte linjer: lag en serverroute som summerer handlekurven basert på produkt-IDs og priser fra databasen.
- Sett `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` og `STRIPE_SECRET_KEY` fra Stripe Dashboard (test-nøkler).
- Etter betaling sendes du til `/success`. Konfigurer webhook:
  - Kjør Stripe CLI lokalt:
    ```bash
    stripe listen --forward-to localhost:3000/api/webhook
    ```
  - Angi `STRIPE_WEBHOOK_SECRET` i `.env.local` (stripe CLI viser den).
  - Når `checkout.session.completed` kommer, settes ordre til `paid` *dersom* du først har opprettet en `Order` med `stripeId = session.id`.

## 4) Deploy (Vercel)
- Push til GitHub og importér repo i Vercel.
- Sett miljøvariabler i Vercel (samme som `.env.local`).
- Bytt `DATABASE_URL` til en vedvarende DB (Supabase/Neon). Kjør `prisma migrate deploy`.

## 5) Veien videre / TODO
- **Ekte handlekurv → server**: Lag `/api/checkout` som aksepterer `{items:[{id,qty}]}` og bygger `line_items` fra DB. Opprett `Order` (status `pending`) før redirect, lagre `stripeId`.
- **Bildefiler**: UploadThing/Supabase Storage + admin-opplasting.
- **Frakt**: faste satser først (f.eks. 79 kr) – legg til som egen line item.
- **Vipps MobilePay**: som egen payment provider ved siden av Stripe.
- **Autentisering**: Bytt ut `ADMIN_KEY`-cookie med NextAuth (magic link).
- **SEO**: Open Graph, sitemap, strukturert data.
- **Analyse**: Vercel Analytics eller Plausible.

## Strukturoversikt
```
app/
  admin/...
  api/
    products/route.ts       # CRUD for produkter
    webhook/route.ts        # Stripe webhook
  cart/page.tsx
  checkout/route.ts         # Oppretter Stripe Checkout session
  product/[slug]/...
  shop/page.tsx
  success/page.tsx
components/
  cart/CartProvider.tsx
  Footer.tsx, Navbar.tsx, ProductCard.tsx
lib/
  prisma.ts, format.ts
prisma/
  schema.prisma
```

---

### Spørsmål eller ønsker?
Ping meg, så utvider vi starteren med spesifikke ønsker (Vipps, Bring, varianter/SKU, e-postkvittering osv.).
