// THE SPINE. One real reconciled record that visibly travels Reconciliation -> PBC,
// proving the product is one pipeline, not two demos. Every module that needs to point
// at "the record the demo follows" imports from here — single source of truth.
//
// Values mirror a real row in /public/data (ui_transactions + canonical_variances),
// so the same TX shown in the Reconciliation module is the one the auditor requests.
export const DEMO_ANCHOR = {
  transactionId: 'TX-1000043',
  vendor: 'VENDOR-035',
  amount: 14026.62,
  nsn: '1201-2168-6649',
  plant: 'PLANT-C',
  poNumber: 'PO-23577',
  invoiceId: 'INV-3253031',
  glDocumentId: 'GL-00043',
  confidence: 0.95,
  category: 'Manual Entry Error',
  // The three systems the agent matched to reconcile this record (three-way match).
  sourceSystems: ['Purchase Order', 'Goods Receipt', 'General Ledger'] as const,
  evidenceDocIds: ['DOC-795613'] as const,
} as const

// Query-param key used to carry the reconciled record from Reconciliation into PBC.
export const FROM_PARAM = 'from'
