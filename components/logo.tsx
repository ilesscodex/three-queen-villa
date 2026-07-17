'use client'

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <rect x="2" y="2" width="32" height="32" rx="8" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M10 26L18 8L26 26"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13 20H23"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <div className="flex flex-col leading-none">
        <span className="text-sm font-semibold tracking-tight">Three Queen</span>
        <span className="text-[11px] font-medium tracking-[0.15em] text-zinc-500 uppercase">
          Villa & Homestay
        </span>
      </div>
    </div>
  )
}
