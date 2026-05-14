import { motion } from 'framer-motion'
import { Music } from 'lucide-react'
import type { SlideProps } from '../../../lib/types'

export function OutroSlide({ stats, palette }: SlideProps) {
  return (
    <div className="w-full h-full flex flex-col justify-between p-7 pt-16 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 50% 40%, ${palette.accent}30, transparent 70%)`,
        }}
      />

      <div className="relative z-10 flex items-center gap-2">
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center"
          style={{ background: `${palette.text}20` }}
        >
          <Music size={16} color={palette.text} strokeWidth={1.5} />
        </div>
        <p className="text-xs font-semibold uppercase tracking-widest opacity-50">
          Apple Music Recap
        </p>
      </div>

      <motion.div
        className="relative z-10 flex flex-col gap-3"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
      >
        <h1 className="font-black leading-none" style={{ fontSize: 64 }}>
          That's a<br />Wrap! 🎉
        </h1>
        <p className="text-base opacity-70 leading-relaxed">
          {stats.totalSongs.toLocaleString()} songs.<br />
          {stats.totalArtists.toLocaleString()} artists.<br />
          Your music, your story.
        </p>
      </motion.div>

      <motion.div
        className="relative z-10 flex flex-col gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div
          className="h-px opacity-20"
          style={{ background: palette.text }}
        />
        <p className="text-xs opacity-40">
          {Math.round(stats.totalListeningHours).toLocaleString()}h of music in your library
        </p>
      </motion.div>
    </div>
  )
}
