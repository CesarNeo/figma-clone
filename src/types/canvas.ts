import { Json, JsonArray } from '@liveblocks/client'
import { MutableRefObject } from 'react'

import { NavElement } from '.'

export type FabricObjectProperties = {
  angle: number
  backgroundColor: string
  charSpacing: number
  direction: string
  fill: string
  fillRule: string
  flipX: boolean
  flipY: boolean
  fontFamily: string
  fontSize: number
  fontStyle: string
  fontWeight: string
  globalCompositeOperation: string
  height: number
  left: number
  lineHeight: number
  linethrough: boolean
  objectId: string
  opacity: number
  originX: string
  originY: string
  overline: boolean
  paintFirst: string
  path: Json | undefined
  pathAlign: string
  pathSide: string
  pathStartOffset: number
  scaleX: number
  scaleY: number
  shadow: Json | undefined
  skewX: number
  skewY: number
  stroke: Json | undefined
  strokeDashArray: JsonArray
  strokeDashOffset: number
  strokeLineCap: string
  strokeLineJoin: string
  strokeMiterLimit: number
  strokeUniform: boolean
  strokeWidth: number
  styles: Json | undefined
  text: string
  textAlign: string
  textBackgroundColor: string
  top: number
  type: string
  underline: boolean
  version: string
  visible: boolean
  width: number
}

export type CanvasMouseUp = {
  canvas: fabric.Canvas
  isDrawing: MutableRefObject<boolean>
  shapeRef: MutableRefObject<fabric.Object | null>
  activeObjectRef: MutableRefObject<fabric.Object | null>
  selectedShapeRef: MutableRefObject<string | null>
  syncShapeInStorage: (shape: fabric.Object) => void
  setActiveElement: (element: NavElement) => void
}

export type CanvasMouseDown = {
  options: fabric.IEvent
  canvas: fabric.Canvas
  selectedShapeRef: MutableRefObject<string | null>
  isDrawing: MutableRefObject<boolean>
  shapeRef: MutableRefObject<fabric.Object | null>
}

export type CanvasMouseMove = {
  options: fabric.IEvent
  canvas: fabric.Canvas
  isDrawing: MutableRefObject<boolean>
  selectedShapeRef: MutableRefObject<string | null>
  shapeRef: MutableRefObject<fabric.Object | null>
  syncShapeInStorage: (shape: fabric.Object) => void
}

export type CustomFabricObject = fabric.Object & {
  objectId?: string
}

export type ModifyShape = {
  canvas: fabric.Canvas
  property: string
  value: string
  activeObjectRef: MutableRefObject<fabric.Object | null>
  syncShapeInStorage: (shape: fabric.Object) => void
}

export type CanvasPathCreated = {
  options: (fabric.IEvent & { path: CustomFabricObject }) | unknown
  syncShapeInStorage: (shape: fabric.Object) => void
}

export type CanvasObjectScaling = {
  options: fabric.IEvent
  setElementAttributes: (property: string, value: string) => void
}

export type CanvasSelectionCreated = {
  options: fabric.IEvent
  isEditingRef: MutableRefObject<boolean>
  setElementAttributes: (property: string, value: string) => void
}

export type RenderCanvas = {
  fabricRef: MutableRefObject<fabric.Canvas | null>
  canvasObjects: Storage['canvasObjects']
  activeObjectRef: MutableRefObject<fabric.Object | null>
}

export type CanvasObjectModified = {
  options: fabric.IEvent
  syncShapeInStorage: (shape: fabric.Object) => void
}
