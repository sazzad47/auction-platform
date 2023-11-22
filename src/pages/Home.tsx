import { useState } from 'react';
import { ItemData } from '../models/item';
import useFetchItems from '../hooks/useFetchItems';
import TableRow from '../components/home/TableRow';
import Table from '../components/home/Table';

const Home: React.FC = () => {
    const [sold, setSold] = useState<boolean>(false);

    const { data, hasMore, loading, setPage, setData, lastItemRef } = useFetchItems(sold);

    const handleFilter = (sold: boolean) => {
        setPage(1);
        setSold(sold);
        setData([]);
    };

    const tableHeads = ['Name', 'Current Price', 'Duration', 'Bid'];

    const renderRow = (item: ItemData, index: number) => (
        <TableRow key={item?._id} item={item} lastItemRef={lastItemRef} itemData={data} index={index} />
    );

    return (
        <div className="container py-4 mx-auto my-16 flex flex-col gap-16">
            <div className="w-full flex items-center justify-start gap-5">
                <button
                    type="button"
                    onClick={() => handleFilter(false)}
                    className={`py-3 px-4 rounded-full inline-flex items-center gap-x-2 text-sm font-semibold border border-transparent ${
                        !sold ? 'bg-red-100' : 'bg-transparent'
                    } text-red-800 hover:bg-red-200 disabled:opacity-50 disabled:pointer-events-none`}>
                    Ongoing
                </button>
                <button
                    type="button"
                    onClick={() => handleFilter(true)}
                    className={`py-3 px-4 rounded-full inline-flex items-center gap-x-2 text-sm font-semibold border border-transparent ${
                        sold ? 'bg-red-100' : 'bg-transparent'
                    } text-red-800 hover:bg-red-200 disabled:opacity-50 disabled:pointer-events-none`}>
                    Completed
                </button>
            </div>
            <Table data={data} loading={loading} tableHeads={tableHeads} renderRow={renderRow} />
            <div className="w-full flex items-center justify-center" ref={lastItemRef}>
                {hasMore ? <h3> Loading...</h3> : !loading && <h3> End of results </h3>}
            </div>
        </div>
    );
};

export default Home;
