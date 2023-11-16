import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';

export const globalSlice = createSlice({
    name: 'globalSlice',
    initialState,

    reducers: {
        setLoading: (state, actions) => {
            state.loading = actions.payload;
        },
    },
});

export const { setLoading } = globalSlice.actions;

export default globalSlice.reducer;
