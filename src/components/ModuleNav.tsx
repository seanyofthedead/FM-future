import { NavLink } from 'react-router-dom'
import { MODULES } from '@/lib/brand'

export function ModuleNav() {
  return (
    <nav className="flex flex-wrap gap-1">
      {MODULES.map((m) => (
        <NavLink
          key={m.key}
          to={m.path}
          end={m.path === '/'}
          className={({ isActive }) =>
            [
              'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
              isActive ? 'bg-white text-brand-navy' : 'text-white/85 hover:bg-white/10',
            ].join(' ')
          }
        >
          {m.label}
        </NavLink>
      ))}
    </nav>
  )
}
