import { Routes, Route } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './routes';
import Layout from '../views/layout';
import { AuthProtected } from './AuthProtected';
import { NonAuth } from './NonAuth';
import { useEffect } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { getAccessToken } from '../redux/actions/authAction';

const Index = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAccessToken());
    }, []);

    return (
        <>
            <Routes>
                {publicRoutes.map((route, idx) => (
                    <Route path={route.path} element={<NonAuth> {route.component} </NonAuth>} key={idx} />
                ))}

                {privateRoutes.map((route, idx) => (
                    <Route
                        path={route.path}
                        element={
                            <AuthProtected>
                                <Layout> {route.component} </Layout>
                            </AuthProtected>
                        }
                        key={idx}
                    />
                ))}
            </Routes>
        </>
    );
};

export default Index;
