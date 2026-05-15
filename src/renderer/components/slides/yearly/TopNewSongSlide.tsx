import { motion } from 'framer-motion'
import topSongImg from '../../../assets/topsong.png'
import type { SlideProps } from '../../../lib/types'

export function TopNewSongSlide({ yearRecap, palette }: SlideProps) {
  if (!yearRecap) return null
  const song = yearRecap.topNewSong

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-7 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background: `radial-gradient(ellipse at 30% 60%, ${palette.accent}, transparent 60%)`,
        }}
      />

      {song ? (
        <motion.div
          className="relative z-10 flex flex-col items-center gap-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.45 }}
        >
          <div className="mb-1">
            <p className="text-xs font-semibold uppercase tracking-widest opacity-50">{yearRecap.year}</p>
            <h2 className="font-black text-3xl leading-tight mt-1">Top New Song</h2>
          </div>
          <img src={topSongImg} alt="Top Song" className="w-full max-w-[240px] aspect-square object-contain" />
          <div className="flex flex-col items-center gap-1">
            <p className="font-black text-xl leading-tight">{song.name}</p>
            <p className="opacity-70 text-sm">{song.artist}</p>
            {song.playedCount > 0 && (
              <div
                className="mt-2 px-3 py-1 rounded-full text-xs font-semibold"
                style={{ background: `${palette.accent}30`, color: palette.accent }}
              >
                {song.playedCount} plays
              </div>
            )}
          </div>
        </motion.div>
      ) : (
        <div className="relative z-10 flex flex-col items-center gap-2 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest opacity-50">{yearRecap.year}</p>
          <p className="opacity-50 text-sm">No songs added this year.</p>
        </div>
      )}
    </div>
  )
}
