import type { AuditLogEntry, PbcDocument, ValidationResult } from './pbcTypes'

// Builds the timestamped provenance trail for a validated document, across the product's
// accredited building blocks: Databricks (lakehouse) -> Extraction Agent -> Validation Engine
// -> Orchestration -> Audit Ledger. This is the genuine "provenance" the storyboard calls for (Shot 12),
// and it names the same stack the Overview "Built on accredited building blocks" strip advertises.
//
// When the request is linked to a reconciled record, the trail LEADS with a Reconciliation
// Agent event so the provenance visibly starts upstream — the evidence came from the agent's
// own reconciliation, not from a fresh upload (storyboard Shot 15, the one-pipeline payoff).
export function buildAuditTrail(doc: PbcDocument, result: ValidationResult): AuditLogEntry[] {
  const now = Date.now()
  const at = (s: number) => new Date(now + s * 1000).toLocaleTimeString()
  const passed = result.checks.filter((c) => c.passed).length
  const accepted = result.decision === 'AUTO_ACCEPT'

  const entries: AuditLogEntry[] = []
  let i = 0
  const add = (kind: AuditLogEntry['kind'], source: AuditLogEntry['source'], message: string) => {
    entries.push({ id: `${doc.id}-${i}`, documentId: doc.id, kind, source, message, at: at(i) })
    i += 1
  }

  const link = doc.linkedReconciliation
  if (link) {
    add(
      'metadata-retrieved',
      'Reconciliation Agent',
      `Evidence sourced from reconciled record ${link.transactionId} (${link.vendor}) — three-way match across ${link.sourceSystems.join(
        ', ',
      )}, cleared at ${Math.round(link.confidence * 100)}% confidence.`,
    )
  }

  add('upload-detected', 'Databricks', `New ${doc.documentType.toLowerCase()} registered for ${doc.id} in the Databricks lakehouse.`)
  add('metadata-retrieved', 'Extraction Agent', `Metadata and financial fields extracted for "${doc.title}".`)
  add('rules-applied', 'Validation Engine', `Validation rules evaluated — ${passed}/${result.checks.length} passed.`)
  add('decision-made', 'Validation Engine', `${result.decision.replace('_', ' ')} at ${Math.round(result.confidence * 100)}% confidence.`)
  add('notification-sent', 'Orchestration', accepted
    ? `Auditor ${doc.auditorName} notified — package ready for review.`
    : `Correction instructions routed to ${doc.pocName} (${doc.pocEmail}).`)
  add('status-writeback', 'Audit Ledger', `Request ${doc.id} status set to ${accepted ? 'Auto-Accepted' : 'Awaiting Resubmission'}.`)

  return entries
}
