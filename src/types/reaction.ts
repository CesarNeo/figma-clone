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
