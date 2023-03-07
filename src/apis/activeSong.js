import {app, BrowserWindow, dialog, ipcMain} from 'electron'
import path from 'path'
import Track from '../model/Track'

const MUSIC_FILTER = {
    name: 'Music',
    extensions: ['mp3']
}

async function processTrackResult(res) {
    if (!res.canceled) {
        const {getAudioDurationInSeconds} = __non_webpack_require__('get-audio-duration')
        const ffprobePath = __non_webpack_require__('@ffprobe-installer/ffprobe').path.replace(
            'app.asar',
            'app.asar.unpacked'
        )

        const filePath = res.filePaths[0]
        const name = path.basename(filePath, path.extname(filePath))
        const duration = await getAudioDurationInSeconds(filePath, ffprobePath)
        return new Track(name, filePath, duration)
    }
    // Returns undefined on cancel
}

async function promptOpenTrack() {
    const res = await dialog.showOpenDialog(BrowserWindow.getFocusedWindow(), {
        buttonLabel: 'Add',
        filters: [MUSIC_FILTER],
    })
    return await processTrackResult(res)
}
async function promptUpdateTrack(_, id) {
    const res = await dialog.showOpenDialog(BrowserWindow.getFocusedWindow(), {
        buttonLabel: 'Select',
        filters: [MUSIC_FILTER],
    })

    const track = await processTrackResult(res)
    if (track) {
        track.id = id
    }
    return track
}


app.whenReady().then(() => {
    ipcMain.handle('activeSong:promptOpenTrack', promptOpenTrack)
    ipcMain.handle('activeSong:promptUpdateTrack', promptUpdateTrack)
})