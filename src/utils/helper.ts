import Swal from 'sweetalert2';
import { ItemData } from '../models/item';

export function showLoader(msg: string) {
    Swal.fire({
        title: msg,
    });
    Swal.showLoading();
}

export const formatPrice = (price: number): string => {
    return `$${price.toFixed(2)}`;
};

export const calculateCurrentPrice = (item: ItemData) => {
    if (item.bids && item.bids.length > 0) {
        const highestBid = Math.max(...item.bids.map((bid: any) => bid.amount));
        return highestBid;
    } else {
        return item.startPrice;
    }
};
