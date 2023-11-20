import { combineReducers } from '@reduxjs/toolkit';
import auth from './authReducer';
import global from './globalReducer';
import item from './itemReducer';
import deposit from './depositReducer';

export default combineReducers({
    auth,
    global,
    item,
    deposit,
});
