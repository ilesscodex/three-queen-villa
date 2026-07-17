'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useReducedMotion } from 'motion/react'
import Logo from './logo'
import LanguageSwitcher from './language-switcher'

const navLinks = [
  { key: 'home', href: '/' },
  { key: 'rooms', href: '/rooms' },
  { key: 'about', href: '/about' },
  { key: 'explore', href: '/explore' },
  { key: 'contact', href: '/contact' },
] as const

export default function Navbar() {
  const t = useTranslations('Navbar')
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastScroll = useRef(0)
  const { scrollY } = useScroll()
  const reduce = useReducedMotion()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (reduce) return
    const diff = latest - lastScroll.current
    if (diff > 20 && latest > 200) {
      setHidden(true)
    } else if (diff < -10) {
      setHidden(false)
    }
    lastScroll.current = latest
  })

  const locale = pathname.split('/')[1] || 'id'

  return (
    <motion.nav
      animate={hidden ? { y: -120, opacity: 0 } : { y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 pointer-events-none"
    >
      <div className="pointer-events-auto mx-auto flex w-full max-w-5xl items-center justify-between rounded-full border border-white/10 bg-white/70 px-5 py-2 shadow-lg shadow-black/5 backdrop-blur-2xl supports-[backdrop-filter]:bg-white/80">
        <Link href={`/${locale}`} className="shrink-0">
          <Logo />
        </Link>

        <div className="hidden md:flex md:items-center md:gap-1">
          {navLinks.map((link) => {
            const href = `/${locale}${link.href === '/' ? '' : link.href}`
            const isActive =
              link.href === '/'
                ? pathname === `/${locale}` || pathname === `/${locale}/`
                : pathname.startsWith(`/${locale}${link.href}`)

            return (
              <Link
                key={link.key}
                href={href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-zinc-900/5 text-zinc-900'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                {t(link.key)}
              </Link>
            )
          })}
          <div className="ml-2 flex items-center gap-2">
            <LanguageSwitcher />
            <Link
              href={`/${locale}/booking`}
              className="group relative inline-flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white transition-all active:scale-[0.98]"
            >
              <span>{t('bookNow')}</span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 transition-transform group-hover:translate-x-0.5">
                <span className="text-xs">→</span>
              </span>
            </Link>
          </div>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center gap-2 md:hidden"
          aria-label="Toggle menu"
        >
          <LanguageSwitcher />
          <div className="relative flex h-8 w-8 items-center justify-center">
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.3 }}
              className="absolute h-px w-4 bg-zinc-800"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="absolute h-px w-4 bg-zinc-800"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.3 }}
              className="absolute h-px w-4 bg-zinc-800"
            />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex flex-col items-center justify-center gap-6 bg-black/80 md:hidden"
          >
            {navLinks.map((link, i) => {
              const href = `/${locale}${link.href === '/' ? '' : link.href}`
              return (
                <motion.div
                  key={link.key}
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="text-2xl font-medium text-white/80 transition-colors hover:text-white"
                  >
                    {t(link.key)}
                  </Link>
                </motion.div>
              )
            })}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + navLinks.length * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={`/${locale}/booking`}
                onClick={() => setMenuOpen(false)}
                className="rounded-full bg-white px-8 py-3 text-base font-medium text-zinc-900"
              >
                {t('bookNow')}
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
