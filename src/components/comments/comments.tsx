import { ClientSideSuspense } from '@liveblocks/react'

import CommentsOverlay from './comments-overlay'

function Comments() {
  return (
    <ClientSideSuspense fallback={null}>
      {() => <CommentsOverlay />}
    </ClientSideSuspense>
  )
}

export default Comments
