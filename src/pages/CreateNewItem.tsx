import { useState, ChangeEvent, FormEvent } from 'react';
import { ItemData } from '../models/item';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { createItem } from '../redux/actions/itemAction';
import InputLabel from '../components/common/InputLabel';
import InputField from '../components/common/InputField';

interface InputConfig {
    id: keyof ItemData;
    label: string;
    type: 'text' | 'password' | 'email' | 'number' | 'time';
    placeholder: string;
}

const inputFields: InputConfig[] = [
    {
        id: 'name',
        label: 'Name',
        type: 'text',
        placeholder: 'Enter your item name',
    },
    {
        id: 'startPrice',
        label: 'Start Price',
        type: 'number',
        placeholder: 'Enter start price',
    },
    {
        id: 'startTime',
        label: 'Start Time',
        type: 'time',
        placeholder: 'Enter start time',
    },
    {
        id: 'endTime',
        label: 'End Time',
        type: 'time',
        placeholder: 'Enter end time',
    },
];

const initState: ItemData = {
    name: '',
    startPrice: 0,
    startTime: '',
    endTime: '',
};

const CreateNewItem = () => {
    const dispatch = useAppDispatch();
    const auth = useAppSelector((state) => state.auth);

    const [data, setData] = useState<ItemData>(initState);

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
                    {inputFields.map((field) => (
                        <div key={field.id} className="flex flex-col gap-2">
                            <InputLabel htmlFor={field.id}>{field.label}</InputLabel>
                            <InputField
                                type={field.type}
                                id={field.id}
                                value={data[field.id]}
                                placeholder={field.placeholder}
                                onChange={handleChange}
                            />
                        </div>
                    ))}
                    <div className="w-full pt-0 flex items-center justify-end gap-5 mt-3">
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
