interface Props {
  total: number
  current: number
}

export function ProgressBar({ total, current }: Props) {
  const progress = total > 0 ? ((current + 1) / total) * 100 : 0

  return (
    <div className="absolute top-0 left-0 right-0 z-30">
      <div className="absolute top-4 right-4 text-xs font-medium text-white/80 z-40 pointer-events-none">
        {current + 1} / {total}
      </div>

      <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/20 z-40 pointer-events-none">
        <div className="h-full bg-white/90 transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}
