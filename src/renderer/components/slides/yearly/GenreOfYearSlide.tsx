import { motion } from 'framer-motion'
import type { SlideProps } from '../../../lib/types'

export function GenreOfYearSlide({ yearRecap, stats, palette }: SlideProps) {
  if (!yearRecap) return null

  const genre = yearRecap.topGenre
  const genreData = stats.topGenres.find((g) => g.genre === genre)

  return (
    <div className="w-full h-full flex flex-col justify-between p-7 pt-16 relative overflow-hidden">
      <div
        className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full opacity-20"
        style={{ background: palette.accent }}
      />

      <div className="relative z-10">
        <p className="text-xs font-semibold uppercase tracking-widest opacity-50">{yearRecap.year}</p>
        <h2 className="font-black text-3xl leading-tight mt-1">Genre of<br />the Year</h2>
      </div>

      {genre ? (
        <motion.div
          className="relative z-10 flex flex-col gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.45 }}
        >
          <p className="font-black leading-none" style={{ fontSize: 56 }}>{genre}</p>
          {genreData && (
            <p className="text-sm opacity-60">
              {genreData.count} songs · {genreData.totalPlays} plays all time
            </p>
          )}
        </motion.div>
      ) : (
        <div className="relative z-10 flex-1 flex items-center justify-center">
          <p className="opacity-50 text-sm">No genre data for this year.</p>
        </div>
      )}

      <div className="relative z-10 h-4" />
    </div>
  )
}
