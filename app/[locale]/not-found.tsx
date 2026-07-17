'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'

export default function NotFound() {
  const t = useTranslations('NotFound')
  const pathname = usePathname()
  const locale = pathname.split('/')[1] || 'id'

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center px-6 text-center">
      <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-400">
        404
      </span>
      <h1 className="mt-6 font-heading text-4xl font-light text-zinc-900 sm:text-5xl">
        {t('title')}
      </h1>
      <p className="mt-4 max-w-md text-sm text-zinc-500">
        {t('description')}
      </p>
      <Link
        href={`/${locale}`}
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-zinc-800"
      >
        ← {t('backHome')}
      </Link>
    </div>
  )
}
