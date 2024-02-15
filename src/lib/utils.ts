import { type ClassValue, clsx } from 'clsx'
import JSpdf from 'jspdf'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const exportToPdf = () => {
  const canvas = document.querySelector('canvas')

  if (!canvas) return

  const doc = new JSpdf({
    orientation: 'landscape',
    unit: 'px',
    format: [canvas.width, canvas.height],
  })

  const data = canvas.toDataURL()
  doc.addImage(data, 'PNG', 0, 0, canvas.width, canvas.height)
  doc.save('canvas.pdf')
}
