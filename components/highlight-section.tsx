'use client'

import { useTranslations } from 'next-intl'
import Reveal from './reveal'

export default function HighlightSection() {
  const t = useTranslations('HomePage')

  return (
    <Reveal>
      <section className="relative overflow-hidden border-t border-zinc-100 bg-cream py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-block rounded-full border border-zinc-200 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-400">
                {t('highlightEyebrow')}
              </span>
              <h2 className="mt-6 font-heading text-3xl font-light leading-tight text-zinc-900 sm:text-4xl lg:text-5xl">
                {t('highlightTitle')}
              </h2>
            </div>
            <div>
              <p className="text-sm leading-relaxed text-zinc-500 sm:text-base">
                {t('highlightBody')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  )
}
