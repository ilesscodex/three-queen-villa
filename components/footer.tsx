import { useTranslations } from 'next-intl'
import Logo from './logo'

export default function Footer() {
  const t = useTranslations('Footer')

  return (
    <footer className="relative bg-earth text-white/70">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8">
        <div className="grid gap-12 sm:grid-cols-4">
          <div className="sm:col-span-2">
            <Logo className="[&_span]:text-white" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/50">
              {t('address')}
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-gold">
              Kontak
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="tel:+6281234567890" className="transition-colors hover:text-white">
                  {t('phone')}
                </a>
              </li>
              <li>
                <a href="mailto:info@threequeenvilla.com" className="transition-colors hover:text-white">
                  {t('email')}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-gold">
              Social
            </h4>
            <div className="flex gap-4 text-sm">
              <a href="#" className="transition-colors hover:text-white">Instagram</a>
              <a href="#" className="transition-colors hover:text-white">WhatsApp</a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/5 text-center text-xs text-white/30">
          {t('copyright')}
        </div>
      </div>
    </footer>
  )
}
