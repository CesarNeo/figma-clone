import { ElementDirection } from '@/types/type'

export const bringElement = ({
  canvas,
  direction,
  syncShapeInStorage,
}: ElementDirection) => {
  if (!canvas) return

  const selectedElement = canvas.getActiveObject()

  if (!selectedElement || selectedElement?.type === 'activeSelection') return

  if (direction === 'front') {
    canvas.bringToFront(selectedElement)
  } else if (direction === 'back') {
    canvas.sendToBack(selectedElement)
  }

  syncShapeInStorage(selectedElement)
}
