'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, useReducedMotion } from 'motion/react'
import { Users, Bed } from '@phosphor-icons/react'

type RoomType = {
  id: string
  slug: string
  name_id: string
  name_en: string
  base_price: number
  max_guests: number
  bed_type: string
}

export default function RoomCard({ room, index, locale }: { room: RoomType; index: number; locale: string }) {
  const reduce = useReducedMotion()
  const name = locale === 'id' ? room.name_id : room.name_en

  const formattedPrice = new Intl.NumberFormat(locale === 'id' ? 'id-ID' : 'en-US', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(room.base_price)

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`/${locale}/rooms/${room.slug}`}
        className="group block rounded-2xl border border-zinc-200 bg-white p-1.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      >
        <div className="flex aspect-[4/3] items-center justify-center rounded-xl bg-gradient-to-br from-zinc-100 to-zinc-200">
          <span className="text-4xl text-zinc-300">🏡</span>
        </div>
        <div className="p-4">
          <h3 className="font-heading text-lg font-medium text-zinc-900">
            {name}
          </h3>
          <div className="mt-3 flex items-center gap-4 text-xs text-zinc-500">
            <span className="flex items-center gap-1">
              <Users size={14} />
              {room.max_guests} {locale === 'id' ? 'Tamu' : 'Guests'}
            </span>
            <span className="flex items-center gap-1">
              <Bed size={14} />
              {room.bed_type}
            </span>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm font-semibold text-zinc-900">
              {formattedPrice}
              <span className="text-xs font-normal text-zinc-400">
                /{locale === 'id' ? 'malam' : 'night'}
              </span>
            </span>
            <span className="text-xs font-medium text-sumba transition-colors group-hover:text-sumba-light">
              {locale === 'id' ? 'Lihat Detail →' : 'View Details →'}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
