'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import SearchWidget from './search-widget'

export default function HeroSection() {
  const t = useTranslations('Navbar')
  const h = useTranslations('HomePage')
  const pathname = usePathname()
  const locale = pathname.split('/')[1] || 'id'
  const { scrollY } = useScroll()
  const reduce = useReducedMotion()

  const bgY = useTransform(scrollY, [0, 800], [0, 150])
  const opacity = useTransform(scrollY, [0, 500], [1, 0.6])

  return (
    <motion.section
      style={reduce ? undefined : { opacity }}
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-earth"
    >
      <motion.div
        style={reduce ? undefined : { y: bgY }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#7A2E2E_0%,_transparent_60%)] opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_#0D5E6E_0%,_transparent_50%)] opacity-20" />
      </motion.div>

      <motion.div
        animate={reduce ? {} : { rotate: [0, 360] }}
        transition={{ repeat: Infinity, duration: 120, ease: 'linear' }}
        className="absolute -top-1/2 -right-1/4 h-[800px] w-[800px] rounded-full bg-sumba/10 blur-3xl pointer-events-none"
      />

      <motion.div
        animate={reduce ? {} : { rotate: [360, 0] }}
        transition={{ repeat: Infinity, duration: 90, ease: 'linear' }}
        className="absolute -bottom-1/3 -left-1/4 h-[600px] w-[600px] rounded-full bg-ocean/10 blur-3xl pointer-events-none"
      />

      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block rounded-full border border-white/10 px-4 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-white/50"
        >
          {t('home')}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 font-heading text-5xl font-light leading-[1.1] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Three Queen
          <br />
          <span className="text-gold">Villa & Homestay</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-white/40"
        >
          {h('heroDesc')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          <Link
            href={`/${locale}/booking`}
            className="group relative inline-flex items-center gap-3 rounded-full bg-white px-8 py-3 text-sm font-medium text-earth transition-all active:scale-[0.98]"
          >
            {t('bookNow')}
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-earth/10 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-105">
              <span className="text-xs text-earth">→</span>
            </span>
          </Link>
          <Link
            href={`/${locale}/rooms`}
            className="rounded-full border border-white/10 px-8 py-3 text-sm font-medium text-white/60 transition-all duration-300 hover:border-white/20 hover:text-white active:scale-[0.98]"
          >
            {h('seeRooms')}
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12"
        >
          <SearchWidget />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/20">
            Scroll
          </span>
          <span className="block h-8 w-px bg-gradient-to-b from-white/20 to-transparent" />
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
