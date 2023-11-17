import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

interface NonAuthProps {
    children: ReactNode;
}

const NonAuth: React.FC<NonAuthProps> = ({ children }) => {
    const auth = useAppSelector((state) => state.auth);

    if (auth.token) {
        return <Navigate to="/" />;
    }

    return <>{children}</>;
};

export { NonAuth };
