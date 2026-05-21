import { getTranslations } from 'next-intl/server'
import { ProfileView } from '@/components/profile/ProfileView'
import { getSiteName } from '@/lib/site-meta'

export async function generateMetadata ({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'profile' })
  return { title: `${t('title')} — ${getSiteName()}` }
}

export default function ProfilePage () {
  return <ProfileView />
}
