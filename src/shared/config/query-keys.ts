export const queryKeys = {
  anomalies: {
    all: ['anomalies'] as const,
    list: () => [...queryKeys.anomalies.all, 'list'] as const,
    detail: (id: number) => [...queryKeys.anomalies.all, id] as const,
  },
} as const

