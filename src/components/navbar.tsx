'use client'

import Image from 'next/image'

import { NAV_ELEMENTS } from '@/constants'
import useCanvas from '@/hooks/canvas'
import { NavElement, NavElementMultipleValue } from '@/types'

import ShapesMenu from './shapes-menu'
import { Button } from './ui/button'
import ActiveUsers from './users/active-users'

function Navbar() {
  const { onActiveElement, activeElement } = useCanvas()

  const isActive = (value: NavElement['value']) =>
    (activeElement && activeElement.value === value) ||
    (Array.isArray(value) &&
      value.some((val) => val?.value === activeElement?.value))

  function handleActiveElement(item: NavElement) {
    if (Array.isArray(item.value)) return
    onActiveElement(item as NavElement)
  }

  return (
    <nav className="grid select-none grid-cols-[auto,1fr,auto] gap-4 bg-primary-foreground px-5">
      <div className="flex h-full items-center justify-center">
        <Image
          src="/assets/logo.svg"
          alt="FigPro Logo"
          width={58}
          height={20}
        />
      </div>

      <ul className="flex flex-row justify-center">
        {NAV_ELEMENTS.map((item) => {
          const Icon = item.icon

          return (
            <li key={item.name} onClick={() => handleActiveElement(item)}>
              {Array.isArray(item.value) ? (
                <ShapesMenu
                  item={item as NavElementMultipleValue}
                  isActive={isActive(item.value)}
                />
              ) : (
                <Button
                  data-active={isActive(item.value as string)}
                  type="button"
                  className="relative h-full ring-0 data-[active=true]:bg-primary"
                  variant="ghost"
                >
                  <Icon className="size-5" />
                </Button>
              )}
            </li>
          )
        })}
      </ul>

      <ActiveUsers />
    </nav>
  )
}

export default Navbar
