import './globals.css'

import type { Metadata } from 'next'
import { Work_Sans as WorkSans } from 'next/font/google'

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
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${workSans.variable} font-work-sans bg-background dark antialiased`}
      >
        <Room>{children}</Room>
      </body>
    </html>
  )
}
