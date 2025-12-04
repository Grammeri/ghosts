import { useMutation, useQueryClient } from "@tanstack/react-query";
import { captureAnomaly } from "@entities/anomaly/api/anomaly-api";
import { queryKeys } from "@shared/config/query-keys";
import { STATUS } from "@shared/config/constants";
import type { Anomaly } from "@entities/anomaly/model/types";

export function useCaptureAnomalyMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: captureAnomaly,
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.anomalies.all });

      const previousAnomalies = queryClient.getQueryData<Anomaly[]>(
        queryKeys.anomalies.list()
      );

      queryClient.setQueryData<Anomaly[]>(queryKeys.anomalies.list(), (old) => {
        if (!old) return old;
        return old.map((anomaly) =>
          anomaly.id === id ? { ...anomaly, status: STATUS.CAPTURED } : anomaly
        );
      });

      return { previousAnomalies };
    },
    onError: (_error, _id, context) => {
      if (context?.previousAnomalies) {
        queryClient.setQueryData(
          queryKeys.anomalies.list(),
          context.previousAnomalies
        );
      }
    },
    onSuccess: (data) => {
      queryClient.setQueryData<Anomaly[]>(queryKeys.anomalies.list(), (old) => {
        if (!old) return old;
        return old.map((anomaly) => (anomaly.id === data.id ? data : anomaly));
      });
    },
  });
}
