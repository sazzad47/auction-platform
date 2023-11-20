import { ReactNode, useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchItems } from '../redux/actions/itemAction';
import { calculateCurrentPrice, formatPrice } from '../utils/helper';
import useCountdownTimer from '../hooks/useCountdownTimer';
import { ItemData } from '../models/item';
import { BidData } from '../models/bid';
import { createBid } from '../redux/actions/bidAction';

const Home: React.FC = () => {
    const dispatch = useAppDispatch();
    const auth = useAppSelector((state) => state.auth);
    const items = useAppSelector((state) => state.items);
    console.log('items', items.data);
    useEffect(() => {
        dispatch(fetchItems(auth.token));
    }, []);

    return (
        <div className="container py-4 mx-auto my-16 flex flex-col gap-16">
            <div className="w-full flex items-center justify-start gap-5">
                <button
                    type="button"
                    className="py-3 px-4 rounded-full inline-flex items-center gap-x-2 text-sm font-semibold border border-transparent bg-red-100 text-red-800 hover:bg-red-200 disabled:opacity-50 disabled:pointer-events-none">
                    Ongoing
                </button>
                <button
                    type="button"
                    className="py-3 px-4 rounded-full inline-flex items-center gap-x-2 text-sm font-semibold border border-transparent bg-transparent text-red-800 hover:bg-red-200 disabled:opacity-50 disabled:pointer-events-none">
                    Completed
                </button>
            </div>
            <Table />
        </div>
    );
};

const Table = () => {
    const items = useAppSelector((state) => state.items);

    return (
        <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                    <div className="border rounded-lg shadow overflow-hidden dark:border-gray-700 dark:shadow-gray-900">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                                        Current Price
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                                        Duration
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                                        Bid
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {items.data.map((item) => (
                                    <TableRow key={item._id} item={item} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

interface TableRowProps {
    item: ItemData;
}

const initState: BidData = {
    amount: 0,
};

const TableRow: React.FC<TableRowProps> = ({ item }) => {
    const dispatch = useAppDispatch();
    const remainingTime = useCountdownTimer(item.startTime, item.endTime);
    const auth = useAppSelector((state) => state.auth);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [data, setData] = useState<BidData>(initState);
    const { amount } = data;

    const currentPrice = calculateCurrentPrice(item);

    const hasBidOnItem = item.bids?.some((bid) => bid.bidder === auth.user?._id);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setData((prevData) => ({ ...prevData, [id]: value }));
    };

    const handleClose = () => {
        setData(initState);
        setIsModalOpen(false);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        dispatch(createBid({ data: { ...data, itemId: item._id }, token: auth.token }));
        setData(initState);
        setIsModalOpen(false);
    };

    return (
        <tr key={item._id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                {item.name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                {formatPrice(currentPrice)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{remainingTime}</td>
            <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                <button
                    type="button"
                    disabled={hasBidOnItem}
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                    {hasBidOnItem ? 'Submitted' : 'Bid'}
                </button>
            </td>
            <Modal isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <form onSubmit={handleSubmit} className="w-full">
                    <div className="w-full p-5 flex items-center justify-between">
                        <h3 className="text-3xl font-medium"> {item.name} </h3>
                        <IoMdClose className="text-2xl cursor-pointer" onClick={() => setIsModalOpen(false)} />
                    </div>
                    <hr />
                    <div className="p-5 flex flex-col gap-3">
                        <label htmlFor="amount" className="text-lg font-medium">
                            Bid Price
                        </label>
                        <input
                            type="text"
                            id="amount"
                            className="py-3 px-4 block w-full rounded-md text-sm border border-gray-300 focus:outline-fuchsia-400"
                            placeholder="Enter your bid price"
                            value={amount}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-full p-5 pt-0 flex items-center justify-end gap-5">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="w-32 text-center py-3 px-4 rounded-md items-center text-sm font-semibold border border-transparent bg-transparent text-red-800 hover:bg-red-200">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="w-32 text-center py-3 px-4 rounded-md items-center text-sm font-semibold border border-transparent bg-fuchsia-800 text-white hover:bg-fuchsia-700">
                            Submit
                        </button>
                    </div>
                </form>
            </Modal>
        </tr>
    );
};

interface ModalProps {
    isModalOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isModalOpen, onClose, children }) => {
    return (
        <div
            onClick={onClose}
            className={`
                fixed inset-0 flex justify-center items-center transition-colors
                ${isModalOpen ? 'visible bg-black/20' : 'invisible'}
            `}>
            <div
                onClick={(e) => e.stopPropagation()}
                className={`
                    bg-white w-1/3 rounded-xl shadow transition-all
                    ${isModalOpen ? 'scale-100 opacity-100' : 'scale-125 opacity-0'}
                `}>
                {children}
            </div>
        </div>
    );
};

export default Home;
