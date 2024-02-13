'use client'

import { PointerEvent, useCallback, useEffect, useState } from 'react'

import { shortcuts } from '@/constants'
import useInterval from '@/hooks/useInterval'
import {
  useBroadcastEvent,
  useEventListener,
  useMyPresence,
  useOthers,
} from '@/liveblocks.config'
import { CursorMode, CursorState, Reaction, ReactionEvent } from '@/types/type'

import Comments from './comments/comments'
import CursorChat from './cursors/cursor-chat'
import LiveCursors from './cursors/live-cursors'
import FlyingReaction from './reaction/flying-reaction'
import ReactionSelector from './reaction/reaction-button'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from './ui/context-menu'

type MyPresence = {
  cursor?: {
    x: number
    y: number
  } | null
  message?: string | null
}

interface LiveProps {
  canvasRef: React.RefObject<HTMLCanvasElement>
  undo: () => void
  redo: () => void
}

function Live({ canvasRef, undo, redo }: LiveProps) {
  const others = useOthers()
  const [{ cursor }, setMyPresence] = useMyPresence() as unknown as [
    MyPresence,
    (presence: MyPresence) => void,
  ]
  const [cursorState, setCursorState] = useState<CursorState>({
    mode: CursorMode.Hidden,
  })
  const [reactions, setReactions] = useState<Reaction[]>([])

  const broadcast = useBroadcastEvent()

  const handlePointerMove = useCallback(
    (event: PointerEvent) => {
      event.preventDefault()

      if (!event.currentTarget) return

      if (cursor === null || cursorState.mode !== CursorMode.ReactionSelector) {
        const x = event.clientX - event.currentTarget.getBoundingClientRect().x
        const y = event.clientY - event.currentTarget.getBoundingClientRect().y

        setMyPresence({ cursor: { x, y } })
      }
    },
    [cursor, cursorState.mode, setMyPresence],
  )

  const handlePointerLeave = useCallback(() => {
    setCursorState({ mode: CursorMode.Hidden })
    setMyPresence({ cursor: null, message: null })
  }, [setMyPresence])

  const handlePointerUp = useCallback(() => {
    setCursorState((prevCursorState) => {
      if (prevCursorState.mode === CursorMode.Reaction) {
        return {
          ...prevCursorState,
          isPressed: true,
        }
      }

      return prevCursorState
    })
  }, [])

  const handlePointerDown = useCallback(
    (event: PointerEvent) => {
      if (!event.currentTarget) return

      const x = event.clientX - event.currentTarget.getBoundingClientRect().x
      const y = event.clientY - event.currentTarget.getBoundingClientRect().y

      setMyPresence({ cursor: { x, y } })

      setCursorState((prevCursorState) => {
        if (prevCursorState.mode === CursorMode.Reaction) {
          return {
            ...prevCursorState,
            isPressed: true,
          }
        }

        return prevCursorState
      })
    },
    [setMyPresence],
  )

  const onReaction = useCallback((reaction: string) => {
    setCursorState({
      mode: CursorMode.Reaction,
      reaction,
      isPressed: false,
    })
  }, [])

  const handleContextMenuShortcut = useCallback(
    (name: string) => {
      switch (name) {
        case 'Chat':
          setCursorState({
            mode: CursorMode.Chat,
            previousMessage: null,
            message: '',
          })
          break
        case 'Reactions':
          setCursorState({ mode: CursorMode.ReactionSelector })
          break
        case 'Undo':
          undo()
          break
        case 'Redo':
          redo()
          break
        default:
          break
      }
    },
    [redo, undo],
  )

  useInterval(() => {
    if (
      cursorState.mode === CursorMode.Reaction &&
      cursorState.isPressed &&
      cursor
    ) {
      setReactions((prevReactions) =>
        prevReactions.concat([
          {
            point: {
              x: cursor.x,
              y: cursor.y,
            },
            timestamp: Date.now(),
            value: cursorState.reaction,
          },
        ]),
      )

      broadcast({
        x: cursor.x,
        y: cursor.y,
        value: cursorState.reaction,
      })
    }
  }, 100)

  useInterval(() => {
    setReactions((prevReactions) =>
      prevReactions.filter(
        (reaction) => Date.now() - reaction.timestamp < 4000,
      ),
    )
  }, 1000)

  useEventListener((eventData) => {
    const event = eventData.event as ReactionEvent

    setReactions((prevReactions) =>
      prevReactions.concat([
        {
          point: {
            x: event.x,
            y: event.y,
          },
          timestamp: Date.now(),
          value: event.value,
        },
      ]),
    )
  })

  useEffect(() => {
    function onKeyUp(event: KeyboardEvent) {
      if (event.key === '/') {
        setCursorState({
          mode: CursorMode.Chat,
          previousMessage: null,
          message: '',
        })
      }

      if (event.key === 'Escape') {
        setMyPresence({ message: '' })
        setCursorState({ mode: CursorMode.Hidden })
      }

      if (event.key === 'e') {
        setCursorState({ mode: CursorMode.ReactionSelector })
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === '/') {
        event.preventDefault()
      }
    }

    window.addEventListener('keyup', onKeyUp)
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keyup', onKeyUp)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [setMyPresence])

  return (
    <ContextMenu>
      <ContextMenuTrigger
        id="canvas"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onPointerUp={handlePointerUp}
        onPointerDown={handlePointerDown}
        className="relative flex h-full w-full flex-1 items-center justify-center"
      >
        <canvas ref={canvasRef} />

        {reactions.map((reaction) => (
          <FlyingReaction
            key={reaction.timestamp.toString()}
            x={reaction.point.x}
            y={reaction.point.y}
            timestamp={reaction.timestamp}
            value={reaction.value}
          />
        ))}

        {cursor && (
          <CursorChat
            cursor={cursor}
            cursorState={cursorState}
            onCursorStateChange={setCursorState}
            onMyPresenceChange={setMyPresence}
          />
        )}

        {cursorState.mode === CursorMode.ReactionSelector && (
          <ReactionSelector setReaction={onReaction} />
        )}

        <LiveCursors others={others} />

        <Comments />
      </ContextMenuTrigger>

      <ContextMenuContent className="right-menu-content">
        {shortcuts.map((shortcut) => (
          <ContextMenuItem
            key={shortcut.key}
            onClick={() => handleContextMenuShortcut(shortcut.name)}
            className="right-menu-item"
          >
            <span>{shortcut.name}</span>
            <span className="text-xs text-secondary-foreground">
              {shortcut.shortcut}
            </span>
          </ContextMenuItem>
        ))}
      </ContextMenuContent>
    </ContextMenu>
  )
}

export default Live
