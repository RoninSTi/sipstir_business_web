import { put, takeEvery, select } from 'redux-saga/effects'

import {
  ADD_MEMBER_SUCCESS,
  CREATE_USER_SUCCESS,
  FETCH_MEMBER_ACCOUNTS_SUCCESS,
  SET_ACTIVE_ACCOUNT,
  UPDATE_MEMBER_SUCCESS
} from '@actions/types'
import { getMemberAccountsAction } from '@actions/account'
import { DELETE_MEMBER_SUCCESS } from '../actions/types'

const getActiveAccount = state => state.account.activeAccount
const getMemberId = state => state.member.id
const getToken = state => state.auth.token

function * fetchAccounts() {
  const memberId = yield select(getMemberId)
  const token = yield select(getToken)
  yield put(getMemberAccountsAction({ memberId, token }))
}

function * onAddMemberSuccess() {
  yield fetchAccounts()
}

function * onDeleteMemberSuccess() {
  yield fetchAccounts()
}

function * onUpdateMemberSuccess() {
  yield fetchAccounts()
}

function * onCreateUserSuccess() {
  yield fetchAccounts()
}

function * onFetchMemberAccountsSuccess(action) {
  const activeAccount = yield select(getActiveAccount)

  const accounts = action.payload.data

  if (!activeAccount) {
    const accountToSetActive = accounts[0]

    yield put({
      type: SET_ACTIVE_ACCOUNT,
      payload: accountToSetActive
    })
  } else {
    const updatedActiveAccount = accounts.find(account => account.id === activeAccount.id)

    yield put({
      type: SET_ACTIVE_ACCOUNT,
      payload: updatedActiveAccount
    })
  }
}

export function * watchAccount() {
  yield takeEvery(ADD_MEMBER_SUCCESS, onAddMemberSuccess)
  yield takeEvery(CREATE_USER_SUCCESS, onCreateUserSuccess)
  yield takeEvery(DELETE_MEMBER_SUCCESS, onDeleteMemberSuccess)
  yield takeEvery(FETCH_MEMBER_ACCOUNTS_SUCCESS, onFetchMemberAccountsSuccess)
  yield takeEvery(UPDATE_MEMBER_SUCCESS, onUpdateMemberSuccess)
};
