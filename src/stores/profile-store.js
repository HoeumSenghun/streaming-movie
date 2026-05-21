import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  DEFAULT_GUEST_PROFILE,
  sanitizeProfileInput
} from '@/lib/user/profile-types'

export const useProfileStore = create(
  persist(
    (set, get) => ({
      profile: { ...DEFAULT_GUEST_PROFILE },

      updateProfile (partial) {
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
        set({
          profile: { ...DEFAULT_GUEST_PROFILE, updatedAt: Date.now() }
        })
      }
    }),
    { name: 'merlmovie24-profile-v1' }
  )
)
