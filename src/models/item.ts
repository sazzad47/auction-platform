import { BidData } from "./bid";

export interface ItemData {
    _id?: string;
    name: string;
    startPrice: number;
    startTime: string;
    endTime: string;
    sold?: boolean;
    createdBy?: string;
    bids?: BidData[]
}