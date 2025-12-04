import { z } from 'zod'

export const ThreatLevelSchema = z.enum(['Low', 'Medium', 'High', 'Critical'])

export const StatusSchema = z.enum(['Active', 'Captured'])

export const AnomalySchema = z.object({
  id: z.number(),
  name: z.string(),
  threat: ThreatLevelSchema,
  location: z.string(),
  status: StatusSchema,
})

export const AnomaliesArraySchema = z.array(AnomalySchema)

