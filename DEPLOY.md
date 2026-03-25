# Vercel production checklist (minimal)

Use this once the MVP works locally with `.env.local`.

## 0. Local development

1. Copy `.env.example` → `.env.local` and fill values (at minimum `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `GITHUB_ID`, `GITHUB_SECRET`).
2. Run migrations: `npx prisma migrate dev` (or `npx prisma migrate deploy` against a remote DB).
3. Generate the client: `npx prisma generate`.
4. Start the app: `npm run dev`.

Without `BLOB_READ_WRITE_TOKEN`, `/api/upload` returns data URLs so the app still runs; add Blob on Vercel for real storage and so `MentorSession` rows are created (remote URLs only).

## 1. Accounts and secrets

1. **Neon (or any Postgres)**  
   - Create a project and copy the pooled **connection string** as `DATABASE_URL` in Vercel → Project → Settings → Environment Variables.

2. **GitHub OAuth**  
   - [New OAuth App](https://github.com/settings/developers)  
   - **Application name**: your product name  
   - **Homepage URL**: `https://<your-vercel-domain>`  
   - **Authorization callback URL**: `https://<your-vercel-domain>/api/auth/callback/github`  
   - Add `GITHUB_ID` and `GITHUB_SECRET` in Vercel.

3. **NextAuth**  
   - `NEXTAUTH_URL` = `https://<your-vercel-domain>` (no trailing slash).  
   - `NEXTAUTH_SECRET` = random string (e.g. `openssl rand -base64 32`).

4. **Vercel Blob**  
   - Create a Blob store in the Vercel project.  
   - Add `BLOB_READ_WRITE_TOKEN` to env (store-linked).  
   - Without this, local/dev uploads fall back to data URLs; production should set the token so mentors are persisted in Postgres with real URLs.

5. **OpenAI (optional)**  
   - `OPENAI_API_KEY` and optional `OPENAI_MODEL` for real mentor/feedback text.

## 2. Database schema

From project root (with `DATABASE_URL` pointing at the **same** DB as production):

```bash
npx prisma migrate deploy
```

For first-time setup you can use `npx prisma migrate dev --name init` during development, then commit `prisma/migrations`. CI/Vercel should run `migrate deploy` once per release or via a manual/Vercel step.

## 3. Deploy on Vercel

1. Import the Git repo; framework **Next.js**; root = this project.  
2. Set all env vars (Production + Preview if you want OAuth on previews; Preview needs a separate GitHub callback URL or use production-only auth for demos).  
3. **Build command** is already `prisma generate && next build` in `package.json` (Prisma downloads engines during install/build; flaky networks may need a retry).  
4. After first deploy, run `npx prisma migrate deploy` against production if you did not add it as a build step.

## 4. Smoke test

1. Open `/`, sign in via GitHub.  
2. `/setup` → upload images → Generate.  
3. `/learn` → Start Listening → feedback updates.  
4. Confirm rows appear in `MentorSession` when Blob URLs are used (not data URLs).

## 5. Later (not required for MVP)

- Custom domain + update `NEXTAUTH_URL` and GitHub callback.  
- Rate limiting on `/api/generate` and `/api/feedback`.  
- Stripe when you add billing.  
- Error tracking (e.g. Sentry).
