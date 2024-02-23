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

export type Reaction = {
  value: string
  timestamp: number
  point: { x: number; y: number }
}

export type ReactionEvent = {
  x: number
  y: number
  value: string
}

export type Attributes = {
  width: string
  height: string
  fontSize: string
  fontFamily: string
  fontWeight: string
  fill: string
  stroke: string
}

export type ActiveElement = {
  name: string
  value: string
  icon: string
} | null

export type ElementDirection = {
  canvas: fabric.Canvas
  direction: string
  syncShapeInStorage: (shape: fabric.Object) => void
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
