import { motion } from 'framer-motion'
import type { SlideProps } from '../../../lib/types'

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

export function FunStatsSlide({ stats, palette }: SlideProps) {
  const facts = [
    stats.mostSkippedSong && {
      label: 'Most Skipped',
      value: stats.mostSkippedSong.name,
      sub: `${stats.mostSkippedSong.skippedCount} skips · ${stats.mostSkippedSong.artist}`,
    },
    stats.longestSong && {
      label: 'Longest Song',
      value: stats.longestSong.name,
      sub: `${formatDuration(stats.longestSong.duration)} · ${stats.longestSong.artist}`,
    },
    stats.mostRecentlyAdded && {
      label: 'Latest Addition',
      value: stats.mostRecentlyAdded.name,
      sub: stats.mostRecentlyAdded.dateAdded.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    },
    stats.totalSkips > 0 && {
      label: 'Total Skips',
      value: stats.totalSkips.toLocaleString(),
      sub: `out of ${stats.totalPlays.toLocaleString()} plays`,
    },
  ].filter(Boolean) as { label: string; value: string; sub: string }[]

  return (
    <div className="w-full h-full flex flex-col p-7 pt-16">
      <div className="flex flex-col gap-1 mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest opacity-50">Fun Facts</p>
        <h2 className="font-black text-3xl leading-tight">Did You<br />Know?</h2>
      </div>

      <div className="flex flex-col gap-5">
        {facts.map((f, i) => (
          <motion.div
            key={f.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i, duration: 0.35 }}
            className="flex flex-col gap-0.5"
          >
            <p className="text-xs font-semibold uppercase tracking-wider opacity-40">{f.label}</p>
            <p className="font-bold text-base truncate">{f.value}</p>
            <p className="text-xs opacity-50 truncate">{f.sub}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
