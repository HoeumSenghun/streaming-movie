/** @typedef {{ displayName: string, avatarColor: string, bio: string, updatedAt?: number }} GuestProfile */

export const AVATAR_COLORS = [
  { id: 'red', className: 'bg-brand-red' },
  { id: 'zinc', className: 'bg-zinc-600' },
  { id: 'blue', className: 'bg-blue-600' },
  { id: 'emerald', className: 'bg-emerald-600' },
  { id: 'amber', className: 'bg-amber-600' },
  { id: 'violet', className: 'bg-violet-600' }
]

export const DEFAULT_AVATAR_COLOR = 'red'

export const DEFAULT_GUEST_PROFILE = {
  displayName: '',
  avatarColor: DEFAULT_AVATAR_COLOR,
  bio: ''
}

export const PROFILE_LIMITS = {
  displayNameMax: 32,
  bioMax: 120
}

export function getAvatarColorClass (colorId) {
  const found = AVATAR_COLORS.find(c => c.id === colorId)
  return found?.className ?? AVATAR_COLORS[0].className
}

export function getProfileInitials (displayName) {
  const trimmed = typeof displayName === 'string' ? displayName.trim() : ''
  if (!trimmed) return '?'
  const parts = trimmed.split(/\s+/).filter(Boolean)
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase()
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
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
  if (partial.avatarColor !== undefined) {
    const valid = AVATAR_COLORS.some(c => c.id === partial.avatarColor)
    if (valid) out.avatarColor = partial.avatarColor
  }
  return out
}
