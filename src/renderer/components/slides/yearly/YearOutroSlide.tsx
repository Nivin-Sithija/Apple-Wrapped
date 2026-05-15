import { motion } from 'framer-motion'
import type { SlideProps } from '../../../lib/types'

export function YearOutroSlide({ yearRecap, palette }: SlideProps) {
  if (!yearRecap) return null

  return (
    <div className="w-full h-full flex flex-col justify-between p-7 pt-16 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background: `radial-gradient(ellipse at 60% 50%, ${palette.accent}, transparent 65%)`,
        }}
      />

      <div className="relative z-10">
        <p className="text-xs font-semibold uppercase tracking-widest opacity-50">Year in Review</p>
      </div>

      <motion.div
        className="relative z-10 flex flex-col gap-3"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
      >
        <p className="font-black leading-none" style={{ fontSize: 88 }}>
          {yearRecap.year}
        </p>
        <h2 className="font-black text-3xl leading-tight">Wrapped. 🎁</h2>
        <p className="text-base opacity-70 leading-relaxed mt-1">
          {yearRecap.songsAdded} songs added.
          {yearRecap.newArtists > 0 && <> {yearRecap.newArtists} new artists discovered.</>}
          {yearRecap.activeSongs > 0 && <> {yearRecap.activeSongs} songs played.</>}
        </p>
      </motion.div>

      <motion.div
        className="relative z-10 flex flex-col gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="h-px opacity-20" style={{ background: palette.text }} />
        <p className="text-xs opacity-40 mt-1">Tap left to go back</p>
      </motion.div>
    </div>
  )
}
