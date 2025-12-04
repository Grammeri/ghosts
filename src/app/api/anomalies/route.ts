import { NextResponse } from 'next/server'
import { mockAnomalies } from './mock-data'
import { AnomaliesArraySchema } from '@entities/anomaly/model/schema'
import { sleep } from '@shared/lib/sleep'
import { API_DELAYS } from '@shared/config/constants'
import { ApiError } from '@shared/api/errors'

export async function GET() {
  try {
    await sleep(API_DELAYS.GET_ANOMALIES)

    const validatedData = AnomaliesArraySchema.parse(mockAnomalies)

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
