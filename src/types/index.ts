// Shared cross-module contract for the one audit-ready pipeline.
//
// The spine — the single record that travels Reconciliation -> PBC -> Auditor — is
// DEMO_ANCHOR in '@/lib/bridge'. This file holds the shared TYPE contract both modules
// speak so a reconciled record's identity and provenance survive the handoff intact
// (storyboard Shot 15). These types are live: imported by the PBC module.

export type ConfidenceBand = 'high' | 'medium' | 'low'

/** One supporting line in an assembled auditor package, traced to its source system. */
export interface PackageLine {
  description: string
  amount: number
  sourceSystem: string
  traceId: string // ties the line to a system of record (PO / goods receipt / GL)
}

/**
 * Provenance link from a PBC request back to the reconciled record that sourced it.
 * Carries the SAME transactionId shown in the Reconciliation module, plus the line-level
 * evidence the three-way match produced.
 */
export interface LinkedReconciliation {
  transactionId: string
  vendor: string
  amount: number
  confidence: number // the reconciliation agent's confidence (0..1)
  category: string
  sourceSystems: string[]
  evidenceDocIds: string[]
  lines: PackageLine[]
}
