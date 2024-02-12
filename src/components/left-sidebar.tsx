'use client'

import Image from 'next/image'
import { useMemo } from 'react'

import { getShapeInfo } from '@/lib/utils'

function LeftSidebar({ allShapes }: { allShapes: Array<any> }) {
  const memoizedShapes = useMemo(
    () => (
      <section className="sticky left-0 flex h-full min-w-[227px] select-none flex-col overflow-y-auto border-t border-secondary bg-primary-foreground pb-20 max-sm:hidden">
        <h3 className="border border-secondary px-5 py-4 text-xs uppercase">
          Layers
        </h3>
        <div className="flex flex-col">
          {allShapes?.map((shape: any) => {
            const info = getShapeInfo(shape[1]?.type)

            return (
              <div
                key={shape[1]?.objectId}
                className="hover:bg-primary-green hover:text-primary-black group my-1 flex items-center gap-2 px-5 py-2.5 hover:cursor-pointer"
              >
                <Image
                  src={info?.icon}
                  alt="Layer"
                  width={16}
                  height={16}
                  className="group-hover:invert"
                />
                <h3 className="text-sm font-semibold capitalize">
                  {info.name}
                </h3>
              </div>
            )
          })}
        </div>
      </section>
    ),
    [allShapes?.length],
  )

  return memoizedShapes
}

export default LeftSidebar