import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';

export const authSlice = createSlice({
    name: 'authSlice',
    initialState,

    reducers: {
        setToken: (state, actions) => {
            state.token = actions.payload;
        },
        setUserInfo(state, actions) {
            state.userInfo = actions.payload;
        },
    },
});

export const { setToken, setUserInfo } = authSlice.actions;

export default authSlice.reducer;
