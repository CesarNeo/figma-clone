import TypingText from '../typing-text'
import CursorSVG from './cursor-svg'

interface CursorProps {
  x: number
  y: number
  color: string
  message: string
}

function Cursor({ x, y, color, message }: CursorProps) {
  return (
    <div
      className="pointer-events-none absolute left-0 top-0"
      style={{
        transform: `translate(${x}px, ${y}px)`,
        transition: 'transform 0.3s ease',
      }}
    >
      <CursorSVG color={color} />

      {message && (
        <div
          className="absolute left-2 top-5 rounded-3xl px-4 py-2"
          style={{ backgroundColor: color }}
        >
          <TypingText
            className="whitespace-nowrap text-sm leading-relaxed"
            text={message}
          />
        </div>
      )}
    </div>
  )
}

export default Cursor
