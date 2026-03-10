# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # Start development server
pnpm build      # Build for production
pnpm start      # Start production server
pnpm lint       # Run ESLint
```

To seed the database, visit `/seed` in the browser after starting the dev server (calls `app/seed/route.ts`).

## Architecture

This is the Next.js App Router tutorial project — a financial dashboard with authentication, invoices, and customers.

**Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS v4, `@vercel/postgres`, NextAuth v5 (beta), Zod, bcrypt.

### Route Structure

```
app/
  page.tsx                        # Landing page (redirects logged-in users to /dashboard)
  login/page.tsx                  # Login page
  dashboard/
    (overview)/page.tsx           # Dashboard home with cards + revenue chart
    (overview)/loading.tsx        # Streaming skeleton for dashboard
    invoices/page.tsx             # Invoices list with search + pagination
    invoices/create/page.tsx      # Create invoice form
    invoices/[id]/edit/page.tsx   # Edit invoice form
    customers/page.tsx            # Customers table
    layout.tsx                    # Dashboard shell with sidenav
```

### Data Layer (`app/lib/`)

- **`data.ts`** — All read queries via `@vercel/postgres` tagged template literals. Server-only. Amounts are stored in cents in the DB.
- **`actions.ts`** — Server Actions (`"use server"`) for create/update/delete invoice and `authenticate`. Use Zod for validation, call `revalidatePath` + `redirect` after mutations.
- **`definitions.ts`** — All shared TypeScript types (no ORM-generated types).
- **`utils.ts`** — `formatCurrency` and `generatePagination` helpers.

### Authentication

Split across two files to work with Next.js Edge runtime:
- **`auth.config.ts`** — Route protection logic (runs in middleware/Edge); redirects `/dashboard/*` to login if unauthenticated, redirects logged-in users away from `/login`.
- **`auth.ts`** — Full NextAuth config with Credentials provider and bcrypt password verification (Node.js only).
- **`middleware.ts`** — Applies `authConfig` to all routes except static assets.

### UI (`app/ui/`)

- `dashboard/` — Cards, revenue chart, latest invoices, sidenav, nav-links components.
- `invoices/` — Table, create/edit forms, pagination, breadcrumbs, status badge, buttons.
- `customers/` — Customers table.
- `skeletons.tsx` — Loading skeletons used with React Suspense.
- `fonts.ts` — Google Fonts (Inter, Lusitana) loaded via `next/font`.

### Key Patterns

- Dashboard data is fetched in parallel using `Promise.all` in `fetchCardData`.
- Invoice amounts are stored in cents; divide by 100 when reading, multiply by 100 when writing.
- Search uses URL search params (`useSearchParams`, `useRouter`, `usePathname`) with `useDebouncedCallback`.
- Pagination is calculated server-side in `fetchInvoicesPages` (6 items per page).
- Forms use `useActionState` with Server Actions for progressive enhancement.
