import { put, takeEvery, select } from 'redux-saga/effects'

import { CREATE_USER, CREATE_USER_FAIL, CREATE_USER_SUCCESS, CREATE_USER_UPDATE_FORM, UPDATE_LOADING } from '@actions/types'
import { checkUsernameAction } from '@actions/user'

const getToken = state => state.auth.token

function * onCreateAccount() {
  yield put({
    type: UPDATE_LOADING,
    payload: {
      loadingAction: 'set',
      loadingType: CREATE_USER,
      meta: null
    }
  })
}

function * onCreateUserFail() {
  yield put({
    type: UPDATE_LOADING,
    payload: {
      loadingAction: 'unset',
      loadingType: CREATE_USER,
      meta: null
    }
  })
}

function * onCreateAccountSuccess() {
  yield put({
    type: UPDATE_LOADING,
    payload: {
      loadingAction: 'unset',
      loadingType: CREATE_USER,
      meta: null
    }
  })
}

function * onCreateUserUpdateForm(action) {
  const token = yield select(getToken)

  const {
    payload: {
      name, value
    }
  } = action

  if (name === 'username') {
    yield put(checkUsernameAction({ username: value, token }))
  }
}

export function * watchUser() {
  yield takeEvery(CREATE_USER, onCreateAccount)
  yield takeEvery(CREATE_USER_SUCCESS, onCreateAccountSuccess)
  yield takeEvery(CREATE_USER_FAIL, onCreateUserFail)
  yield takeEvery(CREATE_USER_UPDATE_FORM, onCreateUserUpdateForm)
};
