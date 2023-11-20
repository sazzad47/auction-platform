import { createAsyncThunk } from '@reduxjs/toolkit';
import { postData } from '../../utils/fetchApi';
import api from '../../config/api.json';
import { createToast } from '../../utils/toast';
import { showLoader } from '../../utils/helper';
import Swal from 'sweetalert2';
import { DepositData } from '../../models/deposit';
import { setDeposit } from '../reducers/depositReducer';

interface CreateDepositArgs {
    data: DepositData;
    token: string;
}

export const createDeposit = createAsyncThunk(
    'deposit/create',
    async ({ data, token }: CreateDepositArgs, { dispatch }) => {
        try {
            showLoader('Creating...');
            const res = await postData(api.deposit.create, data, token);

            dispatch(setDeposit(res.data.data.amount));

            Swal.close();
            createToast(res.data.message, { type: 'success' });
        } catch (err: any) {
            createToast(err.response.data.message, { type: 'error' });
        }
    },
);
