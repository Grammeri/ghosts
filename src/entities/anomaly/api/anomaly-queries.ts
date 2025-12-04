'use client'

import { useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnomalies, captureAnomaly } from './anomaly-api'
import { queryKeys } from '@shared/config/query-keys'
import { SSEClient } from '@shared/lib/sse-client'
import type { Anomaly } from '../model/types'

export function useAnomalies() {
  return useQuery({
    queryKey: queryKeys.anomalies.list(),
    queryFn: getAnomalies,
  })
}

export function useCaptureAnomaly() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: captureAnomaly,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.anomalies.all })
    },
  })
}

export function useAnomaliesStream() {
  const queryClient = useQueryClient()

  useEffect(() => {
    const sseClient = new SSEClient()

    sseClient.connect('/api/sse', (data) => {
      if (
        data &&
        typeof data === 'object' &&
        'id' in data &&
        'threat' in data &&
        typeof data.id === 'number' &&
        typeof data.threat === 'string'
      ) {
        const { id, threat } = data

        queryClient.setQueryData<Anomaly[]>(
          queryKeys.anomalies.list(),
          (old) => {
            if (!old) return old

            return old.map((anomaly) =>
              anomaly.id === id ? { ...anomaly, threat: threat as Anomaly['threat'] } : anomaly
            )
          }
        )
      }
    })

    return () => {
      sseClient.disconnect()
    }
  }, [queryClient])
}

