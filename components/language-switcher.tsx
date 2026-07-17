'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

const locales = [
  { code: 'id', label: 'ID' },
  { code: 'en', label: 'EN' },
] as const

export default function LanguageSwitcher() {
  const pathname = usePathname()

  const switchTo = (locale: string) => {
    const segments = pathname.split('/')
    segments[1] = locale
    return segments.join('/') || '/'
  }

  return (
    <div className="flex items-center gap-0.5">
      {locales.map((loc) => {
        const href = switchTo(loc.code)
        const isActive = pathname.startsWith(`/${loc.code}`)

        return (
          <Link
            key={loc.code}
            href={href}
            className={`px-1.5 py-1 text-[11px] font-semibold uppercase tracking-wider transition-colors ${
              isActive
                ? 'text-zinc-900'
                : 'text-zinc-400 hover:text-zinc-600'
            }`}
          >
            {loc.label}
          </Link>
        )
      })}
    </div>
  )
}
