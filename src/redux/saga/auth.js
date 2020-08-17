import { put, takeEvery } from 'redux-saga/effects'

import { ATTEMPT_LOGOUT, LOGIN_SUCCESS, SET_AUTH } from '@actions/types'

function * onAttemptLogout() {
  yield put({
    type: SET_AUTH,
    payload: {
      user: null,
      token: null
    }
  })
}

function * onLoginSuccess(action) {
  const { accessToken: token, user } = action.payload.data

  yield put({
    type: SET_AUTH,
    payload: {
      token,
      user
    }
  })
}

export function * watchAuth() {
  yield takeEvery(ATTEMPT_LOGOUT, onAttemptLogout)
  yield takeEvery(LOGIN_SUCCESS, onLoginSuccess)
};
