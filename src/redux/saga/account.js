import { put, takeEvery, select } from 'redux-saga/effects'

import {
  ADD_USER_SUCCESS,
  CANCEL_SUBSCRIPTION_SUCCESS,
  CREATE_ACCOUNT_SUCCESS,
  CREATE_SUBSCRIPTION_SUCCESS,
  DELETE_BUSINESS_SUCCESS,
  DELETE_USER_SUCCESS,
  FETCH_USER_ACCOUNTS_SUCCESS,
  SET_ACTIVE_ACCOUNT,
  SET_REDIRECT,
  UPDATE_ACCOUNT_SUCCESS,
  UPDATE_USER_SUCCESS
} from '@actions/types'
import { fetchAccountActivityAction, getBusinessesAction, getUserAccountsAction } from '@actions/account'
import { fetchSubscriptionAction } from '@actions/subscription'


const getActiveAccount = state => state.account.activeAccount
const getIsEmployee = state => state.auth.user?.roles.some(role => role === 'employee')
const getToken = state => state.auth.token
const getUserId = state => state.auth.user?.id

function * fetchAccounts() {
  const userId = yield select(getUserId)
  const token = yield select(getToken)

  if (!userId || !token) return

  yield put(getUserAccountsAction({ userId, token }))
}

function * fetchBusinesses() {
  const token = yield select(getToken)

  if (!token) return

  yield put(getBusinessesAction({ token }))
}

function * fetchAccountActivity({ accountId }) {
  const token = yield select(getToken)

  yield put(fetchAccountActivityAction({ accountId, token }))
}

function * fetchSubscription({ accountId }) {
  const token = yield select(getToken)

  yield put(fetchSubscriptionAction({ accountId, token }))
}

function * onAddUserSuccess() {
  yield fetchAccounts()
}

function * onCancelSubscriptionSuccess() {
  yield fetchAccounts()
}

function * onCreateAccountSuccess() {
  yield fetchBusinesses()

  yield put({
    type: SET_REDIRECT,
    payload: '/'
  })
}

function * onCreateSubscriptionSuccess() {
  yield fetchAccounts()
}

function * onDeleteBusinessSuccess() {
  yield fetchBusinesses()
}

function * onDeleteUserSuccess() {
  yield fetchAccounts()
}

function * onUpdateAccountSuccess() {
  const isEmployee = yield select(getIsEmployee)

  if (isEmployee) {
    yield fetchBusinesses()

    yield put({
      type: SET_REDIRECT,
      payload: '/'
    })
  } else {
    yield fetchAccounts()

    yield put({
      type: SET_REDIRECT,
      payload: '/my-account'
    })
  }
}

function * onUpdateUserSuccess() {
  yield fetchAccounts()
}

function * onFetchUserAccountsSuccess(action) {
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

function * onSetActiveAccount(action) {
  const { payload: account } = action

  yield fetchSubscription({ accountId: account.id })

  yield fetchAccountActivity({ accountId: account.id })
}

export function * watchAccount() {
  yield takeEvery(ADD_USER_SUCCESS, onAddUserSuccess)
  yield takeEvery(CREATE_ACCOUNT_SUCCESS, onCreateAccountSuccess)
  yield takeEvery(CANCEL_SUBSCRIPTION_SUCCESS, onCancelSubscriptionSuccess)
  yield takeEvery(CREATE_SUBSCRIPTION_SUCCESS, onCreateSubscriptionSuccess)
  yield takeEvery(DELETE_BUSINESS_SUCCESS, onDeleteBusinessSuccess)
  yield takeEvery(DELETE_USER_SUCCESS, onDeleteUserSuccess)
  yield takeEvery(FETCH_USER_ACCOUNTS_SUCCESS, onFetchUserAccountsSuccess)
  yield takeEvery(SET_ACTIVE_ACCOUNT, onSetActiveAccount)
  yield takeEvery(UPDATE_ACCOUNT_SUCCESS, onUpdateAccountSuccess)
  yield takeEvery(UPDATE_USER_SUCCESS, onUpdateUserSuccess)
};
