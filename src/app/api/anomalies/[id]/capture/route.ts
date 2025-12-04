import { NextResponse } from 'next/server'
import { mockAnomalies } from '../mock-data'
import { AnomalySchema } from '@entities/anomaly/model/schema'
import { sleep } from '@shared/lib/sleep'
import { API_DELAYS, CAPTURE_ERROR_PROBABILITY, STATUS } from '@shared/config/constants'
import { ApiError } from '@shared/api/errors'

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // 1. Валидация id
    const id = parseInt(params.id, 10)

    if (isNaN(id)) {
      throw new ApiError('Invalid anomaly ID', 400)
    }

    // 2. Находим духа в mock-data
    const anomalyIndex = mockAnomalies.findIndex((a) => a.id === id)

    if (anomalyIndex === -1) {
      throw new ApiError('Anomaly not found', 404)
    }

    const anomaly = mockAnomalies[anomalyIndex]

    if (anomaly.status === STATUS.CAPTURED) {
      throw new ApiError('Anomaly already captured', 400)
    }

    await sleep(API_DELAYS.CAPTURE_ANOMALY)

    // 3. 30% шанс ошибки
    if (Math.random() < CAPTURE_ERROR_PROBABILITY) {
      throw new ApiError('Capture failed', 500)
    }

    // 4. Меняем статус → "Captured" в mock-data
    const updatedAnomaly = {
      ...anomaly,
      status: STATUS.CAPTURED as const,
    }

    mockAnomalies[anomalyIndex] = updatedAnomaly

    // 5. Валидация и возврат обновлённой сущности
    const validatedData = AnomalySchema.parse(updatedAnomaly)

    return NextResponse.json(validatedData)
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode || 500 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
