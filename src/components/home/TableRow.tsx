import React, { useState } from 'react';
import { RefCallback } from 'react';
import { ItemData } from '../../models/item';
import { useAppSelector } from '../../redux/hooks';
import useCountdownTimer from '../../hooks/useCountdownTimer';
import { calculateCurrentPrice, formatPrice } from '../../utils/helper';
import BidModal from './BIdModal';

interface TableRowProps {
    item: ItemData;
    itemData: ItemData[];
    index: number;
    lastItemRef: RefCallback<HTMLDivElement>;
}

const TableRow: React.FC<TableRowProps> = ({ item, lastItemRef, itemData, index }) => {
    const remainingTime = useCountdownTimer(item?.startTime, item?.endTime);
    const auth = useAppSelector((state) => state.auth);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const currentPrice = calculateCurrentPrice(item);

    const hasBidOnItem = item?.bids?.some((bid) => bid.bidder === auth.user?._id);

    const handleClose = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <tr key={item?._id} ref={index === itemData.length - 1 ? lastItemRef : null}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                    {item?.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                    {formatPrice(currentPrice)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                    {remainingTime}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                    <button
                        type="button"
                        disabled={hasBidOnItem || item.sold}
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                        {item.sold ? 'Sold' : hasBidOnItem ? 'Submitted' : 'Bid'}
                    </button>
                </td>
            </tr>
            <BidModal isOpen={isModalOpen} onClose={handleClose} itemName={item?.name} itemId={item?._id || ''} />
        </>
    );
};

export default TableRow;
