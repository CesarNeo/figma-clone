/* eslint-disable no-unused-vars */
export enum CursorMode {
  Hidden,
  Chat,
  ReactionSelector,
  Reaction,
}

export type CursorState =
  | {
      mode: CursorMode.Hidden
    }
  | {
      mode: CursorMode.Chat
      message: string
      previousMessage: string | null
    }
  | {
      mode: CursorMode.ReactionSelector
    }
  | {
      mode: CursorMode.Reaction
      reaction: string
      isPressed: boolean
    }

export type CursorChatProps = {
  cursor: { x: number; y: number }
  cursorState: CursorState
  onCursorStateChange: (cursorState: CursorState) => void
  onMyPresenceChange: (
    presence: Partial<{
      cursor: { x: number; y: number }
      cursorColor: string
      message: string
    }>,
  ) => void
}
