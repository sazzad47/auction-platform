import { lazy } from 'react';

const Register = lazy(() => import('../pages/Register'));
const Login = lazy(() => import('../pages/Login'));
const Home = lazy(() => import('../pages/Home'));
const CreateNewItem = lazy(() => import('../pages/CreateNewItem'));
const Deposit = lazy(() => import('../pages/Deposit'));

import PathConstants from './pathConstants';

const publicRoutes = [
    { path: PathConstants.REGISTER, component: Register },
    { path: PathConstants.LOGIN, component: Login },
];

const privateRoutes = [
    { path: PathConstants.ROOT, component: Home },
    { path: PathConstants.HOME, component: Home },
    { path: PathConstants.CREATENEWITEM, component: CreateNewItem },
    { path: PathConstants.DEPOSIT, component: Deposit },
];

export { publicRoutes, privateRoutes };
