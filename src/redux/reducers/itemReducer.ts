import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ItemData } from '../../models/item';

interface ItemState {
    item: ItemData[];
}

const initialItemState: ItemState = {
    item: [],
};

const itemReducer = createSlice({
    name: 'item',
    initialState: initialItemState,
    reducers: {
        setItem: (state, action: PayloadAction<ItemData>) => {
            state.item.push(action.payload);
        },
    },
});

export const { setItem } = itemReducer.actions;
export default itemReducer.reducer;
