import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { StatusBadge } from '@/components/StatusBadge'
import { formatCurrency } from '@/lib/format'
import { DEMO_ANCHOR, FROM_PARAM } from '@/lib/bridge'

// Shot 9: clean, reconciled record set = audit-ready output with download/share affordances
// and a brief "exported" toast. The handoff also carries ONE real reconciled record (the demo
// anchor) into PBC, so the same ID the agent reconciled is the evidence the auditor receives.
export function AuditReadyOutput({ matched, exceptions, guided = false }: { matched: number; exceptions: number; guided?: boolean }) {
  const pbcHref = `/pbc?${FROM_PARAM}=${DEMO_ANCHOR.transactionId}${guided ? '&autorun=1' : ''}`
  const [toast, setToast] = useState<string | null>(null)
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  function fireToast(msg: string) {
    if (toastTimer.current) clearTimeout(toastTimer.current)
    setToast(msg)
    toastTimer.current = setTimeout(() => setToast(null), 2400)
  }

  // Guided capture: surface the "exported" confirmation automatically (Shot 9 asks for it).
  useEffect(() => {
    if (guided) fireToast('Reconciliation exported — audit-ready file saved.')
    return () => { if (toastTimer.current) clearTimeout(toastTimer.current) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guided])

  return (
    <div className="rounded-xl border border-brand-navy/20 bg-white p-5 shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-brand-green">Audit-ready output</div>
          <h3 className="text-lg font-semibold text-brand-navy">Clean reconciliation, ready for the auditor</h3>
          <p className="mt-1 text-sm text-slate-600">
            {matched} records reconciled · {exceptions} exceptions routed to review. Defensible source data,
            ready the moment an auditor asks.
          </p>
        </div>
        <StatusBadge tone="green">ready</StatusBadge>
      </div>

      {/* The specific record that travels into PBC — names the handoff so it isn't abstract. */}
      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-md border border-slate-100 bg-brand-sand px-3 py-2 text-sm">
        <span className="font-mono text-brand-navy">{DEMO_ANCHOR.transactionId}</span>
        <span className="text-slate-600">{DEMO_ANCHOR.vendor}</span>
        <span className="text-slate-500">{formatCurrency(DEMO_ANCHOR.amount)}</span>
        <StatusBadge tone="green">three-way matched · {Math.round(DEMO_ANCHOR.confidence * 100)}%</StatusBadge>
        <span className="text-xs text-muted">→ sending to the auditor as supporting evidence</span>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Link
          to={pbcHref}
          className="inline-block rounded-md bg-brand-navy px-4 py-2 text-sm font-semibold text-white hover:bg-brand-navy-700"
        >
          Send {DEMO_ANCHOR.transactionId} to PBC Request Agent &rarr;
        </Link>
        <button
          onClick={() => fireToast('Reconciliation exported — audit-ready file saved.')}
          className="rounded-md border border-brand-navy/30 px-4 py-2 text-sm font-semibold text-brand-navy hover:bg-brand-navy/5"
        >
          Export
        </button>
        <button
          onClick={() => fireToast('Shared with the audit team.')}
          className="rounded-md border border-brand-navy/30 px-4 py-2 text-sm font-semibold text-brand-navy hover:bg-brand-navy/5"
        >
          Share
        </button>
      </div>

      {/* Brief 'exported' toast (Shot 9). */}
      {toast && (
        <div
          className="mt-3 inline-flex items-center gap-2 rounded-md border border-brand-green/40 bg-brand-green/10 px-3 py-1.5 text-sm font-medium text-brand-green"
          style={{ animation: 'pbcReveal .25s ease both' }}
          role="status"
        >
          <span aria-hidden>✓</span> {toast}
        </div>
      )}
    </div>
  )
}
