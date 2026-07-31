import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  DEFAULT_GUEST_PROFILE,
  sanitizeProfileInput
} from '@/lib/user/profile-types'

function sanitizePersistedProfile (raw) {
  if (!raw || typeof raw !== 'object') {
    return { ...DEFAULT_GUEST_PROFILE }
  }
  const safe = sanitizeProfileInput({
    displayName: raw.displayName,
    bio: raw.bio
  })
  return {
    ...DEFAULT_GUEST_PROFILE,
    ...safe,
    updatedAt: Number.isFinite(Number(raw.updatedAt))
      ? Number(raw.updatedAt)
      : undefined
  }
}

export const useProfileStore = create(
  persist(
    (set, get) => ({
      profile: { ...DEFAULT_GUEST_PROFILE },
      _hasHydrated: false,

      setHasHydrated (value) {
        set({ _hasHydrated: Boolean(value) })
      },

      updateProfile (partial) {
        if (!get()._hasHydrated) return
        const safe = sanitizeProfileInput(partial)
        set({
          profile: {
            ...get().profile,
            ...safe,
            updatedAt: Date.now()
          }
        })
      },

      resetProfile () {
        if (!get()._hasHydrated) return
        set({
          profile: { ...DEFAULT_GUEST_PROFILE, updatedAt: Date.now() }
        })
      }
    }),
    {
      name: 'merlmovie24-profile-v1',
      version: 1,
      partialize: state => ({ profile: state.profile }),
      migrate: persisted => ({
        profile: sanitizePersistedProfile(persisted?.profile)
      }),
      onRehydrateStorage: () => state => {
        state?.setHasHydrated(true)
      }
    }
  )
)
