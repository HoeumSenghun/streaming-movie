'use client'

import { User } from 'lucide-react'

const sizeClasses = {
  sm: 'h-8 w-8',
  md: 'h-14 w-14',
  lg: 'h-20 w-20'
}

const iconSizes = {
  sm: 16,
  md: 28,
  lg: 40
}

export function UserAvatar ({ size = 'md', className = '' }) {
  const box = sizeClasses[size] ?? sizeClasses.md
  const iconSize = iconSizes[size] ?? iconSizes.md

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full bg-zinc-700 text-zinc-300 shrink-0
        ${box} ${className}`}
      aria-hidden
    >
      <User size={iconSize} strokeWidth={1.75} />
    </span>
  )
}
