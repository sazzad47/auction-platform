import React from 'react';

interface RotatingArrowIconProps {
    isRotated: boolean;
}

const RotatingArrowIcon: React.FC<RotatingArrowIconProps> = ({ isRotated }) => {
    return (
        <svg
            className={`${isRotated ? 'rotate-180' : 'rotate-0'} w-4 h-4`}
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
    );
};

export default RotatingArrowIcon;
