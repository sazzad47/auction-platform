import { BidData } from '../../models/bid';

export const validateBidData = ({ data }: { data: BidData }): string | null => {
    const { amount } = data;
    let errMsg: string | null = null;

    if (!errMsg && !amount) {
        errMsg = 'Please enter bid amount.';
    }

    if (!errMsg && amount <= 0) {
        errMsg = 'Bid amount must be greater than 0';
    }

    return errMsg;
};
