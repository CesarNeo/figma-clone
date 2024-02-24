type Props = {
  setReaction: (reaction: string) => void
}

const REACTIONS = ['👍', '🔥', '😍', '👀', '😱', '🙁']

function ReactionSelector({ setReaction }: Props) {
  return (
    <div
      className="absolute inset-x-0 bottom-20 mx-auto w-fit transform rounded-full bg-white px-2"
      onPointerMove={(e) => e.stopPropagation()}
    >
      {REACTIONS.map((reaction) => (
        <button
          key={reaction}
          className="transform select-none p-2 text-xl transition-transform hover:scale-150 focus:scale-150 focus:outline-none"
          onPointerDown={() => setReaction(reaction)}
        >
          {reaction}
        </button>
      ))}
    </div>
  )
}

export default ReactionSelector
