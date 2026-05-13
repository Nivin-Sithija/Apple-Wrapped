import type {
  LibrarySong,
  RecapStats,
  RankedSong,
  RankedArtist,
  RankedAlbum,
  RankedGenre,
  YearlyRecap,
  PersonalityResult,
} from './types'

export function aggregateStats(songs: LibrarySong[]): RecapStats {
  if (songs.length === 0) return emptyStats()

  const playedSongs = songs.filter((s) => s.playedCount > 0)

  const totalSongs = songs.length
  const totalArtists = new Set(songs.map((s) => s.artist).filter(Boolean)).size
  const totalAlbums = new Set(songs.map((s) => s.album).filter(Boolean)).size
  const totalListeningHours = songs.reduce(
    (acc, s) => acc + (s.duration / 3600) * s.playedCount,
    0,
  )
  const totalPlays = songs.reduce((acc, s) => acc + s.playedCount, 0)
  const totalSkips = songs.reduce((acc, s) => acc + s.skippedCount, 0)

  const addedDates = songs.map((s) => s.dateAdded.getTime()).filter((t) => t > 0)
  const oldestMs = addedDates.length > 0 ? Math.min(...addedDates) : Date.now()
  const libraryAgeYears = (Date.now() - oldestMs) / (1000 * 60 * 60 * 24 * 365.25)

  const sortedByPlays = [...playedSongs].sort((a, b) => b.playedCount - a.playedCount)
  const topSongs: RankedSong[] = sortedByPlays
    .slice(0, 5)
    .map((song, i) => ({ song, artworkUrl: null, rank: i + 1 }))

  const artistMap = new Map<string, { songs: LibrarySong[]; totalPlays: number }>()
  for (const song of songs) {
    if (!song.artist) continue
    const entry = artistMap.get(song.artist) ?? { songs: [], totalPlays: 0 }
    entry.songs.push(song)
    entry.totalPlays += song.playedCount
    artistMap.set(song.artist, entry)
  }
  const topArtists: RankedArtist[] = [...artistMap.entries()]
    .filter(([, v]) => v.totalPlays > 0)
    .sort(([, a], [, b]) => b.totalPlays - a.totalPlays)
    .slice(0, 5)
    .map(([artist, { songs: as_, totalPlays }], i) => {
      const topSong = [...as_].sort((a, b) => b.playedCount - a.playedCount)[0]
      return { artist, totalPlays, topSong, artworkUrl: null, rank: i + 1 }
    })

  const albumMap = new Map<string, { songs: LibrarySong[]; totalPlays: number; artist: string }>()
  for (const song of songs) {
    if (!song.album) continue
    const key = `${song.album}\x00${song.artist}`
    const entry = albumMap.get(key) ?? { songs: [], totalPlays: 0, artist: song.artist }
    entry.songs.push(song)
    entry.totalPlays += song.playedCount
    albumMap.set(key, entry)
  }
  const topAlbums: RankedAlbum[] = [...albumMap.entries()]
    .filter(([, v]) => v.totalPlays > 0)
    .sort(([, a], [, b]) => b.totalPlays - a.totalPlays)
    .slice(0, 5)
    .map(([key, { songs: as_, totalPlays, artist }], i) => {
      const album = key.split('\x00')[0]
      const topSong = [...as_].sort((a, b) => b.playedCount - a.playedCount)[0]
      return { album, artist, totalPlays, topSong, artworkUrl: null, rank: i + 1 }
    })

  const genreMap = new Map<string, { count: number; totalPlays: number }>()
  for (const song of songs) {
    if (!song.genre) continue
    const entry = genreMap.get(song.genre) ?? { count: 0, totalPlays: 0 }
    entry.count++
    entry.totalPlays += song.playedCount
    genreMap.set(song.genre, entry)
  }
  const topGenres: RankedGenre[] = [...genreMap.entries()]
    .sort(([, a], [, b]) => b.count - a.count)
    .slice(0, 5)
    .map(([genre, { count, totalPlays }]) => ({
      genre,
      count,
      totalPlays,
      percentage: Math.round((count / totalSongs) * 100),
    }))

  const mostSkippedSong =
    songs.reduce<LibrarySong | null>(
      (prev, curr) => (!prev || curr.skippedCount > prev.skippedCount ? curr : prev),
      null,
    ) ?? null

  const longestSong =
    songs.reduce<LibrarySong | null>(
      (prev, curr) => (!prev || curr.duration > prev.duration ? curr : prev),
      null,
    ) ?? null

  const mostRecentlyAdded =
    songs.reduce<LibrarySong | null>(
      (prev, curr) => (!prev || curr.dateAdded > prev.dateAdded ? curr : prev),
      null,
    ) ?? null

  const highestRatedSongs = songs
    .filter((s) => s.rating > 0)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3)

  const personality = computePersonality(songs, topGenres, totalPlays)

  const yearMap = new Map<number, number>()
  for (const song of songs) {
    const y = song.dateAdded.getFullYear()
    yearMap.set(y, (yearMap.get(y) ?? 0) + 1)
  }
  const songsByYear = [...yearMap.entries()]
    .sort(([a], [b]) => a - b)
    .map(([year, count]) => ({ year, count }))

  const monthMap = new Map<string, number>()
  for (const song of songs) {
    const y = song.dateAdded.getFullYear()
    const m = song.dateAdded.getMonth()
    const key = `${y}-${String(m).padStart(2, '0')}`
    monthMap.set(key, (monthMap.get(key) ?? 0) + 1)
  }
  const songsByMonth = [...monthMap.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, count]) => {
      const [year, month] = key.split('-')
      return { year: Number(year), month: Number(month), count }
    })

  const yearlyRecaps = computeYearlyRecaps(songs)
  const availableYears = yearlyRecaps.map((r) => r.year).sort((a, b) => b - a)

  return {
    totalSongs,
    totalArtists,
    totalAlbums,
    totalListeningHours,
    totalPlays,
    totalSkips,
    libraryAgeYears,
    topSongs,
    topArtists,
    topAlbums,
    topGenres,
    mostSkippedSong,
    longestSong,
    mostRecentlyAdded,
    highestRatedSongs,
    personality,
    songsByYear,
    songsByMonth,
    yearlyRecaps,
    availableYears,
  }
}

