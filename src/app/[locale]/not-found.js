import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

export default async function LocaleNotFound () {
  const t = await getTranslations('notFound')
  const tNav = await getTranslations('nav')

  return (
    <div className="pt-28 min-h-[60vh] flex flex-col items-center justify-center gap-4 px-8 pb-16 text-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-zinc-400">{t('message')}</p>
      <Link
        href="/"
        className="text-brand-red font-medium hover:underline"
      >
        {t('backHome', { home: tNav('home') })}
      </Link>
    </div>
  )
}
