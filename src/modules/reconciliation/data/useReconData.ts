import { useEffect, useState } from 'react'
import { loadReconData } from './loadReconData'
import type { ReconRow } from './types'

type State = { rows: ReconRow[]; loading: boolean; error: string | null }

export function useReconData(): State {
  const [state, setState] = useState<State>({ rows: [], loading: true, error: null })
  useEffect(() => {
    let alive = true
    loadReconData()
      .then((rows) => alive && setState({ rows, loading: false, error: null }))
      .catch((e) => alive && setState({ rows: [], loading: false, error: String(e?.message ?? e) }))
    return () => {
      alive = false
    }
  }, [])
  return state
}
