import { useState, useCallback, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { SlideWrapper } from './SlideWrapper'
import { ProgressBar } from './ProgressBar'
import { getPalette } from '../lib/palettes'
import type { RecapStats, YearlyRecap, SlideProps } from '../lib/types'
import { IntroSlide } from './slides/alltime/IntroSlide'
import { LibraryOverviewSlide } from './slides/alltime/LibraryOverviewSlide'
import { TopSongsSlide } from './slides/alltime/TopSongsSlide'
import { TopSongHighlightSlide } from './slides/alltime/TopSongHighlightSlide'
import { TopArtistsSlide } from './slides/alltime/TopArtistsSlide'
import { TopArtistHighlightSlide } from './slides/alltime/TopArtistHighlightSlide'
import { TopAlbumsSlide } from './slides/alltime/TopAlbumsSlide'
import { GenreSlide } from './slides/alltime/GenreSlide'
import { LibraryJourneySlide } from './slides/alltime/LibraryJourneySlide'
import { FunStatsSlide } from './slides/alltime/FunStatsSlide'
import { PersonalitySlide } from './slides/alltime/PersonalitySlide'
import { OutroSlide } from './slides/alltime/OutroSlide'

import { YearIntroSlide } from './slides/yearly/YearIntroSlide'
import { NewAdditionsSlide } from './slides/yearly/NewAdditionsSlide'
import { TopSongsOfYearSlide } from './slides/yearly/TopSongsOfYearSlide'
import { TopSongOfYearSlide } from './slides/yearly/TopSongOfYearSlide'
import { TopArtistsOfYearSlide } from './slides/yearly/TopArtistsOfYearSlide'
import { TopArtistOfYearSlide } from './slides/yearly/TopArtistOfYearSlide'
import { GenreOfYearSlide } from './slides/yearly/GenreOfYearSlide'
import { PersonalityOfYearSlide } from './slides/yearly/PersonalityOfYearSlide'
import { LibrarySnapshotSlide } from './slides/yearly/LibrarySnapshotSlide'
import { YearOutroSlide } from './slides/yearly/YearOutroSlide'

const BG_ALLTIME = import.meta.glob('../assets/backgrounds/alltime-*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const BG_YEARLY = import.meta.glob('../assets/backgrounds/yearly-*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const ALL_TIME_BG_NAMES = [
  'alltime-intro',
  'alltime-library-overview',
  'alltime-top-songs',
  'alltime-song-highlight',
  'alltime-top-artists',
  'alltime-artist-highlight',
  'alltime-top-albums',
  'alltime-genres',
  'alltime-library-journey',
  'alltime-fun-stats',
  'alltime-personality',
  'alltime-outro',
]

const YEARLY_BG_NAMES = [
  'yearly-intro',
  'yearly-additions',
  'yearly-top-songs',
  'yearly-song-highlight',
  'yearly-top-artists',
  'yearly-artist-highlight',
  'yearly-genre',
  'yearly-personality',
  'yearly-snapshot',
  'yearly-outro',
]

function getBgImage(mode: 'alltime' | 'year', slideIndex: number): string | undefined {
  const names = mode === 'alltime' ? ALL_TIME_BG_NAMES : YEARLY_BG_NAMES
  const name = names[slideIndex]
  if (!name) return undefined
  const bucket = mode === 'alltime' ? BG_ALLTIME : BG_YEARLY
  const match = Object.entries(bucket).find(([k]) => k.includes(name))
  return match ? match[1] : undefined
}

type SlideComponent = React.ComponentType<SlideProps>

const ALL_TIME_SLIDES: SlideComponent[] = [
  IntroSlide,
  LibraryOverviewSlide,
  TopSongsSlide,
  TopSongHighlightSlide,
  TopArtistsSlide,
  TopArtistHighlightSlide,
  TopAlbumsSlide,
  GenreSlide,
  LibraryJourneySlide,
  FunStatsSlide,
  PersonalitySlide,
  OutroSlide,
]

const YEARLY_SLIDES: SlideComponent[] = [
  YearIntroSlide,
  NewAdditionsSlide,
  TopSongsOfYearSlide,
  TopSongOfYearSlide,
  TopArtistsOfYearSlide,
  TopArtistOfYearSlide,
  GenreOfYearSlide,
  PersonalityOfYearSlide,
  LibrarySnapshotSlide,
  YearOutroSlide,
]

const AUTO_ADVANCE_MS = 6000

interface Props {
  stats: RecapStats
  mode: 'alltime' | 'year'
  yearRecap?: YearlyRecap
}

export function RecapViewer({ stats, mode, yearRecap }: Props) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const slides = mode === 'alltime' ? ALL_TIME_SLIDES : YEARLY_SLIDES
  const total = slides.length
  const palette = getPalette(index)
  const CurrentSlide = slides[index]
  const timerRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    if (!paused) {
      timerRef.current = setTimeout(() => {
        if (index < total - 1) {
          setIndex((i) => i + 1)
        }
      }, AUTO_ADVANCE_MS)
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [index, paused, total])

  const handleTap = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const { clientX, currentTarget } = e
      const midX = currentTarget.getBoundingClientRect().left + currentTarget.offsetWidth / 2
      if (clientX < midX) {
        setIndex((i) => Math.max(0, i - 1))
      } else {
        setIndex((i) => Math.min(total - 1, i + 1))
      }
      setPaused(true)
      setTimeout(() => setPaused(false), 2000)
    },
    [total],
  )

  const handlePressStart = useCallback(() => setPaused(true), [])
  const handlePressEnd = useCallback(() => setTimeout(() => setPaused(false), 2000), [])

  return (
    <div
      className="w-full h-full relative overflow-hidden"
      onClick={handleTap}
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
    >
      <SlideWrapper palette={palette} slideKey={index} bgImage={getBgImage(mode, index)}>
        <CurrentSlide stats={stats} yearRecap={yearRecap} palette={palette} />
      </SlideWrapper>
      <ProgressBar total={total} current={index} />

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1 px-4 z-20 pointer-events-none">
        {slides.map((_, i) => (
          <div
            key={i}
            className="h-1 rounded-full transition-all duration-300"
            style={{
              width: i === index ? '24px' : '8px',
              background: i <= index ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.3)',
            }}
          />
        ))}
      </div>

      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 pointer-events-none opacity-30">
        <ChevronLeft size={32} color="white" strokeWidth={2.5} />
      </div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 pointer-events-none opacity-30">
        <ChevronRight size={32} color="white" strokeWidth={2.5} />
      </div>

      <div className="absolute top-0 left-0 w-1/2 h-full z-30" />
      <div className="absolute top-0 right-0 w-1/2 h-full z-30" />
    </div>
  )
}
