import { createAsyncThunk } from '@reduxjs/toolkit';
import { postData } from '../../utils/fetchApi';
import { validateRegisterData } from '../../utils/validations/validateRegisterData';
import { RegisterData, SignupResponse } from '../../models/register';
import api from '../../config/api.json';
import { setUser } from '../reducers/authReducer';
import { createToast } from '../../utils/toast';
import { showLoader } from '../../utils/helper';
import Swal from 'sweetalert2';
import { LoginData } from '../../models/login';
import { validateLoginData } from '../../utils/validations/validateLoginData';
import { setLoading } from '../reducers/globalReducer';
import { setDeposit } from '../reducers/depositReducer';

export const register = createAsyncThunk('auth/register', async (data: RegisterData, { dispatch }) => {
    const errMsg = validateRegisterData({ data });
    if (errMsg) {
        return createToast(errMsg, { type: 'error' });
    }
    try {
        showLoader('Registering...');
        const res: SignupResponse = await postData(api.auth.registration, data);

        localStorage.setItem('firstLogin', 'true');

        dispatch(setUser({ token: res.data.data.token, user: res.data.data.user }));

        Swal.close();
        createToast(res.data.message, { type: 'success' });
    } catch (err: any) {
        createToast(err.response.data.message, { type: 'error' });
    }
});

export const login = createAsyncThunk('auth/login', async (data: LoginData, { dispatch }) => {
    const errMsg = validateLoginData({ data });
    if (errMsg) {
        return createToast(errMsg, { type: 'error' });
    }
    try {
        showLoader('Signing in...');
        const res = await postData(api.auth.login, data);

        localStorage.setItem('firstLogin', 'true');

        dispatch(setUser({ token: res.data.token, user: res.data.user }));

        Swal.close();
    } catch (err: any) {
        createToast(err.response.data.message, { type: 'error' });
    }
});

export const getAccessToken = createAsyncThunk('auth/accessToken', async (_, { dispatch }) => {
    const firstLogin = localStorage.getItem('firstLogin');
    if (firstLogin) {
        try {
            const res = await postData(api.auth.accessToken);

            dispatch(setUser({ token: res.data.data.token, user: res.data.data.user }));
            dispatch(setDeposit(res.data.data.user.deposit.amount));

            dispatch(setLoading(false));
        } catch (err: any) {
            createToast(err.response.data.message, { type: 'error' });
            dispatch(setLoading(false));
        }
    } else {
        dispatch(setLoading(false));
    }
});

export const logout = createAsyncThunk('auth/logout', async () => {
    try {
        showLoader('Logging out...');
        localStorage.removeItem('firstLogin');
        await postData(api.auth.logout);
        Swal.close();
        window.location.href = '/';
    } catch (err: any) {
        createToast(err.response.data.message, { type: 'error' });
    }
});
