import { getTranslations } from 'next-intl/server'
import { TVCard } from '@/components/tv/TVCard'
import { PaginationNav } from '@/components/ui/PaginationNav'
import { fetchPopularTv } from '@/actions/tv.actions'
import { getSiteName } from '@/lib/site-meta'

export const revalidate = 3600

export async function generateMetadata ({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'nav' })
  const site = getSiteName()
  return {
    title: `${t('tvShows')} — ${site}`
  }
}

export default async function TvShowsPage ({ params, searchParams }) {
  const { locale } = await params
  const sp = await searchParams
  const page = Math.max(1, Number(sp?.page) || 1)

  const t = await getTranslations('tv')
  const res = await fetchPopularTv(locale, page)
  const shows = res.ok ? res.shows : []
  const totalPages = res.totalPages || 1

  return (
    <div className="pt-24 min-h-screen max-w-7xl mx-auto px-4 pb-16 overflow-x-hidden">
      <h1 className="text-2xl font-semibold mb-6">{t('popular')}</h1>
      {res.error && (
        <p className="text-amber-400 text-sm mb-4">{res.error}</p>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {shows.map(show => (
          <TVCard key={show.id} show={show} />
        ))}
      </div>

      <PaginationNav
        page={page}
        totalPages={totalPages}
        prevHref={`/tv-shows?page=${page - 1}`}
        nextHref={`/tv-shows?page=${page + 1}`}
        prevLabel={t('prev')}
        nextLabel={t('next')}
        pageLabel={t('pageOf', { page, total: totalPages })}
      />
    </div>
  )
}
