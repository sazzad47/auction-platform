import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

interface AuthProtectedProps {
    children: ReactNode;
}

const AuthProtected: React.FC<AuthProtectedProps> = ({ children }) => {
    const auth = useAppSelector((state) => state.auth);

    if (!auth.token) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
};

export { AuthProtected };
