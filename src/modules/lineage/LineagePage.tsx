import { Link } from 'react-router-dom'
import { PageHeader } from '@/components/PageHeader'
import { StatusBadge } from '@/components/StatusBadge'
import { formatCurrency } from '@/lib/format'
import { DEMO_ANCHOR, FROM_PARAM } from '@/lib/bridge'
import { initialDocuments } from '@/modules/pbc/data/documents'
import { validate } from '@/modules/pbc/data/validate'

// Single lineage view (P2-11): the entire chain for ONE record on one screen, so a judge
// sees Financial Asset → AI Reconciliation → Reconciled Evidence → PBC Request → Auditor
// Response without clicking between modules. The same TX id threads through every stage.
export default function LineagePage() {
  const a = DEMO_ANCHOR
  const doc = initialDocuments.find((d) => d.linkedReconciliation?.transactionId === a.transactionId)
  const result = doc ? validate(doc) : null
  const confPct = Math.round(a.confidence * 100)

  return (
    <div>
      <PageHeader
        eyebrow="End-to-end lineage"
        title="One record, reconciled to audit-ready"
        subtitle="The same transaction the agent reconciles becomes the evidence the auditor receives. Follow it across every stage — one ID, one pipeline."
      />

      {/* The thread: the single ID carried across all stages. */}
      <div className="mb-5 flex flex-wrap items-center gap-2 rounded-lg border border-brand-navy/20 bg-brand-navy/5 px-4 py-2 text-sm">
        <span className="text-xs font-semibold uppercase tracking-wide text-brand-green">Tracking</span>
        <span className="font-mono text-brand-navy">{a.transactionId}</span>
        <span className="text-slate-600">{a.vendor}</span>
        <span className="text-slate-500">{formatCurrency(a.amount)}</span>
      </div>

      {/* Product boundary (Shot 14): the chain stays inside ONE product; the package is
          delivered to an auditor just outside the frame. */}
      <div className="relative rounded-xl border-2 border-dashed border-brand-navy/25 px-3 pb-4 pt-7 sm:px-4">
        <span className="absolute -top-2.5 left-4 bg-brand-sand px-2 text-[10px] font-semibold uppercase tracking-wide text-brand-navy/70">
          Financial Management of the Future · one product boundary
        </span>
        <div className="grid items-stretch gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
        {/* Stage 1 — AI Reconciliation */}
        <Stage step={1} title="AI Reconciliation" tone="navy">
          <p className="text-sm text-slate-600">
            The agent matched <span className="font-mono text-brand-navy">{a.transactionId}</span> across a three-way
            match and cleared it.
          </p>
          <dl className="mt-3 space-y-1 text-sm">
            <Row k="Vendor" v={a.vendor} />
            <Row k="Amount" v={formatCurrency(a.amount)} />
            <Row k="Root cause" v={a.category} />
            <Row k="Confidence" v={`${confPct}% · high`} />
          </dl>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {a.sourceSystems.map((s) => (
              <span key={s} className="rounded border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] text-slate-700">{s}</span>
            ))}
          </div>
          <Link to={`/reconciliation/${a.transactionId}`} className="mt-3 inline-block text-sm font-semibold text-brand-green hover:underline">
            Open case &rarr;
          </Link>
        </Stage>

        <Arrow label="becomes evidence" />

        {/* Stage 2 — PBC Request (auditor ask + validation) */}
        <Stage step={2} title="PBC Request" tone="navy">
          <p className="text-sm text-slate-600">
            Auditor {doc?.auditorName ?? 'review'} requested supporting evidence; the agent ran the Early Validation Gate.
          </p>
          <dl className="mt-3 space-y-1 text-sm">
            <Row k="Request" v={doc?.id ?? '—'} />
            <Row k="Period" v={doc ? `${doc.periodCovered.start} – ${doc.periodCovered.end}` : '—'} />
            <Row k="Gate" v={result ? `${result.checks.filter((c) => c.passed).length}/${result.checks.length} passed` : '—'} />
          </dl>
          {result && (
            <div className="mt-3">
              <StatusBadge tone={result.decision === 'AUTO_ACCEPT' ? 'green' : 'amber'}>
                {result.decision.replace('_', ' ')} · {Math.round(result.confidence * 100)}%
              </StatusBadge>
            </div>
          )}
          <Link to={`/pbc?${FROM_PARAM}=${a.transactionId}`} className="mt-3 inline-block text-sm font-semibold text-brand-green hover:underline">
            Open request &rarr;
          </Link>
        </Stage>

        <Arrow label="packaged & delivered" />

        {/* Stage 3 — Auditor Response (the package) */}
        <Stage step={3} title="Auditor-ready package" tone="green">
          <p className="text-sm text-slate-600">
            Assembled and delivered — defensible, with provenance on every line back to its source system.
          </p>
          <table className="mt-3 w-full text-sm">
            <tbody>
              {doc?.linkedReconciliation?.lines.map((l) => (
                <tr key={l.traceId} className="border-b border-slate-50">
                  <td className="py-1 text-slate-600">{l.sourceSystem}</td>
                  <td className="py-1 text-right tabular-nums text-slate-800">{formatCurrency(l.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-3 flex items-center gap-2">
            <StatusBadge tone="green">Defensible</StatusBadge>
            <span className="text-xs text-muted">delivered to {doc?.auditorName ?? 'auditor'}</span>
          </div>
        </Stage>
        </div>
      </div>
      {/* Auditor — receives the package just outside the product boundary */}
      <div className="mt-4 flex flex-col items-center gap-1">
        <span className="text-lg text-brand-green" aria-hidden>&darr;</span>
        <div className="rounded-lg border border-brand-green/40 bg-brand-green/10 px-4 py-2 text-center">
          <div className="text-sm font-semibold text-brand-navy">Auditor</div>
          <div className="text-xs text-muted">receives the audit-ready package — delivered from the product, nothing re-keyed</div>
        </div>
      </div>

      <p className="mt-5 text-center text-sm text-slate-600">
        AI reconciled the asset, and that exact output satisfied the auditor&apos;s request —{' '}
        <span className="font-semibold text-brand-navy">one product, one pipeline.</span>
      </p>
    </div>
  )
}

function Stage({ step, title, tone, children }: { step: number; title: string; tone: 'navy' | 'green'; children: React.ReactNode }) {
  return (
    <section className="flex flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-center gap-2">
        <span className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold text-white ${tone === 'green' ? 'bg-brand-green' : 'bg-brand-navy'}`}>{step}</span>
        <h3 className="text-sm font-semibold text-brand-navy">{title}</h3>
      </div>
      {children}
    </section>
  )
}

function Arrow({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 py-2 lg:py-0">
      <span className="hidden text-lg text-brand-green lg:inline">&rarr;</span>
      <span className="text-lg text-brand-green lg:hidden">&darr;</span>
      <span className="max-w-[7rem] text-center text-[10px] uppercase tracking-wide text-muted">{label}</span>
    </div>
  )
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-muted">{k}</dt>
      <dd className="text-right font-medium text-slate-800">{v}</dd>
    </div>
  )
}
