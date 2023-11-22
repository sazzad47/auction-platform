import { createAsyncThunk } from '@reduxjs/toolkit';
import { postData } from '../../utils/fetchData';
import api from '../../config/api.json';
import { createToast } from '../../utils/toast';
import { showLoader } from '../../utils/helper';
import Swal from 'sweetalert2';
import { BidData } from '../../models/bid';
import { validateBidData } from '../../utils/validations/validateBidData';

interface CreateBidArgs {
    data: BidData;
    token: string;
}

export const createBid = createAsyncThunk('bid/create', async ({ data, token }: CreateBidArgs) => {
    const errMsg = validateBidData({ data });
    if (errMsg) {
        return createToast(errMsg, { type: 'error' });
    }
    try {
        showLoader('Bidding...');
        console.log('data', data);
        const res = await postData(api.bid.create, data, token);
        console.log('res', res);
        Swal.close();
        createToast(res.data.message, { type: 'success' });
    } catch (err: any) {
        createToast(err.response.data.message, { type: 'error' });
    }
});
