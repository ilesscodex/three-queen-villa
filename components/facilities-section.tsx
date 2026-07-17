'use client'

import { usePathname } from 'next/navigation'
import { WifiHigh, Coffee, Car, Snowflake, Shower, Television, ShieldCheck, Waves } from '@phosphor-icons/react'
import Reveal from './reveal'

const facilities = [
  { icon: WifiHigh, labelId: 'WiFi Gratis', labelEn: 'Free WiFi' },
  { icon: Coffee, labelId: 'Sarapan', labelEn: 'Breakfast' },
  { icon: Car, labelId: 'Parkir Luas', labelEn: 'Free Parking' },
  { icon: Snowflake, labelId: 'AC', labelEn: 'Air Conditioning' },
  { icon: Shower, labelId: 'Air Panas', labelEn: 'Hot Water' },
  { icon: Television, labelId: 'TV & Hiburan', labelEn: 'TV & Entertainment' },
  { icon: ShieldCheck, labelId: 'Keamanan 24 Jam', labelEn: '24h Security' },
  { icon: Waves, labelId: 'Kolam Renang', labelEn: 'Swimming Pool' },
]

export default function FacilitiesSection() {
  const pathname = usePathname()
  const locale = pathname.split('/')[1] || 'id'

  return (
    <Reveal>
      <section className="border-t border-zinc-100 bg-zinc-50 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-block rounded-full border border-zinc-200 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-400">
              {locale === 'id' ? 'Fasilitas' : 'Amenities'}
            </span>
            <h2 className="mt-6 font-heading text-3xl font-light leading-tight text-zinc-900 sm:text-4xl">
              {locale === 'id' ? 'Semua yang Anda butuhkan' : 'Everything you need'}
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {facilities.map((facility, i) => (
              <div
                key={i}
                className="group rounded-2xl border border-zinc-200 bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-sumba/20 hover:shadow-md"
              >
                <facility.icon
                  size={28}
                  className="mx-auto text-zinc-400 transition-colors group-hover:text-sumba"
                />
                <span className="mt-3 block text-sm font-medium text-zinc-700">
                  {locale === 'id' ? facility.labelId : facility.labelEn}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Reveal>
  )
}
