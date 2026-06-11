import { useState } from 'react'
import { Link } from 'react-router-dom'
import { StatusBadge } from '@/components/StatusBadge'
import { formatCurrency } from '@/lib/format'
import type { ReconRow } from '../data/types'

// Shot 8: a real reconciliation exception with the agent's rationale ("why"), expandable.
export function ExceptionCard({ row, index }: { row: ReconRow; index: number }) {
  const [open, setOpen] = useState(index === 0) // first open for the demo
  return (
    <li
      className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
      style={{ animation: 'pbcReveal .35s ease both', animationDelay: `${index * 60}ms` }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left hover:bg-slate-50"
      >
        <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="font-mono text-sm text-brand-navy">{row.transactionId}</span>
          <span className="text-sm text-slate-600">{row.vendor}</span>
          {row.escalate && <StatusBadge tone="amber">escalated</StatusBadge>}
          <span className="text-sm text-slate-500">{formatCurrency(row.amount)}</span>
          <span className="text-xs text-muted">&Delta; {formatCurrency(row.variance)}</span>
        </span>
        <span className="flex items-center gap-2 text-xs text-muted">
          {Math.round(row.confidence * 100)}% · {row.band}
          <span className={open ? 'rotate-180 transition-transform' : 'transition-transform'}>&#9662;</span>
        </span>
      </button>
      {open && (
        <div className="space-y-2 border-t border-slate-100 bg-brand-sand px-4 py-3">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wide text-brand-green">Agent rationale — why</div>
            <p className="mt-1 text-sm text-slate-700">
              {row.category ? <span className="font-medium">{row.category}. </span> : null}
              {row.commentary || row.aiReason}
            </p>
          </div>
          {row.nextSteps && (
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-brand-navy">Next steps</div>
              <p className="mt-1 text-sm text-slate-700">{row.nextSteps}</p>
            </div>
          )}
          <Link
            to={`/reconciliation/${row.transactionId}`}
            className="inline-block text-sm font-semibold text-brand-green hover:underline"
          >
            Open case &rarr;
          </Link>
        </div>
      )}
    </li>
  )
}
