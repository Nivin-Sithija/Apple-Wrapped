import { motion } from 'framer-motion'
import type { SlideProps } from '../../../lib/types'

export function NewAdditionsSlide({ yearRecap, palette }: SlideProps) {
  if (!yearRecap) return null

  const growth = yearRecap.librarySize - yearRecap.librarySizePrev
  const pct = yearRecap.librarySizePrev > 0
    ? Math.round((growth / yearRecap.librarySizePrev) * 100)
    : 100

  return (
    <div className="w-full h-full flex flex-col justify-between p-7 pt-16 relative overflow-hidden">
      <div
        className="absolute top-1/2 right-0 w-56 h-56 rounded-full -translate-y-1/2 translate-x-1/3 opacity-20"
        style={{ background: palette.accent }}
      />

      <div className="relative z-10">
        <p className="text-xs font-semibold uppercase tracking-widest opacity-50">{yearRecap.year}</p>
        <h2 className="font-black text-3xl leading-tight mt-1">New Additions</h2>
      </div>

      <motion.div
        className="relative z-10 flex flex-col gap-2"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.45 }}
      >
        <p className="font-black leading-none" style={{ fontSize: 80 }}>
          {yearRecap.songsAdded}
        </p>
        <p className="text-lg font-semibold opacity-80">songs added</p>
        {pct > 0 && yearRecap.librarySizePrev > 0 && (
          <p className="text-sm opacity-50 mt-1">
            +{pct}% growth from previous year
          </p>
        )}
      </motion.div>

      <motion.div
        className="relative z-10 flex flex-col gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <p className="text-sm opacity-60">
          {yearRecap.newArtists} new artist{yearRecap.newArtists !== 1 ? 's' : ''} discovered
        </p>
        <div className="h-1 rounded-full mt-2 overflow-hidden" style={{ background: `${palette.text}20` }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: palette.accent }}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(pct, 100)}%` }}
            transition={{ delay: 0.5, duration: 0.7, ease: 'easeOut' }}
          />
        </div>
      </motion.div>
    </div>
  )
}
