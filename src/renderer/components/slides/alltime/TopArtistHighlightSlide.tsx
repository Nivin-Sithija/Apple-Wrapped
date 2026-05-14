import { motion } from 'framer-motion'
import topArtistImg from '../../../assets/topartist.png'
import type { SlideProps } from '../../../lib/types'

export function TopArtistHighlightSlide({ stats, palette }: SlideProps) {
  const top = stats.topArtists[0]

  if (!top) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-7">
        <p className="opacity-50 text-sm">No plays recorded yet.</p>
      </div>
    )
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-7 relative overflow-hidden">
      <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full opacity-20"
        style={{ background: palette.accent }} />

      <motion.div
        className="relative z-10 flex flex-col items-center gap-4 text-center"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.45 }}
      >
        <div className="mb-1">
          <p className="text-xs font-semibold uppercase tracking-widest opacity-50 mb-1">#1 Artist</p>
          <h2 className="font-black text-3xl leading-tight">Your Top<br />Artist</h2>
        </div>
        <img src={topArtistImg} alt="Top Artist" className="w-full max-w-[260px] aspect-square object-contain" />
        <div className="flex flex-col items-center gap-1">
          <p className="font-black text-2xl">{top.artist}</p>
          <p className="opacity-60 text-sm">{top.totalPlays} total plays</p>
          {top.topSong && (
            <p className="opacity-40 text-xs mt-1">Top song: {top.topSong.name}</p>
          )}
        </div>
      </motion.div>
    </div>
  )
}
