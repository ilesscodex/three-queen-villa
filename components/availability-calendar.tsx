'use client'

import { useEffect, useState } from 'react'
import { DayPicker } from 'react-day-picker'
import { usePathname } from 'next/navigation'
import { format, addMonths } from 'date-fns'
import { id as idLocale, enUS } from 'date-fns/locale'
import { createClient } from '@/lib/supabase/client'
import 'react-day-picker/style.css'

type Props = {
  roomTypeId: string
  unitCount: number
}

export default function AvailabilityCalendar({ roomTypeId, unitCount }: Props) {
  const pathname = usePathname()
  const locale = pathname.split('/')[1] || 'id'
  const dateLocale = locale === 'id' ? idLocale : enUS
  const [bookedDates, setBookedDates] = useState<Date[]>([])
  const [month, setMonth] = useState<Date>(new Date())

  useEffect(() => {
    const supabase = createClient()

    const fetchBookings = async () => {
      const { data: units } = await supabase
        .from('room_units')
        .select('id')
        .eq('room_type_id', roomTypeId)
        .eq('is_active', true)

      if (!units || units.length === 0) return

      const unitIds = units.map((u: { id: string }) => u.id)

      const startDate = format(new Date(), 'yyyy-MM-dd')
      const endDate = format(addMonths(new Date(), 3), 'yyyy-MM-dd')

      const { data: bookings } = await supabase
        .from('bookings')
        .select('check_in, check_out')
        .in('room_unit_id', unitIds)
        .in('status', ['pending', 'confirmed'])
        .lte('check_in', endDate)
        .gte('check_out', startDate)

      if (!bookings || bookings.length === 0) return

      const dateCount: Record<string, number> = {}

      bookings.forEach((b: { check_in: string; check_out: string }) => {
        const start = new Date(b.check_in)
        const end = new Date(b.check_out)
        for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
          const key = format(d, 'yyyy-MM-dd')
          dateCount[key] = (dateCount[key] || 0) + 1
        }
      })

      const fullDates = Object.entries(dateCount)
        .filter(([, count]) => count >= unitCount)
        .map(([date]) => new Date(date + 'T00:00:00'))

      setBookedDates(fullDates)
    }

    fetchBookings()
  }, [roomTypeId, unitCount])

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6">
      <p className="text-xs font-medium uppercase tracking-[0.15em] text-zinc-400">
        {locale === 'id' ? 'Ketersediaan Kamar' : 'Room Availability'}
      </p>
      <div className="mt-4 flex flex-col gap-6 sm:flex-row">
        <DayPicker
          mode="single"
          month={month}
          onMonthChange={setMonth}
          disabled={{ before: new Date() }}
          modifiers={{
            booked: bookedDates,
          }}
          modifiersStyles={{
            booked: {
              textDecoration: 'line-through',
              color: '#d4d4d4',
              cursor: 'not-allowed',
            },
          }}
          locale={dateLocale}
          className="!m-0"
        />
        <DayPicker
          mode="single"
          month={addMonths(month, 1)}
          onMonthChange={(d) => setMonth(addMonths(d, -1))}
          disabled={{ before: new Date() }}
          modifiers={{
            booked: bookedDates,
          }}
          modifiersStyles={{
            booked: {
              textDecoration: 'line-through',
              color: '#d4d4d4',
              cursor: 'not-allowed',
            },
          }}
          locale={dateLocale}
          className="!m-0"
        />
      </div>
      <div className="mt-4 flex items-center gap-4 text-xs text-zinc-500">
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded border border-zinc-200 bg-white" />
          {locale === 'id' ? 'Tersedia' : 'Available'}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded bg-zinc-100" />
          <span className="line-through">{locale === 'id' ? 'Penuh' : 'Full'}</span>
        </span>
      </div>
    </div>
  )
}
