import { execFile } from 'child_process'
import { promisify } from 'util'

const execFileAsync = promisify(execFile)

const SEP = '\x1f'
const ROW = '\x1e'

const FETCH_SCRIPT = `
tell application "Music"
  set lib to library playlist 1
  set S to (ASCII character 31)
  set R to (ASCII character 30)

  set ns   to name         of every track of lib
  set as_  to artist       of every track of lib
  set abs  to album        of every track of lib
  set pcs  to played count of every track of lib
  set durs to duration     of every track of lib
  set das  to date added   of every track of lib
  set gens to genre        of every track of lib
  set rats to rating       of every track of lib
  set sks  to skipped count of every track of lib

  set pds to {}
  set tks to every track of lib
  repeat with t in tks
    try
      set end of pds to (played date of t as string)
    on error
      set end of pds to "-"
    end try
  end repeat

  set AppleScript's text item delimiters to S
  set r1  to (ns   as string)
  set r2  to (as_  as string)
  set r3  to (abs  as string)
  set r4  to (pcs  as string)
  set r5  to (durs as string)
  set r6  to (das  as string)
  set r7  to (gens as string)
  set r8  to (rats as string)
  set r9  to (sks  as string)
  set r10 to (pds  as string)
  set AppleScript's text item delimiters to ""

  return r1 & R & r2 & R & r3 & R & r4 & R & r5 & R & r6 & R & r7 & R & r8 & R & r9 & R & r10
end tell
`

export interface LibrarySongRaw {
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

function parseAppleScriptDate(s: string): Date | null {
  if (!s || s === '-') return null

  const ukMatch = s.match(/(\d{1,2})\s+(\w+)\s+(\d{4})\s+at\s+(\d{1,2}):(\d{2}):(\d{2})/)
  if (ukMatch) {
    const d = new Date(`${ukMatch[2]} ${ukMatch[1]} ${ukMatch[3]} ${ukMatch[4]}:${ukMatch[5]}:${ukMatch[6]}`)
    if (!isNaN(d.getTime())) return d
  }

  const usMatch = s.match(/(\w+)\s+(\d{1,2}),?\s+(\d{4})\s+at\s+(\d{1,2}):(\d{2}):(\d{2})(?:\s*(AM|PM))?/i)
  if (usMatch) {
    let hour = parseInt(usMatch[4], 10)
    if (usMatch[7]?.toUpperCase() === 'PM' && hour < 12) hour += 12
    if (usMatch[7]?.toUpperCase() === 'AM' && hour === 12) hour = 0
    const d = new Date(`${usMatch[1]} ${usMatch[2]} ${usMatch[3]} ${hour}:${usMatch[5]}:${usMatch[6]}`)
    if (!isNaN(d.getTime())) return d
  }

  const fallback = new Date(s)
  return isNaN(fallback.getTime()) ? null : fallback
}

export async function fetchLibraryData(): Promise<{ songs: LibrarySongRaw[]; error?: string }> {
  try {
    const { stdout, stderr } = await execFileAsync('/usr/bin/osascript', ['-e', FETCH_SCRIPT], {
      maxBuffer: 50 * 1024 * 1024,
    })

    if (stderr?.includes('not allowed to send Apple events')) {
      return { songs: [], error: 'permission_denied' }
    }

    const rows = stdout.trim().split(ROW)
    if (rows.length < 10) {
      return { songs: [], error: 'parse_error: expected 10 rows, got ' + rows.length }
    }

    const cols = rows.map((r) => r.split(SEP))
    const [names, artists, albums, plays, durations, added, genres, ratings, skips, playDates] =
      cols

    const count = names.length
    const songs: LibrarySongRaw[] = []

    for (let i = 0; i < count; i++) {
      songs.push({
        index: i + 1,
        name: names[i] ?? '',
        artist: artists[i] ?? '',
        album: albums[i] ?? '',
        genre: genres[i] ?? '',
        playedCount: parseInt(plays[i] ?? '0', 10) || 0,
        duration: parseFloat(durations[i] ?? '0') || 0,
        dateAdded: parseAppleScriptDate(added[i] ?? '') ?? new Date(0),
        playedDate: parseAppleScriptDate(playDates[i] ?? ''),
        rating: parseInt(ratings[i] ?? '0', 10) || 0,
        skippedCount: parseInt(skips[i] ?? '0', 10) || 0,
      })
    }

    return { songs }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    if (msg.includes('not allowed to send Apple events') || msg.includes('-1743')) {
      return { songs: [], error: 'permission_denied' }
    }
    return { songs: [], error: msg }
  }
}

