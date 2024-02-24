import { MutableRefObject } from 'react'

import useCanvas from '@/hooks/canvas'

import { Label } from '../ui/label'

type Props = {
  inputRef: MutableRefObject<HTMLInputElement | null>
  placeholder: string
  attributeType: 'fill' | 'stroke'
}

function Color({ inputRef, placeholder, attributeType }: Props) {
  const {
    elementAttributes: { fill, stroke },
    onUpdateElementAttributes,
  } = useCanvas()
  const attribute = attributeType === 'fill' ? fill : stroke

  return (
    <div className="flex flex-col gap-3 border-b border-secondary p-5">
      <h3 className="text-[10px] uppercase">{placeholder}</h3>
      <div
        className="flex items-center gap-2 border border-secondary"
        onClick={() => inputRef.current?.click()}
      >
        <input
          type="color"
          value={attribute}
          ref={inputRef}
          onChange={({ target: { value } }) =>
            onUpdateElementAttributes(attributeType, value)
          }
        />
        <Label className="flex-1">{attribute}</Label>
        <Label className="flex h-6 w-8 items-center justify-center bg-secondary text-[10px] leading-3">
          90%
        </Label>
      </div>
    </div>
  )
}

export default Color
