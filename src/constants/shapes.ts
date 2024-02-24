import {
  Circle,
  Image,
  Minus,
  PenLine,
  RectangleHorizontal,
  Triangle,
  Type,
} from 'lucide-react'

import { ShapeElement } from '@/types'

export const SHAPE_TYPES = {
  rect: {
    icon: RectangleHorizontal,
    name: 'Rectangle',
    value: 'rectangle',
  },
  circle: {
    icon: Circle,
    name: 'Circle',
    value: 'circle',
  },
  triangle: {
    icon: Triangle,
    name: 'Triangle',
    value: 'triangle',
  },
  line: {
    icon: Minus,
    name: 'Line',
    value: 'line',
  },
  'i-text': {
    icon: Type,
    name: 'Text',
    value: 'text',
  },
  image: {
    icon: Image,
    name: 'Image',
    value: 'image',
  },
  freeform: {
    icon: PenLine,
    name: 'Free Drawing',
    value: 'freeform',
  },
} as const

export const SHAPE_ELEMENTS = [
  {
    icon: RectangleHorizontal,
    name: 'Rectangle',
    value: 'rectangle',
  },
  {
    icon: Circle,
    name: 'Circle',
    value: 'circle',
  },
  {
    icon: Triangle,
    name: 'Triangle',
    value: 'triangle',
  },
  {
    icon: Minus,
    name: 'Line',
    value: 'line',
  },
  {
    icon: Image,
    name: 'Image',
    value: 'image',
  },
  {
    icon: PenLine,
    name: 'Free Drawing',
    value: 'freeform',
  },
] satisfies ShapeElement[]
