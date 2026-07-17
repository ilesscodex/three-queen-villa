'use client'

import { useState, useCallback, useEffect } from 'react'

export default function GalleryLightbox({
  photos,
  locale,
}: {
  photos: { id: string; url: string; sort_order: number }[]
  locale: string
}) {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  const next = useCallback(() => setIndex((i) => (i + 1) % photos.length), [photos.length])
  const prev = useCallback(() => setIndex((i) => (i - 1 + photos.length) % photos.length), [photos.length])

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, next, prev])

  return (
    <>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {photos.map((p, i) => (
          <button
            key={p.id}
            onClick={() => {
              setIndex(i)
              setOpen(true)
            }}
            className="aspect-[4/3] overflow-hidden rounded-xl bg-zinc-100 transition-opacity hover:opacity-90"
          >
            <img
              src={p.url}
              alt=""
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setOpen(false)}
        >
          <button
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            ✕
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prev() }}
            className="absolute left-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            ←
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); next() }}
            className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-16"
          >
            →
          </button>

          <img
            src={photos[index].url}
            alt=""
            className="max-h-[85vh] max-w-full rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          <div className="absolute bottom-6 text-xs text-white/60">
            {index + 1} / {photos.length}
          </div>
        </div>
      )}
    </>
  )
}
