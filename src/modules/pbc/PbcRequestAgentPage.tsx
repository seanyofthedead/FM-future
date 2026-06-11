import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { FROM_PARAM } from '@/lib/bridge'
import { PageHeader } from '@/components/PageHeader'
import { Card } from '@/components/Card'
import { StatusBadge } from '@/components/StatusBadge'
import { AuditTrail } from './components/AuditTrail'
import { initialDocuments } from './data/documents'
import { validate, formatCurrency } from './data/validate'
import { buildAuditTrail } from './data/auditTrail'
import type { AuditLogEntry, PbcDocument, ValidationResult } from './data/pbcTypes'

type Phase = 'idle' | 'running' | 'done'
const REVEAL_MS = 420
const riskTone = (r: PbcDocument['riskLevel']): 'amber' | 'green' => (r === 'High' || r === 'Medium' ? 'amber' : 'green')

// The operator's natural-language ask (Shot 11). Prefilled from the linked record so the demo
// reads as "operator types a request" without forcing live typing on camera.
function buildRequestText(d: PbcDocument): string {
  const tx = d.linkedReconciliation?.transactionId
  return tx
    ? `Retrieve the supporting evidence package for reconciled transaction ${tx} (${d.linkedReconciliation!.vendor}), audit period ${d.periodCovered.start} – ${d.periodCovered.end}.`
    : `Retrieve the supporting evidence for ${d.title} (${d.id}).`
}

