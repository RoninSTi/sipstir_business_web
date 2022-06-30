import { put, takeEvery, select } from 'redux-saga/effects';

import {
 CREATE_REWARD_SUCCESS,
 DELETE_REWARD_SUCCESS,
 SET_REDIRECT,
 UPDATE_REWARD_SUCCESS,
} from '@actions/types';
import { fetchRewardsAction } from '@actions/rewards';

const getAuth = (state) => ({
 token: state.auth.token,
 accountId: state.account.activeAccount?.id,
});

function* fetchRewards() {
 const auth = yield select(getAuth);

 const { accountId, token } = auth;

 if (!accountId || !token) return;

 yield put(fetchRewardsAction({ accountId, token }));

 yield put({
  type: SET_REDIRECT,
  payload: '/rewards',
 });
}

function* onCreateRewardSuccess() {
 yield fetchRewards();
}

function* onDeleteRewardSuccess() {
 yield fetchRewards();
}

function* onUpdateRewardSuccess() {
 yield fetchRewards();
}

export function* watchRewards() {
 yield takeEvery(CREATE_REWARD_SUCCESS, onCreateRewardSuccess);
 yield takeEvery(DELETE_REWARD_SUCCESS, onDeleteRewardSuccess);
 yield takeEvery(UPDATE_REWARD_SUCCESS, onUpdateRewardSuccess);
}
