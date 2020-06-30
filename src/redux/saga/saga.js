import { all } from 'redux-saga/effects'

import { watchAccount } from './account'
import { watchAuth } from './auth'
import { watchRewards } from './rewards'
import { watchUI } from './ui'
import { watchUser } from './user'

export default function * rootSaga() {
  yield all([
    watchAccount(),
    watchAuth(),
    watchRewards(),
    watchUI(),
    watchUser()
  ])
};
