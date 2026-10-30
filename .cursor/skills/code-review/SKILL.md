---
name: code-review
description: Review steaming-movie changes for correctness, Next.js 16 App Router conventions, next-intl (en/km), TMDB server boundaries, and Zustand client state. Use when reviewing pull requests, diffs, or when the user asks for a code review.
---

# Code Review

Review the diff against this repo. Report findings only. Do not rewrite the change unless the user asks for a fix.

Before flagging or suggesting a Next.js API, read the matching guide in `node_modules/next/dist/docs/`. This app is Next.js 16; training-data APIs are often wrong.

## What to review

1. Read the diff and the surrounding file so the change is judged in context.
2. Check correctness, the boundaries below, and user-visible empty/error states.
3. Run `npm run lint` when the change touches JS or JSX and the tree is installable. Treat new lint errors as findings.

## Project boundaries

**Stack.** JavaScript (no TypeScript). App Router under `src/app`. Import app code with `@/`. Prevailing style: single quotes, no semicolons, space before function parentheses (`function name (args)`). Match the file you are in. Do not demand a new style.

**Locale.** Locales are `en` and `km`, prefix always (`src/i18n/routing.js`). In-app links and programmatic navigation go through `@/i18n/navigation`, not `next/link` or `next/navigation` when that would drop the locale. Client copy uses `useTranslations`. Server copy uses `getTranslations` and `setRequestLocale`. A new user-facing string needs both locales.

**Server data.** TMDB is called only from `src/services/tmdb.service.js`. UI and pages call `src/actions/*.actions.js` (`'use server'`). Actions return `{ ok, error, ... }` and do not throw to the client. They check `TMDB_ACCESS_TOKEN` and log with `console.error('[actionName]', err)`. `localeToTmdbLanguage` stays `en-US` (Khmer UI, English TMDB metadata). `TMDB_ACCESS_TOKEN` never reaches client code, logs of successful responses, or committed env files.

**Images.** Posters and backdrops use `next/image` and `https://image.tmdb.org/...`. `next.config.mjs` allows that host only and sets `images.unoptimized: true`. Do not add other remote hosts or turn optimization back on without a reason.

**Client state.** Zustand stores live in `src/stores`. Persisted stores must no-op mutations until `_hasHydrated` is true. Add `'use client'` only for hooks, stores, or browser APIs. Pages stay server components and pass data into client leaves.

**Public pages.** Detail and listing routes that are indexable keep `generateMetadata` with a canonical URL and `en` / `km` alternates. `params` is a Promise; await it.

## Checklist

- [ ] Behavior matches the request, including empty, missing-id, and TMDB-failure results
- [ ] Locale survives links, redirects, and metadata
- [ ] No TMDB fetch or access token in a client component
- [ ] Server actions return `{ ok: false, error }` instead of throwing
- [ ] Persisted store writes wait for hydration
- [ ] New strings exist for `en` and `km`
- [ ] `next/image` sources stay on `image.tmdb.org`
- [ ] Next.js 16 APIs match `node_modules/next/dist/docs/` (async `params` / `searchParams`, no removed APIs)
- [ ] No new `eslint` core-web-vitals errors

## Feedback

Lead with the verdict: approve, or request changes. Then list findings, highest severity first. Quote the file and the relevant lines.

- **Critical** — wrong behavior, locale drop, secret leak, or a broken server/client boundary. Must change before merge.
- **Suggestion** — correct but fragile: missing empty state, inconsistent action result shape, client component wider than it needs to be.
- **Note** — optional polish that matches nearby code.

Skip praise that does not change a decision. If the diff is clean, say so in one sentence and stop.
