import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type UserData = {
    id: string;
    email: string;
};

interface AuthState {
    token: string;
    user: UserData | null;
}

const initialAuthState: AuthState = {
    token: '',
    user: null,
};

const authReducer = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        setUser: (state, action: PayloadAction<AuthState>) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
    },
});

export const { setUser } = authReducer.actions;
export default authReducer.reducer;
