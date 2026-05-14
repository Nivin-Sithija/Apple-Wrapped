import { motion } from 'framer-motion'
import type { SlideProps } from '../../../lib/types'

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export function LibraryJourneySlide({ stats, palette }: SlideProps) {
  const yearData = stats.songsByYear
  const useMonthly = yearData.length <= 2

  const data = useMonthly
    ? stats.songsByMonth.map((d) => ({ label: MONTH_NAMES[d.month], count: d.count }))
    : yearData.map((d) => ({ label: String(d.year).slice(2), count: d.count }))

  const totalDisplay = stats.totalSongs

  const max = Math.max(...data.map((d) => d.count), 1)

  return (
    <div className="w-full h-full flex flex-col p-7 justify-center">
      <div className="flex flex-col gap-1 mb-2">
        <p className="text-xs font-semibold uppercase tracking-widest opacity-50">All-Time</p>
        <h2 className="font-black text-3xl leading-tight">Your Library<br />Journey</h2>
        {useMonthly && (
          <p className="text-xs opacity-40 mt-1">Monthly breakdown · {yearData[0]?.year ?? ''}</p>
        )}
      </div>

      {data.length === 0 ? (
        <p className="opacity-50 text-sm">No data available.</p>
      ) : data.length === 1 ? (
        <motion.div
          className="flex flex-col gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div>
            <p className="font-black leading-none" style={{ fontSize: 80 }}>{totalDisplay}</p>
            <p className="text-lg font-semibold opacity-70 mt-1">songs added</p>
            <p className="text-sm opacity-40 mt-0.5">in {data[0].label} {yearData[0]?.year}</p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-2 rounded-full overflow-hidden" style={{ background: `${palette.text}20` }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: `${palette.text}70` }}
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.4, duration: 0.7, ease: 'easeOut' }}
              />
            </div>
            <p className="text-xs opacity-40">Your library is just getting started</p>
          </div>
        </motion.div>
      ) : (
        <div className="flex flex-col">
          <div className="flex items-end gap-1.5" style={{ height: 160 }}>
            {data.map((d, i) => {
              const barH = Math.max(Math.round((d.count / max) * 130), 8)
              const isLast = i === data.length - 1
              return (
                <div key={i} className="flex flex-col items-center flex-1 min-w-0 justify-end" style={{ height: 160 }}>
                  {isLast && (
                    <span className="text-[9px] font-bold opacity-80 mb-1">{d.count}</span>
                  )}
                  <motion.div
                    className="w-full rounded-t-sm"
                    style={{ background: isLast ? `${palette.text}90` : `${palette.text}30` }}
                    initial={{ height: 0 }}
                    animate={{ height: barH }}
                    transition={{ delay: 0.05 * i, duration: 0.5, ease: 'easeOut' }}
                  />
                  <span className="text-[8px] opacity-40 truncate w-full text-center mt-1">
                    {d.label}
                  </span>
                </div>
              )
            })}
          </div>
          <div className="mt-4 flex flex-col gap-0.5">
            <p className="text-sm font-bold">{totalDisplay.toLocaleString()} songs in library</p>
            <p className="text-xs opacity-40">
              {useMonthly
                ? `added across ${data.length} months in ${yearData[0]?.year}`
                : `growing across ${yearData.length} years`}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
