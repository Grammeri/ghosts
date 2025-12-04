export interface SSEClientOptions {
  autoReconnect?: boolean
  reconnectInterval?: number
  onError?: (error: Event) => void
}

export class SSEClient {
  private eventSource: EventSource | null = null
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null
  private url: string = ''
  private onMessageCallback: ((data: unknown) => void) | null = null
  private options: Required<SSEClientOptions> = {
    autoReconnect: true,
    reconnectInterval: 3000,
    onError: () => {},
  }

  connect(
    url: string,
    onMessage: (data: unknown) => void,
    options?: SSEClientOptions
  ): void {
    this.disconnect()

    this.url = url
    this.onMessageCallback = onMessage
    this.options = { ...this.options, ...options }

    this._connect()
  }

  private _connect(): void {
    if (!this.url || !this.onMessageCallback) {
      return
    }

    this.eventSource = new EventSource(this.url)

    this.eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        this.onMessageCallback?.(data)
      } catch (error) {
        console.error('Failed to parse SSE message:', error)
      }
    }

    this.eventSource.onerror = (error) => {
      this.options.onError(error)

      if (this.eventSource?.readyState === EventSource.CLOSED) {
        if (this.options.autoReconnect) {
          this._scheduleReconnect()
        }
      }
    }

    this.eventSource.onopen = () => {
      // Clear any pending reconnect timer on successful connection
      if (this.reconnectTimer) {
        clearTimeout(this.reconnectTimer)
        this.reconnectTimer = null
      }
    }
  }

  private _scheduleReconnect(): void {
    if (this.reconnectTimer) {
      return
    }

    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null
      if (this.url && this.onMessageCallback) {
        this._connect()
      }
    }, this.options.reconnectInterval)
  }

  disconnect(): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer)
      this.reconnectTimer = null
    }

    if (this.eventSource) {
      this.eventSource.close()
      this.eventSource = null
    }

    this.url = ''
    this.onMessageCallback = null
  }

  isConnected(): boolean {
    return (
      this.eventSource !== null &&
      this.eventSource.readyState === EventSource.OPEN
    )
  }
}

