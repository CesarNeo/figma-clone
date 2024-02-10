import Image from 'next/image'
import React from 'react'

import { cn } from '@/lib/utils'

import styles from './avatar.module.css'

export function Avatar({
  name,
  className,
}: {
  src: string
  name: string
  className?: string
}) {
  return (
    <div
      className={cn(`${styles.avatar} relative h-9 w-9`, className)}
      data-tooltip={name}
    >
      <Image
        src={`https://liveblocks.io/avatars/avatar-${Math.floor(Math.random() * 30)}.png`}
        fill
        className={styles.avatar_picture}
        alt={name}
      />
    </div>
  )
}
