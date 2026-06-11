import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Card } from '@/components/Card'
import { StatusBadge } from '@/components/StatusBadge'
import { formatCurrency } from '@/lib/format'
import { ThreeWayMatch } from './components/ThreeWayMatch'
import { useReconData } from './data/useReconData'

// Ported case-detail screen (real data). Storyboard Shot 8: the agent's "why" plus the
// three-way match evidence behind a flagged reconciliation exception.
export default function CaseDetailPage() {
  const { transactionId = '' } = useParams()
  const { rows, loading, error } = useReconData()
  const [decision, setDecision] = useState<null | 'resolved' | 'escalated'>(null)

  const row = rows.find((r) => r.transactionId === transactionId)

  if (loading) return <p className="text-sm text-muted">Loading case…</p>
  if (error) return <p className="text-sm text-rose-700">Couldn&apos;t load case data: {error}</p>
  if (!row) {
    return (
      <div>
        <Link to="/reconciliation" className="text-sm text-brand-green">&larr; Back to reconciliation</Link>
        <p className="mt-4 text-sm text-slate-600">Case {transactionId} not found.</p>
      </div>
    )
  }

  const pct = Math.round(row.confidence * 100)
  const m = row.match
  const runLog = [
    { step: 'Screen', msg: `Screened ${row.transactionId} — variance ${formatCurrency(row.variance)} flagged.` },
    { step: 'Plan', msg: 'Planned a three-way match across purchase order, goods receipt, and general ledger.' },
    { step: 'Retrieve', msg: `Retrieved ${m?.evidenceDocIds.length ?? 0} supporting document(s) with provenance.` },
    { step: 'Verify', msg: `${row.category ?? row.aiReason} — model confidence ${pct}%.` },
    { step: 'Report', msg: row.escalate ? 'Recommended escalation for human review.' : 'Recommended resolution with proposed posting.' },
  ]

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="text-sm text-muted">
            <Link to="/reconciliation" className="hover:underline">Reconciliation</Link> / <span className="font-mono">{row.transactionId}</span>
          </div>
          <h2 className="text-2xl font-semibold text-brand-navy">Case review</h2>
          <p className="text-sm text-slate-600">Single case story and evidence — review, then accept or escalate.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setDecision('resolved')} className="rounded-md bg-brand-green px-4 py-2 text-sm font-semibold text-white hover:bg-brand-green-600">Accept</button>
          <button onClick={() => setDecision('escalated')} className="rounded-md border border-amber-300 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-800 hover:bg-amber-100">Escalate</button>
        </div>
      </header>

      {decision && (
        <div className={`rounded-md px-4 py-3 text-sm ${decision === 'resolved' ? 'border border-brand-green/30 bg-brand-green/10 text-brand-green' : 'border border-amber-200 bg-amber-50 text-amber-800'}`}>
          {decision === 'resolved' ? 'Case accepted and resolved.' : 'Case escalated to the reviewer queue.'} (demo)
        </div>
      )}

      <section className="grid gap-4 md:grid-cols-3">
        <Card title="Transaction">
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-muted">Vendor</dt><dd className="font-medium text-slate-900">{row.vendor}</dd></div>
            <div className="flex justify-between"><dt className="text-muted">Amount</dt><dd className="font-medium text-slate-900">{formatCurrency(row.amount)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted">Variance</dt><dd className="font-medium text-slate-900">{formatCurrency(row.variance)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted">Posted</dt><dd className="text-slate-700">{row.postingDate}</dd></div>
            {m?.nsn && <div className="flex justify-between"><dt className="text-muted">NSN</dt><dd className="font-mono text-xs text-slate-700">{m.nsn}</dd></div>}
            {m?.plant && <div className="flex justify-between"><dt className="text-muted">Plant / UoM</dt><dd className="text-slate-700">{m.plant} · {m.uom}</dd></div>}
          </dl>
        </Card>
        <Card title="Status">
          <div className="space-y-3">
            <StatusBadge tone={row.escalate ? 'amber' : 'navy'}>{row.escalate ? 'Escalated' : row.reviewed ? 'Reviewed' : 'Open'}</StatusBadge>
            <div>
              <div className="mb-1 text-xs text-muted">Match confidence</div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-28 overflow-hidden rounded-full bg-slate-100">
                  <div className={`h-full ${row.band === 'low' ? 'bg-rose-400' : row.band === 'medium' ? 'bg-amber-400' : 'bg-brand-green'}`} style={{ width: `${pct}%` }} />
                </div>
                <span className="text-sm font-semibold text-slate-700">{pct}% · {row.band}</span>
              </div>
            </div>
          </div>
        </Card>
        <Card title="Root cause">
          <div className="text-sm">
            {row.category && <div className="font-semibold text-brand-navy">{row.category}</div>}
            <p className="mt-1 text-slate-700">{row.commentary || row.aiReason}</p>
          </div>
        </Card>
      </section>

      {m && (
        <Card title="Three-way match evidence">
          <ThreeWayMatch match={m} />
        </Card>
      )}

      {(row.nextSteps || (m?.evidenceDocIds?.length ?? 0) > 0) && (
        <Card title="Recommended next steps">
          {row.nextSteps && <p className="text-sm text-slate-700">{row.nextSteps}</p>}
          {m && m.evidenceDocIds.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {m.evidenceDocIds.map((d) => (
                <span key={d} className="rounded bg-slate-100 px-2 py-0.5 font-mono text-[11px] text-slate-600">{d}</span>
              ))}
            </div>
          )}
        </Card>
      )}

      <Card title="Run log">
        <ol className="space-y-3">
          {runLog.map((e, i) => (
            <li key={e.step} className="flex gap-3">
              <span className="flex flex-col items-center">
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-brand-green/40 bg-brand-green/10 text-[11px] font-bold text-brand-green">{i + 1}</span>
                {i < runLog.length - 1 && <span className="h-full w-px bg-slate-200" />}
              </span>
              <span className="pb-1">
                <span className="text-sm font-semibold text-brand-navy">{e.step}</span>
                <span className="block text-sm text-slate-600">{e.msg}</span>
              </span>
            </li>
          ))}
        </ol>
      </Card>
    </div>
  )
}
