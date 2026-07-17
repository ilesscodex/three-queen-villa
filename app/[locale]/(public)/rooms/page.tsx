import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function RoomsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const supabase = await createClient()

  const { data: rooms } = await supabase
    .from('room_types')
    .select('*')
    .order('base_price', { ascending: true })

  return (
    <div className="min-h-[100dvh] pt-32 pb-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full border border-zinc-200 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-400">
            {locale === 'id' ? 'Kamar Kami' : 'Our Rooms'}
          </span>
          <h1 className="mt-6 font-heading text-3xl font-light leading-tight text-zinc-900 sm:text-4xl lg:text-5xl">
            {locale === 'id' ? 'Temukan kamar Anda' : 'Find your room'}
          </h1>
          <p className="mt-3 text-sm text-zinc-500">
            {locale === 'id'
              ? 'Lima tipe kamar dengan karakter unik masing-masing'
              : 'Five room types, each with its own unique character'}
          </p>
        </div>

        {(!rooms || rooms.length === 0) && (
          <p className="mt-12 text-center text-sm text-zinc-400">
            {locale === 'id' ? 'Belum ada kamar tersedia.' : 'No rooms available yet.'}
          </p>
        )}

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {rooms?.map((room) => {
            const name = locale === 'id' ? room.name_id : room.name_en
            const price = new Intl.NumberFormat(locale === 'id' ? 'id-ID' : 'en-US', {
              style: 'currency',
              currency: 'IDR',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(room.base_price)

            return (
              <Link
                key={room.id}
                href={`/${locale}/rooms/${room.slug}`}
                className="group block rounded-2xl border border-zinc-200 bg-white p-1.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex aspect-[4/3] items-center justify-center rounded-xl bg-gradient-to-br from-zinc-100 via-zinc-200 to-zinc-300">
                  <span className="text-5xl opacity-40">🏡</span>
                </div>
                <div className="p-4">
                  <h2 className="font-heading text-lg font-medium text-zinc-900">
                    {name}
                  </h2>
                  <div className="mt-3 flex items-center gap-4 text-xs text-zinc-500">
                    <span>
                      👤 {room.max_guests} {locale === 'id' ? 'Tamu' : 'Guests'}
                    </span>
                    <span>
                      🛏️ {room.bed_type}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm font-semibold text-zinc-900">
                      {price}
                      <span className="text-xs font-normal text-zinc-400">
                        /{locale === 'id' ? 'malam' : 'night'}
                      </span>
                    </span>
                    <span className="text-xs font-medium text-sumba transition-colors group-hover:text-sumba-light">
                      {locale === 'id' ? 'Detail →' : 'Details →'}
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
