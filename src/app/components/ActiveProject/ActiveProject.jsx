import React, {useContext} from 'react'
import './ActiveProject.css'
import { StoreContext } from '../../StoreContext'
import {useNavigate} from 'react-router-dom'
import {ADD_SONG_TO_ACTIVE_PROJECT, REMOVE_SONG_FROM_ACTIVE_PROJECT} from './ActiveProjectReducer'
import Button from '../../../components/Button/Button'
import SongItem from './SongItem/SongItem'
import ChevronLeft from '../../../../resources/icons/chevronLeft.svg'

export default function ActiveProject() {
    const { state, dispatch } = useContext(StoreContext)
    const navigate = useNavigate()

    let addSong = async () => {
        let name = await window.activeProject.promptSongName()

        if (!!name && !!name.trim()) {
            dispatch({
                type: ADD_SONG_TO_ACTIVE_PROJECT,
                payload: name
            })
        }
    }

    let openSong = song => {

    }

    let deleteSong = song => {
        dispatch({
            type: REMOVE_SONG_FROM_ACTIVE_PROJECT,
            payload: song.name
        })
    }

    let songs = state.activeProject?.songs?.map(song => (
        <SongItem key={song.name} song={song}
                  onOpenClick={openSong} onDeleteClick={deleteSong} />
    )) ?? []

    return (
        <div className="Vamp-screen">
            <div className="Vamp-header">
                <div className="Vamp-header-pack">
                    <Button className="ActiveProject-back" transparent round
                            onClick={() => navigate(-1)} >
                        <ChevronLeft />
                    </Button>
                    <h3 className="Vamp-title">{state.activeProject.name} - Songs</h3>
                </div>
                <Button onClick={addSong}>
                    Add
                </Button>
            </div>
            <div className="Vamp-screen-list">
                {songs.length > 0 ? songs : <p className="Vamp-placeholder">This project's songs will appear here</p> }
            </div>
        </div>
    )
}