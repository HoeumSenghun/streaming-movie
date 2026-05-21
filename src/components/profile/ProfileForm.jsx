'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useProfileStore } from '@/stores/profile-store'
import {
  AVATAR_COLORS,
  PROFILE_LIMITS,
  getAvatarColorClass
} from '@/lib/user/profile-types'

export function ProfileForm () {
  const t = useTranslations('profile')
  const profile = useProfileStore(s => s.profile)
  const updateProfile = useProfileStore(s => s.updateProfile)
  const resetProfile = useProfileStore(s => s.resetProfile)

  const [displayName, setDisplayName] = useState(profile.displayName)
  const [bio, setBio] = useState(profile.bio)
  const [avatarColor, setAvatarColor] = useState(profile.avatarColor)
  const [saved, setSaved] = useState(false)

  function handleSave (e) {
    e.preventDefault()
    updateProfile({ displayName, bio, avatarColor })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function handleReset () {
    resetProfile()
    setDisplayName('')
    setBio('')
    setAvatarColor('red')
    setSaved(false)
  }

  return (
    <form onSubmit={handleSave} className="space-y-5">
      <div>
        <label htmlFor="displayName" className="block text-sm text-zinc-400 mb-1.5">
          {t('displayName')}
        </label>
        <input
          id="displayName"
          type="text"
          value={displayName}
          onChange={e => setDisplayName(e.target.value)}
          maxLength={PROFILE_LIMITS.displayNameMax}
          placeholder={t('displayNamePlaceholder')}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white
            placeholder:text-zinc-500 outline-none focus:border-zinc-500"
        />
        <p className="text-xs text-zinc-600 mt-1">
          {displayName.length}/{PROFILE_LIMITS.displayNameMax}
        </p>
      </div>

      <div>
        <label htmlFor="bio" className="block text-sm text-zinc-400 mb-1.5">
          {t('bio')}
        </label>
        <textarea
          id="bio"
          value={bio}
          onChange={e => setBio(e.target.value)}
          maxLength={PROFILE_LIMITS.bioMax}
          rows={3}
          placeholder={t('bioPlaceholder')}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white
            placeholder:text-zinc-500 outline-none focus:border-zinc-500 resize-none"
        />
        <p className="text-xs text-zinc-600 mt-1">
          {bio.length}/{PROFILE_LIMITS.bioMax}
        </p>
      </div>

      <fieldset>
        <legend className="block text-sm text-zinc-400 mb-2">
          {t('avatarColor')}
        </legend>
        <div className="flex flex-wrap gap-2">
          {AVATAR_COLORS.map(c => (
            <button
              key={c.id}
              type="button"
              onClick={() => setAvatarColor(c.id)}
              className={`h-9 w-9 rounded-full border-2 transition
                ${getAvatarColorClass(c.id)}
                ${avatarColor === c.id
                  ? 'border-white ring-2 ring-white/30'
                  : 'border-transparent opacity-80 hover:opacity-100'
                }`}
              aria-label={c.id}
              aria-pressed={avatarColor === c.id}
            />
          ))}
        </div>
      </fieldset>

      <div className="flex flex-wrap gap-3 pt-2">
        <button
          type="submit"
          className="bg-white text-black font-semibold px-5 py-2.5 rounded-lg text-sm
            hover:bg-zinc-200 transition"
        >
          {saved ? t('saved') : t('save')}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="border border-zinc-600 text-zinc-300 px-5 py-2.5 rounded-lg text-sm
            hover:bg-zinc-800 transition"
        >
          {t('reset')}
        </button>
      </div>
    </form>
  )
}
