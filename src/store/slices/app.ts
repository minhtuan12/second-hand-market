import {createSlice, Slice} from "@reduxjs/toolkit";

const appSlice: Slice = createSlice({
    name: 'app',
    initialState: {
        breadcrumb: [],
        pageTitle: '',
        regions: [],

    },
    reducers: {
        setBreadcrumb: (state, action: {payload: any, type: string}) => ({
            ...state,
            breadcrumb: action.payload
        }),
        setPageTitle: (state, action: {payload: any, type: string}) => ({
            ...state,
            pageTitle: action.payload
        }),
        setRegions: (state, action: {payload: any, type: string}) => ({
            ...state,
            regions: action.payload
        })
    }
})

export const {
    setBreadcrumb, setPageTitle, setRegions
} = appSlice.actions

export default appSlice.reducer;
