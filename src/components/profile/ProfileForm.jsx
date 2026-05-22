'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useProfileStore } from '@/stores/profile-store'
import { PROFILE_LIMITS } from '@/lib/user/profile-types'

export function ProfileForm () {
  const t = useTranslations('profile')
  const profile = useProfileStore(s => s.profile)
  const updateProfile = useProfileStore(s => s.updateProfile)
  const resetProfile = useProfileStore(s => s.resetProfile)

  const [displayName, setDisplayName] = useState(profile.displayName)
  const [bio, setBio] = useState(profile.bio)
  const [saved, setSaved] = useState(false)

  function handleSave (e) {
    e.preventDefault()
    updateProfile({ displayName, bio })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function handleReset () {
    resetProfile()
    setDisplayName('')
    setBio('')
    setSaved(false)
  }

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div>
        <label htmlFor="displayName" className="block text-sm font-medium text-zinc-300 mb-1.5">
          {t('displayName')}
        </label>
        <input
          id="displayName"
          type="text"
          value={displayName}
          onChange={e => setDisplayName(e.target.value)}
          maxLength={PROFILE_LIMITS.displayNameMax}
          placeholder={t('displayNamePlaceholder')}
          className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-sm text-white
            placeholder:text-zinc-600 outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
        />
        <p className="text-xs text-zinc-600 mt-1 text-right tabular-nums">
          {displayName.length}/{PROFILE_LIMITS.displayNameMax}
        </p>
      </div>

      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-zinc-300 mb-1.5">
          {t('bio')}
        </label>
        <textarea
          id="bio"
          value={bio}
          onChange={e => setBio(e.target.value)}
          maxLength={PROFILE_LIMITS.bioMax}
          rows={3}
          placeholder={t('bioPlaceholder')}
          className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-sm text-white
            placeholder:text-zinc-600 outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 resize-none"
        />
        <p className="text-xs text-zinc-600 mt-1 text-right tabular-nums">
          {bio.length}/{PROFILE_LIMITS.bioMax}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-1">
        <button
          type="submit"
          className="flex-1 sm:flex-none bg-white text-black font-semibold px-6 py-3 rounded-xl text-sm
            hover:bg-zinc-200 active:bg-zinc-300 transition touch-manipulation"
        >
          {saved ? t('saved') : t('save')}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="flex-1 sm:flex-none border border-zinc-600 text-zinc-300 px-6 py-3 rounded-xl text-sm
            hover:bg-zinc-800 active:bg-zinc-700 transition touch-manipulation"
        >
          {t('reset')}
        </button>
      </div>
    </form>
  )
}
