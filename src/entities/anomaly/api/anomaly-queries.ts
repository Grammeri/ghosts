import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnomalies, captureAnomaly } from './anomaly-api'
import { queryKeys } from '@shared/config/query-keys'
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

