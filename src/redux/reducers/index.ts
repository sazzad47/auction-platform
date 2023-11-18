import { combineReducers } from '@reduxjs/toolkit';
import auth from './authReducer';
import global from './globalReducer';
import item from './itemReducer';

export default combineReducers({
    auth,
    global,
    item,
});
