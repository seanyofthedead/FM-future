import type { AuditLogEntry } from '../data/pbcTypes'

const SOURCE_TONE: Record<AuditLogEntry['source'], string> = {
  'Reconciliation Agent': 'bg-brand-navy/10 text-brand-navy',
  Databricks: 'bg-sky-100 text-sky-800',
  'Extraction Agent': 'bg-violet-100 text-violet-800',
  'Validation Engine': 'bg-brand-green/15 text-brand-green',
  Orchestration: 'bg-amber-100 text-amber-800',
  'Audit Ledger': 'bg-slate-200 text-slate-700',
}

// Shot 13: the real, timestamped provenance trail. Every step names its source system.
export function AuditTrail({ entries }: { entries: AuditLogEntry[] }) {
  return (
    <ul className="space-y-2">
      {entries.map((e, i) => (
        <li
          key={e.id}
          className="flex items-start justify-between gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-sm"
          style={{ animation: 'pbcReveal .35s ease both', animationDelay: `${i * 50}ms` }}
        >
          <div>
            <span className={`rounded px-2 py-0.5 text-[11px] font-semibold ${SOURCE_TONE[e.source]}`}>{e.source}</span>
            <span className="ml-2 text-sm text-slate-700">{e.message}</span>
          </div>
          <span className="shrink-0 font-mono text-[11px] text-muted">{e.at}</span>
        </li>
      ))}
    </ul>
  )
}
