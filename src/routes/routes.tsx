import Register from '../pages/Register';
import Login from '../pages/Login';
import Home from '../pages/Home';

const publicRoutes = [
    { path: '/register', component: <Register /> },
    { path: '/login', component: <Login /> },
];

const privateRoutes = [
    { path: '/', component: <Home /> },
    { path: '/home', component: <Home /> },
];

export { publicRoutes, privateRoutes };
