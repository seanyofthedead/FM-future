import type { ReactNode } from 'react'
import { Brand } from '@/components/Brand'
import { ModuleNav } from '@/components/ModuleNav'

/** One shell wraps every module so the product reads as a single application. */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-brand-sand">
      <header className="bg-brand-navy">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-4 md:flex-row md:items-center md:justify-between">
          <Brand />
          <ModuleNav />
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
      <footer className="mx-auto max-w-6xl px-6 py-6 text-xs text-muted">
        Guidehouse · Financial Management of the Future · one product, one audit-ready pipeline
      </footer>
    </div>
  )
}
