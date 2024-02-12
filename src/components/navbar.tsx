import Image from 'next/image'
import { memo } from 'react'

import { navElements } from '@/constants'
import { ActiveElement, NavbarProps } from '@/types/type'

import NewThread from './comments/new-thread'
import ShapesMenu from './shapes-menu'
import { Button } from './ui/button'
import ActiveUsers from './users/active-users'

function Navbar({
  activeElement,
  handleActiveElement,
  handleImageUpload,
  imageInputRef,
}: NavbarProps) {
  const isActive = (value: string | Array<ActiveElement>) =>
    (activeElement && activeElement.value === value) ||
    (Array.isArray(value) &&
      value.some((val) => val?.value === activeElement?.value))

  return (
    <nav className="flex select-none items-center justify-between gap-4 bg-primary-foreground px-5">
      <Image src="/assets/logo.svg" alt="FigPro Logo" width={58} height={20} />

      <ul className="flex flex-row">
        {navElements.map((item: ActiveElement | any) => (
          <li
            data-active={isActive(item.value)}
            key={item.name}
            onClick={() => {
              if (Array.isArray(item.value)) return
              handleActiveElement(item)
            }}
            className={
              'group flex cursor-pointer items-center justify-center px-2.5 py-5 hover:bg-secondary data-[active=true]:bg-primary'
            }
          >
            {Array.isArray(item.value) ? (
              <ShapesMenu
                item={item}
                activeElement={activeElement}
                imageInputRef={imageInputRef}
                handleActiveElement={handleActiveElement}
                handleImageUpload={handleImageUpload}
              />
            ) : item?.value === 'comments' ? (
              <NewThread>
                <button
                  type="button"
                  className="relative h-5 w-5 object-contain px-4"
                >
                  <Image src={item.icon} alt={item.name} fill />
                </button>
              </NewThread>
            ) : (
              <button
                type="button"
                className="relative h-5 w-5 object-contain px-4"
              >
                <Image src={item.icon} alt={item.name} fill />
              </button>
            )}
          </li>
        ))}
      </ul>

      <ActiveUsers />
    </nav>
  )
}

export default memo(
  Navbar,
  (prevProps, nextProps) => prevProps.activeElement === nextProps.activeElement,
)
