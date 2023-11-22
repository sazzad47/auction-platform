import { useEffect, useState, useRef, useCallback, RefCallback } from 'react';
import { ItemData } from '../models/item';
import { fetchData } from '../utils/fetchData';
import api from '../config/api.json';
import { createToast } from '../utils/toast';
import { useAppSelector } from '../redux/hooks';

interface FetchDataResult {
    data: ItemData[];
    loading: boolean;
    hasMore: boolean;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    setData: React.Dispatch<React.SetStateAction<ItemData[]>>;
    lastItemRef: RefCallback<HTMLDivElement>;
}

const useFetchItems = (sold = false, limit = 9): FetchDataResult => {
    const observer = useRef<IntersectionObserver | null>(null);

    const [data, setData] = useState<ItemData[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);

    const auth = useAppSelector((state) => state.auth);

    const lastItemRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (page === 1 || loading || !hasMore) return;

            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting && hasMore) {
                        setPage((prevPageNumber) => prevPageNumber + 1);
                    }
                },
                { threshold: 0.8 },
            );

            if (node) observer.current.observe(node);
        },
        [loading, hasMore],
    );

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

                    setHasMore(response?.data?.data?.remainingItems > 0);
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

    return { data, loading, hasMore, setPage, setData, lastItemRef };
};

export default useFetchItems;
