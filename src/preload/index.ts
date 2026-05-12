import { contextBridge, ipcRenderer } from 'electron'
import { IPC } from '../shared/ipc'

contextBridge.exposeInMainWorld('electronAPI', {
  loadLibrary: () => ipcRenderer.send(IPC.LIBRARY_LOAD),

  onProgress: (cb: (payload: { stage: string }) => void) => {
    const handler = (_: Electron.IpcRendererEvent, payload: { stage: string }) => cb(payload)
    ipcRenderer.on(IPC.LIBRARY_PROGRESS, handler)
    return () => ipcRenderer.removeListener(IPC.LIBRARY_PROGRESS, handler)
  },

  onSongs: (cb: (payload: { songs: unknown[] }) => void) => {
    const handler = (_: Electron.IpcRendererEvent, payload: { songs: unknown[] }) => cb(payload)
    ipcRenderer.on(IPC.LIBRARY_SONGS, handler)
    return () => ipcRenderer.removeListener(IPC.LIBRARY_SONGS, handler)
  },

  onError: (cb: (payload: { message: string }) => void) => {
    const handler = (_: Electron.IpcRendererEvent, payload: { message: string }) => cb(payload)
    ipcRenderer.on(IPC.LIBRARY_ERROR, handler)
    return () => ipcRenderer.removeListener(IPC.LIBRARY_ERROR, handler)
  },
})
