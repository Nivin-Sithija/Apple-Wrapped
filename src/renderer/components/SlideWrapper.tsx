import { motion, AnimatePresence } from 'framer-motion'
import type { ReactNode } from 'react'
import type { Palette } from '../lib/types'

interface Props {
  palette: Palette
  slideKey: string | number
  bgImage?: string
  children: ReactNode
}

export function SlideWrapper({ palette, slideKey, bgImage, children }: Props) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={slideKey}
        className="w-full h-full flex flex-col overflow-hidden relative"
        style={{ background: palette.bg, color: palette.text }}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {bgImage && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
        )}
        <div className="relative z-10 w-full h-full flex flex-col">
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
