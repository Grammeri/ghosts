import { z } from 'zod'
import { ApiError } from './errors'

export async function apiClient<T>(
  url: string,
  options?: RequestInit,
  schema?: z.ZodSchema<T>
): Promise<T> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    })

    if (!response.ok) {
      let errorMessage = `API Error: ${response.statusText}`
      let errorData: unknown

      try {
        errorData = await response.json()
        if (errorData && typeof errorData === 'object') {
          // Check for 'error' field first (our API format), then 'message'
          if ('error' in errorData) {
            errorMessage = String(errorData.error)
          } else if ('message' in errorData) {
            errorMessage = String(errorData.message)
          }
        }
      } catch {
        // If JSON parsing fails, use default error message
      }

      throw new ApiError(errorMessage, response.status, errorData)
    }

    const data = await response.json()

    if (schema) {
      try {
        return schema.parse(data)
      } catch (error) {
        if (error instanceof z.ZodError) {
          throw new ApiError(
            `Validation error: ${error.errors.map((e) => e.message).join(', ')}`,
            response.status,
            error.errors
          )
        }
        throw error
      }
    }

    return data as T
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(
      error instanceof Error ? error.message : 'Unknown error occurred',
      undefined,
      error
    )
  }
}

