'use client'

import { usePathname } from 'next/navigation'
import { Quotes } from '@phosphor-icons/react'
import Reveal from './reveal'

const testimonialsId = [
  {
    name: 'Budi Santoso',
    asal: 'Jakarta',
    text: 'Pengalaman menginap yang luar biasa! Rumah tradisionalnya benar-benar autentik, pemandangan lautnya menakjubkan. Owner sangat ramah dan membantu.',
  },
  {
    name: 'Sarah Wijaya',
    asal: 'Surabaya',
    text: 'Sumba ternyata seindah ini! Three Queen Villa jadi basecamp yang sempurna buat explore Sumba Barat. Kamar bersih, makanannya enak.',
  },
  {
    name: 'Michael & Anna',
    asal: 'Australia',
    text: 'A hidden gem in Sumba. The traditional house experience was amazing — the architecture, the food, the hospitality. We will definitely come back.',
  },
  {
    name: 'Rina & Yoga',
    asal: 'Bandung',
    text: 'Honeymoon yang sempurna. Sunset dari kamar Traditional House King Ocean View-nya tidak terlupakan. Recommended banget untuk pasangan!',
  },
]

const testimonialsEn = [
  {
    name: 'Budi Santoso',
    asal: 'Jakarta',
    text: 'An incredible stay! The traditional house is truly authentic with stunning ocean views. The owner is very friendly and helpful.',
  },
  {
    name: 'Sarah Wijaya',
    asal: 'Surabaya',
    text: 'Sumba is so beautiful! Three Queen Villa was the perfect basecamp to explore West Sumba. Clean rooms, delicious food.',
  },
  {
    name: 'Michael & Anna',
    asal: 'Australia',
    text: 'A hidden gem in Sumba. The traditional house experience was amazing — the architecture, the food, the hospitality. We will definitely come back.',
  },
  {
    name: 'Rina & Yoga',
    asal: 'Bandung',
    text: 'The perfect honeymoon. The sunset from the Traditional House King Ocean View room was unforgettable. Highly recommended for couples!',
  },
]

export default function TestimonialsSection() {
  const pathname = usePathname()
  const locale = pathname.split('/')[1] || 'id'
  const items = locale === 'id' ? testimonialsId : testimonialsEn

  return (
    <Reveal>
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-block rounded-full border border-zinc-200 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-400">
              {locale === 'id' ? 'Testimoni' : 'Testimonials'}
            </span>
            <h2 className="mt-6 font-heading text-3xl font-light leading-tight text-zinc-900 sm:text-4xl">
              {locale === 'id' ? 'Kata tamu kami' : 'Words from our guests'}
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {items.map((item, i) => (
              <div
                key={i}
                className="group rounded-2xl border border-zinc-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:p-8"
              >
                <Quotes size={24} className="text-sumba/30" weight="fill" />
                <p className="mt-4 text-sm leading-relaxed text-zinc-600">
                  "{item.text}"
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-zinc-100 pt-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sumba/10 text-sm font-semibold text-sumba">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-zinc-900">{item.name}</span>
                    <span className="text-xs text-zinc-400">{item.asal}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Reveal>
  )
}
