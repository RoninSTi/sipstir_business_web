import { put, select, takeEvery } from 'redux-saga/effects'

import { SET_LOADING, UPDATE_LOADING } from '@actions/types'

const getLoaders = state => state.ui.isLoading

function * addLoading({ loadingType, meta }) {
  const loaders = yield select(getLoaders)

  yield put({
    type: SET_LOADING,
    payload: [
      ...loaders,
      { loadingType, meta }
    ]
  })
}

function * removeLoading({ loadingType, meta }) {
  const loaders = yield select(getLoaders)

  const newLoaders = loaders.filter(loader => loader.loadingType !== loadingType && loader.meta !== meta)

  yield put({
    type: SET_LOADING,
    payload: newLoaders
  })
}

function * onUpdateLoading(action) {
  const {
    payload: {
      loadingAction,
      loadingType,
      meta
    }
  } = action

  switch (loadingAction) {
  case 'set':
    yield addLoading({ loadingType, meta })
    break
  case 'unset':
    yield removeLoading({ loadingType, meta })
    break
  default:
    break
  }
};

export function * watchUI() {
  yield takeEvery(UPDATE_LOADING, onUpdateLoading)
};
