import { useEffect, useState } from 'react';
import { ItemData } from '../models/item';
import { fetchData } from '../utils/fetchApi';
import api from '../config/api.json';
import { createToast } from '../utils/toast';
import { useAppSelector } from '../redux/hooks';

interface FetchDataResult {
    data: ItemData[];
    hasMore: boolean;
    loading: boolean;
}

const useFetchItems = (sold = false, page = 1, limit = 5): FetchDataResult => {
    const [data, setData] = useState<ItemData[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(true);

    const auth = useAppSelector((state) => state.auth);

    useEffect(() => {
        let isMounted = true;
        const abortController = new AbortController();

        const fetchItems = async () => {
            try {
                setLoading(true);

                const response = await fetchData(
                    `${api.item.getAll}?sold=${sold}&page=${page}&limit=${limit}`,
                    auth.token,
                    abortController.signal,
                );

                const newData = response?.data?.data?.items || [];

                if (isMounted) {
                    setData((prevData: ItemData[]) => {
                        if (prevData.length === 0 || page === 1) {
                            return newData;
                        } else {
                            const mergedData = [...prevData, ...newData];
                            const uniqueData = mergedData.filter(
                                (item, index, self) => self.findIndex((i) => i._id === item._id) === index,
                            );
                            return uniqueData;
                        }
                    });

                    setHasMore(data.length < response?.data?.data?.totalCount);
                }
            } catch (error) {
                createToast('An error occurred while fetching data.');
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
                abortController.abort();
            }
        };

        fetchItems();

        return () => {
            isMounted = false;
        };
    }, [sold, page, limit, auth.token]);

    return { data, hasMore, loading };
};

export default useFetchItems;
