import { motion } from 'framer-motion'
import type { SlideProps } from '../../../lib/types'

function Stat({ label, value, delay, palette, isAge }: { label: string; value: string; delay: number; palette: SlideProps['palette']; isAge?: boolean }) {
  if (isAge) {
    const [num, unit] = value.split(' ')
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.4 }}
        className="flex flex-col gap-1"
      >
        <p className="font-black whitespace-nowrap" style={{ fontSize: 52, lineHeight: 1, color: palette.text }}>
          {num} <span style={{ fontSize: 36 }}>{unit}</span>
        </p>
        <p className="text-sm font-medium" style={{ color: `${palette.text}80` }}>{label}</p>
      </motion.div>
    )
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="flex flex-col gap-1"
    >
      <p className="font-black" style={{ fontSize: 52, lineHeight: 1, color: palette.text }}>{value}</p>
      <p className="text-sm font-medium" style={{ color: `${palette.text}80` }}>{label}</p>
    </motion.div>
  )
}

export function LibraryOverviewSlide({ stats, palette }: SlideProps) {
  const age = stats.libraryAgeYears < 1
    ? `${Math.round(stats.libraryAgeYears * 12)}mon`
    : `${Math.round(stats.libraryAgeYears)}yr`

  return (
    <div className="w-full h-full flex flex-col p-7 pt-16 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-48 h-48 rounded-full -translate-y-1/2 translate-x-1/2 opacity-15"
        style={{ background: palette.accent }} />

      <div className="relative z-10 flex flex-col gap-1 mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest opacity-50">Your library</p>
        <h2 className="font-black text-3xl leading-tight">In Numbers</h2>
      </div>

      <div className="relative z-10 grid grid-cols-2 gap-x-6 gap-y-8">
        <Stat label="Songs" value={stats.totalSongs.toLocaleString()} delay={0.1} palette={palette} />
        <Stat label="Artists" value={stats.totalArtists.toLocaleString()} delay={0.2} palette={palette} />
        <Stat label="Albums" value={stats.totalAlbums.toLocaleString()} delay={0.3} palette={palette} />
        <Stat label="Library age" value={age} delay={0.4} palette={palette} isAge />
        <Stat label="Total plays" value={stats.totalPlays.toLocaleString()} delay={0.5} palette={palette} />
        <Stat
          label="Hours listened"
          value={stats.totalListeningHours < 1
            ? `${Math.round(stats.totalListeningHours * 60)}m`
            : `${Math.round(stats.totalListeningHours)}h`}
          delay={0.6}
          palette={palette}
        />
      </div>
    </div>
  )
}
