import { motion } from 'framer-motion'
import { Music } from 'lucide-react'
import type { SlideProps } from '../../../lib/types'

export function IntroSlide({ stats, palette }: SlideProps) {
  return (
    <div className="w-full h-full flex flex-col justify-between p-7 pt-16 relative overflow-hidden">
      <div
        className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-20"
        style={{ background: palette.accent }}
      />
      <div
        className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full opacity-10"
        style={{ background: palette.accent }}
      />

      <div className="relative z-10 flex flex-col gap-3">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center"
          style={{ background: `${palette.text}20` }}
        >
          <Music size={24} color={palette.text} strokeWidth={1.5} />
        </div>
        <p className="text-sm font-semibold uppercase tracking-widest opacity-70">
          Apple Music Recap
        </p>
      </div>

      <motion.div
        className="relative z-10 flex flex-col gap-2"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
      >
        <p className="text-base font-semibold opacity-60">All-Time</p>
        <h1 className="font-black leading-none" style={{ fontSize: 72 }}>
          Your
          <br />
          Music
          <br />
          Story.
        </h1>
      </motion.div>

      <motion.div
        className="relative z-10 flex flex-col gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <p className="text-sm opacity-60">
          {stats.totalSongs.toLocaleString()} songs · {stats.totalArtists.toLocaleString()} artists
        </p>
        <p className="text-xs opacity-40">Tap right to begin →</p>
      </motion.div>
    </div>
  )
}
