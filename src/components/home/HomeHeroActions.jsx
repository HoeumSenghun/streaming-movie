'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { useWatchlistStore } from '@/stores/watchlist-store'
import { Play } from 'lucide-react'

export function HomeHeroActions ({ featured }) {
  const t = useTranslations('home')
  const toggle = useWatchlistStore(s => s.toggle)
  const hasHydrated = useWatchlistStore(s => s._hasHydrated)
  const has = useWatchlistStore(s =>
    featured ? s.has(featured.id, 'movie') : false
  )

  if (!featured?.id) {
    return null
  }

  return (
    <div className="flex gap-3">
      <Link
        href={`/movies/${featured.id}`}
        className="flex items-center gap-2 bg-white text-black
          font-semibold px-6 py-3 rounded-lg hover:bg-zinc-200 transition"
      >
        <Play /> {t('watchNow')}
      </Link>
      <button
        type="button"
        disabled={!hasHydrated}
        onClick={() =>
          toggle({
            id: featured.id,
            mediaType: 'movie',
            title: featured.title,
            posterPath: featured.poster_path ?? null
          })}
        className={`flex items-center gap-2 font-medium px-6 py-3 rounded-lg transition border disabled:opacity-60
          ${has
            ? 'bg-brand-red/30 border-brand-red text-white'
            : 'bg-zinc-700/60 border-zinc-600 hover:bg-zinc-700'
          }`}
      >
        {has ? t('savedWatchlist') : `+ ${t('addWatchlist')}`}
      </button>
    </div>
  )
}
