import { motion } from 'framer-motion'
import topSongImg from '../../../assets/topsong.png'
import type { SlideProps } from '../../../lib/types'

export function TopSongHighlightSlide({ stats, palette }: SlideProps) {
  const top = stats.topSongs[0]

  if (!top) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-7">
        <p className="opacity-50 text-sm">No plays recorded yet.</p>
      </div>
    )
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-7 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-56 h-56 rounded-full translate-x-1/3 translate-y-1/3 opacity-20"
        style={{ background: palette.accent }} />

      <motion.div
        className="relative z-10 flex flex-col items-center gap-4 text-center"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <div className="mb-1">
          <p className="text-xs font-semibold uppercase tracking-widest opacity-50 mb-1">#1 Song</p>
          <h2 className="font-black text-3xl leading-tight">Your Most<br />Played Song</h2>
        </div>
        <img src={topSongImg} alt="Top Song" className="w-full max-w-[260px] aspect-square object-contain" />
        <div className="flex flex-col items-center gap-1">
          <p className="font-black text-xl leading-tight">{top.song.name}</p>
          <p className="opacity-70 text-sm">{top.song.artist}</p>
          {top.song.playedCount > 0 && (
            <div className="mt-2 px-3 py-1 rounded-full text-xs font-semibold"
              style={{ background: `${palette.accent}30`, color: palette.accent }}>
              {top.song.playedCount} plays
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
