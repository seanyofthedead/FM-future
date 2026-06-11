import { Routes, Route, Navigate } from 'react-router-dom'
import { AppShell } from '@/app/AppShell'
import OverviewPage from '@/modules/overview/OverviewPage'
import ReconciliationPage from '@/modules/reconciliation/ReconciliationPage'
import CaseDetailPage from '@/modules/reconciliation/CaseDetailPage'
import PbcRequestAgentPage from '@/modules/pbc/PbcRequestAgentPage'
import LineagePage from '@/modules/lineage/LineagePage'

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<OverviewPage />} />
        <Route path="/reconciliation" element={<ReconciliationPage />} />
        <Route path="/reconciliation/:transactionId" element={<CaseDetailPage />} />
        <Route path="/pbc" element={<PbcRequestAgentPage />} />
        <Route path="/lineage" element={<LineagePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  )
}
