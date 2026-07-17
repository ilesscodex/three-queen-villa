import { getTranslations } from 'next-intl/server'
import HeroSection from '@/components/hero-section'

export default async function HomePage() {
  const t = await getTranslations('HomePage')

  return (
    <>
      <HeroSection />
      <section className="mx-auto max-w-6xl px-6 py-24 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm text-zinc-500">
            {t('subtitle')}
          </p>
        </div>
      </section>
    </>
  )
}
