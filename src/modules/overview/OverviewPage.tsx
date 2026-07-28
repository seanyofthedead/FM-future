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

      {/* Shot 13 support: name the Element 2 claim on screen, not just in narration. */}
      <div className="mb-6 rounded-xl border border-brand-green/30 bg-brand-green/5 px-5 py-4">
        <div className="text-xs font-semibold uppercase tracking-wide text-brand-green">Accelerating the mission</div>
        <p className="mt-1 text-sm text-slate-700">
          An auditor request that took <span className="font-medium text-brand-navy">~3 days</span> of back-and-forth is
          answered in <span className="font-medium text-brand-navy">minutes</span> — so audit response stops being a
          cycle-time problem and analysts spend their week on analysis, not document hunts.
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {[
            '~3 days → minutes to evidence',
            'Reviewers see exceptions, not entire ledgers',
            'Audit prep runs continuously, not at year-end',
          ].map((c) => (
            <span key={c} className="rounded-md border border-brand-green/30 bg-white px-2.5 py-1 text-sm text-slate-700">{c}</span>
          ))}
        </div>
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
          One product, delivering audit-ready results across federal missions — the{' '}
          <span className="font-medium text-brand-navy">Department of the Army</span> and{' '}
          <span className="font-medium text-brand-navy">Army Transportation Command</span>.
        </p>
      </div>

      {/* Shot 16: Element 3 claim named on screen — agentic reasoning on accredited, already-in-use
          building blocks, with the alternatives contrast the rubric asks for. */}
      <div className="mt-4 rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
        <div className="text-xs font-semibold uppercase tracking-wide text-brand-green">Advancing the state of the art</div>
        <p className="mt-1 text-sm text-slate-700">
          Agents reason where rules engines can&apos;t — every match and every exception comes with a plain-language
          explanation — running on accredited building blocks already in use across the department.
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {['Databricks data pipelines', 'Cloud-native services', 'Agentic orchestration', 'Human-in-the-loop guardrails'].map((b) => (
            <span key={b} className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-sm text-slate-700">{b}</span>
          ))}
        </div>
        <p className="mt-2 text-xs text-muted">
          Not a brittle rules engine to maintain forever, and not another manual review team — an estimated
          80–90% less manual review (illustrative), with every output clearing a human-in-the-loop gate before
          it reaches an auditor.
        </p>
      </div>

      {/* Shot 18: closing call to action. Deliberately no pricing/sales-model language — see
          docs/video-feedback-2026-07.md (item 4). */}
      <div className="mt-4 flex flex-col gap-1 rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-sm font-semibold text-brand-navy">Contact us to learn more</div>
          <div className="text-sm text-slate-600">
            See what Guidehouse and Financial Management of the Future can do for your audit — on your data.
          </div>
        </div>
        <span className="text-sm font-semibold text-brand-green">Get in touch &rarr;</span>
      </div>
    </div>
  )
}
