import { applyMiddleware, createStore } from 'redux'
import { multiClientMiddleware } from 'redux-axios-middleware'

import throttle from 'lodash.throttle'

import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

import { loadState, saveState } from '@utils/localStorage'

import reducer from '@reducers/reducer'
import rootSaga from '@redux/saga/saga'
import clients from '@services/api'

import { composeWithDevTools } from 'redux-devtools-extension'

const sagaMiddleware = createSagaMiddleware()

const middleware = [multiClientMiddleware(clients), sagaMiddleware]

if (process.env.NODE_ENV === 'development') {
  middleware.push(logger)
}

const persistedState = loadState()

const store = createStore(
  reducer,
  persistedState,
  composeWithDevTools(
    applyMiddleware(...middleware)
  )
)

store.subscribe(throttle(() => {
  saveState({
    auth: store.getState().auth,
    account: store.getState().account
  })
}, 1000))

sagaMiddleware.run(rootSaga)

export default store
