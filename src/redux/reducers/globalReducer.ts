import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface GlobalState {
    loading: boolean;
}

const initialGlobalState: GlobalState = {
    loading: true,
};

const globalReducer = createSlice({
    name: 'global',
    initialState: initialGlobalState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    },
});

export const { setLoading } = globalReducer.actions;
export default globalReducer.reducer;
