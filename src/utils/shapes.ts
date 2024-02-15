import { SHAPE_TYPES } from "@/constants";
import { RectangleHorizontal } from 'lucide-react'

export function getShapeInfo(shapeType: keyof typeof SHAPE_TYPES) {
  return SHAPE_TYPES[shapeType] || {
    icon: RectangleHorizontal ,
    name: shapeType,
  }
}