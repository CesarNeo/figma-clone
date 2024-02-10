'use client'

import { motion } from 'framer-motion'
import { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

type TypingTextProps = ComponentProps<typeof motion.div> & {
  text: string
}

function TypingText({ text, className }: TypingTextProps) {
  return (
    <motion.div
      style={{ display: 'inline-flex' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {Array.from(text).map((letter, index) => (
        <motion.div
          key={index}
          className={cn('inline-block', className)}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 20, opacity: 0 }}
        >
          {letter.split(' ').join('\u00a0')}
        </motion.div>
      ))}
    </motion.div>
  )
}

export default TypingText
