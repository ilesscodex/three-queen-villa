import { getTranslations } from 'next-intl/server'
import HeroSection from '@/components/hero-section'
import Reveal from '@/components/reveal'

export default async function HomePage() {
  const t = await getTranslations('HomePage')

  return (
    <>
      <HeroSection />
      <Reveal>
        <section className="mx-auto max-w-6xl px-6 py-24 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-block rounded-full border border-zinc-200 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-400">
              About
            </span>
            <h2 className="mt-6 font-heading text-3xl font-light leading-tight text-zinc-900 sm:text-4xl">
              Tempat di mana tradisi Sumba{' '}
              <span className="text-sumba">hidup</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-500">
              {t('subtitle')}
            </p>
          </div>
        </section>
      </Reveal>
    </>
  )
}
