import React from 'react';
import LoadingSpin from '../common/LoadingSpin';

interface TableProps {
    data: any[];
    loading: boolean;
    tableHeads: string[];
    renderRow: (item: any, index: number) => React.ReactNode;
}

const Table: React.FC<TableProps> = ({ data, loading, tableHeads, renderRow }) => {
    return (
        <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                    {loading && <LoadingSpin size={100} />}
                    {data.length === 0 && !loading && <h3>No items found!</h3>}
                    {data.length > 0 && (
                        <table className="min-w-full divide-y divide-gray-200 border rounded-lg shadow overflow-hidden">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    {tableHeads.map((head, index) => (
                                        <th
                                            key={index}
                                            className={`px-6 py-3 ${
                                                index === tableHeads.length - 1 ? 'text-end' : 'text-start'
                                            } text-xs font-medium text-gray-500 uppercase`}>
                                            {head}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="w-full divide-y divide-gray-200">
                                {data?.map((item, index) => renderRow(item, index))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Table;
