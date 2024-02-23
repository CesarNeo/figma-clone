'use client'

import { ChevronDown } from 'lucide-react'
import { ChangeEvent } from 'react'

import { NavElementMultipleValue } from '@/constants'
import useCanvas from '@/hooks/canvas'

import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export type ShapesMenuProps = {
  item: NavElementMultipleValue
  isActive: boolean
}

function ShapesMenu({ item, isActive }: ShapesMenuProps) {
  const { uploadImage, imageInputRef, onActiveElement, activeElement } =
    useCanvas()

  const shapes = item.value
  const isDropdownShapeSelected = shapes.some(
    (elem) => elem?.value === activeElement?.value,
  )
  const ActiveShapeIcon = activeElement?.icon
  const DefaultShapeIcon = item?.icon

  function handleUploadImage(event: ChangeEvent<HTMLInputElement>) {
    event.stopPropagation()

    if (!event.target.files) return

    const file = event.target.files[0]

    uploadImage(file)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            data-active={isActive}
            type="button"
            className="relative h-full gap-1 !ring-0 data-[active=true]:bg-primary"
            variant="ghost"
            onClick={() => onActiveElement(item)}
          >
            {isDropdownShapeSelected ? (
              <ActiveShapeIcon className="size-5" />
            ) : (
              <DefaultShapeIcon className="size-5" />
            )}

            <ChevronDown className="size-3" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          {shapes &&
            shapes.map(({ name, value, icon: Icon }) => (
              <DropdownMenuItem
                key={name}
                onClick={() =>
                  onActiveElement({
                    name,
                    value,
                    icon: Icon,
                  })
                }
                className="cursor-pointer py-4"
              >
                <div className="flex items-center gap-2">
                  <Icon className="size-5" />
                  <p className="text-sm">{name}</p>
                </div>
              </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <input
        type="file"
        className="hidden"
        ref={imageInputRef}
        accept="image/*"
        onChange={handleUploadImage}
      />
    </>
  )
}

export default ShapesMenu
