'use client'

import { ClientSideSuspense } from '@liveblocks/react'
import { ReactNode } from 'react'

import { RoomProvider } from '@/liveblocks.config'

function Room({ children }: { children: ReactNode }) {
  return (
    <RoomProvider id="my-room" initialPresence={{}}>
      <ClientSideSuspense fallback={<div>loading...</div>}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  )
}

export default Room
