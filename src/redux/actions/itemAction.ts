import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData, postData } from '../../utils/fetchApi';
import api from '../../config/api.json';
import { createToast } from '../../utils/toast';
import { showLoader } from '../../utils/helper';
import Swal from 'sweetalert2';
import { validateItemData } from '../../utils/validations/validateItemData';
import { ItemData } from '../../models/item';
import { setItem } from '../reducers/itemReducer';

interface CreateItemArgs {
    data: ItemData;
    token: string;
}

export const createItem = createAsyncThunk('item/create', async ({ data, token }: CreateItemArgs) => {
    const errMsg = validateItemData({ data });
    if (errMsg) {
        return createToast(errMsg, { type: 'error' });
    }
    try {
        showLoader('Creating...');
        const res = await postData(api.item.create, data, token);

        Swal.close();
        createToast(res.data.message, { type: 'success' });
    } catch (err: any) {
        createToast(err.response.data.message, { type: 'error' });
    }
});

export const fetchItems = createAsyncThunk('item/create', async (token: string, { dispatch }) => {
    try {
        showLoader('Creating...');
        const res = await fetchData(api.item.getAll, token);
        console.log('res', res);
        dispatch(setItem(res.data.data.items));

        Swal.close();
        createToast(res.data.message, { type: 'success' });
    } catch (err: any) {
        createToast(err.response.data.message, { type: 'error' });
    }
});
