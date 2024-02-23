'use client'

import { ThreadData } from '@liveblocks/client'
import { useCallback, useRef } from 'react'

import { useMaxZIndex } from '@/lib/useMaxZIndex'
import {
  ThreadMetadata,
  useEditThreadMetadata,
  useThreads,
  useUser,
} from '@/liveblocks.config'

import { PinnedThread } from './pinned-thread'

type OverlayThreadProps = {
  thread: ThreadData<ThreadMetadata>
  maxZIndex: number
}

function CommentsOverlay() {
  const { threads } = useThreads()
  const maxZIndex = useMaxZIndex()

  return (
    <div>
      {threads
        .filter((thread) => !thread.metadata.resolved)
        .map((thread) => (
          <OverlayThread
            key={thread.id}
            thread={thread}
            maxZIndex={maxZIndex}
          />
        ))}
    </div>
  )
}

function OverlayThread({ thread, maxZIndex }: OverlayThreadProps) {
  const editThreadMetadata = useEditThreadMetadata()
  const { isLoading } = useUser(thread.comments[0].userId)

  const threadRef = useRef<HTMLDivElement>(null)

  const handleIncreaseZIndex = useCallback(() => {
    if (maxZIndex === thread.metadata.zIndex) {
      return
    }

    editThreadMetadata({
      threadId: thread.id,
      metadata: {
        zIndex: maxZIndex + 1,
      },
    })
  }, [])

  if (isLoading) return null

  return (
    <div
      ref={threadRef}
      id={`thread-${thread.id}`}
      className="absolute left-0 top-0 flex gap-5"
      style={{
        transform: `translate(${thread.metadata.x}px, ${thread.metadata.y}px)`,
      }}
    >
      <PinnedThread thread={thread} onFocus={handleIncreaseZIndex} />
    </div>
  )
}

export default CommentsOverlay
