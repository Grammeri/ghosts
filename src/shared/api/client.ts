import { z } from 'zod'

export async function apiClient<T>(
  url: string,
  options?: RequestInit,
  schema?: z.ZodSchema<T>
): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  })

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`)
  }

  const data = await response.json()

  if (schema) {
    return schema.parse(data)
  }

  return data as T
}

