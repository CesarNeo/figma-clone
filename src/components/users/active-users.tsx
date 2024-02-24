'use client'

import { memo } from 'react'

import { useOthers, useSelf } from '@/liveblocks.config'
import { generateRandomName } from '@/utils'

import { Avatar } from './avatar'

function ActiveUsers() {
  const users = useOthers()
  const currentUser = useSelf()
  const hasMoreUsers = users.length > 3

  return (
    <div className="flex items-center justify-center gap-1 py-2">
      <div className="flex pl-3">
        {currentUser && (
          <Avatar name="You" className="border-[3px] border-primary" />
        )}
        {users.slice(0, 3).map(({ connectionId }) => {
          return (
            <Avatar
              key={connectionId}
              name={generateRandomName()}
              className="-ml-3"
            />
          )
        })}

        {hasMoreUsers && (
          <div className="-ml-3 flex size-14 min-w-14 items-center justify-center rounded-full border-4 border-white bg-[#9ca3af] text-white">
            +{users.length - 3}
          </div>
        )}
      </div>
    </div>
  )
}

export default memo(ActiveUsers)
