import { app, shell, BrowserWindow, ipcMain, nativeImage } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { IPC } from '../shared/ipc'
import { fetchLibraryData } from './library'
import icon from '../../resources/icon.png?asset'

let mainWindow: BrowserWindow | null = null

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 560,
    height: 820,
    resizable: false,
    show: false,
    backgroundColor: '#0a0a0a',
    autoHideMenuBar: true,
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: true,
      nodeIntegration: false,
    },
    icon: icon,
  })

  mainWindow.on('ready-to-show', () => mainWindow!.show())

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

function send(channel: string, payload?: unknown): void {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send(channel, payload)
  }
}

ipcMain.on(IPC.LIBRARY_LOAD, () => {
  runLibraryPipeline().catch((err) => {
    send(IPC.LIBRARY_ERROR, { message: err instanceof Error ? err.message : String(err) })
  })
})

async function runLibraryPipeline(): Promise<void> {
  send(IPC.LIBRARY_PROGRESS, { stage: 'querying' })
  const { songs, error } = await fetchLibraryData()
  if (error) {
    send(IPC.LIBRARY_ERROR, { message: error })
    return
  }
  send(IPC.LIBRARY_PROGRESS, { stage: 'aggregating' })
  send(IPC.LIBRARY_SONGS, { songs })
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.sithija.apple-music-recap')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  if (process.platform === 'darwin') {
    app.dock.setIcon(nativeImage.createFromPath(icon))
  }

  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
