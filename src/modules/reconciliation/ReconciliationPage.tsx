import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PageHeader } from '@/components/PageHeader'
import { Card } from '@/components/Card'
import { StatusBadge } from '@/components/StatusBadge'
import { ExceptionCard } from './components/ExceptionCard'
import { AuditReadyOutput } from './components/AuditReadyOutput'
import { useReconData } from './data/useReconData'

type Phase = 'idle' | 'running' | 'done'
const SOURCES = [
  { name: 'Purchase Orders', label: 'PO', delta: 0 },
  { name: 'Goods Receipts', label: 'GR', delta: -2 },
  { name: 'General Ledger', label: 'GL', delta: 0 },
]

// Storyboard Shots 7-10 — now backed by the real Agentic Recon CSV data.
export default function ReconciliationPage() {
  const { rows, loading, error } = useReconData()
  const [searchParams] = useSearchParams()
  const autorun = searchParams.get('autorun') === '1'
  const [phase, setPhase] = useState<Phase>('idle')
  const [progress, setProgress] = useState(0)
  const autoRanRef = useRef(false)
  const outputRef = useRef<HTMLDivElement>(null)

  const total = rows.length
  const exceptions = rows.filter((r) => r.escalate)
  const reconciled = total - exceptions.length

  // Guided demo: auto-start the run once data is loaded, so the presenter doesn't click-and-wait.
  useEffect(() => {
    if (autorun && !autoRanRef.current && phase === 'idle' && !loading && total > 0) {
      autoRanRef.current = true
      setPhase('running')
    }
  }, [autorun, loading, total, phase])

  // Guided demo: bring the audit-ready output (and its "Send to PBC" CTA) into view on finish.
  useEffect(() => {
    if (autorun && phase === 'done') outputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [autorun, phase])

  useEffect(() => {
    if (phase !== 'running') return
    setProgress(0)
    const started = Date.now()
    const DURATION = 1900
    const id = setInterval(() => {
      const pct = Math.min(100, Math.round(((Date.now() - started) / DURATION) * 100))
      setProgress(pct)
      if (pct >= 100) {
        clearInterval(id)
        setPhase('done')
      }
    }, 80)
    return () => clearInterval(id)
  }, [phase])

  const scanned = Math.round((progress / 100) * total)

  return (
    <div>
      <PageHeader
        eyebrow="Agentic Reconciliation"
        title="Reconciliation, on autopilot"
        subtitle="Point the agents at two or more source datasets; they match records, surface mismatches, and explain why — so your team reviews exceptions, not entire ledgers."
      />

      {error && <div className="mb-4 rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">Couldn&apos;t load reconciliation data: {error}</div>}

      <div className="grid gap-4 lg:grid-cols-3">
        <Card title="Source datasets">
          <ul className="space-y-2">
            {SOURCES.map((d) => (
              <li key={d.label} className="flex items-center justify-between rounded-md border border-slate-100 px-3 py-2">
                <span className="text-sm text-slate-700">
                  <span className="font-medium text-brand-navy">{d.name}</span> <span className="text-muted">({d.label})</span>
                </span>
                <span className="font-mono text-xs text-muted">{loading ? '…' : (total + d.delta).toLocaleString()} records</span>
              </li>
            ))}
          </ul>
          <button
            onClick={() => setPhase('running')}
            disabled={phase === 'running' || loading || total === 0}
            className="mt-3 w-full rounded-md bg-brand-navy px-3 py-2 text-sm font-semibold text-white hover:bg-brand-navy-700 disabled:opacity-50"
          >
            {loading ? 'Loading data…' : phase === 'idle' ? 'Run reconciliation' : phase === 'running' ? 'Reconciling…' : 'Run again'}
          </button>
        </Card>

        <Card title="Reconciliation job">
          {phase === 'idle' && <p className="text-sm text-muted">Run the job to match records across the source systems.</p>}
          {phase === 'running' && (
            <div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div className="h-full bg-brand-green transition-all" style={{ width: `${progress}%` }} />
              </div>
              <p className="mt-2 text-sm text-slate-600">Matching {scanned.toLocaleString()} / {total.toLocaleString()} records…</p>
            </div>
          )}
          {phase === 'done' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between"><span className="text-sm text-slate-600">Reconciled</span><span className="font-semibold text-brand-navy">{reconciled.toLocaleString()}</span></div>
              <div className="flex items-center justify-between"><span className="text-sm text-slate-600">Exceptions</span><StatusBadge tone="amber">{exceptions.length} to review</StatusBadge></div>
              <p className="text-xs text-muted">Your team reviews {exceptions.length} exceptions — not {total.toLocaleString()} rows.</p>
            </div>
          )}
        </Card>

        <Card title="Status">
          {phase === 'done'
            ? <p className="text-sm text-slate-600">Clean reconciliation complete. See the audit-ready output below.</p>
            : <p className="text-sm text-muted">Audit-ready output appears when the job completes.</p>}
        </Card>
      </div>

      {phase === 'done' && (
        <>
          <Card title="Review queue — exceptions only" right={<StatusBadge tone="amber">{exceptions.length} exceptions</StatusBadge>}>
            <ul className="space-y-2">
              {exceptions.slice(0, 12).map((row, i) => (
                <ExceptionCard key={row.transactionId} row={row} index={i} />
              ))}
            </ul>
            {exceptions.length > 12 && (
              <p className="mt-2 text-xs text-muted">Showing 12 of {exceptions.length} exceptions.</p>
            )}
          </Card>
          <div className="mt-4" ref={outputRef}>
            <AuditReadyOutput matched={reconciled} exceptions={exceptions.length} guided={autorun} />
          </div>
        </>
      )}
    </div>
  )
}
