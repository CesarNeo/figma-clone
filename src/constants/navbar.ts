import {
  MousePointer2,
  RectangleHorizontal,
  Trash,
  Type,
  Undo2,
} from 'lucide-react'

import { NavElement } from '@/types'

import { SHAPE_ELEMENTS } from '.'

export const NAV_ELEMENTS = [
  {
    icon: MousePointer2,
    name: 'Select',
    value: 'select',
  },
  {
    icon: RectangleHorizontal,
    name: 'Rectangle',
    value: SHAPE_ELEMENTS,
  },
  {
    icon: Type,
    value: 'text',
    name: 'Text',
  },
  {
    icon: Trash,
    value: 'delete',
    name: 'Delete',
  },
  {
    icon: Undo2,
    value: 'reset',
    name: 'Reset',
  },
] satisfies NavElement[]

export const DEFAULT_NAV_ELEMENT = {
  icon: MousePointer2,
  name: 'Select',
  value: 'select',
}
