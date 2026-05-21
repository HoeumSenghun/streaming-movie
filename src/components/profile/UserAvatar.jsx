'use client'

import {
  getAvatarColorClass,
  getProfileInitials
} from '@/lib/user/profile-types'

const sizeClasses = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-14 w-14 text-lg',
  lg: 'h-20 w-20 text-2xl'
}

export function UserAvatar ({ displayName, avatarColor, size = 'md', className = '' }) {
  const initials = getProfileInitials(displayName)
  const colorClass = getAvatarColorClass(avatarColor)

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full font-semibold text-white shrink-0
        ${sizeClasses[size] ?? sizeClasses.md} ${colorClass} ${className}`}
      aria-hidden
    >
      {initials}
    </span>
  )
}
