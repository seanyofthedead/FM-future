export type Band = 'high' | 'medium' | 'low'

/** Three-way-match + structured detail pulled from canonical_variances.csv. */
export interface MatchDetail {
  nsn?: string
  plant?: string
  conditionCode?: string
  uom?: string
  feederQty?: number
  erpQty?: number
  week?: string
  docNumber?: string
  poNumber?: string
  invoiceId?: string
  receiptId?: string
  glDocumentId?: string
  vendorId?: string
  poAmount?: number
  receiptAmount?: number
  glAmount?: number
  evidenceDocIds: string[]
}

/** A reconciliation row migrated from the Agentic Recon prototype's real CSV data. */
export interface ReconRow {
  transactionId: string
  vendor: string
  postingDate: string
  amount: number
  variance: number
  confidence: number        // 0..1
  band: Band
  reviewed: boolean
  escalate: boolean
  aiReason: string
  category?: string         // canonical Variance_Category
  commentary?: string       // canonical Commentary
  nextSteps?: string        // canonical Next_Steps
  match?: MatchDetail       // three-way match evidence (case detail)
}

// Same thresholds as the prototype (MockDataProvider): high >= 0.82, medium >= 0.65.
export function bandFor(score: number): Band {
  if (score >= 0.82) return 'high'
  if (score >= 0.65) return 'medium'
  return 'low'
}
