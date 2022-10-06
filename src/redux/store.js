import { configureStore } from '@reduxjs/toolkit'
import currentUserSlice from './currentUserSlice'
import currentVideoPlayingSlice from './currentVideoPlayingSlice'
import volumeVideoSlice from './volumeVideoSlice'

const store = configureStore({
    reducer: {
        volumeVideo: volumeVideoSlice.reducer,
        user: currentUserSlice.reducer,
        currentVideoPlaying: currentVideoPlayingSlice.reducer,
    },
})
export default store
