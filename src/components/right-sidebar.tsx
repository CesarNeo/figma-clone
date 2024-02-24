'use client'

import { useRef } from 'react'

import Color from './settings/color'
import Dimensions from './settings/dimensions'
import Export from './settings/export'
import Text from './settings/text'

function RightSidebar() {
  const colorInputRef = useRef<HTMLInputElement>(null)
  const strokeInputRef = useRef<HTMLInputElement>(null)

  return (
    <section className="sticky right-0 flex h-full min-w-[14.1875rem] select-none flex-col border-t border-border bg-primary-foreground text-secondary-foreground max-sm:hidden">
      <h3 className="px-5 pt-4 text-xs uppercase">Design</h3>
      <span className="mt-3 border-b border-secondary px-5 pb-4 text-xs text-secondary-foreground">
        Makes changes to canvas as you like
      </span>

      <Dimensions />
      <Text />
      <Color
        attributeType="fill"
        placeholder="color"
        inputRef={colorInputRef}
      />
      <Color
        attributeType="stroke"
        placeholder="stroke"
        inputRef={strokeInputRef}
      />
      <Export />
    </section>
  )
}

export default RightSidebar
