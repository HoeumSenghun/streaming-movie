import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n.js')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // TMDB already serves sized images — skip Vercel re-optimization (saves quota, same clarity).
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'image.tmdb.org', pathname: '/**' }
    ]
  }
}

export default withNextIntl(nextConfig)