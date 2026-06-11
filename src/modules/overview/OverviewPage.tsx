import { Link } from 'react-router-dom'
import { PageHeader } from '@/components/PageHeader'
import { Card } from '@/components/Card'
import { PipelineDiagram } from './components/PipelineDiagram'
import { ExecutiveInsights } from './components/ExecutiveInsights'

// Storyboard Shots 4-6 & 15: one product, one pipeline (reconcile -> package -> deliver).
export default function OverviewPage() {
  return (
    <div>
      <PageHeader
        eyebrow="One product · two capabilities"
        title="Audit-ready, every day"
        subtitle="Financial Management of the Future runs audit prep as one connected pipeline: data is continuously reconciled, then packaged and delivered to the auditor — without ever leaving the product."
      />

      {/* Guided demo: one click runs reconcile → package → deliver without hunting for buttons. */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Link
          to="/reconciliation?autorun=1"
          className="rounded-md bg-brand-green px-4 py-2 text-sm font-semibold text-white hover:bg-brand-green-600"
        >
          ▶ Start guided demo
        </Link>
        <span className="text-sm text-muted">
          Runs the full pipeline on record <span className="font-mono text-brand-navy">TX-1000043</span> — reconcile, package, deliver.
        </span>
      </div>

      {/* Executive audit-readiness headline */}
      <div className="mb-6">
        <ExecutiveInsights />
      </div>

      {/* Live pipeline */}
      <div className="mb-6">
        <PipelineDiagram />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Agentic Reconciliation">
          <p className="text-sm text-slate-600">
            Matches records across source systems, surfaces mismatches with the agent&apos;s rationale,
            and produces a clean, reconciled record set.
          </p>
          <Link to="/reconciliation" className="mt-3 inline-block text-sm font-semibold text-brand-green">
            Open Reconciliation &rarr;
          </Link>
        </Card>
        <Card title="PBC Request Agent">
          <p className="text-sm text-slate-600">
            Turns reconciled data into an auditor-ready package — retrieving artifacts with traceable
            provenance on every line.
          </p>
          <Link to="/pbc" className="mt-3 inline-block text-sm font-semibold text-brand-green">
            Open PBC Request Agent &rarr;
          </Link>
        </Card>
      </div>

      {/* Shot 15: one product, adopted across federal missions (text-only names, no seals per v10). */}
      <div className="mt-6 rounded-xl border border-brand-navy/15 bg-brand-navy/5 px-5 py-4">
        <div className="text-xs font-semibold uppercase tracking-wide text-brand-green">In production today</div>
        <p className="mt-1 text-sm text-slate-700">
          One product, delivering audit-ready results across federal missions —{' '}
          <span className="font-medium text-brand-navy">OSW Comptroller</span>,{' '}
          <span className="font-medium text-brand-navy">Department of the Army</span>, and{' '}
          <span className="font-medium text-brand-navy">Army Transportation Command</span>.
        </p>
      </div>

      {/* Shot 16: accredited, already-in-use building blocks + human-in-the-loop guardrails. */}
      <div className="mt-4 rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
        <div className="text-xs font-semibold uppercase tracking-wide text-brand-green">Built on accredited building blocks</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {['Databricks data pipelines', 'Cloud-native services', 'Agentic orchestration', 'Human-in-the-loop guardrails'].map((b) => (
            <span key={b} className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-sm text-slate-700">{b}</span>
          ))}
        </div>
        <p className="mt-2 text-xs text-muted">
          Not a brittle rules engine to maintain forever, and not another manual review team — every output
          clears a human-in-the-loop gate before it reaches an auditor.
        </p>
      </div>

      {/* Shot 18: how it's delivered. */}
      <div className="mt-4 flex flex-col gap-1 rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-sm font-semibold text-brand-navy">Offered as a subscription</div>
          <div className="text-sm text-slate-600">Scoped to your data and audit workload — up and running in weeks.</div>
        </div>
        <span className="text-sm font-semibold text-brand-green">Contact us for a quote &rarr;</span>
      </div>
    </div>
  )
}
