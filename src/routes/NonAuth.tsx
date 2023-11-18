import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import LoadingSpin from '../components/LoadingSpin';

interface NonAuthProps {
    children: ReactNode;
}

const NonAuth: React.FC<NonAuthProps> = ({ children }) => {
    const auth = useAppSelector((state) => state.auth);
    const global = useAppSelector((state) => state.global);

    if (global.loading) {
        return <LoadingSpin />;
    }

    if (auth.token) {
        return <Navigate to="/" />;
    }

    return <>{children}</>;
};

export { NonAuth };
