// Single source of truth for product + module identity.
// Used by the shared shell so both modules read as ONE product.
export const PRODUCT_NAME = 'Financial Management of the Future'
export const PRODUCT_SHORT = 'FM of the Future'
export const ORG = 'Guidehouse'

export const MODULES = [
  { key: 'overview', label: 'Overview', path: '/' },
  { key: 'reconciliation', label: 'Agentic Reconciliation', path: '/reconciliation' },
  { key: 'pbc', label: 'PBC Request Agent', path: '/pbc' },
  { key: 'lineage', label: 'Lineage', path: '/lineage' },
] as const

export type ModuleKey = (typeof MODULES)[number]['key']
