import Link from 'next/link'

const facilities = [
  { icon: '🛜', id: 'WiFi Cepat', en: 'Free WiFi' },
  { icon: '🍳', id: 'Sarapan Gratis', en: 'Free Breakfast' },
  { icon: '🅿️', id: 'Parkir Luas', en: 'Free Parking' },
  { icon: '🏊', id: 'Kolam Renang', en: 'Swimming Pool' },
  { icon: '🌿', id: 'Taman Tropis', en: 'Tropical Garden' },
  { icon: '🚗', id: 'Antar Jemput Bandara', en: 'Airport Shuttle' },
  { icon: '🧺', id: 'Laundry', en: 'Laundry Service' },
  { icon: '🔒', id: 'Brankas Kamar', en: 'In-room Safe' },
]

const gallery = [
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80',
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
  'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80',
]

export default async function AboutPage({
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
            {locale === 'id' ? 'Tentang Kami' : 'About Us'}
          </span>
          <h1 className="mt-6 font-heading text-3xl font-light leading-tight text-zinc-900 sm:text-4xl lg:text-5xl">
            {locale === 'id'
              ? 'Cerita di Balik Three Queen Villa'
              : 'The Story Behind Three Queen Villa'}
          </h1>
        </div>

        {/* Story */}
        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-100">
            <img
              src="https://images.unsplash.com/photo-1540541338287-41700207dee6?w=900&q=80"
              alt="Three Queen Villa"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-heading text-2xl font-light text-zinc-900">
              {locale === 'id'
                ? 'Surga Tropis di Sumba Barat'
                : 'A Tropical Paradise in West Sumba'}
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-zinc-500">
              <p>
                {locale === 'id'
                  ? 'Terletak di perbukitan hijau Sumba Barat, Three Queen Villa & Homestay adalah tempat di mana tradisi bertemu kenyamanan modern. Kami menghadirkan pengalaman menginap yang autentik dengan arsitektur rumah tradisional Sumba yang dipadukan dengan sentuhan tropis modern.'
                  : 'Nestled in the green hills of West Sumba, Three Queen Villa & Homestay is where tradition meets modern comfort. We offer an authentic stay experience with traditional Sumbanese architecture blended with modern tropical touches.'}
              </p>
              <p>
                {locale === 'id'
                  ? 'Dikelilingi oleh pemandangan laut yang memukau dan alam yang masih asri, setiap sudut villa kami dirancang untuk memberikan ketenangan dan kedamaian. Baik Anda bepergian sendiri, berpasangan, atau bersama keluarga, kami memiliki tipe kamar yang tepat untuk Anda.'
                  : 'Surrounded by stunning ocean views and unspoiled nature, every corner of our villa is designed to provide peace and tranquility. Whether you travel solo, as a couple, or with family, we have the perfect room type for you.'}
              </p>
              <p>
                {locale === 'id'
                  ? 'Kami berkomitmen untuk memberikan pelayanan terbaik dan memastikan setiap tamu merasakan kehangatan keramahan khas Sumba. Selamat datang di rumah kedua Anda.'
                  : 'We are committed to providing the best service and ensuring every guest feels the warmth of Sumbanese hospitality. Welcome to your second home.'}
              </p>
            </div>
          </div>
        </div>

        {/* Facilities */}
        <section className="mt-24">
          <h2 className="font-heading text-2xl font-light text-zinc-900">
            {locale === 'id' ? 'Fasilitas Lengkap' : 'Complete Facilities'}
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {facilities.map((f) => (
              <div
                key={f.id}
                className="flex items-center gap-3 rounded-xl border border-zinc-100 bg-white px-4 py-4"
              >
                <span className="text-xl">{f.icon}</span>
                <span className="text-sm font-medium text-zinc-700">
                  {locale === 'id' ? f.id : f.en}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery */}
        <section className="mt-24">
          <h2 className="font-heading text-2xl font-light text-zinc-900">
            {locale === 'id' ? 'Galeri Villa' : 'Villa Gallery'}
          </h2>
          <div className="mt-8 columns-2 gap-4 sm:columns-3">
            {gallery.map((url, i) => (
              <div key={i} className="mb-4 overflow-hidden rounded-xl bg-zinc-100">
                <img
                  src={url}
                  alt=""
                  className="w-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Location */}
        <section className="mt-24">
          <h2 className="font-heading text-2xl font-light text-zinc-900">
            {locale === 'id' ? 'Lokasi' : 'Location'}
          </h2>
          <p className="mt-2 text-sm text-zinc-500">
            {locale === 'id'
              ? 'Jl. Pantai Mandorak, Desa Tena Teke, Kecamatan Loli, Kabupaten Sumba Barat, NTT'
              : 'Jl. Pantai Mandorak, Tena Teke Village, Loli District, West Sumba Regency, East Nusa Tenggara'}
          </p>
          <div className="mt-4 aspect-video w-full overflow-hidden rounded-2xl bg-zinc-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d252282.41271973985!2d119.3071434!3d-9.678533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2c6f6f6f6f6f6f6f%3A0x6f6f6f6f6f6f6f6f!2sWest%20Sumba%20Regency%2C%20East%20Nusa%20Tenggara!5e0!3m2!1sid!2sid!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Three Queen Villa Location"
            />
          </div>
        </section>

        {/* CTA */}
        <section className="mt-24 rounded-2xl bg-gradient-to-br from-sumba to-sumba-light px-8 py-16 text-center text-white">
          <h2 className="font-heading text-2xl font-light">
            {locale === 'id'
              ? 'Siap Menginap di Three Queen Villa?'
              : 'Ready to Stay at Three Queen Villa?'}
          </h2>
          <p className="mt-3 text-sm text-white/70">
            {locale === 'id'
              ? 'Pesan sekarang dan nikmati pengalaman menginap yang tak terlupakan'
              : 'Book now and enjoy an unforgettable stay experience'}
          </p>
          <Link
            href={`/${locale}/rooms`}
            className="mt-6 inline-block rounded-xl bg-white px-8 py-3 text-sm font-medium text-sumba transition-all hover:bg-white/90"
          >
            {locale === 'id' ? 'Lihat Kamar' : 'View Rooms'}
          </Link>
        </section>
      </div>
    </div>
  )
}
