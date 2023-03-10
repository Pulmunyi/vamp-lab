import React, {useEffect} from 'react'

import { useRootReducer } from './RootReducer'
import Project from '../model/Project'

export const StoreContext = React.createContext({})

const initialState = {
    activeProject: new Project(),
    activeSongId: '',
    editingSong: false,
    devices: {},
}

const StoreProvider = (props) => {
    const [state, dispatch, inits] = useRootReducer(initialState)

    useEffect(() => {
        inits.forEach(init => init(dispatch))
    }, [])

    const context = { state, dispatch }

    return <StoreContext.Provider value={context}>{props.children}</StoreContext.Provider>
}

export default StoreProvider
