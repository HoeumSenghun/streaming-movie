import { getTranslations } from 'next-intl/server'

export const revalidate = 3600
import MovieCard from '@/components/movie/MovieCard'
import { fetchPopularMovies } from '@/actions/movies.actions'
import { getSiteName } from '@/lib/site-meta'
import { PaginationNav } from '@/components/ui/PaginationNav'

export async function generateMetadata ({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'nav' })
  const site = getSiteName()
  return {
    title: `${t('movies')} — ${site}`
  }
}

export default async function MoviesPage ({ params, searchParams }) {
  const { locale } = await params
  const sp = await searchParams
  const page = Math.max(1, Number(sp?.page) || 1)

  const t = await getTranslations('home')
  const tCat = await getTranslations('moviesCatalog')
  const res = await fetchPopularMovies(locale, page)
  const movies = res.ok ? res.movies : []
  const totalPages = res.totalPages || 1

  return (
    <div className="pt-24 min-h-screen max-w-7xl mx-auto px-4 pb-16 overflow-x-hidden">
      <h1 className="text-2xl font-semibold mb-6">{t('popular')}</h1>
      {res.error && (
        <p className="text-amber-400 text-sm mb-4">{res.error}</p>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      <PaginationNav
        page={page}
        totalPages={totalPages}
        prevHref={`/movies?page=${page - 1}`}
        nextHref={`/movies?page=${page + 1}`}
        prevLabel={tCat('prev')}
        nextLabel={tCat('next')}
        pageLabel={tCat('pageOf', { page, total: totalPages })}
      />
    </div>
  )
}
