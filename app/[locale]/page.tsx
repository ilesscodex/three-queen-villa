import HeroSection from '@/components/hero-section'
import HighlightSection from '@/components/highlight-section'
import RoomPreview from '@/components/room-preview'
import FacilitiesSection from '@/components/facilities-section'
import TestimonialsSection from '@/components/testimonials-section'
import CtaSection from '@/components/cta-section'

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return (
    <>
      <HeroSection />
      <HighlightSection />
      <RoomPreview locale={locale} />
      <FacilitiesSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  )
}
