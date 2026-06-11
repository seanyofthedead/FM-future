export type RiskLevel = 'Low' | 'Medium' | 'High'

export type DocStatus =
  | 'Pending Validation'
  | 'Auto-Accepted'
  | 'Auto-Rejected'
  | 'Awaiting Resubmission'

export type DocumentType =
  | 'Reconciliation Evidence'
  | 'Obligation Reconciliation'
  | 'Disbursement Reconciliation'
  | 'Three-Way Match Package'

export type IssueKind =
  | 'missing-signature'
  | 'amount-mismatch'
  | 'wrong-period'
  | 'incomplete-checklist'

export interface ChecklistItem {
  label: string
  present: boolean
}

export interface FinancialLine {
  label: string
  amount: number
}

export interface FinancialData {
  currency: 'USD'
  glBalance: number
  bankBalance: number
  outstandingChecks: FinancialLine[]
  depositsInTransit: FinancialLine[]
  reconciledTotal: number
  variance: number
}

// The cross-module provenance link lives in the shared contract so both modules speak it.
import type { LinkedReconciliation } from '@/types'
export type { LinkedReconciliation }

export interface PbcDocument {
  id: string
  title: string
  documentType: DocumentType
  pocName: string
  pocEmail: string
  auditorName: string
  dueDate: string
  uploadDate: string
  periodCovered: { start: string; end: string }
  requiredPeriod: { start: string; end: string }
  status: DocStatus
  riskLevel: RiskLevel
  riskRationale: string
  financialData: FinancialData
  requiredChecklist: ChecklistItem[]
  signaturePresent: boolean
  signedBy?: string
  signatureDate?: string
  embeddedIssues: IssueKind[]
  linkedReconciliation?: LinkedReconciliation
}

export type CheckId =
  | 'required-fields'
  | 'signature'
  | 'reconciliation'
  | 'period-alignment'
  | 'completeness'

export interface CheckResult {
  id: CheckId
  name: string
  passed: boolean
  detail: string
  fieldHints: string[]
  weight: number
}

export type ValidationDecision = 'AUTO_ACCEPT' | 'AUTO_REJECT'

export interface ValidationResult {
  documentId: string
  checks: CheckResult[]
  decision: ValidationDecision
  confidence: number
  explanation: string
  recommendedAction: string
  validatedAt: string
}

export type AuditEventKind =
  | 'upload-detected'
  | 'metadata-retrieved'
  | 'rules-applied'
  | 'decision-made'
  | 'notification-sent'
  | 'status-writeback'

export interface AuditLogEntry {
  id: string
  documentId: string
  kind: AuditEventKind
  source:
    | 'Reconciliation Agent'
    | 'Databricks'
    | 'Extraction Agent'
    | 'Validation Engine'
    | 'Orchestration'
    | 'Audit Ledger'
  message: string
  at: string
}
