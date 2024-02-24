import { fabric } from 'fabric'

import { CustomFabricObject } from '@/types'

export const handleCopy = (canvas: fabric.Canvas) => {
  const activeObjects = canvas.getActiveObjects()
  if (activeObjects.length > 0) {
    const serializedObjects = activeObjects.map((obj) => obj.toObject())
    localStorage.setItem('clipboard', JSON.stringify(serializedObjects))
  }

  return activeObjects
}

export const handlePaste = (
  canvas: fabric.Canvas,
  syncShapeInStorage: (shape: fabric.Object) => void,
) => {
  if (!canvas || !(canvas instanceof fabric.Canvas)) {
    console.error('Invalid canvas object. Aborting paste operation.')
    return
  }

  const clipboardData = localStorage.getItem('clipboard')

  if (clipboardData) {
    try {
      const parsedObjects = JSON.parse(clipboardData)
      parsedObjects.forEach((objData: fabric.Object) => {
        fabric.util.enlivenObjects(
          [objData],
          (enlivenedObjects: fabric.Object[]) => {
            enlivenedObjects.forEach((enlivenedObj) => {
              enlivenedObj.set({
                left: enlivenedObj.left || 0 + 20,
                top: enlivenedObj.top || 0 + 20,
                objectId: crypto.randomUUID(),
                fill: '#aabbcc',
              } as CustomFabricObject)

              canvas.add(enlivenedObj)
              syncShapeInStorage(enlivenedObj)
            })
            canvas.renderAll()
          },
          'fabric',
        )
      })
    } catch (error) {
      console.error('Error parsing clipboard data:', error)
    }
  }
}

export const handleDelete = (
  canvas: fabric.Canvas,
  deleteShapeFromStorage: (id: string) => void,
) => {
  const activeObjects = canvas.getActiveObjects()
  if (!activeObjects || activeObjects.length === 0) return

  if (activeObjects.length > 0) {
    activeObjects.forEach((obj: CustomFabricObject) => {
      if (!obj.objectId) return
      canvas.remove(obj)
      deleteShapeFromStorage(obj.objectId)
    })
  }

  canvas.discardActiveObject()
  canvas.requestRenderAll()
}

export const handleKeyDown = ({
  e,
  canvas,
  undo,
  redo,
  syncShapeInStorage,
  deleteShapeFromStorage,
}: {
  e: KeyboardEvent
  canvas: fabric.Canvas
  undo: () => void
  redo: () => void
  syncShapeInStorage: (shape: fabric.Object) => void
  deleteShapeFromStorage: (id: string) => void
}) => {
  if ((e?.ctrlKey || e?.metaKey) && e.key === 'c') {
    handleCopy(canvas)
  }

  if ((e?.ctrlKey || e?.metaKey) && e.key === 'v') {
    handlePaste(canvas, syncShapeInStorage)
  }

  if ((e?.ctrlKey || e?.metaKey) && e.key === 'x') {
    handleCopy(canvas)
    handleDelete(canvas, deleteShapeFromStorage)
  }

  if ((e?.ctrlKey || e?.metaKey) && e.key === 'z') {
    undo()
  }

  if ((e?.ctrlKey || e?.metaKey) && e.key === 'y') {
    redo()
  }

  if (e.key === '/?' && !e.shiftKey) {
    e.preventDefault()
  }
}
