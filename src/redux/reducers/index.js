import { combineReducers } from '@reduxjs/toolkit';
import accountReducer from './account';
import authReducer from '@slices/auth';
import modalReducer from './modals';
import navReducer from './nav';
import uiReducer from './ui';

export default combineReducers({
 account: accountReducer,
 auth: authReducer,
 modals: modalReducer,
 nav: navReducer,
 ui: uiReducer,
});
