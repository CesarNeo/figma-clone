'use client'

import { ThreadData } from '@liveblocks/client'
import { Thread } from '@liveblocks/react-comments'
import Image from 'next/image'
import { memo, MouseEvent, useMemo, useState } from 'react'

import { ThreadMetadata } from '@/liveblocks.config'

type Props = {
  thread: ThreadData<ThreadMetadata>
  onFocus: (threadId: string) => void
}

type OnClickEvent = MouseEvent<HTMLDivElement> & {
  target: HTMLDivElement
}

function PinnedThread({ thread, onFocus, ...props }: Props) {
  const startMinimized = useMemo(
    () => Number(new Date()) - Number(new Date(thread.createdAt)) > 100,
    [thread],
  )
  const avatar = useMemo(
    () =>
      `https://liveblocks.io/avatars/avatar-${Math.floor(
        Math.random() * 30,
      )}.png`,
    [],
  )

  const [minimized, setMinimized] = useState(startMinimized)

  function handleClick(e: OnClickEvent) {
    onFocus(thread.id)

    if (
      e.target &&
      e.target.classList.contains('lb-icon') &&
      e.target.classList.contains('lb-button-icon')
    ) {
      return
    }

    setMinimized(!minimized)
  }

  return (
    <div
      className="absolute flex cursor-pointer gap-4"
      {...props}
      onClick={handleClick}
    >
      <div
        className="relative flex h-9 w-9 select-none items-center justify-center rounded-bl-full rounded-br-full rounded-tl-md rounded-tr-full bg-white shadow"
        data-draggable={true}
      >
        <Image
          src={avatar}
          alt="Dummy Name"
          width={28}
          height={28}
          draggable={false}
          className="rounded-full"
        />
      </div>
      {!minimized ? (
        <div className="flex min-w-60 flex-col overflow-hidden rounded-lg bg-white text-sm shadow">
          <Thread
            thread={thread}
            indentCommentContent={false}
            onKeyUp={(e) => e.stopPropagation()}
          />
        </div>
      ) : null}
    </div>
  )
}

export default memo(PinnedThread)
