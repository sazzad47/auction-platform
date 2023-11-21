import { useEffect, useCallback } from 'react';
import { ItemData } from '../models/item';
import { fetchData } from '../utils/fetchApi';
import api from '../config/api.json';
import { createToast } from '../utils/toast';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setItem, setItemHasMore, setItemLoading } from '../redux/reducers/itemReducer';

interface FetchDataResult {
    data: ItemData[] | null;
    hasMore: boolean;
    loading: boolean;
}

const useFetchItems = (sold = false, page = 1, limit = 6): FetchDataResult => {
    const dispatch = useAppDispatch();

    const auth = useAppSelector((state) => state.auth);
    const items = useAppSelector((state) => state.items);

    const { data, loading, hasMore } = items;

    const abortController = new AbortController();
    const { signal } = abortController;

    // Fetch data from the API
    const fetchItems = useCallback(async () => {
        try {
            dispatch(setItemLoading(true));

            const response = await fetchData(
                `${api.item.getAll}?sold=${sold}&page=${page}&limit=${limit}`,
                auth.token,
                signal,
            );

            const newData = response?.data?.data?.items || [];

            if (data.length === 0 || page === 1) {
                dispatch(setItem(newData));
            } else {
                const mergedData = [...data, ...newData];
                const uniqueData = mergedData.filter(
                    (item, index, self) => self.findIndex((i) => i._id === item._id) === index,
                );
                dispatch(setItem(uniqueData));
            }

            dispatch(setItemHasMore(data?.length < response?.data?.data?.totalCount));
        } catch (error) {
            createToast('An error occurred while fetching data.');
        } finally {
            dispatch(setItemLoading(false));
        }
    }, [sold, page, limit, signal]);

    useEffect(() => {
        fetchItems();

        return () => {
            if (!abortController.signal.aborted) {
                abortController.abort();
            }
        };
    }, []);

    return { data, hasMore, loading };
};

export default useFetchItems;
