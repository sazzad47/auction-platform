import { createAsyncThunk } from '@reduxjs/toolkit';
import { postData } from '../../utils/fetchApi';
import { validateRegisterData } from '../../utils/validations/validateRegisterData';
import { RegisterData, SignupResponse } from '../../models/register';
import api from '../../config/api.json';
import { setUser } from '../reducers/authReducer';
import { createToast } from '../../utils/toast';
import { showLoader } from '../../utils/helper';
import Swal from 'sweetalert2';
import loginResponse, { LoginData } from '../../models/login';
import { validateLoginData } from '../../utils/validations/validateLoginData';

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
        console.log('res.data.data.token', res.data.data.token);
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
        const res: loginResponse = await postData(api.auth.login, data);

        localStorage.setItem('firstLogin', 'true');

        dispatch(setUser({ token: res.data.token, user: res.data.user }));
        Swal.close();
    } catch (err: any) {
        console.log('erro', err);
        createToast(err.response.data.message, { type: 'error' });
    }
});
