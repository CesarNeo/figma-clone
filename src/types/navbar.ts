import { LucideIcon } from 'lucide-react'

import { ShapeElement } from '.'

export type NavElement = {
  icon: LucideIcon
  name: string
  value: string | ShapeElement[]
}

export type NavElementSingleValue = Omit<NavElement, 'value'> & {
  value: string
}

export type NavElementMultipleValue = Omit<NavElement, 'value'> & {
  value: ShapeElement[]
}
