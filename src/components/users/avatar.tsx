import Image from 'next/image'
import React, { useMemo } from 'react'

import { cn } from '@/lib/utils'

export function Avatar({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  const avatar = useMemo(
    () =>
      `https://liveblocks.io/avatars/avatar-${Math.floor(
        Math.random() * 30,
      )}.png`,
    [],
  )

  return (
    <div
      className={cn('avatar relative h-9 w-9', className)}
      data-tooltip={name}
    >
      <Image
        src={avatar}
        fill
        className="h-full w-full rounded-full"
        alt={name}
      />
    </div>
  )
}
