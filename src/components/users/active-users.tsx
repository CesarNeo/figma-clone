'use client'

import { useMemo } from 'react'

import { generateRandomName } from '@/assets/lib/utils'
import { useOthers, useSelf } from '@/liveblocks.config'

import { Avatar } from './avatar'
import styles from './index.module.css'

function ActiveUsers() {
  const users = useOthers()
  const currentUser = useSelf()
  const hasMoreUsers = users.length > 3

  const memoizedUsers = useMemo(
    () => (
      <div className="flex items-center justify-center gap-1 py-2">
        <div className="flex pl-3">
          {currentUser && (
            <Avatar name="You" className="border-[3px] border-primary" />
          )}
          {users.slice(0, 3).map(({ connectionId, info }) => {
            return (
              <Avatar
                key={connectionId}
                name={generateRandomName()}
                className="-ml-3"
              />
            )
          })}

          {hasMoreUsers && (
            <div className={styles.more}>+{users.length - 3}</div>
          )}
        </div>
      </div>
    ),
    [users.length],
  )

  return memoizedUsers
}

export default ActiveUsers
