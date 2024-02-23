'use client'

import { ShapeTypes } from '@/constants'
import useCanvas from '@/hooks/canvas'
import { getShapeInfo } from '@/utils'

function LeftSidebar() {
  const { allShapesInCanvas } = useCanvas()

  return (
    <section className="sticky left-0 flex h-full min-w-[227px] select-none flex-col overflow-y-auto border-t border-secondary bg-primary-foreground pb-20 max-sm:hidden">
      <h3 className="border border-secondary px-5 py-4 text-xs uppercase">
        Layers
      </h3>
      <div className="flex flex-col">
        {allShapesInCanvas?.map((shape) => {
          const info = getShapeInfo(shape[1].type as ShapeTypes)
          const Icon = info.icon

          return (
            <div
              key={shape[1].objectId}
              className="group my-1 flex items-center gap-2 px-5 py-2.5"
            >
              <Icon className="size-4" />
              <h3 className="text-sm font-semibold capitalize">{info.name}</h3>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default LeftSidebar
