import { useEffect, useState } from 'react'
import { aggregateStats } from '../lib/stats'
import type { LibrarySong, LoadingState } from '../lib/types'

declare global {
  interface Window {
    electronAPI: {
      loadLibrary: () => void
      onProgress: (cb: (p: { stage: string }) => void) => () => void
      onSongs: (cb: (p: { songs: unknown[] }) => void) => () => void
      onError: (cb: (p: { message: string }) => void) => () => void
    }
  }
}

function reviveSong(raw: unknown): LibrarySong {
  const r = raw as Record<string, unknown>
  return {
    index: Number(r.index) || 0,
    name: String(r.name ?? ''),
    artist: String(r.artist ?? ''),
    album: String(r.album ?? ''),
    genre: String(r.genre ?? ''),
    playedCount: Number(r.playedCount) || 0,
    duration: Number(r.duration) || 0,
    dateAdded: r.dateAdded ? new Date(r.dateAdded as string) : new Date(0),
    playedDate: r.playedDate ? new Date(r.playedDate as string) : null,
    rating: Number(r.rating) || 0,
    skippedCount: Number(r.skippedCount) || 0,
  }
}

export function useLibraryData(): LoadingState {
  const [state, setState] = useState<LoadingState>({ stage: 'idle' })

  useEffect(() => {
    const cleanups: (() => void)[] = []

    cleanups.push(window.electronAPI.onProgress(({ stage }) => {
      setState({ stage: stage as 'querying' | 'aggregating' })
    }))

    cleanups.push(window.electronAPI.onSongs(({ songs }) => {
      const stats = aggregateStats((songs as unknown[]).map(reviveSong))
      setState({ stage: 'ready', stats })
    }))

    cleanups.push(window.electronAPI.onError(({ message }) => {
      setState({ stage: 'error', message })
    }))

    window.electronAPI.loadLibrary()

    return () => cleanups.forEach((fn) => fn())
  }, [])

  return state
}
