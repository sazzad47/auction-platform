import { useState, useEffect } from 'react';

// Custom hook for countdown timer and formatting
const useCountdownTimer = (startTime: string, endTime: string): string => {
    const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());

    function calculateRemainingTime() {
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const currentSeconds = now.getSeconds();
        const currentTimeInSeconds = currentHour * 3600 + currentMinute * 60 + currentSeconds;

        const [endHour, endMinute] = endTime.split(':').map(Number);

        const endSeconds = endHour * 3600 + endMinute * 60;

        // Calculate the time difference in seconds
        const timeDifference = endSeconds - currentTimeInSeconds;

        if (timeDifference <= 0) {
            // If the time difference is zero or negative, return an empty string
            return 'Over';
        }

        // Convert seconds to hours, minutes, and remaining seconds
        const hours = Math.floor(timeDifference / 3600);
        const remainingSeconds = timeDifference % 3600;

        const minutes = Math.floor(remainingSeconds / 60);
        const seconds = remainingSeconds % 60;

        return `${hours}h${minutes}m${seconds}s`;
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            const newRemainingTime = calculateRemainingTime();
            setRemainingTime(newRemainingTime);

            // Clear the interval if the time difference is zero or negative
            if (newRemainingTime === 'Over') {
                clearInterval(intervalId);
            }
        }, 1000);

        // Clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [startTime, endTime]);

    return remainingTime;
};

export default useCountdownTimer;
