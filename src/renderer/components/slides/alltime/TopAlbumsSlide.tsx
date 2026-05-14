import { motion } from 'framer-motion'
import type { SlideProps } from '../../../lib/types'

export function TopAlbumsSlide({ stats, palette }: SlideProps) {
  const albums = stats.topAlbums

  return (
    <div className="w-full h-full flex flex-col p-7 pt-16">
      <div className="flex flex-col gap-1 mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest opacity-50">All-Time</p>
        <h2 className="font-black text-3xl leading-tight">Your Top Albums</h2>
      </div>

      {albums.length === 0 ? (
        <p className="opacity-50 text-sm mt-4">No plays recorded yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {albums.map((r, i) => (
            <motion.div
              key={`${r.album}-${r.artist}`}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.08 * i, duration: 0.35 }}
              className="flex items-center gap-4"
            >
              <span
                className="font-black w-6 text-right flex-shrink-0 text-lg"
                style={{ color: i === 0 ? palette.accent : `${palette.text}50` }}
              >
                {r.rank}
              </span>
              <div
                className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center text-xs font-black"
                style={{ background: `${palette.accent}25`, color: palette.accent }}
              >
                {(r.album || r.artist).charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <p className="font-bold text-sm truncate">{r.album || '—'}</p>
                <p className="text-xs opacity-60 truncate">{r.artist}</p>
              </div>
              {r.totalPlays > 0 && (
                <span
                  className="flex-shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: `${palette.accent}20`, color: palette.accent }}
                >
                  {r.totalPlays}×
                </span>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
