import { motion } from 'framer-motion'
import type { SlideProps } from '../../../lib/types'

export function ActiveSongsSlide({ yearRecap, palette }: SlideProps) {
  if (!yearRecap) return null

  const pct = yearRecap.librarySize > 0
    ? Math.round((yearRecap.activeSongs / yearRecap.librarySize) * 100)
    : 0

  return (
    <div className="w-full h-full flex flex-col justify-between p-7 pt-16 relative overflow-hidden">
      <div
        className="absolute bottom-0 right-0 w-60 h-60 rounded-full translate-x-1/3 translate-y-1/3 opacity-20"
        style={{ background: palette.accent }}
      />

      <div className="relative z-10">
        <p className="text-xs font-semibold uppercase tracking-widest opacity-50">{yearRecap.year}</p>
        <h2 className="font-black text-3xl leading-tight mt-1">Active Songs</h2>
      </div>

      <motion.div
        className="relative z-10 flex flex-col gap-3"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.45 }}
      >
        <p className="font-black leading-none" style={{ fontSize: 80 }}>
          {yearRecap.activeSongs}
        </p>
        <p className="text-lg font-semibold opacity-80">songs played</p>
        <p className="text-sm opacity-50">in {yearRecap.year}</p>
      </motion.div>

      <motion.div
        className="relative z-10 flex flex-col gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex justify-between text-xs opacity-50 mb-1">
          <span>{pct}% of library played</span>
          <span>{yearRecap.librarySize} total songs</span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: `${palette.text}20` }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: palette.accent }}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      </motion.div>
    </div>
  )
}
