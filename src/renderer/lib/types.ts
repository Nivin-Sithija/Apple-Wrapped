export interface LibrarySong {
  index: number
  name: string
  artist: string
  album: string
  genre: string
  playedCount: number
  duration: number
  dateAdded: Date
  playedDate: Date | null
  rating: number
  skippedCount: number
}

export interface RankedSong {
  song: LibrarySong
  artworkUrl: string | null
  rank: number
}

export interface RankedArtist {
  artist: string
  totalPlays: number
  topSong: LibrarySong
  artworkUrl: string | null
  rank: number
}

export interface RankedAlbum {
  album: string
  artist: string
  totalPlays: number
  topSong: LibrarySong
  artworkUrl: string | null
  rank: number
}

export interface RankedGenre {
  genre: string
  count: number
  totalPlays: number
  percentage: number
}

export interface YearlyRecap {
  year: number
  songsAdded: number
  newArtists: number
  topNewSong: LibrarySong | null
  topGenre: string | null
  librarySize: number
  librarySizePrev: number
  activeSongs: number
  personality: PersonalityResult | null
  topSongs: RankedSong[]
  topArtists: RankedArtist[]
}

export interface PersonalityResult {
  archetype: string
  description: string
  emoji: string
}

export interface RecapStats {
  totalSongs: number
  totalArtists: number
  totalAlbums: number
  totalListeningHours: number
  totalPlays: number
  totalSkips: number
  libraryAgeYears: number
  topSongs: RankedSong[]
  topArtists: RankedArtist[]
  topAlbums: RankedAlbum[]
  topGenres: RankedGenre[]
  mostSkippedSong: LibrarySong | null
  longestSong: LibrarySong | null
  mostRecentlyAdded: LibrarySong | null
  highestRatedSongs: LibrarySong[]
  personality: PersonalityResult
  songsByYear: { year: number; count: number }[]
  songsByMonth: { year: number; month: number; count: number }[]
  yearlyRecaps: YearlyRecap[]
  availableYears: number[]
}

export type LoadingState =
  | { stage: 'idle' }
  | { stage: 'querying' }
  | { stage: 'aggregating' }
  | { stage: 'ready'; stats: RecapStats }
  | { stage: 'error'; message: string }

export interface Palette {
  id: string
  bg: string
  accent: string
  text: string
}

export interface SlideProps {
  stats: RecapStats
  yearRecap?: YearlyRecap
  palette: Palette
}
