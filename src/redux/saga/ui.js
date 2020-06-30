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

function * checkLoading(action) {
  const { setLoading } = action.payload

  if (setLoading) {
    yield onUpdateLoading({
      payload: {
        loadingAction: 'set',
        loadingType: action.type,
        meta: setLoading.meta
      }
    })
  }

  if (action.meta?.previousAction) {
    yield onUpdateLoading({
      payload: {
        loadingAction: 'unset',
        loadingType: action.meta?.previousAction?.type,
        meta: action.meta?.previousAction.payload.setLoading?.meta
      }
    })
  }
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
  console.log({ action })
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
  yield takeEvery(action => action.payload?.setLoading, checkLoading)
  yield takeEvery(action => action.meta?.previousAction, checkLoading)
  yield takeEvery(UPDATE_LOADING, onUpdateLoading)
};
