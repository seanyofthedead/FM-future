export function PageHeader({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      {eyebrow && <div className="text-xs font-semibold uppercase tracking-wide text-brand-green">{eyebrow}</div>}
      <h2 className="text-2xl font-semibold text-brand-navy">{title}</h2>
      {subtitle && <p className="mt-1 max-w-2xl text-sm text-muted">{subtitle}</p>}
    </div>
  )
}
