import React from 'react';

interface LoadingSpinProps {
    size?: number;
    color?: string;
    fullPage?: boolean;
}

const LoadingSpin: React.FC<LoadingSpinProps> = ({ size = 40, color = '#701a75', fullPage = false }) => {
    return (
        <div
            className={`${fullPage ? 'h-screen' : 'min-h-10'} w-full flex justify-center items-center overflow-hidden`}>
            <div className="lds-dual-ring"></div>
            <style>
                {`
                /* Style for the loading spinner animation */
                .lds-dual-ring {
                    display: inline-block;
                    width: ${size}px;
                    height: ${size}px;
                }
                .lds-dual-ring:after {
                    content: " ";
                    display: block;
                    width: ${size - 16}px;
                    height: ${size - 16}px;
                    margin: 8px; 
                    border-radius: 50%;
                    border: 6px solid ${color};
                    border-color: ${color} transparent ${color} transparent;
                    animation: lds-dual-ring 1.2s linear infinite;
                }
                @keyframes lds-dual-ring {
                    0% {
                    transform: rotate(0deg);
                    }
                    100% {
                    transform: rotate(360deg);
                    }
                }
                `}
            </style>
        </div>
    );
};

export default LoadingSpin;
