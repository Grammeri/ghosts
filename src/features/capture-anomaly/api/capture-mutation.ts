import { useMutation, useQueryClient } from '@tanstack/react-query'
import { captureAnomaly } from '@entities/anomaly/api/anomaly-api'
import { queryKeys } from '@shared/config/query-keys'
import type { Anomaly } from '@entities/anomaly/model/types'

export function useCaptureAnomalyMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: captureAnomaly,
    onMutate: async (id: number) => {
      // Отменяем все исходящие запросы, чтобы они не перезаписали наш optimistic update
      await queryClient.cancelQueries({ queryKey: queryKeys.anomalies.all })

      // Сохраняем предыдущие данные для отката
      const previousAnomalies = queryClient.getQueryData<Anomaly[]>(
        queryKeys.anomalies.list()
      )

      // Оптимистично обновляем статус
      queryClient.setQueryData<Anomaly[]>(
        queryKeys.anomalies.list(),
        (old) => {
          if (!old) return old
          return old.map((anomaly) =>
            anomaly.id === id
              ? { ...anomaly, status: 'Captured' as const }
              : anomaly
          )
        }
      )

      return { previousAnomalies }
    },
    onError: (_error, _id, context) => {
      // Откатываем состояние при ошибке
      if (context?.previousAnomalies) {
        queryClient.setQueryData(
          queryKeys.anomalies.list(),
          context.previousAnomalies
        )
      }
    },
    onSettled: () => {
      // Инвалидируем queries для синхронизации с сервером
      queryClient.invalidateQueries({ queryKey: queryKeys.anomalies.all })
    },
  })
}
