import { apiClient } from '@shared/api/client'
import { AnomaliesArraySchema, AnomalySchema } from '../model/schema'
import type { Anomaly } from '../model/types'

export async function getAnomalies(): Promise<Anomaly[]> {
  const data = await apiClient<Anomaly[]>(
    '/api/anomalies',
    { method: 'GET' },
    AnomaliesArraySchema
  )
  return data
}

export async function captureAnomaly(id: number): Promise<Anomaly> {
  const data = await apiClient<Anomaly>(
    `/api/anomalies/${id}/capture`,
    { method: 'POST' },
    AnomalySchema
  )
  return data
}

