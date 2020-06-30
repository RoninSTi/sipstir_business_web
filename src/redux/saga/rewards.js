import { put, takeEvery } from 'redux-saga/effects'

import { CREATE_REWARD_SUCCESS, FETCH_REWARDS, UPDATE_REWARD_SUCCESS } from '@actions/types'

function * onCreateRewardSuccess(action) {
  yield put({
    type: FETCH_REWARDS
  })

  const history = action.meta?.previousAction?.payload?.history

  if (history) history.push('/rewards')
}

function * onUpdateRewardSuccess() {
  yield put({
    type: FETCH_REWARDS
  })
}

export function * watchRewards() {
  yield takeEvery(CREATE_REWARD_SUCCESS, onCreateRewardSuccess)
  yield takeEvery(UPDATE_REWARD_SUCCESS, onUpdateRewardSuccess)
};
