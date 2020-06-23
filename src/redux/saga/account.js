import { put, takeEvery, select } from 'redux-saga/effects'

import { CREATE_ACCOUNT, CREATE_ACCOUNT_SUCCESS, CREATE_USER_SUCCESS, FETCH_MEMBER_ACCOUNTS_SUCCESS, SET_ACTIVE_ACCOUNT, UPDATE_LOADING } from '@actions/types'
import { getMemberAccountsAction } from '@actions/account'

const getActiveAccount = state => state.account.activeAccount
const getMemberId = state => state.member.id
const getToken = state => state.auth.token

function * onCreateAccount() {
  yield put({
    type: UPDATE_LOADING,
    payload: {
      loadingAction: 'set',
      loadingType: CREATE_ACCOUNT,
      meta: null
    }
  })
}

function * onCreateAccountSuccess() {
  yield put({
    type: UPDATE_LOADING,
    payload: {
      loadingAction: 'unset',
      loadingType: CREATE_ACCOUNT,
      meta: null
    }
  })
}

function * onCreateUserSuccess() {
  const memberId = yield select(getMemberId)
  const token = yield select(getToken)
  yield put(getMemberAccountsAction({ memberId, token }))
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
  yield takeEvery(CREATE_ACCOUNT, onCreateAccount)
  yield takeEvery(CREATE_ACCOUNT_SUCCESS, onCreateAccountSuccess)
  yield takeEvery(CREATE_USER_SUCCESS, onCreateUserSuccess)
  yield takeEvery(FETCH_MEMBER_ACCOUNTS_SUCCESS, onFetchMemberAccountsSuccess)
};
