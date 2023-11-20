import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DepositData } from '../../models/deposit';

interface DepositState {
    amount: DepositData['amount'];
}

const initialDepositState: DepositState = {
    amount: 0,
};

const depositReducer = createSlice({
    name: 'deposit',
    initialState: initialDepositState,
    reducers: {
        setDeposit: (state, action: PayloadAction<number>) => {
            state.amount = action.payload;
        },
    },
});

export const { setDeposit } = depositReducer.actions;
export default depositReducer.reducer;
