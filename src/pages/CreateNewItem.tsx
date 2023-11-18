import { useState, ChangeEvent, FormEvent } from 'react';
import { ItemData } from '../models/item';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { createItem } from '../redux/actions/itemAction';

const initState: ItemData = {
    name: '',
    startPrice: undefined,
    startTime: '',
    endTime: '',
};

const CreateNewItem = () => {
    const dispatch = useAppDispatch();
    const auth = useAppSelector((state) => state.auth);

    const [data, setData] = useState<ItemData>(initState);
    const { name, startPrice, startTime, endTime } = data;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setData((prevData) => ({ ...prevData, [id]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        dispatch(createItem({ data, token: auth.token }));
        setData(initState);
    };

    return (
        <div className="container h-[70vh] px-6 py-4 mx-auto my-16 mt-[10rem] flex justify-center items-center gap-16">
            <div className="w-[40rem] rounded-lg mx-auto bg-primary shadow p-10 flex flex-col gap-6">
                <h3 className="text-2xl font-medium text-start"> Create New Item </h3>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-lg font-medium">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="py-3 px-4 block w-full rounded-md text-sm border border-gray-300 focus:outline-fuchsia-400"
                            placeholder="Enter your item name"
                            value={name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="startPrice" className="text-lg font-medium">
                            Start Price
                        </label>
                        <input
                            type="number"
                            id="startPrice"
                            className="py-3 px-4 block w-full rounded-md text-sm border border-gray-300 focus:outline-fuchsia-400"
                            placeholder="Enter start price"
                            value={startPrice}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="startTime" className="text-lg font-medium">
                            Start Time
                        </label>
                        <input
                            type="time"
                            id="startTime"
                            className="py-3 px-4 block w-full rounded-md text-sm border border-gray-300 focus:outline-fuchsia-400"
                            placeholder="Enter start time"
                            value={startTime}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="endTime" className="text-lg font-medium">
                            End Time
                        </label>
                        <input
                            type="time"
                            id="endTime"
                            className="py-3 px-4 block w-full rounded-md text-sm border border-gray-300 focus:outline-fuchsia-400"
                            placeholder="Enter end time"
                            value={endTime}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-full flex items-center justify-end gap-5 mt-3">
                        <button
                            type="button"
                            onClick={() => setData(initState)}
                            className="w-32 text-center py-3 px-4 rounded-md items-center text-sm font-semibold border border-transparent bg-transparent text-red-800 hover:bg-red-200">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="w-32 text-center py-3 px-4 rounded-md items-center text-sm font-semibold border border-transparent bg-fuchsia-800 text-white hover:bg-fuchsia-700">
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateNewItem;
