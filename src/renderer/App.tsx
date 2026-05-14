import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useLibraryData } from './hooks/useLibraryData'
import { LoadingScreen } from './components/LoadingScreen'
import { HomeScreen } from './components/HomeScreen'
import { RecapViewer } from './components/RecapViewer'
import type { YearlyRecap } from './lib/types'

type View = 'loading' | 'home' | 'recap' | 'year'

export default function App() {
  const loadingState = useLibraryData()
  const [view, setView] = useState<View>('loading')
  const [selectedYear, setSelectedYear] = useState<number | null>(null)

  const stats = loadingState.stage === 'ready' ? loadingState.stats : null
  const isReady = loadingState.stage === 'ready'

  const handleStatsReady = () => setView('home')

  const handleYearSelect = (year: number) => {
    setSelectedYear(year)
    setView('year')
  }

  const handleBack = () => setView('home')

  const handleBackdropClick = () => {
    if (view === 'recap' || view === 'year') {
      setView('home')
    }
  }

  const selectedYearRecap: YearlyRecap | null =
    stats && selectedYear ? (stats.yearlyRecaps.find((r) => r.year === selectedYear) ?? null) : null

  return (
    <div
      className="w-screen h-screen flex items-center justify-center relative"
      style={{ background: 'var(--bg-app)' }}
      onClick={handleBackdropClick}
    >
      {(view === 'recap' || view === 'year') && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleBack()
          }}
          className="absolute top-6 left-6 w-12 h-12 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center hover:bg-black/70 transition-colors z-50"
        >
          <ArrowLeft size={20} color="white" strokeWidth={2} />
        </button>
      )}
      <div onClick={(e) => e.stopPropagation()} className="overflow-hidden rounded-3xl" style={{ width: 440, height: 780 }}>
        {!isReady || view === 'loading' ? (
          <LoadingScreen loadingState={loadingState} onReady={handleStatsReady} />
        ) : view === 'home' && stats ? (
          <HomeScreen stats={stats} onStartRecap={() => setView('recap')} onYearSelect={handleYearSelect} />
        ) : view === 'recap' && stats ? (
          <RecapViewer stats={stats} mode="alltime" />
        ) : view === 'year' && stats && selectedYearRecap ? (
          <RecapViewer stats={stats} mode="year" yearRecap={selectedYearRecap} />
        ) : null}
      </div>
    </div>
  )
}
