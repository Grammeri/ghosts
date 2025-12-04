export const logger = {
  info: (...args: unknown[]) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('[INFO]', ...args)
    }
  },
  error: (...args: unknown[]) => {
    console.error('[ERROR]', ...args)
  },
  warn: (...args: unknown[]) => {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[WARN]', ...args)
    }
  },
}

