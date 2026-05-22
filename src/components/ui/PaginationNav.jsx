import { Link } from '@/i18n/navigation'

const btnBase =
  'inline-flex min-h-11 min-w-[5.5rem] flex-1 items-center justify-center rounded-lg px-3 py-2.5 text-sm font-medium touch-manipulation select-none transition-colors'

export function PaginationNav ({
  page,
  totalPages,
  prevHref,
  nextHref,
  prevLabel,
  nextLabel,
  pageLabel
}) {
  if (totalPages <= 1) return null

  const prevClass = `${btnBase} ${page > 1
    ? 'bg-zinc-800 text-white hover:bg-zinc-700 active:bg-zinc-600'
    : 'bg-zinc-900 text-zinc-600 pointer-events-none'}`
  const nextClass = `${btnBase} ${page < totalPages
    ? 'bg-zinc-800 text-white hover:bg-zinc-700 active:bg-zinc-600'
    : 'bg-zinc-900 text-zinc-600 pointer-events-none'}`

  return (
    <nav
      className="mt-10 grid max-w-md mx-auto grid-cols-[1fr_auto_1fr] items-stretch gap-2 px-1"
      aria-label="Pagination"
    >
      {page > 1 ? (
        <Link href={prevHref} className={prevClass}>
          <span aria-hidden className="mr-0.5">←</span>
          <span className="truncate">{prevLabel}</span>
        </Link>
      ) : (
        <span className={prevClass}>
          <span aria-hidden className="mr-0.5 opacity-50">←</span>
          <span className="truncate">{prevLabel}</span>
        </span>
      )}

      <span
        className="inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-lg border border-zinc-800 bg-zinc-900/80 px-3 text-sm tabular-nums text-zinc-300"
      >
        {pageLabel}
      </span>

      {page < totalPages ? (
        <Link href={nextHref} className={nextClass}>
          <span className="truncate">{nextLabel}</span>
          <span aria-hidden className="ml-0.5">→</span>
        </Link>
      ) : (
        <span className={nextClass}>
          <span className="truncate">{nextLabel}</span>
          <span aria-hidden className="ml-0.5 opacity-50">→</span>
        </span>
      )}
    </nav>
  )
}
