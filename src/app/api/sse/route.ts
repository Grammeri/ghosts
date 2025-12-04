import { NextRequest } from 'next/server'
import { mockAnomalies } from '../anomalies/mock-data'
import { THREAT_LEVELS, API_DELAYS } from '@shared/config/constants'
import type { ThreatLevel } from '@entities/anomaly/model/types'

export const dynamic = 'force-dynamic'

const THREAT_LEVELS_ARRAY: ThreatLevel[] = [
  THREAT_LEVELS.LOW,
  THREAT_LEVELS.MEDIUM,
  THREAT_LEVELS.HIGH,
  THREAT_LEVELS.CRITICAL,
]

function getRandomThreatLevel(): ThreatLevel {
  const randomIndex = Math.floor(Math.random() * THREAT_LEVELS_ARRAY.length)
  const threat = THREAT_LEVELS_ARRAY[randomIndex]
  if (!threat) {
    return THREAT_LEVELS.LOW
  }
  return threat
}

function getRandomAnomalyId(): number {
  const activeAnomalies = mockAnomalies.filter((a) => a.status === 'Active')
  if (activeAnomalies.length === 0) return 0

  const randomIndex = Math.floor(Math.random() * activeAnomalies.length)
  const randomAnomaly = activeAnomalies[randomIndex]
  if (!randomAnomaly) {
    return 0
  }
  return randomAnomaly.id
}

export async function GET(request: NextRequest) {
  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    start(controller) {
      const intervalId = setInterval(() => {
        try {
          const anomalyId = getRandomAnomalyId()

          if (anomalyId === 0) {
            return
          }

          const anomalyIndex = mockAnomalies.findIndex((a) => a.id === anomalyId)

          if (anomalyIndex === -1) {
            return
          }

          const currentAnomaly = mockAnomalies[anomalyIndex]
          if (!currentAnomaly) {
            return
          }

          const newThreat = getRandomThreatLevel()

          mockAnomalies[anomalyIndex] = {
            ...currentAnomaly,
            threat: newThreat,
          }

          const data = {
            id: anomalyId,
            threat: newThreat,
          }

          const message = `data: ${JSON.stringify(data)}\n\n`
          controller.enqueue(encoder.encode(message))
        } catch (error) {
          console.error('SSE error:', error)
          clearInterval(intervalId)
          controller.close()
        }
      }, API_DELAYS.SSE_INTERVAL)

      request.signal.addEventListener('abort', () => {
        clearInterval(intervalId)
        controller.close()
      })
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  })
}
