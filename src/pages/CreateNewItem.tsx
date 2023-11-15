const CreateNewItem = () => {
    return (
        <div className="container h-[70vh] px-6 py-4 mx-auto my-16 flex justify-center items-center gap-16">
            <div className="w-[40rem] rounded-lg mx-auto bg-primary shadow p-10 flex flex-col gap-4">
                <h3 className="text-2xl font-medium text-start mb-3"> Create New Item </h3>
                <div className="flex flex-col gap-2">
                    <label htmlFor="price" className="text-lg font-medium">
                        Name
                    </label>
                    <input
                        type="text"
                        id="price"
                        className="py-3 px-4 block w-full rounded-md text-sm border border-gray-300 focus:outline-fuchsia-400"
                        placeholder="Enter your item name"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="startPrice" className="text-lg font-medium">
                        Start Price
                    </label>
                    <input
                        type="text"
                        id="startPrice"
                        className="py-3 px-4 block w-full rounded-md text-sm border border-gray-300 focus:outline-fuchsia-400"
                        placeholder="Enter start price"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="timeWindow" className="text-lg font-medium">
                        Time Window
                    </label>
                    <input
                        type="text"
                        id="timeWindow"
                        className="py-3 px-4 block w-full rounded-md text-sm border border-gray-300 focus:outline-fuchsia-400"
                        placeholder="Enter time window"
                    />
                </div>
                <div className="w-full flex items-center justify-end gap-5 mt-3">
                    <button
                        type="button"
                        className="w-32 text-center py-3 px-4 rounded-md items-center text-sm font-semibold border border-transparent bg-transparent text-red-800 hover:bg-red-200">
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="w-32 text-center py-3 px-4 rounded-md items-center text-sm font-semibold border border-transparent bg-fuchsia-800 text-white hover:bg-fuchsia-700">
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateNewItem;
