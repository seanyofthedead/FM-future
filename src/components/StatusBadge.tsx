type Tone = 'navy' | 'green' | 'amber' | 'slate'
const tones: Record<Tone, string> = {
  navy: 'bg-brand-navy text-white',
  green: 'bg-brand-green text-white',
  amber: 'bg-amber-100 text-amber-800',
  slate: 'bg-slate-100 text-slate-700',
}
export function StatusBadge({ children, tone = 'slate' }: { children: React.ReactNode; tone?: Tone }) {
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${tones[tone]}`}>
      {children}
    </span>
  )
}
