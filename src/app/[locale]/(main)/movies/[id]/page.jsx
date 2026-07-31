import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import {
  fetchMovieById,
  fetchSimilarMovies,
  fetchRecommendedMovies,
  fetchMovieWatchProviders
} from '@/actions/movies.actions'
import { MovieTrailerPlayer } from '@/components/movie/MovieTrailerPlayer'
import { MediaRow } from '@/components/media/MediaRow'
import { WatchProviders } from '@/components/media/WatchProviders'
import MovieCard from '@/components/movie/MovieCard'
import { DetailWatchlistRow } from '@/components/watchlist/DetailWatchlistRow'
import { getSiteName, getWatchRegion } from '@/lib/site-meta'

export const revalidate = 3600

function formatRating (value) {
  const n = Number(value)
  return Number.isFinite(n) ? n.toFixed(1) : '—'
}

export async function generateMetadata ({ params }) {
  const { locale, id } = await params
  const siteName = getSiteName()
  const res = await fetchMovieById(id, locale)
  const movie = res.movie
  if (!movie) {
    return { title: res.ok ? 'Not found' : siteName }
  }
  const ogImage = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : movie.poster_path
      ? `https://image.tmdb.org/t/p/w780${movie.poster_path}`
      : undefined
  const title = `${movie.title} — ${siteName}`
  return {
    title,
    description: movie.overview,
    alternates: {
      canonical: `/${locale}/movies/${id}`,
      languages: {
        en: `/en/movies/${id}`,
        km: `/km/movies/${id}`
      }
    },
    openGraph: {
      title,
      description: movie.overview || undefined,
      type: 'website',
      siteName,
      locale,
      ...(ogImage ? { images: [{ url: ogImage, alt: movie.title }] } : {})
    }
  }
}

export default async function MovieDetailPage ({ params }) {
  const { locale, id } = await params
  setRequestLocale(locale)

  const movieRes = await fetchMovieById(id, locale)

  if (!movieRes.ok) {
    return (
      <div className="pt-28 min-h-screen max-w-4xl mx-auto px-4 pb-16">
        <p className="text-amber-400">{movieRes.error}</p>
      </div>
    )
  }

  const movie = movieRes.movie
  if (!movie) {
    notFound()
  }

  const videoUrl = movieRes.videoUrl

  const [similarRes, recRes, provRes, t, tNav, tDetail] = await Promise.all([
    fetchSimilarMovies(id, locale),
    fetchRecommendedMovies(id, locale),
    fetchMovieWatchProviders(id),
    getTranslations('home'),
    getTranslations('nav'),
    getTranslations('detail')
  ])

  const similar = similarRes.ok ? similarRes.movies.slice(0, 12) : []
  const recommended = recRes.ok ? recRes.movies.slice(0, 12) : []
  const providerData = provRes.ok ? provRes.data : null
  const region = getWatchRegion()

  const backdrop = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : null

  const cast = (movie.credits?.cast ?? []).slice(0, 16)
  const ratingLabel = formatRating(movie.vote_average)

  return (
    <div className="min-h-screen pb-16">
      <div className="relative h-[45vh] min-h-[280px] w-full">
        {backdrop ? (
          <>
            <Image
              src={backdrop}
              alt=""
              fill
              className="object-cover opacity-60"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-zinc-900" />
        )}
      </div>

      <div className="max-w-4xl mx-auto px-4 pt-6 -mt-24 relative z-10">
        <Link
          href="/movies"
          className="text-sm text-zinc-400 hover:text-white mb-6 inline-block"
        >
          ← {tNav('movies')}
        </Link>
        <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
        <p className="text-zinc-400 text-sm mb-2">
          {movie.release_date?.slice(0, 4)} · ★ {ratingLabel}
          {movie.runtime
            ? ` · ${tDetail('runtimeMins', { mins: movie.runtime })}`
            : ''}
        </p>
        <p className="text-zinc-300 leading-relaxed mb-8">{movie.overview}</p>
        <div className="flex flex-wrap gap-3">
          <a
            href="#watch"
            className="inline-flex items-center gap-2 bg-white text-black font-semibold px-6 py-3 rounded-lg hover:bg-zinc-200 transition"
          >
            ▶ {t('watchNow')}
          </a>
          <DetailWatchlistRow
            id={movie.id}
            mediaType="movie"
            title={movie.title}
            posterPath={movie.poster_path ?? null}
          />
        </div>

        {cast.length > 0 && (
          <section className="mt-12 border-t border-zinc-800 pt-8">
            <h2 className="text-lg font-semibold text-white mb-4">{tDetail('cast')}</h2>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {cast.map(person => {
                const src = person.profile_path
                  ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                  : null
                return (
                  <div
                    key={person.id}
                    className="shrink-0 w-24 text-center"
                  >
                    <div className="relative aspect-3/4 rounded-lg overflow-hidden bg-zinc-800 mb-2">
                      {src ? (
                        <Image src={src} alt="" fill className="object-cover" sizes="96px" />
                      ) : null}
                    </div>
                    <p className="text-xs font-medium text-white line-clamp-2">{person.name}</p>
                    <p className="text-[10px] text-zinc-500 line-clamp-2 mt-0.5">{person.character}</p>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        <section id="watch" className="mt-14 scroll-mt-28 border-t border-zinc-800 pt-10">
          <MovieTrailerPlayer videoUrl={videoUrl} />
        </section>

        <WatchProviders data={providerData} region={region} tDetail={tDetail} />

        {similar.length > 0 && (
          <MediaRow title={tDetail('similar')}>
            {similar.map(m => (
              <div key={m.id} className="shrink-0 w-36 snap-start">
                <MovieCard movie={m} />
              </div>
            ))}
          </MediaRow>
        )}

        {recommended.length > 0 && (
          <MediaRow title={tDetail('recommendations')}>
            {recommended.map(m => (
              <div key={m.id} className="shrink-0 w-36 snap-start">
                <MovieCard movie={m} />
              </div>
            ))}
          </MediaRow>
        )}
      </div>
    </div>
  )
}
