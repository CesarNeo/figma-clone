'use client'

import { useContext } from 'react'

import { CanvasContext } from '@/context/canvas'

const useCanvas = () => useContext(CanvasContext)

export default useCanvas
