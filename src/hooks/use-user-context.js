'use client'

import { useTranslations } from 'next-intl'
import { useProfileStore } from '@/stores/profile-store'
import { useWatchlistStore } from '@/stores/watchlist-store'
import { buildGuestUserContext } from '@/lib/user/get-user-context'

export function useUserContext () {
  const t = useTranslations('profile')
  const profile = useProfileStore(s => s.profile)
  const watchlistCount = useWatchlistStore(s => s.items.length)

  return buildGuestUserContext({
    profile,
    watchlistCount,
    guestNameFallback: t('defaultName')
  })
}
