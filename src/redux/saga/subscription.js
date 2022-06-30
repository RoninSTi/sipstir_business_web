import { put, takeEvery } from 'redux-saga/effects';

import { CLEAR_MODAL, CREATE_SUBSCRIPTION_SUCCESS } from '@actions/types';

function* onCreateSubscriptionSuccess() {
 yield put({
  type: CLEAR_MODAL,
 });
}

export function* watchSubscription() {
 yield takeEvery(CREATE_SUBSCRIPTION_SUCCESS, onCreateSubscriptionSuccess);
}
