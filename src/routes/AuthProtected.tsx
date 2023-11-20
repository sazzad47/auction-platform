import React, { ReactNode, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import LoadingSpin from '../components/LoadingSpin';
import { getAccessToken } from '../redux/actions/authAction';

interface AuthProtectedProps {
    children: ReactNode;
}

const AuthProtected: React.FC<AuthProtectedProps> = ({ children }) => {
    const dispatch = useAppDispatch();
    const auth = useAppSelector((state) => state.auth);
    const global = useAppSelector((state) => state.global);

    useEffect(() => {
        dispatch(getAccessToken());
    }, []);

    if (global.loading) {
        return <LoadingSpin />;
    }

    if (!auth.token) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
};

export { AuthProtected };
