import { createSlice } from '@reduxjs/toolkit'
// import { USER_STORAGE_KEY } from '../const/Variables'

const currentUserSlice = createSlice({
    name: 'user',
    initialState: {
        // currentUser: JSON.parse(localStorage.getItem(USER_STORAGE_KEY)) || null,
        currentUser: false,
    },
    reducers: {
        // login: (state, action) => {
        //     state.currentUser = action.payload
        // },
        // logout: (state) => {
        //     state.currentUser = null
        // },
        // saveUserLocal: (state) => {
        //     localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(state.currentUser))
        // },
    },
})
export default currentUserSlice
