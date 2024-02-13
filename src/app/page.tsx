'use client'

import { fabric } from 'fabric'
import { useEffect, useRef, useState } from 'react'

import LeftSidebar from '@/components/left-sidebar'
import Live from '@/components/live'
import Navbar from '@/components/navbar'
import RightSidebar from '@/components/right-sidebar'
import { defaultNavElement } from '@/constants'
import {
  handleCanvaseMouseMove,
  handleCanvasMouseDown,
  handleCanvasMouseUp,
  handleCanvasObjectModified,
  handleCanvasObjectScaling,
  handleCanvasSelectionCreated,
  handlePathCreated,
  handleResize,
  initializeFabric,
  renderCanvas,
} from '@/lib/canvas'
import { handleDelete, handleKeyDown } from '@/lib/key-events'
import { handleImageUpload } from '@/lib/shapes'
import { useMutation, useRedo, useStorage, useUndo } from '@/liveblocks.config'
import { ActiveElement, Attributes } from '@/types/type'

export default function Home() {
  const undo = useUndo()
  const redo = useRedo()

  const [activeElement, setActiveElement] = useState<ActiveElement>({
    name: '',
    value: '',
    icon: '',
  })
  const [elementAttributes, setElementAttributes] = useState<Attributes>({
    width: '',
    height: '',
    fontSize: '',
    fontFamily: '',
    fontWeight: '',
    fill: '#AABBCC',
    stroke: '#AABBCC',
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fabricRef = useRef<fabric.Canvas>(null)
  const shapeRef = useRef<fabric.Object>(null)
  const activeObjectRef = useRef<fabric.Object>(null)
  const selectedShapeRef = useRef<string | null>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const isDrawingRef = useRef(false)
  const isEditingRef = useRef(false)

  const canvasObjects = useStorage((root) => root.canvasObjects)
  const syncShapeInStorage = useMutation(({ storage }, object) => {
    if (!object) return

    const { objectId } = object
    const shapeData = object.toJSON()
    shapeData.objectId = objectId

    const canvasObject = storage.get('canvasObjects')
    canvasObject.set(objectId, shapeData)
  }, [])
  const deleteAllShapes = useMutation(({ storage }) => {
    const canvasObjects = storage.get('canvasObjects')

    if (!canvasObjects || canvasObjects.size === 0) return true

    const canvasObjectsEntries = canvasObjects.entries()

    for (const [key] of Array.from(canvasObjectsEntries)) {
      canvasObjects.delete(key)
    }

    return canvasObjects.size === 0
  }, [])
  const deleteShapeFromStorage = useMutation(
    ({ storage }, objectId: string) => {
      const canvasObjects = storage.get('canvasObjects')

      canvasObjects.delete(objectId)
    },
    [],
  )

  function handleActiveElement(element: ActiveElement) {
    setActiveElement(element)

    switch (element?.value) {
      case 'reset':
        deleteAllShapes()
        fabricRef.current?.clear()
        setActiveElement(defaultNavElement)
        break
      case 'delete':
        handleDelete(fabricRef.current as any, deleteShapeFromStorage)
        setActiveElement(defaultNavElement)
        break
      case 'image':
        imageInputRef.current?.click()
        isDrawingRef.current = false

        if (fabricRef.current) {
          fabricRef.current.isDrawingMode = false
        }
        break
      default:
        break
    }

    selectedShapeRef.current = element?.value || null
  }

  useEffect(() => {
    const canvas = initializeFabric({ fabricRef, canvasRef })
    const currentFabricRef = fabricRef.current

    canvas.on('mouse:down', (options) => {
      handleCanvasMouseDown({
        canvas,
        isDrawing: isDrawingRef,
        options,
        selectedShapeRef,
        shapeRef,
      })
    })

    canvas.on('mouse:move', (options) => {
      handleCanvaseMouseMove({
        canvas,
        isDrawing: isDrawingRef,
        options,
        selectedShapeRef,
        shapeRef,
        syncShapeInStorage,
      })
    })

    canvas.on('mouse:up', () => {
      handleCanvasMouseUp({
        canvas,
        isDrawing: isDrawingRef,
        selectedShapeRef,
        shapeRef,
        syncShapeInStorage,
        setActiveElement,
        activeObjectRef,
      })
    })

    canvas.on('object:modified', (options) => {
      handleCanvasObjectModified({
        options,
        syncShapeInStorage,
      })
    })

    canvas.on('selection:created', (options) => {
      handleCanvasSelectionCreated({
        options,
        isEditingRef,
        setElementAttributes,
      })
    })

    canvas.on('object:scaling', (options) => {
      handleCanvasObjectScaling({
        options,
        setElementAttributes,
      })
    })

    canvas.on('path:created', (options) => {
      handlePathCreated({
        options,
        syncShapeInStorage,
      })
    })

    window.addEventListener('resize', () => {
      handleResize({ canvas: currentFabricRef })
    })

    window.addEventListener('keydown', (event) => {
      handleKeyDown({
        e: event,
        canvas: fabricRef.current,
        undo,
        redo,
        syncShapeInStorage,
        deleteShapeFromStorage,
      })
    })

    return () => {
      window.removeEventListener('resize', () => {
        handleResize({ canvas: currentFabricRef })
      })
      canvas.dispose()
    }
  }, [])

  useEffect(() => {
    renderCanvas({
      activeObjectRef,
      canvasObjects,
      fabricRef,
    })
  }, [canvasObjects])

  return (
    <main className="h-screen overflow-hidden">
      <Navbar
        activeElement={activeElement}
        handleActiveElement={handleActiveElement}
        imageInputRef={imageInputRef}
        handleImageUpload={(event) => {
          event.stopPropagation()

          if (!event.target.files) return

          const file = event.target.files[0]

          handleImageUpload({
            file,
            canvas: fabricRef as any,
            shapeRef,
            syncShapeInStorage,
          })
        }}
      />

      <section className="flex h-full flex-row">
        <LeftSidebar allShapes={Array.from(canvasObjects)} />
        <Live canvasRef={canvasRef} undo={undo} redo={redo} />
        <RightSidebar
          elementAttributes={elementAttributes}
          setElementAttributes={setElementAttributes}
          fabricRef={fabricRef}
          isEditingRef={isEditingRef}
          activeObjectRef={activeObjectRef}
          syncShapeInStorage={syncShapeInStorage}
        />
      </section>
    </main>
  )
}
