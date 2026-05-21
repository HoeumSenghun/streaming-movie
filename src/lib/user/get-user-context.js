/**
 * User context seam — guest today; swap implementation when auth is added.
 *
 * Future auth steps:
 * 1. Add NextAuth, Clerk, or Supabase Auth + Postgres.
 * 2. Map session user to the same profile shape as DEFAULT_GUEST_PROFILE.
 * 3. On first login, optionally merge guest localStorage watchlist into the server.
 * 4. Return { mode: 'authenticated', profile, watchlistCount } from session/API.
 */

import { getDisplayLabel } from '@/lib/user/profile-types'

/**
 * @param {object} input
 * @param {import('@/lib/user/profile-types').GuestProfile} input.profile
 * @param {number} input.watchlistCount
 * @param {string} input.guestNameFallback
 */
export function buildGuestUserContext ({ profile, watchlistCount, guestNameFallback }) {
  return {
    mode: 'guest',
    profile,
    displayLabel: getDisplayLabel(profile.displayName, guestNameFallback),
    watchlistCount
  }
}
