import { motion } from 'framer-motion'
import type { SlideProps } from '../../../lib/types'

export function GenreSlide({ stats, palette }: SlideProps) {
  const genres = stats.topGenres

  return (
    <div className="w-full h-full flex flex-col p-7 pt-16">
      <div className="flex flex-col gap-1 mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest opacity-50">All-Time</p>
        <h2 className="font-black text-3xl leading-tight">Your Genres</h2>
      </div>

      {genres.length === 0 ? (
        <p className="opacity-50 text-sm">No genre data available.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {genres.map((g, i) => (
            <motion.div
              key={g.genre}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.35 }}
              className="flex flex-col gap-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold truncate">{g.genre}</span>
                <span className="text-xs opacity-50 ml-2 flex-shrink-0">{g.percentage}%</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: `${palette.text}20` }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: i === 0 ? palette.accent : `${palette.text}60` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${g.percentage}%` }}
                  transition={{ delay: 0.15 + 0.1 * i, duration: 0.6, ease: 'easeOut' }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
