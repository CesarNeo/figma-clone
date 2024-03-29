'use client'

import { LiveMap } from '@liveblocks/client'
import { ClientSideSuspense } from '@liveblocks/react'
import { ReactNode } from 'react'

import Loader from '@/components/loader'
import { RoomProvider } from '@/liveblocks.config'

function Room({ children }: { children: ReactNode }) {
  return (
    <RoomProvider
      id="my-room"
      initialPresence={{
        cursor: null,
        message: null,
      }}
      initialStorage={{
        canvasObjects: new LiveMap(),
      }}
    >
      <ClientSideSuspense fallback={<Loader />}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  )
}

export default Room
