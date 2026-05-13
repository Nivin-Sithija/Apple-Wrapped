import { motion } from 'framer-motion'
import { Music, ChevronRight, Calendar } from 'lucide-react'
import type { RecapStats } from '../lib/types'

interface Props {
  stats: RecapStats
  onStartRecap: () => void
  onYearSelect: (year: number) => void
}

export function HomeScreen({ stats, onStartRecap, onYearSelect }: Props) {
  const years = stats.availableYears.slice(0, 6)

  return (
    <div className="w-full h-full bg-[#0a0a0a] flex flex-col overflow-hidden">
      <div className="px-6 pt-12 pb-6 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: '#E8132A' }}
          >
            <Music size={18} color="white" strokeWidth={1.5} />
          </div>
          <span className="text-white/50 text-xs font-semibold tracking-widest uppercase">
            Apple Music Recap
          </span>
        </div>
        <h1 className="text-white text-3xl font-black leading-tight tracking-tight">
          Your Library,<br />Your Story.
        </h1>
        <p className="text-white/40 text-sm">
          {stats.totalSongs.toLocaleString()} songs · {stats.totalArtists.toLocaleString()} artists
        </p>
      </div>

      <div className="px-6 pb-4">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onStartRecap}
          className="w-full flex items-center justify-between px-5 py-4 rounded-2xl"
          style={{ background: '#E8132A' }}
        >
          <div className="text-left">
            <p className="text-white font-black text-base leading-tight">All-Time Recap</p>
            <p className="text-white/70 text-xs mt-0.5">Your complete listening history</p>
          </div>
          <ChevronRight size={20} color="white" strokeWidth={2.5} />
        </motion.button>
      </div>

      {years.length > 0 && (
        <div className="px-6 flex-1 overflow-y-auto">
          <div className="flex items-center gap-2 mb-3">
            <Calendar size={14} color="rgba(255,255,255,0.5)" />
            <span className="text-white/50 text-xs font-medium uppercase tracking-wider">
              Year in Review
            </span>
          </div>
          <div className="flex flex-col gap-2 pb-6">
            {years.map((year, i) => {
              const recap = stats.yearlyRecaps.find((r) => r.year === year)
              return (
                <motion.button
                  key={year}
                  whileTap={{ scale: 0.97 }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => onYearSelect(year)}
                  className="w-full flex items-center justify-between px-5 py-3.5 rounded-2xl border border-white/10 bg-white/5"
                >
                  <div className="text-left">
                    <p className="text-white font-bold text-sm">{year}</p>
                    {recap && (
                      <p className="text-white/40 text-xs mt-0.5">
                        {recap.songsAdded} songs added
                      </p>
                    )}
                  </div>
                  <ChevronRight size={16} color="rgba(255,255,255,0.4)" strokeWidth={2} />
                </motion.button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
