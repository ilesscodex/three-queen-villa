'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { DayPicker } from 'react-day-picker'
import { format } from 'date-fns'
import { id as idLocale, enUS } from 'date-fns/locale'
import 'react-day-picker/style.css'

export default function SearchWidget() {
  const router = useRouter()
  const pathname = usePathname()
  const locale = pathname.split('/')[1] || 'id'

  const [checkIn, setCheckIn] = useState<Date>()
  const [checkOut, setCheckOut] = useState<Date>()
  const [open, setOpen] = useState<'in' | 'out' | null>(null)

  const dateLocale = locale === 'id' ? idLocale : enUS
  const today = new Date()

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (checkIn) params.set('checkIn', format(checkIn, 'yyyy-MM-dd'))
    if (checkOut) params.set('checkOut', format(checkOut, 'yyyy-MM-dd'))
    router.push(`/${locale}/booking?${params.toString()}`)
  }

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-3 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <button
          onClick={() => setOpen(open === 'in' ? null : 'in')}
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-left text-sm text-white/60 transition-colors hover:border-white/20"
        >
          <span className="text-[10px] font-medium uppercase tracking-wider text-white/30">
            Check-in
          </span>
          <span className="block mt-0.5">
            {checkIn ? format(checkIn, 'dd MMM yyyy', { locale: dateLocale }) : 'Pilih tanggal'}
          </span>
        </button>
        {open === 'in' && (
          <div className="absolute top-full left-0 z-30 mt-2 rounded-xl border border-white/10 bg-earth p-2 shadow-xl">
            <DayPicker
              mode="single"
              selected={checkIn}
              onSelect={(d) => { setCheckIn(d); setOpen('out') }}
              disabled={{ before: today }}
              locale={dateLocale}
              className="!m-0 text-white"
            />
          </div>
        )}
      </div>

      <div className="relative flex-1">
        <button
          onClick={() => setOpen(open === 'out' ? null : 'out')}
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-left text-sm text-white/60 transition-colors hover:border-white/20"
        >
          <span className="text-[10px] font-medium uppercase tracking-wider text-white/30">
            Check-out
          </span>
          <span className="block mt-0.5">
            {checkOut ? format(checkOut, 'dd MMM yyyy', { locale: dateLocale }) : 'Pilih tanggal'}
          </span>
        </button>
        {open === 'out' && (
          <div className="absolute top-full left-0 z-30 mt-2 rounded-xl border border-white/10 bg-earth p-2 shadow-xl">
            <DayPicker
              mode="single"
              selected={checkOut}
              onSelect={(d) => { setCheckOut(d); setOpen(null) }}
              disabled={{ before: checkIn || today }}
              locale={dateLocale}
              className="!m-0 text-white"
            />
          </div>
        )}
      </div>

      <button
        onClick={handleSearch}
        className="shrink-0 rounded-lg bg-white px-5 py-3 text-sm font-medium text-earth transition-all hover:bg-white/90 active:scale-[0.98]"
      >
        Cek Ketersediaan
      </button>
    </div>
  )
}
