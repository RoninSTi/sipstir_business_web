import { all } from 'redux-saga/effects'

import { watchAccount } from './account'
import { watchAuth } from './auth'
import { watchUI } from './ui'
import { watchUser } from './user'

export default function * rootSaga() {
  yield all([
    watchAccount(),
    watchAuth(),
    watchUI(),
    watchUser()
  ])
};
