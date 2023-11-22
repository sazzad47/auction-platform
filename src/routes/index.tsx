import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './routes';
import Layout from '../components/layout';
import { AuthProtected } from './AuthProtected';
import { NonAuth } from './NonAuth';
import LoadingSpin from '../components/common/LoadingSpin';

const Index = () => {
    return (
        <Suspense fallback={<LoadingSpin fullPage={true} size={200} />}>
            <Routes>
                {publicRoutes.map((route, idx) => (
                    <Route
                        path={route.path}
                        element={
                            <NonAuth>
                                <route.component />
                            </NonAuth>
                        }
                        key={idx}
                    />
                ))}

                {privateRoutes.map((route, idx) => (
                    <Route
                        path={route.path}
                        element={
                            <AuthProtected>
                                <Layout>
                                    <route.component />
                                </Layout>
                            </AuthProtected>
                        }
                        key={idx}
                    />
                ))}
            </Routes>
        </Suspense>
    );
};

export default Index;
