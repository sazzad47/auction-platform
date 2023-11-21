import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ItemData } from '../../models/item';

interface ItemState {
    data: ItemData[];
}

const initialItemState: ItemState = {
    data: [],
};

const itemReducer = createSlice({
    name: 'item',
    initialState: initialItemState,
    reducers: {
        setItem: (state, action: PayloadAction<ItemData[]>) => {
            state.data = action.payload;
        },
    },
});

export const { setItem } = itemReducer.actions;
export default itemReducer.reducer;
