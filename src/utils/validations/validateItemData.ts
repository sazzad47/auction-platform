import { ItemData } from '../../models/item';

export const validateItemData = ({ data }: { data: ItemData }): string | null => {
    const { name, startPrice, startTime, endTime } = data;
    let errMsg: string | null = null;

    if (!errMsg && !name) {
        errMsg = 'Please enter item name.';
    }

    if (!errMsg && !startPrice) {
        errMsg = 'Please enter start price.';
    }

    if (!errMsg && !startTime) {
        errMsg = 'Please enter start time.';
    }

    if (!errMsg && !endTime) {
        errMsg = 'Please enter end time.';
    }

    return errMsg;
};
