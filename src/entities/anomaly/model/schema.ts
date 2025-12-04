import { z } from 'zod'

export const AnomalySchema = z.object({
  id: z.number(),
  name: z.string(),
  threat: z.enum(['Low', 'Medium', 'High', 'Critical']),
  location: z.string(),
  status: z.enum(['Active', 'Captured']),
})

export const AnomaliesArraySchema = z.array(AnomalySchema)

export type Anomaly = z.infer<typeof AnomalySchema>
export type Anomalies = z.infer<typeof AnomaliesArraySchema>

