import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ItemData } from '../../models/item';

interface ItemState {
    data: ItemData[];
    loading: boolean;
    hasMore: boolean;
}

const initialItemState: ItemState = {
    data: [],
    loading: true,
    hasMore: true,
};

const itemReducer = createSlice({
    name: 'item',
    initialState: initialItemState,
    reducers: {
        setItem: (state, action: PayloadAction<ItemData[]>) => {
            state.data = action.payload;
        },
        setItemLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setItemHasMore: (state, action: PayloadAction<boolean>) => {
            state.hasMore = action.payload;
        },
    },
});

export const { setItem, setItemLoading, setItemHasMore } = itemReducer.actions;
export default itemReducer.reducer;
