import { createClient } from '@/lib/supabase/server'
import RoomCard from './room-card'

export default async function RoomPreview({ locale }: { locale: string }) {
  const supabase = await createClient()

  const { data: rooms } = await supabase
    .from('room_types')
    .select('*')
    .order('base_price', { ascending: true })

  if (!rooms || rooms.length === 0) return null

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full border border-zinc-200 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-400">
            {locale === 'id' ? 'Kamar Kami' : 'Our Rooms'}
          </span>
          <h2 className="mt-6 font-heading text-3xl font-light leading-tight text-zinc-900 sm:text-4xl">
            {locale === 'id' ? 'Pilih kamar favorit Anda' : 'Choose your preferred room'}
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room, i) => (
            <RoomCard key={room.id} room={room} index={i} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  )
}
