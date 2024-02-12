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
  handleResize,
  initializeFabric,
  renderCanvas,
} from '@/lib/canvas'
import { handleDelete } from '@/lib/key-events'
import { useMutation, useStorage } from '@/liveblocks.config'
import { ActiveElement } from '@/types/type'

export default function Home() {
  const [activeElement, setActiveElement] = useState<ActiveElement>({
    name: '',
    value: '',
    icon: '',
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fabricRef = useRef<fabric.Canvas>(null)
  const shapeRef = useRef<fabric.Object>(null)
  const activeObjectRef = useRef<fabric.Object>(null)
  const selectedShapeRef = useRef<string>('rectangle')
  const isDrawing = useRef(false)

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

    for (const [key, value] of canvasObjects.entries()) {
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
      default:
        break
    }

    selectedShapeRef.current = element?.value as string
  }

  useEffect(() => {
    const canvas = initializeFabric({ fabricRef, canvasRef })
    canvas.on('mouse:down', (options) => {
      handleCanvasMouseDown({
        canvas,
        isDrawing,
        options,
        selectedShapeRef,
        shapeRef,
      })
    })

    canvas.on('mouse:move', (options) => {
      handleCanvaseMouseMove({
        canvas,
        isDrawing,
        options,
        selectedShapeRef,
        shapeRef,
        syncShapeInStorage,
      })
    })

    canvas.on('mouse:up', (options) => {
      handleCanvasMouseUp({
        canvas,
        isDrawing,
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

    window.addEventListener('resize', () => {
      handleResize({ fabricRef })
    })

    return () => {
      window.removeEventListener('resize', () => {
        handleResize({ fabricRef })
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
      />

      <section className="flex h-full flex-row">
        <LeftSidebar />
        <Live canvasRef={canvasRef} />
        <RightSidebar />
      </section>
    </main>
  )
}
