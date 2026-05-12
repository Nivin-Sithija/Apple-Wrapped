export const IPC = {
  LIBRARY_LOAD: 'library:load',
  LIBRARY_PROGRESS: 'library:progress',
  LIBRARY_SONGS: 'library:songs',
  LIBRARY_ERROR: 'library:error',
} as const

export type IpcChannel = (typeof IPC)[keyof typeof IPC]
