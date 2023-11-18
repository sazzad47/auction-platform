import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import LoadingSpin from '../components/LoadingSpin';

interface AuthProtectedProps {
    children: ReactNode;
}

const AuthProtected: React.FC<AuthProtectedProps> = ({ children }) => {
    const auth = useAppSelector((state) => state.auth);
    const global = useAppSelector((state) => state.global);

    if (global.loading) {
        return <LoadingSpin />;
    }

    if (!auth.token) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
};

export { AuthProtected };
