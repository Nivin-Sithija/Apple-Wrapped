import { motion } from 'framer-motion'
import type { SlideProps } from '../../../lib/types'

const PERSONALITY_IMAGES = import.meta.glob(
  '../../../assets/personalities/*.{png,jpg,jpeg,webp}',
  { eager: true, import: 'default' },
) as Record<string, string>

const getPersonalityImage = (archetype: string): string => {
  const name = archetype.replace('The ', '')
  const match = Object.entries(PERSONALITY_IMAGES).find(([k]) => k.includes(name))
  return match ? match[1] : ''
}

export function PersonalitySlide({ stats, palette }: SlideProps) {
  const { archetype, description } = stats.personality
  const imageUrl = getPersonalityImage(archetype)

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-7 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background: `radial-gradient(circle at 70% 30%, ${palette.accent}, transparent 60%)`,
        }}
      />

      <motion.div
        className="relative z-10 flex flex-col items-center gap-3 text-center"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <div className="mb-1">
          <p className="text-xs font-semibold uppercase tracking-widest opacity-50 mb-1">You are…</p>
          <h2 className="font-black text-3xl leading-tight">Your Music<br />Personality</h2>
        </div>
        {imageUrl && (
          <img
            src={imageUrl}
            alt={archetype}
            className="w-full max-w-[380px] aspect-square object-contain"
          />
        )}
        <h3 className="font-black text-2xl">{archetype}</h3>
        <p className="text-sm opacity-70 leading-relaxed max-w-[240px]">{description}</p>
      </motion.div>

      <motion.div
        className="relative z-10 shrink-0 flex flex-wrap gap-2 justify-center pb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {stats.topGenres.slice(0, 3).map((g) => (
          <span
            key={g.genre}
            className="px-3 py-1 rounded-full text-xs font-semibold"
            style={{ background: `${palette.text}15`, color: palette.text }}
          >
            {g.genre}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
