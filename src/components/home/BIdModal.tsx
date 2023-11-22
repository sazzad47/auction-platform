import React, { useState, ChangeEvent, FormEvent } from 'react';
import { IoMdClose } from 'react-icons/io';
import { BidData } from '../../models/bid';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { createBid } from '../../redux/actions/bidAction';
import Modal from '../common/Modal';

interface BidModalProps {
    isOpen: boolean;
    onClose: () => void;
    itemName: string;
    itemId: string;
}

const initState: BidData = {
    amount: 0,
};

const BidModal: React.FC<BidModalProps> = ({ isOpen, onClose, itemName, itemId }) => {
    const dispatch = useAppDispatch();
    const auth = useAppSelector((state) => state.auth);

    const [data, setData] = useState<BidData>(initState);
    const { amount } = data;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setData((prevData) => ({ ...prevData, [id]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        dispatch(createBid({ data: { ...data, itemId }, token: auth.token }));
        setData(initState);
        onClose();
    };

    return (
        <Modal isModalOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit} className="w-full">
                <div className="w-full p-5 flex items-center justify-between">
                    <h3 className="text-3xl font-medium"> {itemName} </h3>
                    <IoMdClose className="text-2xl cursor-pointer" onClick={onClose} />
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
                        onClick={onClose}
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
    );
};

export default BidModal;
