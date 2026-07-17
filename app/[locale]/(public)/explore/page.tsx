import type { Metadata } from 'next'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return {
    title:
      locale === 'id'
        ? 'Wisata Sumba Barat — Three Queen Villa'
        : 'Explore West Sumba — Three Queen Villa',
    description:
      locale === 'id'
        ? 'Temukan destinasi wisata terbaik di Sumba Barat: pantai eksotis, air terjun, bukit karst, dan budaya unik. Rekomendasi lengkap untuk liburan Anda.'
        : 'Discover the best tourist destinations in West Sumba: exotic beaches, waterfalls, karst hills, and unique culture. Complete recommendations for your holiday.',
  }
}

const destinations = [
  {
    image:
      'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=800&q=80',
    id: 'Pantai Mandorak',
    en: 'Mandorak Beach',
    id_desc:
      'Pantai dengan tebing karst yang dramatis dan pasir putih. Spot favorit untuk foto dan menikmati sunset. Hanya 10 menit dari villa.',
    en_desc:
      'Beach with dramatic karst cliffs and white sand. Favorite spot for photos and sunset. Just 10 minutes from the villa.',
    distance: '10 menit / 5 km',
  },
  {
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    id: 'Pantai Weekuri',
    en: 'Weekuri Lagoon',
    id_desc:
      'Laguna air asin dengan gradasi warna biru-hijau yang memukau. Tempat sempurna untuk berenang dan snorkeling.',
    en_desc:
      'Saltwater lagoon with stunning blue-green color gradation. Perfect spot for swimming and snorkeling.',
    distance: '30 menit / 18 km',
  },
  {
    image:
      'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&q=80',
    id: 'Air Terjun Matayangu',
    en: 'Matayangu Waterfall',
    id_desc:
      'Air terjun tersembunyi di tengah hutan tropis. Suara gemericik air dan kesegaran alam yang menyegarkan.',
    en_desc:
      'Hidden waterfall in the middle of tropical forest. The sound of water and refreshing nature at its finest.',
    distance: '45 menit / 25 km',
  },
  {
    image:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80',
    id: 'Bukit Warinding',
    en: 'Warinding Hill',
    id_desc:
      'Bukit dengan pemandangan 360° laut Sumba dan perbukitan hijau. Terbaik saat sunrise atau sunset.',
    en_desc:
      'Hill with 360° views of the Sumba sea and green hills. Best at sunrise or sunset.',
    distance: '20 menit / 12 km',
  },
  {
    image:
      'https://images.unsplash.com/photo-1564419320509-7c4c1e2373c3?w=800&q=80',
    id: 'Desa Adat Praijing',
    en: 'Praijing Traditional Village',
    id_desc:
      'Desa adat dengan rumah tradisional Sumba yang masih terjaga. Pelajari budaya dan tradisi lokal yang unik.',
    en_desc:
      'Traditional village with well-preserved Sumbanese traditional houses. Learn about unique local culture and traditions.',
    distance: '40 menit / 22 km',
  },
  {
    image:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    id: 'Pantai Walakiri',
    en: 'Walakiri Beach',
    id_desc:
      'Dikenal dengan pohon mangrove unik di pinggir pantai. Pemandangan super dramatis saat air surut.',
    en_desc:
      'Known for unique mangrove trees along the shore. Super dramatic views at low tide.',
    distance: '50 menit / 30 km',
  },
]

export default async function ExplorePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return (
    <div className="min-h-[100dvh] pt-32 pb-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full border border-zinc-200 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-400">
            {locale === 'id' ? 'Jelajahi' : 'Explore'}
          </span>
          <h1 className="mt-6 font-heading text-3xl font-light leading-tight text-zinc-900 sm:text-4xl lg:text-5xl">
            {locale === 'id'
              ? 'Destinasi Wisata Sumba Barat'
              : 'West Sumba Tourist Destinations'}
          </h1>
          <p className="mt-3 text-sm text-zinc-500">
            {locale === 'id'
              ? 'Jelajahi keindahan alam dan budaya Sumba Barat — semuanya terjangkau dari villa kami'
              : 'Explore the natural beauty and culture of West Sumba — all within easy reach from our villa'}
          </p>
        </div>

        {/* Destinations */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((d) => (
            <article
              key={d.en}
              className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="aspect-[4/3] overflow-hidden bg-zinc-100">
                <img
                  src={d.image}
                  alt={locale === 'id' ? d.id : d.en}
                  className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <h2 className="font-heading text-lg font-medium text-zinc-900">
                  {locale === 'id' ? d.id : d.en}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                  {locale === 'id' ? d.id_desc : d.en_desc}
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs text-zinc-400">
                  <span>📍</span>
                  <span>{locale === 'id' ? `±${d.distance}` : `~${d.distance}`}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
