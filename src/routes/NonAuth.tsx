import React, { ReactNode, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getAccessToken } from '../redux/actions/authAction';
import LoadingSpin from '../components/common/LoadingSpin';

interface NonAuthProps {
    children: ReactNode;
}

const NonAuth: React.FC<NonAuthProps> = ({ children }) => {
    const dispatch = useAppDispatch();

    const auth = useAppSelector((state) => state.auth);
    const global = useAppSelector((state) => state.global);

    useEffect(() => {
        dispatch(getAccessToken());
    }, []);

    if (global.loading) {
        return <LoadingSpin fullPage={true} size={200} />;
    }

    if (auth.token) {
        return <Navigate to="/" />;
    }

    return <>{children}</>;
};

export { NonAuth };
