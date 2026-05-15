import { motion } from 'framer-motion'
import type { SlideProps } from '../../../lib/types'

export function LibrarySnapshotSlide({ yearRecap, palette }: SlideProps) {
  if (!yearRecap) return null

  return (
    <div className="w-full h-full flex flex-col justify-between p-7 pt-16 relative overflow-hidden">
      <div
        className="absolute top-0 left-0 w-48 h-48 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-20"
        style={{ background: palette.accent }}
      />

      <div className="relative z-10">
        <p className="text-xs font-semibold uppercase tracking-widest opacity-50">{yearRecap.year}</p>
        <h2 className="font-black text-3xl leading-tight mt-1">Library<br />Snapshot</h2>
      </div>

      <motion.div
        className="relative z-10 flex flex-col gap-6"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <div className="flex flex-col gap-1">
          <p className="text-xs opacity-40 uppercase tracking-wider font-medium">End of {yearRecap.year}</p>
          <p className="font-black leading-none" style={{ fontSize: 64 }}>
            {yearRecap.librarySize}
          </p>
          <p className="text-sm opacity-70 font-semibold">songs in library</p>
        </div>

        <div className="flex gap-6">
          <div className="flex flex-col gap-0.5">
            <p className="font-black text-2xl">{yearRecap.songsAdded}</p>
            <p className="text-xs opacity-50">added this year</p>
          </div>
          <div className="w-px opacity-20" style={{ background: palette.text }} />
          <div className="flex flex-col gap-0.5">
            <p className="font-black text-2xl">{yearRecap.librarySizePrev}</p>
            <p className="text-xs opacity-50">at start of year</p>
          </div>
        </div>
      </motion.div>

      <div className="relative z-10 h-4" />
    </div>
  )
}
