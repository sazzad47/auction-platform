import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './services/users/authApi';
import authSlice from './features/users/authSlice';
import globalSlice from './features/global/globalSlice';

export const store = configureStore({
    reducer: {
        authState: authSlice,
        globalSlice: globalSlice,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat([authApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
