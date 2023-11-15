import { Routes, Route } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './routes';
import Layout from '../views/layout';

const Index = () => {
    return (
        <>
            <Routes>
                {publicRoutes.map((route, idx) => (
                    <Route path={route.path} element={route.component} key={idx} />
                ))}

                {privateRoutes.map((route, idx) => (
                    <Route path={route.path} element={<Layout> {route.component} </Layout>} key={idx} />
                ))}
            </Routes>
        </>
    );
};

export default Index;
