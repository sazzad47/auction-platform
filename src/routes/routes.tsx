import Register from '../pages/Register';
import Login from '../pages/Login';
import Home from '../pages/Home';
import CreateNewItem from '../pages/CreateNewItem';
import Deposit from '../pages/Deposit';

const publicRoutes = [
    { path: '/register', component: <Register /> },
    { path: '/login', component: <Login /> },
];

const privateRoutes = [
    { path: '/', component: <Home /> },
    { path: '/home', component: <Home /> },
    { path: '/create-new-item', component: <CreateNewItem /> },
    { path: '/deposit', component: <Deposit /> },
];

export { publicRoutes, privateRoutes };
