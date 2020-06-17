import { put, takeEvery } from 'redux-saga/effects'

import { LOGIN_FAIL, LOGIN_SUCCESS, SET_AUTH } from '@actions/types'
import { loginAction } from '@actions/auth'

function * onLoginFail(action) {
  if (action.error?.response?.data?.message === 'User doesn\'t exist') {
    const history = action.meta?.previousAction?.history

    if (history) history.push('/user/create')
  }
}

function * onLoginSuccess(action) {
  const history = action.meta?.previousAction?.history

  if (!history) return

  history.push('/dashboard')
}

function * onSetAuth(action) {
  const {
    payload: {
      isAuthenticated,
      history,
      token,
      user
    }
  } = action

  if (isAuthenticated && user && token) {
    yield put(loginAction({ email: user.email, history, token }))
  }
};

export function * watchAuth() {
  yield takeEvery(SET_AUTH, onSetAuth)
  yield takeEvery(LOGIN_FAIL, onLoginFail)
  yield takeEvery(LOGIN_SUCCESS, onLoginSuccess)
};
