'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { useUserContext } from '@/hooks/use-user-context'
import { UserAvatar } from '@/components/profile/UserAvatar'
import { ProfileForm } from '@/components/profile/ProfileForm'

export function ProfileView () {
  const t = useTranslations('profile')
  const { profile, displayLabel, watchlistCount } = useUserContext()

  return (
    <div className="pt-24 min-h-screen max-w-lg mx-auto px-4 pb-16">
      <header className="flex items-center gap-4 mb-8">
        <UserAvatar
          displayName={profile.displayName}
          avatarColor={profile.avatarColor}
          size="lg"
        />
        <div className="min-w-0">
          <h1 className="text-2xl font-bold text-white truncate">{displayLabel}</h1>
          <p className="text-sm text-zinc-500 mt-0.5">{t('guestLabel')}</p>
        </div>
      </header>

      {profile.bio ? (
        <p className="text-zinc-400 text-sm mb-8 leading-relaxed">{profile.bio}</p>
      ) : null}

      <section className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 mb-8">
        <h2 className="text-sm font-semibold text-white mb-4">{t('editProfile')}</h2>
        <ProfileForm />
      </section>

      <section className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 mb-8">
        <h2 className="text-sm font-semibold text-white mb-2">{t('watchlistTitle')}</h2>
        <p className="text-zinc-400 text-sm mb-4">
          {t('watchlistCount', { count: watchlistCount })}
        </p>
        <Link
          href="/watchlist"
          className="inline-flex text-sm font-medium text-brand-red hover:text-red-400 transition"
        >
          {t('viewWatchlist')} →
        </Link>
      </section>

      <section className="rounded-xl border border-dashed border-zinc-700 bg-zinc-950/50 p-5">
        <h2 className="text-sm font-semibold text-zinc-300 mb-2">{t('signInLaterTitle')}</h2>
        <p className="text-xs text-zinc-500 leading-relaxed">{t('signInLaterBody')}</p>
      </section>
    </div>
  )
}
