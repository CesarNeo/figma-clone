import { Circle, Minus, RectangleHorizontal, Triangle, Type, Image, PenLine } from 'lucide-react'


export const SHAPE_TYPES = {
  rect: {
    icon: RectangleHorizontal,
    name: 'Rectangle',
  },
  circle: {
    icon: Circle,
    name: 'Circle',
  },
  triangle: {
    icon: Triangle,
    name: 'Triangle',
  },
  line: {
    icon: Minus,
    name: 'Line',
  },
  'i-text': {
    icon: Type,
    name: 'Text',
  },
  image: {
    icon: Image,
    name: 'Image',
  },
  freeform: {
    icon: PenLine,
    name: 'Free Drawing',
  },
} as const