// Storyboard Shots 11-14, now on the real PBC validation engine + Power-Platform audit trail.
export default function PbcRequestAgentPage() {
  const docs = initialDocuments
  const [searchParams] = useSearchParams()
  const fromTx = searchParams.get(FROM_PARAM)
  const autorun = searchParams.get('autorun') === '1'
  const autoRanRef = useRef(false)
  // If we arrived from Reconciliation (?from=TX-…), open the matching linked request so the
  // same record the agent reconciled is the one the auditor receives.
  const linkedDoc = docs.find((d) => d.linkedReconciliation?.transactionId === fromTx)
  const [selectedId, setSelectedId] = useState(linkedDoc?.id ?? docs[0].id)
  const [phase, setPhase] = useState<Phase>('idle')
  const [revealed, setRevealed] = useState(0)
  const [result, setResult] = useState<ValidationResult | null>(null)
  const [trail, setTrail] = useState<AuditLogEntry[]>([])

  const doc = useMemo(() => docs.find((d) => d.id === selectedId)!, [docs, selectedId])
  const [requestText, setRequestText] = useState(() => buildRequestText(linkedDoc ?? docs[0]))
  const [submittedRequest, setSubmittedRequest] = useState<string | null>(null)

  // Keep selection in sync if the handoff param arrives/changes while mounted.
  useEffect(() => {
    if (linkedDoc && linkedDoc.id !== selectedId) selectDoc(linkedDoc.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromTx])

  // Guided demo: auto-validate the pre-selected request after a beat (no manual click, no dead air).
  // The run-once guard lives inside the timeout so StrictMode's mount/cleanup/mount cycle
  // (which clears the first timer) can't suppress the run.
  useEffect(() => {
    if (!autorun || phase !== 'idle') return
    const t = setTimeout(() => {
      if (autoRanRef.current) return
      autoRanRef.current = true
      submitTypedRequest()
    }, 1200)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autorun, phase])

  useEffect(() => {
    if (phase !== 'running') return
    const timers: ReturnType<typeof setTimeout>[] = []
    trail.forEach((_, i) => timers.push(setTimeout(() => setRevealed(i + 1), REVEAL_MS * (i + 1))))
    timers.push(setTimeout(() => setPhase('done'), REVEAL_MS * (trail.length + 1)))
    return () => timers.forEach(clearTimeout)
  }, [phase, trail])

  function runValidation(target: PbcDocument = doc) {
    const r = validate(target)
    setResult(r)
    setTrail(buildAuditTrail(target, r))
    setRevealed(0)
    setPhase('running')
  }
  // Interpret the typed request → route to the matching reconciled record, then validate.
  function resolveTarget(text: string): PbcDocument {
    const tx = text.match(/TX-\d+/i)?.[0]?.toUpperCase()
    if (tx) {
      const byLink = docs.find((d) => d.linkedReconciliation?.transactionId.toUpperCase() === tx)
      if (byLink) return byLink
    }
    const pbc = text.match(/PBC-\d+/i)?.[0]?.toUpperCase()
    if (pbc) {
      const byId = docs.find((d) => d.id.toUpperCase() === pbc)
      if (byId) return byId
    }
    return linkedDoc ?? doc
  }
  function submitTypedRequest() {
    const target = resolveTarget(requestText)
    setSelectedId(target.id)
    setSubmittedRequest(requestText.trim())
    runValidation(target)
  }
  function selectDoc(id: string) {
    const d = docs.find((x) => x.id === id)!
    setSelectedId(id)
    setRequestText(buildRequestText(d))
    setSubmittedRequest(null)
    setPhase('idle')
    setResult(null)
    setTrail([])
    setRevealed(0)
  }

  const f = doc.financialData
  const accepted = result?.decision === 'AUTO_ACCEPT'

  return (
    <div>
      <PageHeader
        eyebrow="PBC Request Agent"
        title="Agentic record requests, packaged for the auditor"
        subtitle="An auditor requests supporting evidence; the agent retrieves the reconciliation package across the connected systems, runs the Early Validation Gate, and assembles an auditor-ready package — with a full provenance trail."
      />

      {/* The spine: this request is the evidence the agent produced upstream in Reconciliation. */}
      {doc.linkedReconciliation && (
        <div className="mb-4 flex flex-col gap-1 rounded-lg border border-brand-navy/20 bg-brand-navy/5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-slate-700">
            <StatusBadge tone="navy">From Reconciliation</StatusBadge>
            <span className="ml-2">
              This is the auditor&apos;s request for{' '}
              <span className="font-mono text-brand-navy">{doc.linkedReconciliation.transactionId}</span> — the same
              record the agent reconciled ({doc.linkedReconciliation.vendor},{' '}
              {Math.round(doc.linkedReconciliation.confidence * 100)}% confidence).
            </span>
          </div>
          <Link
            to={`/reconciliation/${doc.linkedReconciliation.transactionId}`}
            className="shrink-0 text-sm font-semibold text-brand-green hover:underline"
          >
            View reconciliation &rarr;
          </Link>
        </div>
      )}

      {/* Shot 11: an operator types a request; the agent interprets and routes it. */}
      <Card title="Submit a request">
        <p className="mb-2 text-sm text-muted">
          An operator describes the supporting record they need. The agent interprets the request, retrieves the
          reconciled artifacts across the connected systems, and runs the Early Validation Gate.
        </p>
        <textarea
          value={requestText}
          onChange={(e) => setRequestText(e.target.value)}
          rows={2}
          className="w-full resize-none rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:border-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-navy"
          placeholder="e.g., Retrieve the supporting evidence for reconciled transaction TX-1000043…"
        />
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <button
            onClick={submitTypedRequest}
            disabled={phase === 'running' || !requestText.trim()}
            className="rounded-md bg-brand-navy px-4 py-2 text-sm font-semibold text-white hover:bg-brand-navy-700 disabled:opacity-50"
          >
            {phase === 'running' ? 'Agent working…' : 'Submit request →'}
          </button>
          {submittedRequest && phase !== 'idle' && (
            <span className="text-xs text-muted">
              Interpreted &amp; routed to <span className="font-mono text-brand-navy">{doc.id}</span>
              {doc.linkedReconciliation && (
                <> · <span className="font-mono text-brand-navy">{doc.linkedReconciliation.transactionId}</span></>
              )}
            </span>
          )}
        </div>
      </Card>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        {/* Shots 11-12: the real request queue */}
        <Card title="Request queue">
          <ul className="space-y-1">
            {docs.map((d) => (
              <li key={d.id}>
                <button
                  onClick={() => selectDoc(d.id)}
                  className={[
                    'w-full rounded-md border px-3 py-2 text-left transition-colors',
                    d.id === selectedId ? 'border-brand-navy bg-brand-navy/5' : 'border-slate-200 hover:bg-slate-50',
                  ].join(' ')}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-brand-navy">{d.id}</span>
                    <StatusBadge tone={riskTone(d.riskLevel)}>{d.riskLevel}</StatusBadge>
                  </div>
                  <div className="text-sm text-slate-700">{d.title}</div>
                  {d.linkedReconciliation && (
                    <div className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-brand-green">
                      ↳ from reconciliation · {d.linkedReconciliation.transactionId}
                    </div>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </Card>

        {/* Selected document + run */}
        <Card title="Selected request" right={<StatusBadge tone="navy">{doc.id}</StatusBadge>}>
          <div className="mb-2 rounded-md border border-brand-navy/15 bg-brand-navy/5 px-2.5 py-1.5 text-xs text-slate-600">
            <span className="font-semibold text-brand-navy">Auditor request</span> · {doc.auditorName} requested this supporting evidence (due {doc.dueDate}).
          </div>
          <div className="text-sm text-slate-700">{doc.title}</div>
          <dl className="mt-2 space-y-1 text-sm">
            <div className="flex justify-between"><dt className="text-muted">POC</dt><dd className="text-slate-700">{doc.pocName}</dd></div>
            <div className="flex justify-between"><dt className="text-muted">Auditor</dt><dd className="text-slate-700">{doc.auditorName}</dd></div>
            <div className="flex justify-between"><dt className="text-muted">Period</dt><dd className="text-slate-700">{doc.periodCovered.start} – {doc.periodCovered.end}</dd></div>
            <div className="flex justify-between"><dt className="text-muted">GL · matched source</dt><dd className="text-slate-700">{formatCurrency(f.glBalance)} / {formatCurrency(f.bankBalance)}</dd></div>
          </dl>
          {phase === 'done' && (
            <button
              onClick={() => runValidation()}
              className="mt-3 w-full rounded-md border border-brand-navy/30 px-3 py-2 text-sm font-semibold text-brand-navy hover:bg-brand-navy/5"
            >
              Re-run validation
            </button>
          )}
        </Card>

        {/* Decision */}
        <Card title="Decision">
          {phase !== 'done' || !result ? (
            <p className="text-sm text-muted">Submit a request to run the Early Validation Gate.</p>
          ) : (
            <div className="space-y-2">
              <StatusBadge tone={accepted ? 'green' : 'amber'}>{result.decision.replace('_', ' ')}</StatusBadge>
              <div className="text-sm text-slate-700">{Math.round(result.confidence * 100)}% confidence</div>
              <p className="text-sm text-slate-600">{result.explanation}</p>
              <p className="text-xs text-muted">{result.recommendedAction}</p>
            </div>
          )}
        </Card>
      </div>

      {/* Shot 12: agent reasoning / provenance trail */}
      {phase !== 'idle' && (
        <div className="mt-4">
          <Card title="Agent reasoning · provenance trail" right={revealed > 0 ? <StatusBadge tone="green">every step logged</StatusBadge> : undefined}>
            <AuditTrail entries={trail.slice(0, revealed)} />
          </Card>
        </div>
      )}

      {/* Shot 12: retrieved sources surface as cards — every record traceable to its system. */}
      {phase !== 'idle' && doc.linkedReconciliation && (
        <div className="mt-4">
          <Card title="Retrieved sources" right={<StatusBadge tone="green">Every record traceable</StatusBadge>}>
            <div className="grid gap-2 sm:grid-cols-3">
              {doc.linkedReconciliation.lines.map((l, i) => (
                <div
                  key={l.traceId}
                  className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm"
                  style={{ animation: 'pbcReveal .35s ease both', animationDelay: `${i * 140}ms` }}
                >
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-brand-green">{l.sourceSystem}</div>
                  <div className="mt-1 font-mono text-sm text-brand-navy">{l.traceId}</div>
                  <div className="text-sm text-slate-600">{formatCurrency(l.amount)}</div>
                  <div className="mt-1 text-[11px] text-muted">retrieved &amp; matched</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Validation checks */}
      {phase === 'done' && result && (
        <div className="mt-4">
        <Card title="Early Validation Gate — checks">
          <ul className="space-y-2">
            {result.checks.map((c) => (
              <li key={c.id} className="flex items-start justify-between gap-3 rounded-md border border-slate-100 px-3 py-2">
                <div>
                  <div className="text-sm font-semibold text-brand-navy">{c.name}</div>
                  <div className="text-sm text-slate-600">{c.detail}</div>
                </div>
                <StatusBadge tone={c.passed ? 'green' : 'amber'}>{c.passed ? 'pass' : 'fail'}</StatusBadge>
              </li>
            ))}
          </ul>
        </Card>
        </div>
      )}

      {/* Shot 14: auditor-ready package (accept) or resubmission loop (reject) */}
      {phase === 'done' && result && (
        <div className="mt-4">
          {accepted ? (
            <div className="overflow-hidden rounded-xl border border-brand-navy/20 bg-white shadow-md">
              <div className="flex items-start justify-between gap-4 border-b border-slate-100 bg-brand-sand px-5 py-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-brand-green">Auditor-ready package</div>
                  <h3 className="text-lg font-semibold text-brand-navy">{doc.title}</h3>
                  <div className="mt-0.5 font-mono text-xs text-slate-600">{doc.id} · period {doc.periodCovered.start} – {doc.periodCovered.end}</div>
                </div>
                <span className="shrink-0 rounded-md border border-brand-green/40 bg-brand-green/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-green">Defensible</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-1 border-b border-slate-100 px-5 py-3 text-sm">
                <span className="text-slate-500 line-through">Before: ~3 days of back-and-forth</span>
                <span className="font-semibold text-brand-navy">Delivered in minutes</span>
                <span className="text-xs italic text-slate-500">Confirmed in production · OSW Comptroller · Dept. of the Army · Army Transportation Command</span>
                <StatusBadge tone="green">signed · reconciled · period matched</StatusBadge>
                <span className="rounded-md border border-brand-navy/20 bg-brand-navy/5 px-2 py-0.5 text-[11px] font-semibold text-brand-navy">Strategic Focus Area · Streamlining Business Processes</span>
              </div>
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-slate-50"><td className="px-5 py-2 text-slate-600">GL posting</td><td className="px-5 py-2 text-right tabular-nums text-slate-800">{formatCurrency(f.glBalance)}</td></tr>
                  <tr className="border-b border-slate-50"><td className="px-5 py-2 text-slate-600">Matched source (PO / GR)</td><td className="px-5 py-2 text-right tabular-nums text-slate-800">{formatCurrency(f.bankBalance)}</td></tr>
                  <tr className="border-b border-slate-50"><td className="px-5 py-2 text-slate-600">Reconciled total</td><td className="px-5 py-2 text-right tabular-nums text-slate-800">{formatCurrency(f.reconciledTotal)}</td></tr>
                  <tr><td className="px-5 py-2 text-slate-600">Signed by</td><td className="px-5 py-2 text-right text-slate-800">{doc.signedBy ?? '—'}</td></tr>
                </tbody>
              </table>

              {/* Provenance on every line: each supporting line traces to its system of record. */}
              {doc.linkedReconciliation && (
                <div className="border-t border-slate-100 px-5 py-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-brand-green">Sourced from Agentic Reconciliation — provenance on every line</div>
                  <p className="mt-1 text-sm text-slate-600">
                    Reconciled record{' '}
                    <span className="font-mono text-brand-navy">{doc.linkedReconciliation.transactionId}</span> —{' '}
                    {doc.linkedReconciliation.category}, cleared at {Math.round(doc.linkedReconciliation.confidence * 100)}% confidence.
                  </p>
                  <table className="mt-3 w-full text-sm">
                    <thead>
                      <tr className="text-left text-[11px] uppercase tracking-wide text-muted">
                        <th className="py-1 font-semibold">Supporting line</th>
                        <th className="py-1 text-right font-semibold">Amount</th>
                        <th className="py-1 text-right font-semibold">Source · trace</th>
                      </tr>
                    </thead>
                    <tbody>
                      {doc.linkedReconciliation.lines.map((l) => (
                        <tr key={l.traceId} className="border-t border-slate-50">
                          <td className="py-1.5 text-slate-700">{l.description}</td>
                          <td className="py-1.5 text-right tabular-nums text-slate-800">{formatCurrency(l.amount)}</td>
                          <td className="py-1.5 text-right text-slate-600">{l.sourceSystem} · <span className="font-mono text-[11px] text-slate-500">{l.traceId}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-3 border-t border-slate-100 px-5 py-4">
                <button onClick={() => alert('Demo: package export would download here.')} className="rounded-md bg-brand-green px-4 py-2 text-sm font-semibold text-white hover:bg-brand-green-600">Download package</button>
                <button className="rounded-md border border-brand-navy/30 px-4 py-2 text-sm font-semibold text-brand-navy hover:bg-brand-navy/5">Share with auditor</button>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-amber-900">Returned to POC — awaiting resubmission</h3>
                <StatusBadge tone="amber">closed-loop</StatusBadge>
              </div>
              <p className="mt-1 text-sm text-amber-900">Caught before the auditor saw it. The agent drafted the correction message to {doc.pocName}.</p>
              <ul className="mt-3 space-y-1 text-sm text-amber-900">
                {result.checks.filter((c) => !c.passed).map((c) => (
                  <li key={c.id} className="flex gap-2"><span aria-hidden>&#9888;</span><span><span className="font-semibold">{c.name}:</span> {c.detail}</span></li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
