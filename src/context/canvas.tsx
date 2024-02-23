'use client'

import { fabric } from 'fabric'
import {
  createContext,
  MutableRefObject,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import { DEFAULT_NAV_ELEMENT } from '@/constants'
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
import { useMutation, useRedo, useStorage, useUndo } from '@/liveblocks.config'
import { FabricObjectProperties, NavElement } from '@/types'
import { Attributes } from '@/types/type'
import { modifyShape } from '@/utils'

interface CustomFabricImage extends fabric.Image {
  objectId?: string
}

interface CanvasContextData {
  elementAttributes: Attributes
  activeElement: NavElement
  allShapesInCanvas: Array<[string, FabricObjectProperties]>
  imageInputRef: MutableRefObject<HTMLInputElement | null>
  canvasRef: MutableRefObject<HTMLCanvasElement | null>
  fabricRef: MutableRefObject<fabric.Canvas | null>
  activeObjectRef: MutableRefObject<fabric.Object | null>
  isEditingRef: MutableRefObject<boolean>
  undo: () => void
  redo: () => void
  uploadImage: (file: File) => void
  onActiveElement: (element: NavElement) => void
  onSyncShapeInStorage: (object: fabric.Object) => void
  onUpdateElementAttributes: (property: string, value: string) => void
}

export const CanvasContext = createContext<CanvasContextData>(
  {} as CanvasContextData,
)

function CanvasProvider({ children }: { children: ReactNode }) {
  const undo = useUndo()
  const redo = useRedo()

  const [activeElement, setActiveElement] = useState<NavElement>(
    {} as NavElement,
  )
  const [elementAttributes, setElementAttributes] = useState<Attributes>({
    width: '',
    height: '',
    fontSize: '',
    fontFamily: '',
    fontWeight: '',
    fill: '#AABBCC',
    stroke: '#AABBCC',
  })

  const fabricRef = useRef<fabric.Canvas | null>(null)
  const shapeRef = useRef<fabric.Object | null>(null)
  const activeObjectRef = useRef<fabric.Object | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const imageInputRef = useRef<HTMLInputElement | null>(null)
  const selectedShapeRef = useRef<string | null>(null)
  const isDrawingRef = useRef(false)
  const isEditingRef = useRef(false)

  const canvasObjects = useStorage((root) => root.canvasObjects)
  const allShapesInCanvas = Array.from(canvasObjects) || []

  const onSyncShapeInStorage = useMutation(({ storage }, object) => {
    if (!object) return

    const { objectId } = object
    const shapeData = object.toJSON()
    shapeData.objectId = objectId

    const canvasObject = storage.get('canvasObjects')
    canvasObject.set(objectId, shapeData)
  }, [])

  const deleteShapeFromStorage = useMutation(
    ({ storage }, objectId: string) => {
      const canvasObjects = storage.get('canvasObjects')

      canvasObjects.delete(objectId)
    },
    [],
  )

  const deleteAllShapes = useMutation(({ storage }) => {
    const canvasObjects = storage.get('canvasObjects')

    if (!canvasObjects || canvasObjects.size === 0) return true

    const canvasObjectsEntries = canvasObjects.entries()

    for (const [key] of Array.from(canvasObjectsEntries)) {
      canvasObjects.delete(key)
    }

    return canvasObjects.size === 0
  }, [])

  const uploadImage = useCallback((file: File) => {
    const reader = new FileReader()

    reader.onload = () => {
      fabric.Image.fromURL(
        reader.result as string,
        (img: CustomFabricImage) => {
          if (!fabricRef.current) return

          img.scaleToWidth(200)
          img.scaleToHeight(200)

          fabricRef.current.add(img)

          img.objectId = crypto.randomUUID()

          shapeRef.current = img

          onSyncShapeInStorage(img)
          fabricRef.current.requestRenderAll()
        },
      )
    }

    reader.readAsDataURL(file)
  }, [])

  const onActiveElement = useCallback((element: NavElement) => {
    setActiveElement(element)

    switch (element.value) {
      case 'reset':
        deleteAllShapes()
        fabricRef.current?.clear()
        setActiveElement(DEFAULT_NAV_ELEMENT)
        break
      case 'delete':
        handleDelete(fabricRef.current!, deleteShapeFromStorage)
        setActiveElement(DEFAULT_NAV_ELEMENT)
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

    selectedShapeRef.current = (element?.value as string) || null
  }, [])

  const onUpdateElementAttributes = useCallback(
    (property: string, value: string) => {
      if (!isEditingRef.current) isEditingRef.current = true
      if (!fabricRef.current) return

      setElementAttributes((prev) => ({ ...prev, [property]: value }))

      modifyShape({
        canvas: fabricRef.current,
        property,
        value,
        activeObjectRef,
        syncShapeInStorage: onSyncShapeInStorage,
      })
    },
    [],
  )

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
        syncShapeInStorage: onSyncShapeInStorage,
      })
    })

    canvas.on('mouse:up', () => {
      handleCanvasMouseUp({
        canvas,
        isDrawing: isDrawingRef,
        selectedShapeRef,
        shapeRef,
        syncShapeInStorage: onSyncShapeInStorage,
        setActiveElement,
        activeObjectRef,
      })
    })

    canvas.on('object:modified', (options) => {
      handleCanvasObjectModified({
        options,
        syncShapeInStorage: onSyncShapeInStorage,
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
        syncShapeInStorage: onSyncShapeInStorage,
      })
    })

    window.addEventListener('resize', () => {
      handleResize({ canvas: currentFabricRef })
    })

    window.addEventListener('keydown', (event) => {
      handleKeyDown({
        e: event,
        canvas: currentFabricRef,
        undo,
        redo,
        syncShapeInStorage: onSyncShapeInStorage,
        deleteShapeFromStorage,
      })
    })

    return () => {
      window.removeEventListener('resize', () =>
        handleResize({ canvas: currentFabricRef }),
      )
      canvas.off('mouse:down')
      canvas.off('mouse:move')
      canvas.off('mouse:up')
      canvas.off('object:modified')
      canvas.off('selection:created')
      canvas.off('object:scaling')
      canvas.off('path:created')
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

  const values = {
    elementAttributes,
    allShapesInCanvas,
    activeElement,
    imageInputRef,
    canvasRef,
    fabricRef,
    activeObjectRef,
    isEditingRef,
    uploadImage,
    onActiveElement,
    undo,
    redo,
    onSyncShapeInStorage,
    onUpdateElementAttributes,
  }
  return (
    <CanvasContext.Provider value={values}>{children}</CanvasContext.Provider>
  )
}

export default CanvasProvider
