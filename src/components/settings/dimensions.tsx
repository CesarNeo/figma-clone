import useCanvas from '@/hooks/canvas'

import { Input } from '../ui/input'
import { Label } from '../ui/label'

const DIMENSIONS_OPTIONS = [
  { label: 'W', property: 'width' },
  { label: 'H', property: 'height' },
]

function Dimensions() {
  const {
    elementAttributes: { width, height },
    isEditingRef,
    onUpdateElementAttributes,
  } = useCanvas()

  return (
    <section className="border-primary-grey-200 flex flex-col border-b">
      <div className="flex flex-col gap-4 px-6 py-3">
        {DIMENSIONS_OPTIONS.map((item) => (
          <div
            key={item.label}
            className="flex flex-1 items-center gap-3 rounded-sm"
          >
            <Label htmlFor={item.property}>{item.label}</Label>
            <Input
              type="number"
              id={item.property}
              placeholder="100"
              value={item.property === 'width' ? width : height}
              min={10}
              onChange={({ target: { value } }) =>
                onUpdateElementAttributes(item.property, value)
              }
              onBlur={() => (isEditingRef.current = false)}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default Dimensions
