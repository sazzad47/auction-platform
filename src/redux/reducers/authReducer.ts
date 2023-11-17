import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type UserData = {
    id: string;
    email: string;
};

interface AuthState {
    token: string | null;
    user: UserData | null;
}

const initialAuthState: AuthState = {
    token: null,
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        setUser: (state, action: PayloadAction<AuthState>) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
    },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
