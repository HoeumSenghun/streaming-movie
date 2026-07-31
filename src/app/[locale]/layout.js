import { Inter, Battambang } from 'next/font/google'
import { setRequestLocale } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Analytics } from '@vercel/analytics/next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { getSiteUrl } from '@/lib/site-url'
import { getSiteName } from '@/lib/site-meta'
import { routing } from '@/i18n/routing'

const inter = Inter({ subsets: ['latin'] })
const battambang = Battambang({
  subsets: ['khmer'],
  weight: ['400', '700'],
  variable: '--font-khmer'
})

export async function generateMetadata ({ params }) {
  const { locale } = await params
  const siteName = getSiteName()
  const description =
    'Watch trailers and discover movies & TV — browse by genre, build a watchlist, and see where to stream.'
  const baseUrl = new URL(getSiteUrl())

  return {
    metadataBase: baseUrl,
    title: {
      default: siteName,
      template: `%s | ${siteName}`
    },
    description,
    applicationName: siteName,
    openGraph: {
      title: siteName,
      description,
      type: 'website',
      siteName,
      locale
    },
    twitter: {
      card: 'summary_large_image',
      title: siteName,
      description
    }
  }
}

export function generateStaticParams () {
  return routing.locales.map(locale => ({ locale }))
}

export default async function LocaleLayout ({ children, params }) {
  const { locale } = await params
  setRequestLocale(locale)
  const messages = await getMessages()

  const fontClass = locale === 'km' ? battambang.className : inter.className

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${fontClass} antialiased`}>
        <div className="bg-zinc-950 text-white min-h-screen flex flex-col">
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </NextIntlClientProvider>
        </div>
        <Analytics />
      </body>
    </html>
  )
}
