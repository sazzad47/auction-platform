import { combineReducers } from '@reduxjs/toolkit';
import auth from './authReducer';
import global from './globalReducer';

export default combineReducers({
    auth,
    global,
});
