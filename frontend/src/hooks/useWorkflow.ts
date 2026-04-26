import { useState, useEffect, useCallback, useRef } from 'react'

export type WorkflowStatus =
  | 'idle'
  | 'running'
  | 'waiting_for_hitl'
  | 'completed'
  | 'error'

export interface WorkflowState {
  status: WorkflowStatus
  progress: number
  message: string
  data?: Record<string, unknown>
}

const POLLING_INTERVAL = 3000

export function useWorkflow(_workflowId?: string) {
  const [state, setState] = useState<WorkflowState>({
    status: 'idle',
    progress: 0,
    message: '',
  })
  const [isPolling, setIsPolling] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const checkStatus = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/workflow/${id}/status`)
      if (!response.ok) throw new Error('Failed to fetch status')
      const data = await response.json()
      setState({
        status: data.status,
        progress: data.progress || 0,
        message: data.message || '',
        data: data.data,
      })
      return data.status as WorkflowStatus
    } catch (err) {
      setState((prev) => ({
        ...prev,
        status: 'error' as WorkflowStatus,
        message: err instanceof Error ? err.message : 'Erreur de connexion',
      }))
      return 'error' as WorkflowStatus
    }
  }, [])

  const startPolling = useCallback(
    (id: string) => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      setIsPolling(true)
      setState({ status: 'running', progress: 0, message: 'Démarrage...' })

      intervalRef.current = setInterval(async () => {
        const status = await checkStatus(id)
        if (
          status === 'completed' ||
          status === 'error' ||
          status === 'waiting_for_hitl'
        ) {
          if (intervalRef.current) clearInterval(intervalRef.current)
          setIsPolling(false)
        }
      }, POLLING_INTERVAL)
    },
    [checkStatus]
  )

  const stopPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setIsPolling(false)
  }, [])

  const startWorkflow = useCallback(
    async (payload: Record<string, unknown>) => {
      try {
        const response = await fetch('/api/workflow/start', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!response.ok) throw new Error('Failed to start workflow')
        const data = await response.json()
        startPolling(data.workflowId)
        return data.workflowId as string
      } catch (err) {
        setState({
          status: 'error',
          progress: 0,
          message: err instanceof Error ? err.message : 'Erreur de démarrage',
        })
        throw err
      }
    },
    [startPolling]
  )

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  return {
    ...state,
    isPolling,
    startWorkflow,
    startPolling,
    stopPolling,
    checkStatus,
  }
}