function computeYearlyRecaps(songs: LibrarySong[]): YearlyRecap[] {
  const years = new Set<number>()
  for (const song of songs) {
    years.add(song.dateAdded.getFullYear())
    if (song.playedDate && song.playedCount > 0) {
      years.add(song.playedDate.getFullYear())
    }
  }

  return [...years].sort().map((year) => {
    const addedThisYear = songs.filter((s) => s.dateAdded.getFullYear() === year)
    const activeThisYear = songs.filter(
      (s) => s.playedDate && s.playedCount > 0 && s.playedDate.getFullYear() === year,
    )

    const newArtistSet = new Set<string>()
    for (const song of addedThisYear) {
      if (!song.artist) continue
      const earliestForArtist = songs
        .filter((s) => s.artist === song.artist)
        .sort((a, b) => a.dateAdded.getTime() - b.dateAdded.getTime())[0]
      if (earliestForArtist.dateAdded.getFullYear() === year) {
        newArtistSet.add(song.artist)
      }
    }

    const topNewSong =
      [...addedThisYear].sort((a, b) => b.playedCount - a.playedCount)[0] ?? null

    const genreCount = new Map<string, number>()
    for (const s of addedThisYear) {
      if (s.genre) genreCount.set(s.genre, (genreCount.get(s.genre) ?? 0) + 1)
    }
    const topGenre =
      [...genreCount.entries()].sort(([, a], [, b]) => b - a)[0]?.[0] ?? null

    const librarySize = songs.filter((s) => s.dateAdded.getFullYear() <= year).length
    const librarySizePrev = songs.filter((s) => s.dateAdded.getFullYear() < year).length

    const personality = computePersonality(
      addedThisYear,
      [...genreCount.entries()]
        .sort(([, a], [, b]) => b - a)
        .map(([genre, count]) => ({ genre, count, totalPlays: 0, percentage: 0 })),
      addedThisYear.reduce((a, s) => a + s.playedCount, 0),
    )

    const topSongs: RankedSong[] = [...activeThisYear]
      .sort((a, b) => b.playedCount - a.playedCount)
      .slice(0, 5)
      .map((song, i) => ({ song, artworkUrl: null, rank: i + 1 }))

    const artistMap = new Map<string, { songs: LibrarySong[]; totalPlays: number }>()
    for (const song of activeThisYear) {
      if (!song.artist) continue
      const entry = artistMap.get(song.artist) ?? { songs: [], totalPlays: 0 }
      entry.songs.push(song)
      entry.totalPlays += song.playedCount
      artistMap.set(song.artist, entry)
    }
    const topArtists: RankedArtist[] = [...artistMap.entries()]
      .filter(([, v]) => v.totalPlays > 0)
      .sort(([, a], [, b]) => b.totalPlays - a.totalPlays)
      .slice(0, 5)
      .map(([artist, { songs: as_, totalPlays }], i) => {
        const topSong = [...as_].sort((a, b) => b.playedCount - a.playedCount)[0]
        return { artist, totalPlays, topSong, artworkUrl: null, rank: i + 1 }
      })

    return {
      year,
      songsAdded: addedThisYear.length,
      newArtists: newArtistSet.size,
      topNewSong,
      topGenre,
      librarySize,
      librarySizePrev,
      activeSongs: activeThisYear.length,
      personality,
      topSongs,
      topArtists,
    }
  })
}

