'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Bookmark, User } from 'lucide-react'
import { useUserContext } from '@/hooks/use-user-context'
import { UserAvatar } from '@/components/profile/UserAvatar'
import { ProfileForm } from '@/components/profile/ProfileForm'

export function ProfileView () {
  const t = useTranslations('profile')
  const { profile, displayLabel, watchlistCount } = useUserContext()

  return (
    <div className="pt-24 min-h-screen max-w-2xl mx-auto px-4 pb-16">
      <section className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-linear-to-br from-zinc-900 via-zinc-900 to-zinc-950 p-6 sm:p-8 mb-6">
        <div
          className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-brand-red/10 blur-2xl"
          aria-hidden
        />
        <div className="relative flex flex-col sm:flex-row sm:items-center gap-5">
          <UserAvatar
            size="lg"
            className="ring-4 ring-zinc-800 shadow-lg"
          />
          <div className="min-w-0 flex-1">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-zinc-800/80 px-2.5 py-1 text-[11px] text-zinc-400 mb-2">
              <User size={12} aria-hidden />
              {t('guestLabel')}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white truncate">{displayLabel}</h1>
            {profile.bio ? (
              <p className="text-zinc-400 text-sm mt-2 leading-relaxed line-clamp-3">{profile.bio}</p>
            ) : (
              <p className="text-zinc-600 text-sm mt-2 italic">{t('bioPlaceholder')}</p>
            )}
          </div>
        </div>

        <div className="relative mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-black/30 border border-zinc-800/80 px-4 py-3">
            <p className="text-2xl font-bold text-white tabular-nums">{watchlistCount}</p>
            <p className="text-xs text-zinc-500 mt-0.5">{t('watchlistTitle')}</p>
          </div>
          <Link
            href="/watchlist"
            className="rounded-xl bg-brand-red/10 border border-brand-red/30 px-4 py-3 flex items-center gap-2
              text-brand-red hover:bg-brand-red/20 transition group"
          >
            <Bookmark size={18} className="shrink-0 group-hover:scale-105 transition-transform" aria-hidden />
            <span className="text-sm font-semibold">{t('viewWatchlist')}</span>
          </Link>
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 sm:p-6 mb-6 shadow-sm">
        <h2 className="text-base font-semibold text-white mb-1">{t('editProfile')}</h2>
        <p className="text-xs text-zinc-500 mb-5">{t('guestLabel')}</p>
        <ProfileForm />
      </section>

      <section className="rounded-2xl border border-dashed border-zinc-700/80 bg-zinc-950/60 p-5 sm:p-6">
        <h2 className="text-sm font-semibold text-zinc-300 mb-2">{t('signInLaterTitle')}</h2>
        <p className="text-xs text-zinc-500 leading-relaxed">{t('signInLaterBody')}</p>
      </section>
    </div>
  )
}
