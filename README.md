# FinanceFlow

FinanceFlow is an npm-workspaces monorepo with a React/Vite frontend, a thin Fastify service, and shared TypeScript types. Supabase owns authentication, Postgres data, and file storage. The API is intentionally limited to authenticated AI and PDF-generation work.

## Workspace

```text
apps/web       React, TypeScript, Vite, Tailwind CSS
apps/api       Fastify service (port 4000)
packages/types Shared request and domain types
supabase       Database migrations
```

Node.js 20 or newer is required. This repository uses npm workspaces because pnpm was not available in the scaffold environment.

## 1. Create the Supabase project

1. Create a project at [supabase.com/dashboard](https://supabase.com/dashboard).
2. In **Project Settings → API**, copy the project URL, anon/publishable key, and service-role secret.
3. Keep the service-role key server-side. Never put it in `apps/web` or commit it.
4. Under **Authentication → URL Configuration**, set the site URL to `http://localhost:5173`. Add it as a redirect URL as well.
5. Configure email confirmation under **Authentication → Providers → Email** as desired. With confirmation enabled, new users must confirm their email before receiving a session.

## 2. Run the migration

For a quick hosted setup, open **SQL Editor** in the Supabase dashboard, paste the contents of `supabase/migrations/20260912000000_initial_schema.sql`, and run it once.

Alternatively, with the Supabase CLI installed and authenticated:

```bash
supabase link --project-ref YOUR_PROJECT_REF
supabase db push
```

The migration creates the enums, profiles, conversations, and messages tables; enables RLS; installs owner-only policies; and creates a profile automatically for every new auth user.

## 3. Configure environment files

Copy each example and replace the placeholders:

```bash
cp apps/web/.env.example apps/web/.env
cp apps/api/.env.example apps/api/.env
```

`apps/web/.env`:

```dotenv
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_ANON_OR_PUBLISHABLE_KEY
VITE_API_URL=http://localhost:4000
```

`apps/api/.env`:

```dotenv
SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
PORT=4000
WEB_ORIGIN=http://localhost:5173
```

## 4. Install and run

From the repository root:

```bash
npm install
npm run dev
```

The web app opens at `http://localhost:5173`; the API listens at `http://localhost:4000`. Check the public health endpoint at `http://localhost:4000/api/health`.

Useful commands:

```bash
npm run build
npm run lint
npm run format:check
```

The protected `POST /api/chat` endpoint accepts `{ "message": "hello" }`. Use the `apiFetch` helper from the web app; it reads the current Supabase session and supplies its access token as a Bearer token. No application code directly uses `localStorage` or `sessionStorage`; session lifecycle is delegated to Supabase Auth.
