import { combineReducers } from '@reduxjs/toolkit';
import accountReducer from './account';
import authReducer from './auth';
import modalReducer from './modals';
import navReducer from './nav';
import rewardsReducer from './rewards';
import uiReducer from './ui';

export default combineReducers({
 account: accountReducer,
 auth: authReducer,
 modals: modalReducer,
 nav: navReducer,
 rewards: rewardsReducer,
 ui: uiReducer,
});
