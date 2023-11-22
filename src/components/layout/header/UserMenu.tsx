import React, { useState } from 'react';
import { BiUserCircle } from 'react-icons/bi';
import MenuItem from './MenuItem';
import { useAppDispatch } from '../../../redux/hooks';
import PathConstants from '../../../routes/pathConstants';
import { logout } from '../../../redux/actions/authAction';
import RotatingArrowIcon from '../../../assets/icons/RotatingArrowIcon';

const UserMenu: React.FC = () => {
    const dispatch = useAppDispatch();

    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        toggleDropdown();
        dispatch(logout());
    };

    const menuItems = [
        { to: PathConstants.CREATENEWITEM, label: 'Create new item' },
        { to: PathConstants.DEPOSIT, label: 'Deposit' },
        { to: '#', label: 'Logout', onClick: handleLogout },
    ];

    return (
        <div className="hs-dropdown relative inline-flex">
            <button
                id="hs-dropdown-custom-trigger"
                type="button"
                onClick={toggleDropdown}
                className="py-1 ps-1 pe-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
                <BiUserCircle className="w-8 h-auto" />
                <span className="text-gray-600 font-medium truncate max-w-[7.5rem]">Maria</span>
                <RotatingArrowIcon isRotated={isDropdownOpen} />
            </button>

            <div
                className={`absolute transition-[opacity,margin] duration ${
                    isDropdownOpen ? 'opacity-100' : 'opacity-0 hidden'
                } min-w-[15rem] bg-white shadow-md rounded-lg p-2 mt-[4rem] right-0`}
                aria-labelledby="hs-dropdown-custom-trigger">
                {menuItems.map((menuItem) => (
                    <MenuItem key={menuItem.to} {...menuItem} />
                ))}
            </div>
        </div>
    );
};

export default UserMenu;
