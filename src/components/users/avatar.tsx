import Image from 'next/image'
import React from 'react'

import { cn } from '@/lib/utils'

import styles from './avatar.module.css'

export function Avatar({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  const randomAvatar = Math.floor(Math.random() * 30)

  return (
    <div
      className={cn(`${styles.avatar} relative h-9 w-9`, className)}
      data-tooltip={name}
    >
      <Image
        src={`https://liveblocks.io/avatars/avatar-${randomAvatar}.png`}
        fill
        className={styles.avatar_picture}
        alt={name}
      />
    </div>
  )
}
