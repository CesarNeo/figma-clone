import { useRef } from 'react'

import { modifyShape } from '@/lib/shapes'
import { RightSidebarProps } from '@/types/type'

import Color from './settings/color'
import Dimensions from './settings/dimensions'
import Export from './settings/export'
import Text from './settings/text'

function RightSidebar({
  activeObjectRef,
  elementAttributes,
  fabricRef,
  isEditingRef,
  setElementAttributes,
  syncShapeInStorage,
}: RightSidebarProps) {
  const colorInputRef = useRef<HTMLInputElement>(null)
  const strokeInputRef = useRef<HTMLInputElement>(null)

  function handleInputChange(property: string, value: string) {
    if (!isEditingRef.current) isEditingRef.current = true

    setElementAttributes((prev) => ({ ...prev, [property]: value }))

    modifyShape({
      canvas: fabricRef.current as fabric.Canvas,
      property,
      value,
      activeObjectRef,
      syncShapeInStorage,
    })
  }

  return (
    <section className="sticky right-0 flex h-full min-w-[14.1875rem] select-none flex-col border-t border-border bg-primary-foreground text-secondary-foreground max-sm:hidden">
      <h3 className="px-5 pt-4 text-xs uppercase">Design</h3>
      <span className="mt-3 border-b border-secondary px-5 pb-4 text-xs text-secondary-foreground">
        Makes changes to canvas as you like
      </span>

      <Dimensions
        width={elementAttributes.width}
        height={elementAttributes.height}
        handleInputChange={handleInputChange}
        isEditingRef={isEditingRef}
      />
      <Text
        fontFamily={elementAttributes.fontFamily}
        fontSize={elementAttributes.fontSize}
        fontWeight={elementAttributes.fontWeight}
        handleInputChange={handleInputChange}
      />
      <Color
        attributeType="fill"
        placeholder="color"
        inputRef={colorInputRef}
        attribute={elementAttributes.fill}
        handleInputChange={handleInputChange}
      />
      <Color
        attributeType="stroke"
        placeholder="stroke"
        inputRef={strokeInputRef}
        attribute={elementAttributes.stroke}
        handleInputChange={handleInputChange}
      />
      <Export />
    </section>
  )
}

export default RightSidebar
