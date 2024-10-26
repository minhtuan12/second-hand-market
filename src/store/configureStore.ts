import { configureStore } from '@reduxjs/toolkit'
import rootReducer from "@/store/rootReducer";

export const store = configureStore({
    reducer: rootReducer,
    devTools: true
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
