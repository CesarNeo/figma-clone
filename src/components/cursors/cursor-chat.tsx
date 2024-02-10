import { ChangeEvent, KeyboardEvent as KeyboardEventReact } from 'react'

import { CursorChatProps, CursorMode } from '@/types/type'

import CursorSVG from './cursor-svg'

function CursorChat({
  cursor,
  cursorState,
  onCursorStateChange,
  onMyPresenceChange,
}: CursorChatProps) {
  function handleCursorMessageChange(event: ChangeEvent<HTMLInputElement>) {
    const newMessage = event.target.value

    onMyPresenceChange({ message: newMessage })
    onCursorStateChange({
      mode: CursorMode.Chat,
      previousMessage: null,
      message: newMessage,
    })
  }
  function handleKeyDown(event: KeyboardEventReact<HTMLInputElement>) {
    if (event.key === 'Enter') {
      onCursorStateChange({
        mode: CursorMode.Chat,
        previousMessage:
          cursorState.mode === CursorMode.Chat ? cursorState.message : null,
        message: '',
      })
    }

    if (event.key === 'Escape') {
      onCursorStateChange({
        mode: CursorMode.Hidden,
      })
    }
  }

  return (
    <div
      className="absolute left-0 top-0"
      style={{
        transform: `translate(${cursor.x}px, ${cursor.y}px)`,
        transition: 'transform 0.1s ease',
      }}
    >
      {cursorState.mode === CursorMode.Chat && (
        <>
          <CursorSVG color="#000" />

          <div className="absolute left-2 top-5 rounded-3xl bg-primary px-4 py-2 text-sm leading-relaxed">
            {cursorState?.previousMessage && (
              <span>{cursorState.previousMessage}</span>
            )}

            <input
              type="text"
              className="z-10 w-60 border-none bg-transparent placeholder-primary outline-none"
              autoFocus
              onChange={handleCursorMessageChange}
              onKeyDown={handleKeyDown}
              placeholder={
                cursorState.previousMessage ? '' : 'Type a message...'
              }
              value={cursorState.message}
              maxLength={50}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default CursorChat
