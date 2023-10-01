import { Analytics } from '@vercel/analytics/react'
import '@/styles/globals.css'
import ColorMode from './colormode'

export const metadata = {
  title: 'Missbed: Embedding Solution for Misskey',
  description: 'Fast. Flexible. Free.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>{children}</body>
      <Analytics></Analytics>
      <ColorMode></ColorMode>
    </html>
  )
}
