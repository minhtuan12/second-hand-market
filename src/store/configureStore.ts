import { configureStore } from '@reduxjs/toolkit'
import allReducers from "@/store/allReducers";

export const store = configureStore({
    reducer: allReducers,
    devTools: true
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
