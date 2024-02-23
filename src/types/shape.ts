import { Gradient, Pattern } from 'fabric/fabric-impl'
import { LucideIcon } from 'lucide-react'

import { SHAPE_TYPES } from '@/constants'

export type ShapeElement = {
  icon: LucideIcon
  name: string
  value: string
}
export type ShapeData = {
  type: string
  width: number
  height: number
  fill: string | Pattern | Gradient
  left: number
  top: number
  objectId: string | undefined
}

export type ShapeType = (typeof SHAPE_TYPES)[keyof typeof SHAPE_TYPES]
export type ShapeTypes = keyof typeof SHAPE_TYPES
