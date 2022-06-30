import { put, takeEvery, select } from 'redux-saga/effects';

import { CLEAR_MODAL, SET_ACTIVE_ACCOUNT, UPDATE_PAYMENT_METHOD_SUCCESS } from '@actions/types';
import { fetchPaymentMethodAction } from '@actions/paymentMethod';

const getToken = (state) => state.auth.token;

const getAccount = (state) => state.account.activeAccount;

function* fetchPaymentMethod() {
 const token = yield select(getToken);

 const account = yield select(getAccount);

 if (!account || !token) return;

 yield put(fetchPaymentMethodAction({ accountId: account?.id, token }));
}

function* onSetActiveAccount() {
 yield fetchPaymentMethod();
}

function* onUpdateMethodSuccess() {
 yield fetchPaymentMethod();

 yield put({
  type: CLEAR_MODAL,
 });
}

export function* watchPaymentMethod() {
 yield takeEvery(SET_ACTIVE_ACCOUNT, onSetActiveAccount);
 yield takeEvery(UPDATE_PAYMENT_METHOD_SUCCESS, onUpdateMethodSuccess);
}
