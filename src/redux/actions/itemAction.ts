import { createAsyncThunk } from '@reduxjs/toolkit';
import { postData } from '../../utils/fetchApi';
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

export const createItem = createAsyncThunk('item/create', async ({ data, token }: CreateItemArgs, { dispatch }) => {
    const errMsg = validateItemData({ data });
    if (errMsg) {
        return createToast(errMsg, { type: 'error' });
    }
    try {
        showLoader('Creating...');
        const res = await postData(api.item.create, data, token);

        dispatch(setItem(res.data.data));

        Swal.close();
        createToast(res.data.message, { type: 'success' });
    } catch (err: any) {
        createToast(err.response.data.message, { type: 'error' });
    }
});
