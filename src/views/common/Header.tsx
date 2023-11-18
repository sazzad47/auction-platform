import React, { useState } from 'react';
import { FaEnvira } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { BiUserCircle } from 'react-icons/bi';
import { useAppDispatch } from '../../redux/hooks';
import { logout } from '../../redux/actions/authAction';

const Header: React.FC = () => {
    return (
        <div className="container px-6 py-4 mx-auto my-5 rounded-lg flex justify-between bg-primary shadow">
            <Link to="/">
                <FaEnvira className="text-4xl" />
            </Link>
            <div className="flex items-center gap-5">
                <p> Balance: $100 </p>
                <UserMenu />
            </div>
        </div>
    );
};

const UserMenu = () => {
    const dispatch = useAppDispatch();

    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        toggleDropdown();
        dispatch(logout());
    };

    return (
        <div className="hs-dropdown relative inline-flex">
            <button
                id="hs-dropdown-custom-trigger"
                type="button"
                onClick={toggleDropdown}
                className="py-1 ps-1 pe-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
                <BiUserCircle className="w-8 h-auto" />
                <span className="text-gray-600 font-medium truncate max-w-[7.5rem]">Maria</span>
                <svg
                    className={`${isDropdownOpen ? 'rotate-180' : 'rotate-0'} w-4 h-4`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </button>

            <div
                className={`absolute transition-[opacity,margin] duration ${
                    isDropdownOpen ? 'opacity-100' : 'opacity-0 hidden'
                } min-w-[15rem] bg-white shadow-md rounded-lg p-2 mt-[4rem] right-0`}
                aria-labelledby="hs-dropdown-custom-trigger">
                <Link
                    onClick={toggleDropdown}
                    className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                    to="/create-new-item">
                    Create new item
                </Link>
                <Link
                    onClick={toggleDropdown}
                    className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                    to="/deposit">
                    Deposit
                </Link>
                <Link
                    onClick={handleLogout}
                    className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                    to="/login">
                    Logout
                </Link>
            </div>
        </div>
    );
};

export default Header;
