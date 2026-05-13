import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Music } from 'lucide-react'
import type { LoadingState } from '../lib/types'

const STAGE_LABELS: Record<string, string> = {
  idle: 'Starting up…',
  querying: 'Reading your Music library…',
  aggregating: 'Building your recap…',
  ready: 'Ready!',
  error: 'Something went wrong',
}

interface Props {
  loadingState: LoadingState
  onReady: () => void
}

export function LoadingScreen({ loadingState, onReady }: Props) {
  const stage = loadingState.stage
  const label = STAGE_LABELS[stage] ?? 'Loading…'
  const isError = stage === 'error'
  const errorMsg = isError ? (loadingState as { stage: 'error'; message: string }).message : ''

  useEffect(() => {
    if (stage === 'ready') {
      const t = setTimeout(onReady, 400)
      return () => clearTimeout(t)
    }
    return undefined
  }, [stage, onReady])

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-6 bg-[#0a0a0a] px-8">
      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        className="w-16 h-16 rounded-[1.6rem] flex items-center justify-center"
        style={{ background: '#E8132A' }}
      >
        <Music size={32} color="white" strokeWidth={1.5} />
      </motion.div>

      <div className="flex flex-col items-center gap-2 text-center">
        <p className="text-white text-base font-semibold">{isError ? 'Error' : label}</p>
        {isError ? (
          <p className="text-white/50 text-xs leading-relaxed max-w-[220px]">
            {errorMsg === 'permission_denied'
              ? 'Apple Music Recap needs permission to access Music.\n\nGo to System Settings → Privacy & Security → Automation and allow this app.'
              : errorMsg}
          </p>
        ) : (
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-white/60"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
