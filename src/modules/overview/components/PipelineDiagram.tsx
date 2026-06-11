import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DEMO_ANCHOR } from '@/lib/bridge'

type Stage = { key: string; title: string; verb: string; caption: string; to: string }

const STAGES: Stage[] = [
  { key: 'reconcile', title: 'Agentic Reconciliation', verb: 'Reconcile', to: '/reconciliation',
    caption: 'Matching records across source systems and surfacing exceptions…' },
  { key: 'package', title: 'PBC Request Agent', verb: 'Package', to: '/pbc',
    caption: 'Assembling the supporting record — provenance on every line…' },
  { key: 'deliver', title: 'Auditor', verb: 'Deliver', to: '/pbc',
    caption: 'Audit-ready package delivered — defensible, in minutes.' },
]

const POS = ['16.66%', '50%', '83.33%'] // token x-center per stage
const STEP_MS = 1800

// Live-feeling pipeline: one record token travels Reconcile -> Package -> Deliver,
// looping continuously. Reinforces "one product, one pipeline" (storyboard Shots 4-6, 15).
export function PipelineDiagram() {
  const [active, setActive] = useState(0)
  const [packagesToday, setPackagesToday] = useState(1287)
  const navigate = useNavigate()

  useEffect(() => {
    const id = setInterval(() => {
      setActive((a) => {
        const next = (a + 1) % STAGES.length
        if (next === 0) setPackagesToday((n) => n + 1) // tick on each completed pass
        return next
      })
    }, STEP_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-xs font-semibold uppercase tracking-wide text-brand-green">One product · one pipeline</div>
        <div className="text-xs text-muted">
          <span className="mr-1 inline-block h-2 w-2 animate-pulse rounded-full bg-brand-green align-middle" />
          {packagesToday.toLocaleString()} audit-ready packages produced today
          <span className="ml-1 italic text-slate-400">· illustrative</span>
        </div>
      </div>

      {/* Product boundary (Shots 5 & 14): the whole pipeline lives inside ONE product;
          the package is delivered to an auditor just outside the frame. */}
      <div className="flex items-stretch gap-3">
        <div className="relative flex-1 rounded-lg border-2 border-dashed border-brand-navy/25 px-4 pb-3 pt-6">
          <span className="absolute -top-2.5 left-3 bg-white px-2 text-[10px] font-semibold uppercase tracking-wide text-brand-navy/70">
            Financial Management of the Future
          </span>
          {/* Track + traveling token */}
          <div className="relative">
        {/* connector line (animated flow) */}
        <div className="pointer-events-none absolute left-[16.66%] right-[16.66%] top-7 h-0.5 -translate-y-1/2 pipeline-flow" />
        {/* traveling record token */}
        <div
          className="pointer-events-none absolute -top-1 z-10 -translate-x-1/2 transition-all duration-700 ease-in-out"
          style={{ left: POS[active] }}
        >
          <span className="rounded-full bg-brand-navy px-2 py-0.5 font-mono text-[10px] font-semibold text-white shadow">
            {DEMO_ANCHOR.transactionId}
          </span>
        </div>

        {/* stage nodes */}
        <div className="grid grid-cols-3 gap-2">
          {STAGES.map((s, i) => {
            const isActive = i === active
            const isDone = i < active
            return (
              <button
                key={s.key}
                onClick={() => navigate(s.to)}
                className="group flex flex-col items-center pt-3 text-center"
                title={`Open ${s.title}`}
              >
                <span
                  className={[
                    'flex h-14 w-14 items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-300',
                    isActive
                      ? 'scale-110 border-brand-green bg-brand-green text-white shadow-lg'
                      : isDone
                        ? 'border-brand-green/50 bg-brand-green/10 text-brand-green'
                        : 'border-slate-300 bg-white text-slate-400',
                  ].join(' ')}
                >
                  {i + 1}
                </span>
                <span className={['mt-2 text-sm font-semibold', isActive ? 'text-brand-navy' : 'text-slate-500'].join(' ')}>
                  {s.verb}
                </span>
                <span className="text-[11px] text-muted group-hover:underline">{s.title}</span>
              </button>
            )
          })}
            </div>
          </div>
        </div>
        {/* Auditor — receives the package just outside the product boundary */}
        <div className="hidden shrink-0 flex-col items-center justify-center sm:flex">
          <span className="text-brand-green" aria-hidden>&rarr;</span>
          <div className={['mt-1 rounded-lg border px-3 py-2 text-center transition-all duration-300', active === 2 ? 'border-brand-green bg-brand-green/10' : 'border-slate-200 bg-white'].join(' ')}>
            <div className="text-xs font-semibold text-brand-navy">Auditor</div>
            <div className="text-[10px] text-muted">receives package</div>
          </div>
        </div>
      </div>

      {/* live caption */}
      <p className="mt-4 min-h-[1.25rem] text-center text-sm text-slate-600 transition-opacity">
        {STAGES[active].caption}
      </p>
    </div>
  )
}
