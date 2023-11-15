import { ReactNode, useState } from 'react';
import { IoMdClose } from 'react-icons/io';

const Home: React.FC = () => {
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
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                        John Brown
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                        45
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                        New York No. 1 Lake Park
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                        <button
                                            type="button"
                                            onClick={() => setIsModalOpen(true)}
                                            className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                            Bid
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <Modal isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                            <div className="w-full">
                                <div className="w-full p-5 flex items-center justify-between">
                                    <h3 className="text-3xl font-medium"> Item Name </h3>
                                    <IoMdClose
                                        className="text-2xl cursor-pointer"
                                        onClick={() => setIsModalOpen(false)}
                                    />
                                </div>
                                <hr />
                                <div className="p-5 flex flex-col gap-3">
                                    <label htmlFor="price" className="text-lg font-medium">
                                        Bid Price
                                    </label>
                                    <input
                                        type="text"
                                        id="price"
                                        className="py-3 px-4 block w-full rounded-md text-sm border border-gray-300 focus:outline-fuchsia-400"
                                        placeholder="Enter your bid price"
                                    />
                                </div>
                                <div className="w-full p-5 pt-0 flex items-center justify-end gap-5">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="w-32 text-center py-3 px-4 rounded-md items-center text-sm font-semibold border border-transparent bg-transparent text-red-800 hover:bg-red-200">
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="w-32 text-center py-3 px-4 rounded-md items-center text-sm font-semibold border border-transparent bg-fuchsia-800 text-white hover:bg-fuchsia-700">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
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
