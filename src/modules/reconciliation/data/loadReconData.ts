import Papa from 'papaparse'
import { bandFor, type ReconRow, type MatchDetail } from './types'
import uiTransactionsCsv from './ui_transactions.csv?raw'
import canonicalVariancesCsv from './canonical_variances.csv?raw'

const num = (v: unknown, f = 0) => {
  const n = Number(String(v ?? '').replace(/[^0-9.\-]/g, ''))
  return Number.isFinite(n) ? n : f
}
const numOpt = (v: unknown): number | undefined => {
  const s = String(v ?? '').trim()
  if (!s) return undefined
  const n = Number(s.replace(/[^0-9.\-]/g, ''))
  return Number.isFinite(n) ? n : undefined
}
const str = (v: unknown) => {
  const s = String(v ?? '').trim()
  return s || undefined
}
const bool = (v: unknown) => String(v ?? '').trim().toUpperCase() === 'TRUE'

function parseCsv(text: string): Record<string, string>[] {
  return Papa.parse<Record<string, string>>(text, { header: true, skipEmptyLines: true }).data
}

function toMatch(c: Record<string, string>): MatchDetail {
  return {
    nsn: str(c['NSN']),
    plant: str(c['Plant']),
    conditionCode: str(c['Condition_Code']),
    uom: str(c['UoM']),
    feederQty: numOpt(c['Feeder_Qty']),
    erpQty: numOpt(c['ERP_Qty']),
    week: str(c['Week']),
    docNumber: str(c['Doc_Number']),
    poNumber: str(c['PO_Number'] || c['po_number']),
    invoiceId: str(c['Invoice_ID'] || c['invoice_id']),
    receiptId: str(c['receipt_id']),
    glDocumentId: str(c['gl_document_id']),
    vendorId: str(c['vendor_id']),
    poAmount: numOpt(c['po_amount']),
    receiptAmount: numOpt(c['receipt_amount']),
    glAmount: numOpt(c['gl_amount']),
    evidenceDocIds: (c['Evidence_Doc_IDs'] || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean),
  }
}

/**
 * Loads the real Agentic Recon CSVs (bundled at build time so the app works offline,
 * including as a single HTML file) and joins ui_transactions with canonical_variances
 * on TransactionID. Returns rows ready for the Reconciliation module.
 */
export async function loadReconData(): Promise<ReconRow[]> {
  const ui = parseCsv(uiTransactionsCsv)
  const canonical = parseCsv(canonicalVariancesCsv)

  const canonById = new Map<string, Record<string, string>>()
  for (const c of canonical) {
    const id = (c['TransactionID'] || '').trim()
    if (id) canonById.set(id, c)
  }

  return ui
    .filter((r) => (r['TransactionID'] || '').trim())
    .map((r) => {
      const id = r['TransactionID'].trim()
      const c = canonById.get(id)
      const confidence = num(r['Confidence'])
      return {
        transactionId: id,
        vendor: r['Vendor'] || '',
        postingDate: r['PostingDate'] || '',
        amount: num(r['Amount']),
        variance: num(r['Variance']),
        confidence,
        band: bandFor(confidence),
        reviewed: bool(r['Reviewed']),
        escalate: bool(r['Escalate']),
        aiReason: (r['AI_Reason'] || c?.['AI_Reason'] || '').trim(),
        category: c?.['Variance_Category']?.trim(),
        commentary: c?.['Commentary']?.trim(),
        nextSteps: c?.['Next_Steps']?.trim(),
        match: c ? toMatch(c) : undefined,
      } satisfies ReconRow
    })
}
