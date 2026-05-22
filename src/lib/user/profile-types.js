/** @typedef {{ displayName: string, bio: string, updatedAt?: number }} GuestProfile */

export const DEFAULT_GUEST_PROFILE = {
  displayName: '',
  bio: ''
}

export const PROFILE_LIMITS = {
  displayNameMax: 32,
  bioMax: 120
}

export function getDisplayLabel (displayName, fallback) {
  const trimmed = typeof displayName === 'string' ? displayName.trim() : ''
  return trimmed || fallback
}

export function sanitizeProfileInput (partial) {
  const out = {}
  if (partial.displayName !== undefined) {
    out.displayName = String(partial.displayName).trim().slice(0, PROFILE_LIMITS.displayNameMax)
  }
  if (partial.bio !== undefined) {
    out.bio = String(partial.bio).trim().slice(0, PROFILE_LIMITS.bioMax)
  }
  return out
}