function computePersonality(
  songs: LibrarySong[],
  topGenres: RankedGenre[],
  totalPlays: number,
): PersonalityResult {
  const avgPlays = totalPlays / Math.max(songs.length, 1)
  const skipRate =
    songs.reduce((a, s) => a + s.skippedCount, 0) / Math.max(totalPlays + 1, 1)
  const genreCount = topGenres.length

  if (skipRate > 0.3)
    return {
      archetype: 'The Curator',
      emoji: '🎯',
      description: 'Picky but passionate — you know exactly what you like.',
    }
  if (avgPlays > 20)
    return {
      archetype: 'The Loyalist',
      emoji: '🔁',
      description: 'You find a song you love and play it on repeat.',
    }
  if (genreCount >= 4)
    return {
      archetype: 'The Explorer',
      emoji: '🌍',
      description: 'Your taste spans continents — always chasing new sounds.',
    }
  if (genreCount <= 1)
    return {
      archetype: 'The Purist',
      emoji: '🎸',
      description: 'Dedicated to your genre. You know what you want.',
    }
  return {
    archetype: 'The Archaeologist',
    emoji: '🔍',
    description: 'Deep cuts and hidden gems — you dig for the good stuff.',
  }
}

function emptyStats(): RecapStats {
  return {
    totalSongs: 0,
    totalArtists: 0,
    totalAlbums: 0,
    totalListeningHours: 0,
    totalPlays: 0,
    totalSkips: 0,
    libraryAgeYears: 0,
    topSongs: [],
    topArtists: [],
    topAlbums: [],
    topGenres: [],
    mostSkippedSong: null,
    longestSong: null,
    mostRecentlyAdded: null,
    highestRatedSongs: [],
    personality: {
      archetype: 'The Newcomer',
      emoji: '🎵',
      description: 'Your library is just getting started!',
    },
    songsByYear: [],
    songsByMonth: [],
    yearlyRecaps: [],
    availableYears: [],
  }
}
