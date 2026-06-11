import { PRODUCT_NAME, ORG } from '@/lib/brand'

/**
 * Product lockup for the shared header. The mark is the Guidehouse Acon — two
 * pillars converging upward toward an apex (the brand's "North Star"). On the
 * dark header it follows the brand's dark-background treatment: one pillar white,
 * one Guidehouse Green. Colors + type come from the brand tokens in index.css.
 */
export function Brand() {
  return (
    <div className="flex items-center gap-3">
      <svg
        aria-label="Guidehouse"
        role="img"
        width="24"
        height="28"
        viewBox="0 0 22 26"
        fill="none"
        className="shrink-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* left pillar — white on the dark header */}
        <path d="M11 1.5 L11 16 L3.5 24.5 Z" fill="#ffffff" />
        {/* right pillar — Guidehouse Green */}
        <path d="M11 1.5 L18.5 24.5 L11 16 Z" fill="var(--color-brand-lime)" />
      </svg>
      <div className="leading-tight">
        <div className="text-base font-bold tracking-tight text-white">{PRODUCT_NAME}</div>
        <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60">{ORG}</div>
      </div>
    </div>
  )
}
