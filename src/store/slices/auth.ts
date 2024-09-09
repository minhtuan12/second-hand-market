import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthSuccess: false,
        authUser: {},
        errorLogin: {
            email: '',
            password: ''
        },
        errorRegister: {
            firstname: '',
            lastname: '',
            email: '',
            password: ''
        }
    },
    reducers: {
        setAuthUser: (state, action) => ({
            ...state,
            authUser: action.payload
        }),
        setErrorLogin: (state, action) => ({
            ...state,
            errorLogin: action.payload
        }),
        setErrorRegister: (state, action) => ({
            ...state,
            errorRegister: action.payload
        })
    }
})

export const {
    setErrorLogin, setErrorRegister,
    setAuthUser
} = authSlice.actions

export default authSlice.reducer;
