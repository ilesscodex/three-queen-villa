import Link from 'next/link'

export default async function ContactPage({
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
            {locale === 'id' ? 'Kontak' : 'Contact'}
          </span>
          <h1 className="mt-6 font-heading text-3xl font-light leading-tight text-zinc-900 sm:text-4xl lg:text-5xl">
            {locale === 'id' ? 'Hubungi Kami' : 'Get in Touch'}
          </h1>
          <p className="mt-3 text-sm text-zinc-500">
            {locale === 'id'
              ? 'Ada pertanyaan? Kami siap membantu Anda'
              : 'Have a question? We are here to help'}
          </p>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6">
              <h2 className="font-heading text-lg font-medium text-zinc-900">
                {locale === 'id' ? 'Info Kontak' : 'Contact Info'}
              </h2>
              <div className="mt-6 space-y-5">
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 text-lg">📍</span>
                  <div>
                    <p className="text-sm font-medium text-zinc-900">
                      {locale === 'id' ? 'Alamat' : 'Address'}
                    </p>
                    <p className="mt-0.5 text-sm text-zinc-500">
                      {locale === 'id'
                        ? 'Jl. Pantai Mandorak, Desa Tena Teke, Kecamatan Loli, Kabupaten Sumba Barat, NTT'
                        : 'Jl. Pantai Mandorak, Tena Teke Village, Loli District, West Sumba Regency, NTT'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 text-lg">📞</span>
                  <div>
                    <p className="text-sm font-medium text-zinc-900">Phone</p>
                    <a
                      href="tel:+6281234567890"
                      className="mt-0.5 block text-sm text-zinc-500 transition-colors hover:text-sumba"
                    >
                      +62 812-3456-7890
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 text-lg">✉️</span>
                  <div>
                    <p className="text-sm font-medium text-zinc-900">Email</p>
                    <a
                      href="mailto:info@threequeenvilla.com"
                      className="mt-0.5 block text-sm text-zinc-500 transition-colors hover:text-sumba"
                    >
                      info@threequeenvilla.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 text-lg">💬</span>
                  <div>
                    <p className="text-sm font-medium text-zinc-900">WhatsApp</p>
                    <a
                      href="https://wa.me/6281234567890"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-0.5 block text-sm text-zinc-500 transition-colors hover:text-sumba"
                    >
                      +62 812-3456-7890
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-6">
              <h2 className="font-heading text-lg font-medium text-zinc-900">
                {locale === 'id' ? 'Media Sosial' : 'Social Media'}
              </h2>
              <div className="mt-4 flex gap-3">
                <a
                  href="https://instagram.com/threequeenvilla"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 text-sm transition-all hover:border-sumba hover:text-sumba"
                >
                  IG
                </a>
                <a
                  href="https://facebook.com/threequeenvilla"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 text-sm transition-all hover:border-sumba hover:text-sumba"
                >
                  FB
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8">
            <h2 className="font-heading text-lg font-medium text-zinc-900">
              {locale === 'id' ? 'Kirim Pesan' : 'Send a Message'}
            </h2>
            <form
              className="mt-6 space-y-5"
              onSubmit={(e) => e.preventDefault()}
            >
              <div>
                <label
                  htmlFor="name"
                  className="text-xs font-medium uppercase tracking-[0.1em] text-zinc-400"
                >
                  {locale === 'id' ? 'Nama' : 'Name'}
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  className="mt-1.5 block w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none transition-all focus:border-sumba focus:ring-1 focus:ring-sumba"
                  placeholder={locale === 'id' ? 'Nama Anda' : 'Your name'}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="text-xs font-medium uppercase tracking-[0.1em] text-zinc-400"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="mt-1.5 block w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none transition-all focus:border-sumba focus:ring-1 focus:ring-sumba"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="text-xs font-medium uppercase tracking-[0.1em] text-zinc-400"
                >
                  {locale === 'id' ? 'Pesan' : 'Message'}
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  className="mt-1.5 block w-full resize-none rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none transition-all focus:border-sumba focus:ring-1 focus:ring-sumba"
                  placeholder={
                    locale === 'id'
                      ? 'Tulis pesan Anda...'
                      : 'Write your message...'
                  }
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-xl bg-sumba px-6 py-3 text-sm font-medium text-white transition-all hover:bg-sumba-light"
              >
                {locale === 'id' ? 'Kirim Pesan' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>

        {/* Map */}
        <section className="mt-16">
          <h2 className="font-heading text-xl font-light text-zinc-900">
            {locale === 'id' ? 'Lokasi Kami' : 'Our Location'}
          </h2>
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
      </div>
    </div>
  )
}
