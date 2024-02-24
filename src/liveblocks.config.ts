import { createClient, LiveMap } from '@liveblocks/client'
import { createRoomContext } from '@liveblocks/react'

import { env } from './env'
import { FabricObjectProperties, ReactionEvent } from './types'

const client = createClient({
  publicApiKey: env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY,
})

export type Presence = {
  cursor: { x: number; y: number } | null
  message: string | null
}

type Storage = {
  canvasObjects: LiveMap<string, FabricObjectProperties>
}

type UserMeta = {
  // id?: string,  // Accessible through `user.id`
  // info?: Json,  // Accessible through `user.info`
}

type RoomEvent = ReactionEvent

export type ThreadMetadata = {
  resolved: boolean
  zIndex: number
  x: number
  y: number
}

export const {
  suspense: {
    RoomProvider,
    useRoom,
    useMyPresence,
    useUpdateMyPresence,
    useSelf,
    useOthers,
    useOthersMapped,
    useOthersConnectionIds,
    useOther,
    useBroadcastEvent,
    useEventListener,
    useErrorListener,
    useStorage,
    useObject,
    useMap,
    useList,
    useBatch,
    useHistory,
    useUndo,
    useRedo,
    useCanUndo,
    useCanRedo,
    useMutation,
    useStatus,
    useLostConnectionListener,
    useThreads,
    useUser,
    useCreateThread,
    useEditThreadMetadata,
    useCreateComment,
    useEditComment,
    useDeleteComment,
    useAddReaction,
    useRemoveReaction,
  },
} = createRoomContext<Presence, Storage, UserMeta, RoomEvent, ThreadMetadata>(
  client,
)
