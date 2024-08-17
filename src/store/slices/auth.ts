import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthSuccess: false,
        authUser: {},
    },
    reducers: {
        setAuthUser: (state, action) => ({
            ...state,
            authUser: action.payload
        })
    }
})

export const {
    setAuthUser
} = authSlice.actions

export default authSlice.reducer;
