import Link from 'next/link'

/** Fallback when no locale segment is available (e.g. unknown top-level paths). */
export default function NotFound () {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center gap-4 p-8">
          <h1 className="text-4xl font-bold">404</h1>
          <p className="text-zinc-400">This page could not be found.</p>
          <Link
            href="/en"
            className="text-[#E50914] font-medium hover:underline"
          >
            Back to home
          </Link>
        </div>
      </body>
    </html>
  )
}
