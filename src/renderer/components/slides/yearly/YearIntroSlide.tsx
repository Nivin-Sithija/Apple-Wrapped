import { motion } from 'framer-motion'
import type { SlideProps } from '../../../lib/types'

export function YearIntroSlide({ yearRecap, palette }: SlideProps) {
  if (!yearRecap) return null

  return (
    <div className="w-full h-full flex flex-col justify-between p-7 pt-16 relative overflow-hidden">
      <div
        className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-15"
        style={{ background: palette.accent }}
      />
      <div
        className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full opacity-10"
        style={{ background: palette.accent }}
      />

      <div className="relative z-10">
        <p className="text-xs font-semibold uppercase tracking-widest opacity-50">Year in Review</p>
      </div>

      <motion.div
        className="relative z-10 flex flex-col gap-2"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
      >
        <p className="text-base font-semibold opacity-60">Your</p>
        <h1 className="font-black leading-none" style={{ fontSize: 88 }}>
          {yearRecap.year}
        </h1>
        <p className="text-base opacity-70">in music.</p>
      </motion.div>

      <motion.div
        className="relative z-10 flex flex-col gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <p className="text-sm opacity-60">
          {yearRecap.songsAdded} songs added · {yearRecap.newArtists} new artists
        </p>
        <p className="text-xs opacity-40">Tap right to continue →</p>
      </motion.div>
    </div>
  )
}
