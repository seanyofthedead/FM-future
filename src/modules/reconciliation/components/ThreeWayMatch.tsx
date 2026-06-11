import { formatCurrency } from '@/lib/format'
import { StatusBadge } from '@/components/StatusBadge'
import type { MatchDetail } from '../data/types'

const EPS = 0.01

// The heart of the case detail: a real PO / Receipt / GL three-way match + quantity check,
// computed from canonical_variances.csv. Storyboard Shot 8 (matching across systems).
export function ThreeWayMatch({ match }: { match: MatchDetail }) {
  const rows = [
    { source: 'Purchase order', doc: match.poNumber, amount: match.poAmount },
    { source: 'Goods receipt', doc: match.receiptId, amount: match.receiptAmount },
    { source: 'General ledger', doc: match.glDocumentId, amount: match.glAmount },
  ].filter((r) => r.amount != null)

  const amounts = rows.map((r) => r.amount as number)
  const amountsMatch = amounts.length > 1 && amounts.every((a) => Math.abs(a - amounts[0]) < EPS)
  const qtyKnown = match.feederQty != null && match.erpQty != null
  const qtyMatch = qtyKnown && match.feederQty === match.erpQty

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-lg border border-slate-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-muted">
            <tr>
              <th className="px-4 py-2 font-semibold">Source</th>
              <th className="px-4 py-2 font-semibold">Document</th>
              <th className="px-4 py-2 text-right font-semibold">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((r) => (
              <tr key={r.source}>
                <td className="px-4 py-2 font-medium text-brand-navy">{r.source}</td>
                <td className="px-4 py-2 font-mono text-xs text-slate-600">{r.doc ?? '—'}</td>
                <td className="px-4 py-2 text-right tabular-nums text-slate-800">{formatCurrency(r.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
        <span className="flex items-center gap-2">
          Amounts:
          <StatusBadge tone={amountsMatch ? 'green' : 'amber'}>{amountsMatch ? 'three-way match' : 'mismatch'}</StatusBadge>
        </span>
        {qtyKnown && (
          <span className="flex items-center gap-2">
            Quantity (feeder {match.feederQty} vs ERP {match.erpQty}):
            <StatusBadge tone={qtyMatch ? 'green' : 'amber'}>{qtyMatch ? 'match' : 'mismatch'}</StatusBadge>
          </span>
        )}
      </div>
    </div>
  )
}
