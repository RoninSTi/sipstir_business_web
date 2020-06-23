import { put, takeEvery } from 'redux-saga/effects'

import { SET_AUTH } from '@actions/types'
import { createMemberAction } from '@actions/member'

function * onSetAuth(action) {
  const {
    payload: {
      isAuthenticated,
      token,
      user
    }
  } = action

  if (isAuthenticated && user && token) {
    yield put(createMemberAction({ email: user.email, token }))
  }
};

export function * watchAuth() {
  yield takeEvery(SET_AUTH, onSetAuth)
};
