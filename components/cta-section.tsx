'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { WhatsappLogo } from '@phosphor-icons/react'
import Reveal from './reveal'

export default function CtaSection() {
  const t = useTranslations('Navbar')
  const pathname = usePathname()
  const locale = pathname.split('/')[1] || 'id'
  const waNumber = '6281234567890'
  const waMsg = encodeURIComponent(
    locale === 'id'
      ? 'Halo, saya tertarik booking di Three Queen Villa. Bisa minta informasi lebih lanjut?'
      : 'Hello, I am interested in booking at Three Queen Villa. Can I get more information?'
  )

  return (
    <Reveal>
      <section className="relative overflow-hidden bg-earth py-24 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#7A2E2E_0%,_transparent_70%)] opacity-30" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-heading text-3xl font-light leading-tight text-white sm:text-4xl">
            {locale === 'id'
              ? 'Siap untuk pengalaman tak terlupakan?'
              : 'Ready for an unforgettable experience?'}
          </h2>
          <p className="mt-4 text-sm text-white/40">
            {locale === 'id'
              ? 'Pesan sekarang dan nikmati keindahan Sumba Barat dari Three Queen Villa.'
              : 'Book now and enjoy the beauty of West Sumba from Three Queen Villa.'}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={`/${locale}/booking`}
              className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-3 text-sm font-medium text-earth transition-all active:scale-[0.98]"
            >
              {t('bookNow')}
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-earth/10 transition-transform group-hover:translate-x-0.5">
                <span className="text-xs text-earth">→</span>
              </span>
            </Link>
            <a
              href={`https://wa.me/${waNumber}?text=${waMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 px-8 py-3 text-sm font-medium text-white/60 transition-all hover:border-white/20 hover:text-white active:scale-[0.98]"
            >
              <WhatsappLogo size={18} weight="fill" />
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </Reveal>
  )
}
