import React from 'react';
import { Link } from 'react-router-dom';

interface MenuItemProps {
    to: string;
    label: string;
    onClick?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ to, label, onClick }) => {
    return (
        <Link
            to={to}
            onClick={onClick}
            className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100">
            {label}
        </Link>
    );
};

export default MenuItem;
