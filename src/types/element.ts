import { fabric } from 'fabric'

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
