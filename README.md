# Virtual music learning platform

Learning music from your favorite characters — a gamified AI music learning MVP: pick an instrument, upload an idol + room image, generate an AI mentor, then practice with mic-driven feedback.

Stack: **Next.js 14 (App Router)**, **Tailwind CSS**, **NextAuth** (GitHub), **Prisma** + **Postgres**, **Vercel Blob** uploads, optional **OpenAI**.

## Quick start

**Windows:** Install [Node.js LTS](https://nodejs.org) and use a **new** terminal so `node` and `npm` are on your `PATH` (if `npm` was “not recognized,” Node is missing or the shell needs a restart).

```bash
cp .env.example .env.local
# Set DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL, GITHUB_ID, GITHUB_SECRET (see DEPLOY.md)

npx prisma migrate dev
npx prisma generate
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy (Vercel)

See **[DEPLOY.md](./DEPLOY.md)** for env vars, migrations, and smoke tests.

## License

MIT (or your choice—update this file if needed).
