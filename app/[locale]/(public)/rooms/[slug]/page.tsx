import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function RoomDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const supabase = await createClient()

  const { data: room } = await supabase
    .from('room_types')
    .select(
      `*,
      room_photos(*),
      rate_plans(*),
      room_units(*)`
    )
    .eq('slug', slug)
    .single()

  if (!room) notFound()

  const name = locale === 'id' ? room.name_id : room.name_en
  const description = locale === 'id' ? room.description_id : room.description_en
  const price = new Intl.NumberFormat(locale === 'id' ? 'id-ID' : 'en-US', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(room.base_price)

  const photo = room.room_photos?.[0]?.url

  return (
    <div className="min-h-[100dvh]">
      {/* Hero */}
      <section className="relative flex h-[60dvh] min-h-[400px] items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-950"
        />
        {photo && (
          <img
            src={photo}
            alt={name}
            className="absolute inset-0 h-full w-full object-cover opacity-60"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="relative z-10 w-full px-6 pb-12 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-6xl">
            <Link
              href={`/${locale}/rooms`}
              className="mb-4 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.15em] text-white/70 transition-colors hover:text-white"
            >
              ← {locale === 'id' ? 'Kembali ke kamar' : 'Back to rooms'}
            </Link>
            <h1 className="font-heading text-4xl font-light text-white sm:text-5xl lg:text-6xl">
              {name}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/80">
              <span>{room.bed_type}</span>
              <span className="h-1 w-1 rounded-full bg-white/40" />
              <span>
                {locale === 'id' ? 'hingga' : 'Up to'} {room.max_guests}{' '}
                {locale === 'id' ? 'tamu' : 'guests'}
              </span>
              <span className="h-1 w-1 rounded-full bg-white/40" />
              <span className="text-base font-semibold text-gold">{price}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-3">
          {/* Main */}
          <div className="lg:col-span-2 lg:pr-8">
            <div className="prose prose-zinc max-w-none">
              <p className="text-base leading-relaxed text-zinc-600">
                {description}
              </p>
            </div>

            {/* Gallery */}
            {room.room_photos && room.room_photos.length > 1 && (
              <div className="mt-12">
                <h2 className="font-heading text-xl font-medium text-zinc-900">
                  {locale === 'id' ? 'Galeri' : 'Gallery'}
                </h2>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {room.room_photos.map(
                    (p: { id: string; url: string; sort_order: number }) => (
                      <div
                        key={p.id}
                        className="aspect-[4/3] overflow-hidden rounded-xl bg-zinc-100"
                      >
                        <img
                          src={p.url}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-8 lg:border-l lg:border-zinc-100 lg:pl-8">
            {/* Price Card */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-6">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-zinc-400">
                {locale === 'id' ? 'Harga per malam' : 'Price per night'}
              </p>
              <p className="mt-2 font-heading text-3xl font-light text-zinc-900">
                {price}
              </p>

              {/* Rate Plans */}
              {room.rate_plans && room.rate_plans.length > 0 && (
                <div className="mt-4 space-y-2 border-t border-zinc-100 pt-4">
                  <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-zinc-400">
                    {locale === 'id' ? 'Harga musiman' : 'Seasonal pricing'}
                  </p>
                  {room.rate_plans.map(
                    (plan: {
                      id: string
                      start_date: string
                      end_date: string
                      price_override: number
                      label: string
                    }) => (
                      <div
                        key={plan.id}
                        className="flex items-center justify-between text-xs"
                      >
                        <span className="text-zinc-500">
                          {plan.label || `${plan.start_date} – ${plan.end_date}`}
                        </span>
                        <span className="font-medium text-zinc-800">
                          {new Intl.NumberFormat(
                            locale === 'id' ? 'id-ID' : 'en-US',
                            {
                              style: 'currency',
                              currency: 'IDR',
                              minimumFractionDigits: 0,
                            }
                          ).format(plan.price_override)}
                        </span>
                      </div>
                    )
                  )}
                </div>
              )}

              <div className="mt-6 space-y-3">
                <a
                  href={`https://wa.me/6281234567890?text=${encodeURIComponent(locale === 'id' ? `Halo, saya ingin memesan ${name}` : `Hello, I'd like to book ${name}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full rounded-xl bg-sumba px-6 py-3 text-center text-sm font-medium text-white transition-all hover:bg-sumba-light"
                >
                  {locale === 'id' ? 'Pesan via WhatsApp' : 'Book via WhatsApp'}
                </a>
                <Link
                  href={`/${locale}/booking?room=${slug}`}
                  className="block w-full rounded-xl border border-zinc-200 px-6 py-3 text-center text-sm font-medium text-zinc-700 transition-all hover:border-zinc-300 hover:bg-zinc-50"
                >
                  {locale === 'id' ? 'Pesan Online' : 'Book Online'}
                </Link>
              </div>
            </div>

            {/* Room Units */}
            {room.room_units && room.room_units.length > 0 && (
              <div className="rounded-2xl border border-zinc-200 bg-white p-6">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-zinc-400">
                  {locale === 'id' ? 'Unit tersedia' : 'Available units'}
                </p>
                <div className="mt-3 space-y-2">
                  {room.room_units.map(
                    (unit: { id: string; unit_code: string }) => (
                      <div
                        key={unit.id}
                        className="flex items-center justify-between rounded-lg border border-zinc-100 px-4 py-2.5 text-sm"
                      >
                        <span className="font-mono text-zinc-700">
                          {unit.unit_code}
                        </span>
                        <span className="text-[10px] font-medium uppercase tracking-wider text-green-600">
                          {locale === 'id' ? 'Tersedia' : 'Available'}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  )
}
