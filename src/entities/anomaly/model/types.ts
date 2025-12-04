import type { z } from 'zod'
import {
  AnomalySchema,
  ThreatLevelSchema,
  StatusSchema,
  AnomaliesArraySchema,
} from './schema'

export type Anomaly = z.infer<typeof AnomalySchema>
export type Anomalies = z.infer<typeof AnomaliesArraySchema>
export type ThreatLevel = z.infer<typeof ThreatLevelSchema>
export type AnomalyStatus = z.infer<typeof StatusSchema>

export type CaptureResponse = {
  success: boolean
  anomaly: Anomaly
}

