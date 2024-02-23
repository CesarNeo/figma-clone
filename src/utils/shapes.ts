import { fabric } from 'fabric'
import { ICircleOptions } from 'fabric/fabric-impl'
import { RectangleHorizontal } from 'lucide-react'

import { SHAPE_TYPES } from '@/constants'
import { CustomFabricObject, ModifyShape } from '@/types'

export function getShapeInfo(shapeType: keyof typeof SHAPE_TYPES) {
  return (
    SHAPE_TYPES[shapeType] || {
      icon: RectangleHorizontal,
      name: shapeType,
    }
  )
}
export function createShape(
  canvas: fabric.Canvas,
  pointer: PointerEvent,
  shapeType: string,
) {
  if (shapeType === 'freeform') {
    canvas.isDrawingMode = true
    return null
  }

  return createSpecificShape(shapeType, pointer)
}

export function createSpecificShape(shapeType: string, pointer: PointerEvent) {
  switch (shapeType) {
    case 'rectangle':
      return createRectangle(pointer)
    case 'triangle':
      return createTriangle(pointer)
    case 'circle':
      return createCircle(pointer)
    case 'line':
      return createLine(pointer)
    case 'text':
      return createText(pointer, 'Tap to Type')
    default:
      return null
  }
}

export function modifyShape({
  canvas,
  property,
  value,
  activeObjectRef,
  syncShapeInStorage,
}: ModifyShape) {
  const selectedElement = canvas.getActiveObject()

  if (!selectedElement || selectedElement?.type === 'activeSelection') return

  if (property === 'width') {
    selectedElement.set('scaleX', 1)
    selectedElement.set('width', Number(value))
  } else if (property === 'height') {
    selectedElement.set('scaleY', 1)
    selectedElement.set('height', Number(value))
  } else {
    if (selectedElement[property as keyof object] === value) return
    selectedElement.set(property as keyof object, value as never)
  }

  activeObjectRef.current = selectedElement

  syncShapeInStorage(selectedElement)
}

export function createText(pointer: PointerEvent, text: string) {
  return new fabric.IText(text, {
    left: pointer.x,
    top: pointer.y,
    fill: '#aabbcc',
    fontFamily: 'Helvetica',
    fontSize: 36,
    fontWeight: '400',
    objectId: crypto.randomUUID(),
  } as fabric.ITextOptions)
}

export function createLine(pointer: PointerEvent) {
  return new fabric.Line(
    [pointer.x, pointer.y, pointer.x + 100, pointer.y + 100],
    {
      stroke: '#aabbcc',
      strokeWidth: 2,
      objectId: crypto.randomUUID(),
    } as CustomFabricObject,
  )
}

export function createCircle(pointer: PointerEvent) {
  return new fabric.Circle({
    left: pointer.x,
    top: pointer.y,
    radius: 100,
    fill: '#aabbcc',
    objectId: crypto.randomUUID(),
  } as ICircleOptions)
}

export function createTriangle(pointer: PointerEvent) {
  return new fabric.Triangle({
    left: pointer.x,
    top: pointer.y,
    width: 100,
    height: 100,
    fill: '#aabbcc',
    objectId: crypto.randomUUID(),
  } as CustomFabricObject)
}

export function createRectangle(pointer: PointerEvent) {
  const rect = new fabric.Rect({
    left: pointer.x,
    top: pointer.y,
    width: 100,
    height: 100,
    fill: '#aabbcc',
    objectId: crypto.randomUUID(),
  } as CustomFabricObject)

  return rect
}
