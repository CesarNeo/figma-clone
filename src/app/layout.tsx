import './globals.css'

import type { Metadata } from 'next'
import { Work_Sans as WorkSans } from 'next/font/google'
import { ReactNode } from 'react'

import CanvasProvider from '@/context/canvas'

import Room from './room'

const workSans = WorkSans({
  subsets: ['latin'],
  variable: '--font-work-sans',
  weight: ['400', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Figma Clone',
  description:
    'A minimalist Figma clone using Fabric.js and Liveblocks for real-time collaboration.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${workSans.variable} dark overflow-hidden bg-background font-work-sans antialiased`}
      >
        <Room>
          <CanvasProvider>{children}</CanvasProvider>
        </Room>
      </body>
    </html>
  )
}
