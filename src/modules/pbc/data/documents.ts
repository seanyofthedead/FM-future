import type { PbcDocument } from './pbcTypes'
import { DEMO_ANCHOR } from '@/lib/bridge'

// FY26 Q1 window that contains the anchor transaction's posting date (2025-11-04).
// Every PBC request lives in the same federal procurement world as the Reconciliation
// module (same vendors, same PO/Goods-Receipt/GL three-way match) so the product reads as
// one organization, not two. Each fixture preserves a distinct validation outcome so the
// closed-loop demo (one clean accept + four failure modes) still works.
const ANCHOR_PERIOD = { start: '2025-10-01', end: '2025-12-31' }
const PRIOR_PERIOD = { start: '2025-07-01', end: '2025-09-30' }

// Procurement checklist — the supporting artifacts behind a three-way match.
const proChecklist = (po: boolean, gr: boolean, gl: boolean, sig: boolean) => [
  { label: 'Purchase order attached', present: po },
  { label: 'Goods receipt attached', present: gr },
  { label: 'GL posting attached', present: gl },
  { label: 'Contracting officer approval signature', present: sig },
]

export const initialDocuments: PbcDocument[] = [
  // THE LINKED REQUEST — the evidence the agent produced in Reconciliation, now the
  // auditor's PBC item. Same TX id as the Reconciliation module. Clean by construction so
  // it AUTO_ACCEPTs and assembles the auditor-ready package on the happy path.
  {
    id: 'PBC-2043',
    title: `Supporting evidence — reconciled transaction ${DEMO_ANCHOR.transactionId} (${DEMO_ANCHOR.vendor})`,
    documentType: 'Reconciliation Evidence',
    pocName: 'Dana Whitfield',
    pocEmail: 'dana.whitfield@agency.example',
    auditorName: 'Priya Raman',
    dueDate: '2026-01-15',
    uploadDate: '2026-01-08',
    periodCovered: { ...ANCHOR_PERIOD },
    requiredPeriod: { ...ANCHOR_PERIOD },
    status: 'Pending Validation',
    riskLevel: 'Low',
    riskRationale: `Sourced from a three-way-matched reconciliation (PO, goods receipt, GL) the agent cleared at ${Math.round(
      DEMO_ANCHOR.confidence * 100,
    )}% confidence; routine confirmation only.`,
    financialData: {
      currency: 'USD',
      glBalance: DEMO_ANCHOR.amount,
      bankBalance: DEMO_ANCHOR.amount,
      outstandingChecks: [],
      depositsInTransit: [],
      reconciledTotal: DEMO_ANCHOR.amount,
      variance: 0,
    },
    requiredChecklist: proChecklist(true, true, true, true),
    signaturePresent: true,
    signedBy: 'Dana Whitfield, Financial Reporting',
    signatureDate: '2026-01-08',
    embeddedIssues: [],
    linkedReconciliation: {
      transactionId: DEMO_ANCHOR.transactionId,
      vendor: DEMO_ANCHOR.vendor,
      amount: DEMO_ANCHOR.amount,
      confidence: DEMO_ANCHOR.confidence,
      category: DEMO_ANCHOR.category,
      sourceSystems: [...DEMO_ANCHOR.sourceSystems],
      evidenceDocIds: [...DEMO_ANCHOR.evidenceDocIds],
      // Provenance on every line: each supporting line traces to its system of record.
      lines: [
        { description: `Purchase order ${DEMO_ANCHOR.poNumber}`, amount: DEMO_ANCHOR.amount, sourceSystem: 'Purchase Order', traceId: DEMO_ANCHOR.poNumber },
        { description: `Goods receipt ${DEMO_ANCHOR.evidenceDocIds[0]}`, amount: DEMO_ANCHOR.amount, sourceSystem: 'Goods Receipt', traceId: DEMO_ANCHOR.evidenceDocIds[0] },
        { description: `GL posting ${DEMO_ANCHOR.glDocumentId}`, amount: DEMO_ANCHOR.amount, sourceSystem: 'General Ledger', traceId: DEMO_ANCHOR.glDocumentId },
      ],
    },
  },

  // Clean obligation reconciliation — accepts cleanly (second happy-path example).
  {
    id: 'PBC-1042',
    title: 'Obligation reconciliation — VENDOR-008 (FY26 Q1)',
    documentType: 'Obligation Reconciliation',
    pocName: 'Renee Cole',
    pocEmail: 'renee.cole@agency.example',
    auditorName: 'Priya Raman',
    dueDate: '2026-01-15',
    uploadDate: '2026-01-08',
    periodCovered: { ...ANCHOR_PERIOD },
    requiredPeriod: { ...ANCHOR_PERIOD },
    status: 'Pending Validation',
    riskLevel: 'Low',
    riskRationale:
      'Obligations to VENDOR-008 matched cleanly to PO and goods receipt for eight straight periods; routine confirmation only.',
    financialData: {
      currency: 'USD',
      glBalance: 236_250.0,
      bankBalance: 248_400.0,
      outstandingChecks: [{ label: 'Goods receipt GR-88231 — not yet posted', amount: 12_150.0 }],
      depositsInTransit: [],
      reconciledTotal: 236_250.0,
      variance: 0,
    },
    requiredChecklist: proChecklist(true, true, true, true),
    signaturePresent: true,
    signedBy: 'Renee Cole, Contracting Officer',
    signatureDate: '2026-01-08',
    embeddedIssues: [],
  },

  // Missing approval signature — returned to POC.
  {
    id: 'PBC-1043',
    title: 'Disbursement reconciliation — VENDOR-031 (FY26 Q1)',
    documentType: 'Disbursement Reconciliation',
    pocName: 'Aaron Vance',
    pocEmail: 'aaron.vance@agency.example',
    auditorName: 'Priya Raman',
    dueDate: '2026-01-15',
    uploadDate: '2026-01-09',
    periodCovered: { ...ANCHOR_PERIOD },
    requiredPeriod: { ...ANCHOR_PERIOD },
    status: 'Pending Validation',
    riskLevel: 'Medium',
    riskRationale:
      'Disbursements reconcile to the matched source, but the contracting-officer approval signature is not on file.',
    financialData: {
      currency: 'USD',
      glBalance: 92_220.0,
      bankBalance: 96_720.0,
      outstandingChecks: [{ label: 'Retention withheld — PO-31188', amount: 4_500.0 }],
      depositsInTransit: [],
      reconciledTotal: 92_220.0,
      variance: 0,
    },
    requiredChecklist: proChecklist(true, true, true, false),
    signaturePresent: false,
    embeddedIssues: ['missing-signature'],
  },

  // Three-way amount mismatch (GL posting != matched source) — returned to POC.
  {
    id: 'PBC-1044',
    title: 'Three-way match package — VENDOR-022 (FY26 Q1)',
    documentType: 'Three-Way Match Package',
    pocName: 'Lena Park',
    pocEmail: 'lena.park@agency.example',
    auditorName: 'Priya Raman',
    dueDate: '2026-01-16',
    uploadDate: '2026-01-09',
    periodCovered: { ...ANCHOR_PERIOD },
    requiredPeriod: { ...ANCHOR_PERIOD },
    status: 'Pending Validation',
    riskLevel: 'High',
    riskRationale:
      'GL posting does not tie to the PO/goods-receipt matched source; unexplained variance flagged for correction.',
    financialData: {
      currency: 'USD',
      glBalance: 415_900.0,
      bankBalance: 423_185.41,
      outstandingChecks: [],
      depositsInTransit: [],
      reconciledTotal: 415_900.0,
      variance: 7_285.41,
    },
    requiredChecklist: proChecklist(true, true, true, true),
    signaturePresent: true,
    signedBy: 'Lena Park, Financial Analyst',
    signatureDate: '2026-01-09',
    embeddedIssues: ['amount-mismatch'],
  },

  // Wrong reporting period — returned to POC.
  {
    id: 'PBC-1045',
    title: 'Obligation reconciliation — VENDOR-047 (period mismatch)',
    documentType: 'Obligation Reconciliation',
    pocName: 'Theo Brandt',
    pocEmail: 'theo.brandt@agency.example',
    auditorName: 'Priya Raman',
    dueDate: '2026-01-16',
    uploadDate: '2026-01-09',
    periodCovered: { ...PRIOR_PERIOD },
    requiredPeriod: { ...ANCHOR_PERIOD },
    status: 'Pending Validation',
    riskLevel: 'Medium',
    riskRationale:
      'Amounts reconcile, but the package covers the prior quarter; period alignment must be corrected before acceptance.',
    financialData: {
      currency: 'USD',
      glBalance: 61_245.0,
      bankBalance: 61_245.0,
      outstandingChecks: [],
      depositsInTransit: [],
      reconciledTotal: 61_245.0,
      variance: 0,
    },
    requiredChecklist: proChecklist(true, true, true, true),
    signaturePresent: true,
    signedBy: 'Theo Brandt, Funds Control',
    signatureDate: '2025-10-04',
    embeddedIssues: ['wrong-period'],
  },

  // Incomplete supporting package (PO + GL posting + signature missing) — returned to POC.
  {
    id: 'PBC-1046',
    title: 'Three-way match package — VENDOR-013 (FY26 Q1)',
    documentType: 'Three-Way Match Package',
    pocName: 'Carla Nunez',
    pocEmail: 'carla.nunez@agency.example',
    auditorName: 'Priya Raman',
    dueDate: '2026-01-17',
    uploadDate: '2026-01-10',
    periodCovered: { ...ANCHOR_PERIOD },
    requiredPeriod: { ...ANCHOR_PERIOD },
    status: 'Pending Validation',
    riskLevel: 'High',
    riskRationale:
      'Property-accountability walkthrough flagged this obligation; full supporting package (PO, GL posting, signature) is required.',
    financialData: {
      currency: 'USD',
      glBalance: 188_640.0,
      bankBalance: 188_640.0,
      outstandingChecks: [],
      depositsInTransit: [],
      reconciledTotal: 188_640.0,
      variance: 0,
    },
    requiredChecklist: proChecklist(false, true, false, false),
    signaturePresent: false,
    embeddedIssues: ['incomplete-checklist'],
  },
]
