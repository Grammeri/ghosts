import type { Metadata } from 'next'
import { Providers } from '@shared/lib/providers'
import './globals.scss'

export const metadata: Metadata = {
  title: 'Yokai Monitor',
  description: 'Real-time anomaly monitoring dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

